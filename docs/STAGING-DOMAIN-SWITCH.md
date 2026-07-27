# staging.thingswell.co.kr 도메인 전환 절차 (CloudShell 수동 실행)

> CLAUDE.md 규칙: AWS 인프라 변경(CloudFront/Route53/ACM)은 AI가 직접 실행하지 않는다.
> 이 문서의 명령을 **사용자가 CloudShell에서 직접 실행**한다.
>
> 배경: 아키텍처 결정(docs/architecture PR #12)에 따라 홈페이지 계열 도메인은
> `thingswell.co.kr`로 통일하고 `safegai.co.kr`는 정리한다. staging도
> `staging.safegai.co.kr` → **`staging.thingswell.co.kr`** 로 전환한다.
>
> 방식: **완전 전환** (CloudFront alias를 신규 도메인으로 교체 — 구 staging 주소는 중단됨).
> 저장소 값 변경은 `feat/staging-domain-switch` 브랜치에 이미 반영됨
> (`.env.staging`·`deploy-staging.sh`·`update-og-image.sh`·`DEPLOY-STAGING.md`).

## 실행 순서 요약

인프라(이 문서 1~5) → 저장소 브랜치로 staging 재배포(6) → 검증(7)

---

## 1. 대상 확인

```bash
STAGING_DIST_ID="E39F1U1NGGUK2D"

# 이 distribution이 실제 staging(버킷 thingswell-homepage-staging)을 서빙하는지 + 현재 alias 확인
aws cloudfront get-distribution --id $STAGING_DIST_ID \
  --query "Distribution.{CFDomain:DomainName,Aliases:DistributionConfig.Aliases.Items,Origin:DistributionConfig.Origins.Items[0].DomainName,Status:Status}"
```

Origin이 `thingswell-homepage-staging`, Aliases에 `staging.safegai.co.kr`가 보여야 한다. 다르면 중단하고 실제 staging distribution ID를 찾아 교체.

## 2. Route53 존 확인 (⚠️ 중복 존 주의)

```bash
aws route53 list-hosted-zones-by-name --dns-name thingswell.co.kr. \
  --query "HostedZones[].{Id:Id,Name:Name,Private:Config.PrivateZone,Comment:Config.Comment}"
```

`thingswell.co.kr` 존이 **여러 개**면(알려진 이슈: Route53 중복 존), 실제 위임된 존을 골라야 한다:

```bash
# 실제 도메인의 NS (등록기관에 위임된 값)
dig +short NS thingswell.co.kr

# 각 존의 NS 레코드와 비교 — 일치하는 존이 진짜
aws route53 list-resource-record-sets --hosted-zone-id <존ID> \
  --query "ResourceRecordSets[?Type=='NS' && Name=='thingswell.co.kr.'].ResourceRecords"

ZONE_ID="<일치하는 존 ID (\"/hostedzone/\" 뒤 부분)>"
```

## 3. ACM 인증서 (반드시 us-east-1)

먼저 기존 인증서가 커버하는지 확인:

```bash
aws acm list-certificates --region us-east-1 \
  --query "CertificateSummaryList[].{Arn:CertificateArn,Domain:DomainName,SANs:SubjectAlternativeNameSummaries,Status:Status}" --output table
```

- `*.thingswell.co.kr` 와일드카드가 **ISSUED** 상태로 있으면 → 그 ARN을 `CERT_ARN`으로 쓰고 4로 건너뜀
- 없으면 신규 발급:

```bash
CERT_ARN=$(aws acm request-certificate --region us-east-1 \
  --domain-name staging.thingswell.co.kr \
  --validation-method DNS --query CertificateArn --output text)
echo $CERT_ARN

# DNS 검증 레코드 값 조회
aws acm describe-certificate --region us-east-1 --certificate-arn $CERT_ARN \
  --query "Certificate.DomainValidationOptions[0].ResourceRecord"

# 위 결과의 Name/Value로 검증 CNAME 생성
cat > /tmp/acm-validate.json <<'EOF'
{"Changes":[{"Action":"UPSERT","ResourceRecordSet":{
  "Name":"<ResourceRecord.Name>","Type":"CNAME","TTL":300,
  "ResourceRecords":[{"Value":"<ResourceRecord.Value>"}]}}]}
EOF
aws route53 change-resource-record-sets --hosted-zone-id $ZONE_ID --change-batch file:///tmp/acm-validate.json

# ISSUED 될 때까지 대기 (보통 수 분)
aws acm wait certificate-validated --region us-east-1 --certificate-arn $CERT_ARN
```

## 4. CloudFront alias 교체 + 인증서 연결

CloudFront는 distribution당 인증서 1개이므로, alias 교체와 인증서 교체를 함께 한다.

```bash
aws cloudfront get-distribution-config --id $STAGING_DIST_ID > /tmp/dist.json
ETAG=$(jq -r '.ETag' /tmp/dist.json)

jq --arg cert "$CERT_ARN" '.DistributionConfig
  | .Aliases = {Quantity:1, Items:["staging.thingswell.co.kr"]}
  | .ViewerCertificate = {ACMCertificateArn:$cert, SSLSupportMethod:"sni-only",
      MinimumProtocolVersion:"TLSv1.2_2021", Certificate:$cert, CertificateSource:"acm"}' \
  /tmp/dist.json > /tmp/dist-new.json

aws cloudfront update-distribution --id $STAGING_DIST_ID --if-match $ETAG \
  --distribution-config file:///tmp/dist-new.json \
  --query "Distribution.{Status:Status,Aliases:DistributionConfig.Aliases.Items}"

# 배포 완료 대기 (수 분)
aws cloudfront wait distribution-deployed --id $STAGING_DIST_ID
```

## 5. Route53 alias 레코드 생성

```bash
CF_DOMAIN=$(aws cloudfront get-distribution --id $STAGING_DIST_ID --query Distribution.DomainName --output text)

cat > /tmp/staging-alias.json <<EOF
{"Changes":[
 {"Action":"UPSERT","ResourceRecordSet":{"Name":"staging.thingswell.co.kr","Type":"A",
  "AliasTarget":{"HostedZoneId":"Z2FDTNDATAQYW2","DNSName":"$CF_DOMAIN","EvaluateTargetHealth":false}}},
 {"Action":"UPSERT","ResourceRecordSet":{"Name":"staging.thingswell.co.kr","Type":"AAAA",
  "AliasTarget":{"HostedZoneId":"Z2FDTNDATAQYW2","DNSName":"$CF_DOMAIN","EvaluateTargetHealth":false}}}
]}
EOF
aws route53 change-resource-record-sets --hosted-zone-id $ZONE_ID --change-batch file:///tmp/staging-alias.json

# 확인
dig +short staging.thingswell.co.kr
```

`Z2FDTNDATAQYW2`는 CloudFront 고정 hosted zone ID (모든 배포 공통).

## 6. staging 재배포 (새 도메인 값으로 빌드)

저장소 값이 바뀌었으므로 재빌드·재배포가 필요하다:

```bash
cd thingswell-homepage-model001
git fetch origin && git checkout feat/staging-domain-switch && git pull
cd grape && npm ci
npm run validate:content
SITE_URL=https://staging.thingswell.co.kr npm run seo   # staging sitemap 도메인 정합
bash deploy-staging.sh    # 도메인 검증이 staging.thingswell.co.kr 기준으로 동작
```

## 7. 검증

- [ ] `https://staging.thingswell.co.kr/ko` → v2 홈, 인증서 오류 없음
- [ ] `https://staging.thingswell.co.kr/ko/about` → v2 회사소개 + 혁신 히스토리
- [ ] 구 주소 `staging.safegai.co.kr` → 접속 불가(alias 제거됨) — 의도된 동작
- [ ] OG canonical/og:url이 `staging.thingswell.co.kr` 기준

## 8. 후속 정리 (별도 승인)

- `staging.safegai.co.kr` Route53 레코드 삭제 (safegai.co.kr 존)
- safegai.co.kr 존/프로덕션 alias 처리 방침 — 별도 논의

# 쇼핑몰 도메인 연결 — shop.thingswell.co.kr → cafe24

> CLAUDE.md 규칙: 인프라 변경(Route53)은 AI가 직접 실행하지 않는다. 아래를 사용자가 직접 실행한다.
>
> 결정(2026-07-27): 도메인 통일 방향에 따라 쇼핑몰(`thingswell.cafe24.com`)을
> `shop.thingswell.co.kr`로 연결하고, 상단 메뉴의 쇼핑몰은 Footer로 이동 (B2B 포지셔닝 정리).

## 실행 순서 — ⚠️ 인프라(1~2) 완료 후에 홈페이지 배포

Footer의 쇼핑몰 링크가 `https://shop.thingswell.co.kr/`를 가리키므로,
**DNS·cafe24 연결이 끝나기 전에 배포하면 죽은 링크**가 된다.

## 1. cafe24 관리자에서 도메인 추가 (웹 UI)

cafe24 쇼핑몰 관리자 → **상점관리(설정) → 도메인 관리 → 도메인 연결**:
1. `shop.thingswell.co.kr` 입력해 보유 도메인 연결
2. cafe24가 안내하는 연결 방식 확인 — 서브도메인은 보통 **CNAME → `thingswell.cafe24.com`**
   (cafe24 안내 값이 다르면 그 값을 아래 2의 CNAME 값으로 사용)
3. 도메인 연결 후 같은 메뉴에서 **보안서버(SSL) 인증서 발급** 신청 (cafe24 무료 SSL)

## 2. Route53 CNAME 생성 (CloudShell)

⚠️ 반드시 **진짜 존** `Z08908689G7JYXWCUK20` 사용 (중복 존은 2026-07-27 삭제됐지만 습관적으로 확인).

```bash
ZONE_ID="Z08908689G7JYXWCUK20"
aws route53 change-resource-record-sets --hosted-zone-id $ZONE_ID --change-batch '{
  "Changes":[{"Action":"UPSERT","ResourceRecordSet":{
    "Name":"shop.thingswell.co.kr","Type":"CNAME","TTL":300,
    "ResourceRecords":[{"Value":"thingswell.cafe24.com"}]}}]}'

# 확인
dig +short shop.thingswell.co.kr CNAME
```

## 3. 확인

- [ ] `https://shop.thingswell.co.kr` 접속 → cafe24 쇼핑몰 표시, 인증서 오류 없음
- [ ] SSL 발급 완료 전에는 http로만 열릴 수 있음 — cafe24 SSL 발급 상태 확인

## 4. 홈페이지 반영 (이 브랜치 배포)

`feat/shop-domain-menu` 변경 사항:
- 상단 메뉴에서 쇼핑몰 제거 (nav.shop 키는 보존 — 기존 키 삭제 금지 규칙)
- Footer 제품 카테고리에 쇼핑몰 외부 링크 추가 (`shop.thingswell.co.kr`, 새 탭 + noopener)

배포는 통상 절차: `validate:content` → `seo` → `deploy-staging.sh` → 검증 → `deploy-production.sh`

## 5. 후속 (선택)

- cafe24 관리자에서 대표 도메인을 `shop.thingswell.co.kr`로 설정하면
  `thingswell.cafe24.com` 접속 시 새 도메인으로 리다이렉트됨 (브랜드 일관성 완성)

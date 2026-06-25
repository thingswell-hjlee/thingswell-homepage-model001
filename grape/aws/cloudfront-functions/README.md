# CloudFront Functions - ThingsWell 홈페이지

## thingswell-root-to-ko

루트 URL(`/`) 접속 시 `/ko`로 301 리다이렉트하는 CloudFront Function입니다.

### 동작 요약

| 요청 URL | 리다이렉트 결과 |
|----------|----------------|
| `https://www.thingswell.co.kr` | `https://www.thingswell.co.kr/ko` (301) |
| `https://thingswell.co.kr` | `https://thingswell.co.kr/ko` (301) |
| `https://www.thingswell.co.kr?utm=abc` | `https://www.thingswell.co.kr/ko?utm=abc` (301) |
| `https://www.thingswell.co.kr/ko` | 리다이렉트 안 함 (그대로 통과) |
| `https://www.thingswell.co.kr/en` | 리다이렉트 안 함 (그대로 통과) |
| `https://www.thingswell.co.kr/ko/about/company` | 리다이렉트 안 함 (그대로 통과) |

### 적용 대상

- **Distribution ID**: `EQTMTY6FNARD8`
- **이벤트 타입**: Viewer Request
- **연결 위치**: DefaultCacheBehavior

---

## AWS CloudShell 적용 절차

### 1단계: 함수 생성

```bash
aws cloudfront create-function \
  --name thingswell-root-to-ko \
  --function-config '{"Comment":"Root / to /ko 301 redirect","Runtime":"cloudfront-js-2.0"}' \
  --function-code fileb://thingswell-root-to-ko.js
```

생성 결과에서 `ETag` 값을 확인합니다.

### 2단계: 함수 테스트 (선택)

```bash
aws cloudfront test-function \
  --name thingswell-root-to-ko \
  --if-match <ETAG_VALUE> \
  --event-object fileb://test-event.json
```

테스트 이벤트 예시 (`test-event.json`):

```json
{
  "version": "1.0",
  "context": {
    "eventType": "viewer-request"
  },
  "viewer": {
    "ip": "1.2.3.4"
  },
  "request": {
    "method": "GET",
    "uri": "/",
    "headers": {
      "host": { "value": "www.thingswell.co.kr" }
    },
    "querystring": {}
  }
}
```

### 3단계: 함수 배포 (Publish)

```bash
aws cloudfront publish-function \
  --name thingswell-root-to-ko \
  --if-match <ETAG_VALUE>
```

배포 결과에서 새로운 `ETag` 값을 확인합니다.

### 4단계: Distribution에 연결

```bash
# 현재 Distribution 설정 가져오기
aws cloudfront get-distribution-config \
  --id EQTMTY6FNARD8 > dist-config.json

# dist-config.json 편집:
# DistributionConfig.DefaultCacheBehavior.FunctionAssociations에 아래 추가:
#
# {
#   "Quantity": 1,
#   "Items": [
#     {
#       "FunctionARN": "<함수 ARN>",
#       "EventType": "viewer-request"
#     }
#   ]
# }

# 수정된 설정 적용
aws cloudfront update-distribution \
  --id EQTMTY6FNARD8 \
  --if-match <DISTRIBUTION_ETAG> \
  --distribution-config file://dist-config-updated.json
```

> **참고**: `update-distribution`에 전달하는 JSON은 `DistributionConfig` 객체만 포함해야 합니다 (`ETag`, `Distribution` 래퍼 제거).

### 5단계: 적용 확인 (배포 완료 후 약 5분 대기)

```bash
# 루트 → /ko 리다이렉트 확인
curl -I https://www.thingswell.co.kr
# 예상: HTTP/2 301, Location: https://www.thingswell.co.kr/ko

curl -I https://thingswell.co.kr
# 예상: HTTP/2 301, Location: https://thingswell.co.kr/ko

# 기존 경로는 리다이렉트 안 함 확인
curl -I https://www.thingswell.co.kr/ko
# 예상: HTTP/2 200

curl -I https://thingswell.co.kr/ko
# 예상: HTTP/2 200

# 쿼리스트링 유지 확인
curl -I "https://www.thingswell.co.kr?utm=kakao&source=share"
# 예상: HTTP/2 301, Location: https://www.thingswell.co.kr/ko?utm=kakao&source=share
```

---

## 주의사항

1. **함수 수정 후 반드시 `publish-function` 실행** — 생성/수정만으로는 LIVE 스테이지에 반영되지 않습니다.
2. **Distribution 설정 변경 시 ETag 필수** — `get-distribution-config`에서 받은 ETag를 `update-distribution`에 전달해야 합니다.
3. **전파 시간** — Distribution 설정 변경 후 약 5~10분 소요됩니다.
4. **롤백** — 문제 발생 시 Distribution 설정에서 FunctionAssociations를 제거하고 update하면 됩니다.
5. **카카오 OG 크롤러** — 카카오톡 링크 공유 시 루트 URL을 크롤링하므로, 301로 /ko를 안내하면 한국어 OG 메타데이터를 정상 수집합니다.

---

## 파일 구조

```
grape/aws/cloudfront-functions/
├── thingswell-root-to-ko.js   ← CloudFront Function 코드
└── README.md                  ← 이 문서
```

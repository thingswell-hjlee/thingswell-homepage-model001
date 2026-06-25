# CloudFront Functions - ThingsWell 홈페이지

## thingswell-root-to-ko

루트 URL(`/`) 접속 시 `/ko`로 301 리다이렉트하는 CloudFront Function입니다.
카카오톡 OG 크롤러가 루트 URL을 크롤링할 때 한국어 OG 메타데이터를 안정적으로 수집할 수 있도록 합니다.

### 동작 요약

| 요청 URL | 결과 |
|----------|------|
| `https://www.thingswell.co.kr` | → `https://www.thingswell.co.kr/ko` (301) |
| `https://thingswell.co.kr` | → `https://thingswell.co.kr/ko` (301) |
| `https://www.thingswell.co.kr?utm=abc` | → `https://www.thingswell.co.kr/ko?utm=abc` (301) |
| `https://www.thingswell.co.kr/ko` | 리다이렉트 안 함 (200) |
| `https://www.thingswell.co.kr/en` | 리다이렉트 안 함 (200) |

### 적용 대상

- **Distribution ID**: `EQTMTY6FNARD8`
- **이벤트 타입**: Viewer Request
- **런타임**: cloudfront-js-2.0

---

## AWS CloudShell 적용 절차

### 1단계: 함수 파일 생성

```bash
cat > /tmp/thingswell-root-to-ko.js << 'EOF'
function handler(event) {
    var request = event.request;
    var host = request.headers.host.value;
    var uri = request.uri;
    if (uri === "/" || uri === "") {
        var location = "https://" + host + "/ko";
        var qs = request.querystring;
        if (qs && Object.keys(qs).length > 0) {
            var params = [];
            for (var key in qs) {
                if (qs[key].value) { params.push(key + "=" + qs[key].value); }
                else { params.push(key); }
            }
            if (params.length > 0) { location += "?" + params.join("&"); }
        }
        return { statusCode: 301, statusDescription: "Moved Permanently", headers: { location: { value: location } } };
    }
    return request;
}
EOF
```

### 2단계: 함수 생성

```bash
aws cloudfront create-function \
  --name thingswell-root-to-ko \
  --function-config '{"Comment":"Root / to /ko 301 redirect for Kakao OG","Runtime":"cloudfront-js-2.0"}' \
  --function-code fileb:///tmp/thingswell-root-to-ko.js
```

결과에서 `ETag` 값을 복사합니다.

### 3단계: 함수 배포

```bash
aws cloudfront publish-function \
  --name thingswell-root-to-ko \
  --if-match "<ETAG_FROM_STEP_2>"
```

### 4단계: Distribution에 연결

```bash
aws cloudfront get-distribution-config --id EQTMTY6FNARD8 > /tmp/dist-config.json

# /tmp/dist-config.json에서 DistributionConfig.DefaultCacheBehavior.FunctionAssociations 수정:
# {
#   "Quantity": 1,
#   "Items": [{
#     "FunctionARN": "arn:aws:cloudfront::050649355977:function/thingswell-root-to-ko",
#     "EventType": "viewer-request"
#   }]
# }

aws cloudfront update-distribution \
  --id EQTMTY6FNARD8 \
  --if-match "<ETAG_FROM_GET>" \
  --distribution-config file:///tmp/dist-config-updated.json
```

### 5단계: 배포 완료 확인 (약 5분 대기)

```bash
curl -I https://www.thingswell.co.kr
curl -I https://thingswell.co.kr
curl -I https://www.thingswell.co.kr/ko
curl -I https://thingswell.co.kr/ko
```

---

## OG 검증 절차

배포 후 아래 명령으로 OG 태그가 정상인지 확인합니다.

### HTTP 리다이렉트 확인

```bash
# 루트 → /ko 리다이렉트
curl -I https://www.thingswell.co.kr
# 기대: HTTP/2 301, Location: https://www.thingswell.co.kr/ko

curl -I https://thingswell.co.kr
# 기대: HTTP/2 301, Location: https://thingswell.co.kr/ko

# /ko 페이지 직접 접속
curl -I https://www.thingswell.co.kr/ko
# 기대: HTTP/2 200

curl -I https://thingswell.co.kr/ko
# 기대: HTTP/2 200
```

### OG 이미지 접근 확인

```bash
curl -I https://www.thingswell.co.kr/og-image.jpg
# 기대: HTTP/2 200, content-type: image/jpeg
```

### HTML OG 태그 확인

```bash
curl -sL https://www.thingswell.co.kr/ko | grep -i "og:title\|og:description\|og:image\|og:url\|twitter:image\|canonical"
```

기대 결과:
- `og:image`: `https://www.thingswell.co.kr/og-image.jpg`
- `og:url`: `https://www.thingswell.co.kr/ko`
- `twitter:image`: `https://www.thingswell.co.kr/og-image.jpg`
- `canonical`: `https://www.thingswell.co.kr/ko`

---

## 카카오 캐시 초기화

배포 후 아래 URL의 카카오 공유 캐시를 초기화해야 합니다.

**카카오 공유 디버거:** https://developers.kakao.com/tool/debugger/sharing

초기화 대상 URL:
1. `https://www.thingswell.co.kr`
2. `https://www.thingswell.co.kr/ko`
3. `https://thingswell.co.kr`
4. `https://thingswell.co.kr/ko`

각 URL을 카카오 공유 디버거에 입력하고 **캐시 초기화** 버튼을 클릭합니다.

---

## 주의사항

1. **safegai.co.kr과 thingswell.co.kr은 같은 S3/index.html을 공유합니다.**
   - 정적 OG(index.html)는 ThingsWell 기준으로 고정
   - React SEOHead는 현재 접속 도메인을 감지하여 동적으로 설정
   - 장기적으로는 도메인별 빌드 분리 또는 CloudFront origin 분리 검토

2. **CloudFront Function 수정 후 반드시 publish-function 실행**

3. **Distribution 설정 변경 시 ETag 필수**

4. **카카오 크롤러는 301 리다이렉트를 따라감** — 루트 URL 공유 시 /ko 페이지의 OG를 읽음

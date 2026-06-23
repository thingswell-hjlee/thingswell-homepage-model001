# 싱스웰 홈페이지 - AWS S3 + CloudFront 배포 가이드

## 개요

S3에 빌드된 정적 파일을 업로드하고, CloudFront로 HTTPS와 CDN을 적용하는 방식입니다.

- 서버 관리 불필요
- HTTPS 자동 적용
- 전 세계 CDN으로 빠른 로딩
- 매우 저렴한 비용 (월 $1~5 수준)

---

## 사전 준비

### 1. AWS CLI 설치

Windows PowerShell에서:
```powershell
winget install Amazon.AWSCLI
```

설치 후 PowerShell을 새로 열고 확인:
```powershell
aws --version
```

### 2. AWS 자격 증명 설정

```powershell
aws configure
```

입력할 정보:
- AWS Access Key ID: (IAM에서 발급)
- AWS Secret Access Key: (IAM에서 발급)
- Default region name: ap-northeast-2
- Default output format: json

### 3. Node.js 설치

https://nodejs.org 에서 LTS 버전 설치

---

## Step 1: S3 버킷 생성

```powershell
aws s3 mb s3://thingswell-homepage --region ap-northeast-2
```

### 정적 웹사이트 호스팅 활성화

```powershell
aws s3 website s3://thingswell-homepage --index-document index.html --error-document index.html
```

### 버킷 퍼블릭 액세스 차단 해제 (CloudFront OAC 사용 시 생략 가능)

> CloudFront OAC를 사용할 경우 이 단계를 건너뛰세요 (Step 3 참고)

```powershell
aws s3api put-public-access-block --bucket thingswell-homepage --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

### 버킷 정책 설정 (퍼블릭 읽기)

`bucket-policy.json` 파일 생성:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::thingswell-homepage/*"
    }
  ]
}
```

적용:
```powershell
aws s3api put-bucket-policy --bucket thingswell-homepage --policy file://bucket-policy.json
```

---

## Step 2: 빌드 및 S3 업로드

### 프로젝트 빌드

```powershell
cd C:\projects\grape
npm install
npm run build
```

### S3에 업로드

```powershell
# 정적 자산 (긴 캐시)
aws s3 sync dist/ s3://thingswell-homepage/ --delete --cache-control "public, max-age=31536000" --exclude "index.html"

# index.html (캐시 없음 - 항상 최신)
aws s3 cp dist/index.html s3://thingswell-homepage/index.html --cache-control "no-cache, no-store, must-revalidate" --content-type "text/html"
```

### 확인

브라우저에서 접속:
```
http://thingswell-homepage.s3-website.ap-northeast-2.amazonaws.com
```

---

## Step 3: CloudFront 배포 생성 (HTTPS + CDN)

### CloudFront 배포 설정 파일 생성

`cloudfront-config.json` 파일:
```json
{
  "CallerReference": "thingswell-homepage-2024",
  "Comment": "싱스웰 홈페이지",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-thingswell-homepage",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["HEAD", "GET"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["HEAD", "GET"]
      }
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": true
  },
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-thingswell-homepage",
        "DomainName": "thingswell-homepage.s3-website.ap-northeast-2.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "http-only"
        }
      }
    ]
  },
  "Enabled": true,
  "DefaultRootObject": "index.html",
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 0
      }
    ]
  },
  "PriceClass": "PriceClass_200"
}
```

### CloudFront 배포 생성

```powershell
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

응답에서 `"DomainName"` 값을 확인합니다 (예: `d1234abcdef8.cloudfront.net`)

### 배포 완료 확인 (5~15분 소요)

```powershell
aws cloudfront list-distributions --query "DistributionList.Items[*].{Id:Id,Domain:DomainName,Status:Status}"
```

Status가 `Deployed`가 되면 완료입니다.

### HTTPS 접속 확인

```
https://d1234abcdef8.cloudfront.net
```

---

## Step 4: 커스텀 도메인 연결 (선택)

도메인이 있는 경우 (예: thingswell.co.kr):

### 1. ACM에서 SSL 인증서 발급 (버지니아 리전에서!)

```powershell
aws acm request-certificate --domain-name thingswell.co.kr --subject-alternative-names "*.thingswell.co.kr" --validation-method DNS --region us-east-1
```

### 2. DNS 검증 완료 후 CloudFront에 도메인 추가

CloudFront 콘솔에서:
- Alternate domain names에 `thingswell.co.kr` 추가
- Custom SSL certificate에서 발급받은 인증서 선택

### 3. Route 53 또는 DNS에서 CNAME 추가

```
thingswell.co.kr → d1234abcdef8.cloudfront.net
```

---

## 업데이트 배포 (이후 반복)

코드 수정 후 재배포할 때:

```powershell
cd C:\projects\grape

# 빌드
npm run build

# S3 업로드
aws s3 sync dist/ s3://thingswell-homepage/ --delete --cache-control "public, max-age=31536000" --exclude "index.html"
aws s3 cp dist/index.html s3://thingswell-homepage/index.html --cache-control "no-cache, no-store, must-revalidate" --content-type "text/html"

# CloudFront 캐시 무효화 (배포 ID를 본인 것으로 변경)
aws cloudfront create-invalidation --distribution-id EXXXXXXXXXXXXX --paths "/*"
```

---

## 비용 예상 (월)

| 항목 | 비용 |
|------|------|
| S3 저장소 (1GB 이하) | ~$0.03 |
| S3 요청 | ~$0.01 |
| CloudFront 전송 (10GB) | ~$1.00 |
| CloudFront 요청 (10만건) | ~$0.10 |
| **합계** | **약 $1~3/월** |

---

## 문제 해결

### SPA 라우팅 404 오류
CloudFront 설정에서 Custom Error Response를 설정하세요:
- 404 에러 → /index.html 반환 (HTTP 200)

### 배포 후 변경사항 미반영
CloudFront 캐시 무효화 실행:
```powershell
aws cloudfront create-invalidation --distribution-id EXXXXXXXXXXXXX --paths "/*"
```

### 버킷 이름 중복 오류
S3 버킷 이름은 전 세계에서 유일해야 합니다. `thingswell-homepage-2024` 등으로 변경하세요.

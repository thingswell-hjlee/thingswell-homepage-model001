# SafeGAI Platform - AWS 배포 가이드

## 개요

SafeGAI Platform은 `safegai.com` 도메인으로 서비스되는 정적 웹사이트입니다.
React + TypeScript + Vite로 빌드된 SPA(Single Page Application)를 AWS S3 + CloudFront로 배포합니다.

---

## 인프라 구성

```
사용자 → safegai.com (Route53)
       → CloudFront (HTTPS, 캐시, SPA 라우팅)
       → S3 Bucket (정적 파일 호스팅)
```

| 구성요소 | 역할 |
|---------|------|
| S3 Bucket | 빌드된 정적 파일 저장 (`safegai-platform`) |
| CloudFront | HTTPS, CDN 캐시, SPA 404→index.html 처리 |
| Route53 | safegai.com 도메인 DNS 관리 |
| ACM | SSL 인증서 (us-east-1 리전) |

---

## 사전 준비

### 1. 필수 도구 설치

- [AWS CLI v2](https://aws.amazon.com/cli/)
- [Node.js 18+](https://nodejs.org/)
- npm (Node.js 설치 시 포함)

### 2. AWS 자격 증명 설정

```bash
aws configure
# AWS Access Key ID: (입력)
# AWS Secret Access Key: (입력)
# Default region name: ap-northeast-2
# Default output format: json
```

### 3. 도메인 준비

- `safegai.com` 도메인을 Route53 Hosted Zone에 등록
- Hosted Zone ID 확인

### 4. SSL 인증서 발급

> **중요**: CloudFront에서 사용하는 인증서는 반드시 **us-east-1 (버지니아 북부)** 리전에서 발급해야 합니다.

```bash
aws acm request-certificate \
  --domain-name safegai.com \
  --subject-alternative-names "*.safegai.com" \
  --validation-method DNS \
  --region us-east-1
```

DNS 검증 완료 후 인증서 ARN을 확인합니다.

---

## 배포 방법

### 방법 1: 배포 스크립트 사용 (권장)

#### Linux / macOS

```bash
cd safegai-platform
chmod +x deploy-s3.sh
./deploy-s3.sh
```

#### Windows PowerShell

```powershell
cd safegai-platform
.\deploy-s3.ps1
```

> 스크립트 실행 전 `CLOUDFRONT_DISTRIBUTION_ID` 변수를 설정해야 캐시 무효화가 동작합니다.

---

### 방법 2: CloudFormation으로 인프라 생성 (최초 1회)

```bash
aws cloudformation create-stack \
  --stack-name safegai-platform \
  --template-body file://aws/cloudformation.yaml \
  --parameters \
    ParameterKey=DomainName,ParameterValue=safegai.com \
    ParameterKey=HostedZoneId,ParameterValue=<YOUR_HOSTED_ZONE_ID> \
    ParameterKey=ACMCertificateArn,ParameterValue=<YOUR_ACM_CERT_ARN> \
  --region ap-northeast-2
```

스택 생성 후 출력값에서 CloudFront Distribution ID를 확인하여 배포 스크립트에 입력합니다.

```bash
aws cloudformation describe-stacks \
  --stack-name safegai-platform \
  --query "Stacks[0].Outputs" \
  --output table
```

---

### 방법 3: 수동 배포

```bash
# 1. 빌드
npm run build

# 2. S3 업로드 (정적 에셋 - 장기 캐시)
aws s3 sync dist/ s3://safegai-platform/ \
  --region ap-northeast-2 \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html" \
  --exclude "*.json"

# 3. index.html 업로드 (캐시 없음)
aws s3 cp dist/index.html s3://safegai-platform/index.html \
  --region ap-northeast-2 \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html; charset=utf-8"

# 4. CloudFront 캐시 무효화
aws cloudfront create-invalidation \
  --distribution-id <DISTRIBUTION_ID> \
  --paths "/*"
```

---

## 배포 후 확인사항

배포 완료 후 반드시 다음을 확인합니다.

| 항목 | 확인 방법 |
|------|-----------|
| HTTPS 접속 | `https://safegai.com` 접속 |
| www 리다이렉트 | `https://www.safegai.com` → `https://safegai.com` |
| SPA 라우팅 | 페이지 내 스크롤 후 새로고침 시 정상 표시 |
| 모바일 반응형 | 크롬 DevTools Mobile 뷰로 확인 |
| 메뉴 네비게이션 | 모든 섹션 smooth scroll 동작 |
| 사용자 화면 | 메뉴 전환, 알림 모달, 조치 완료 버튼 |
| 관리자 화면 | 좌측 메뉴 전환, 이벤트 필터, 룰 엔진 토글 |
| Contact 모달 | 문의 폼 표시 및 제출 데모 |
| 기존 홈페이지 연동 | thingswell.co.kr → safegai.com CTA 버튼 동작 |

---

## 캐시 전략

| 파일 | Cache-Control | 설명 |
|------|---------------|------|
| `index.html` | `no-cache, no-store, must-revalidate` | 항상 최신 버전 |
| `assets/*.js` | `public, max-age=31536000, immutable` | Vite 해시 파일명으로 영구 캐시 |
| `assets/*.css` | `public, max-age=31536000, immutable` | Vite 해시 파일명으로 영구 캐시 |
| `favicon.svg` | `public, max-age=86400` | 1일 캐시 |

Vite는 빌드 시 JS/CSS 파일에 content hash를 붙이므로 (`index-Dr2dHXy9.css`) 파일 내용이 변경되면 파일명이 바뀝니다.
따라서 정적 에셋은 장기 캐시를 적용해도 안전합니다.

---

## 문제 해결

### CloudFront 403 에러

- OAC(Origin Access Control) 설정 확인
- S3 Bucket Policy에서 CloudFront 서비스 프린시펄 허용 여부 확인
- CloudFormation 스택의 버킷 정책 자동 생성 확인

### SPA 라우팅 안됨 (새로고침 시 404)

- CloudFront Custom Error Response 설정 확인
  - 403 → `/index.html` (200)
  - 404 → `/index.html` (200)

### SSL 인증서 미적용

- ACM 인증서가 **us-east-1** 리전에 있는지 확인
- DNS 검증 완료 여부 확인
- CloudFront에서 Alternate Domain Names에 `safegai.com` 추가 여부 확인

### 배포 후 변경사항 미반영

```bash
# CloudFront 캐시 무효화
aws cloudfront create-invalidation \
  --distribution-id <DISTRIBUTION_ID> \
  --paths "/*"
```

- CloudFront 캐시 무효화 후 5~10분 대기
- 브라우저 캐시 삭제 (Ctrl+Shift+R)

---

## 운영 참고

### 비용 예상 (월 기준, 트래픽 소규모)

| 항목 | 예상 비용 |
|------|-----------|
| S3 | $1 미만 (정적 파일 수 MB) |
| CloudFront | $1~5 (트래픽에 따라) |
| Route53 | $0.50 (Hosted Zone) |
| ACM | 무료 |

### 업데이트 주기

코드 변경 후 배포 시:
1. `npm run build` → S3 sync → CloudFront invalidation
2. 전체 소요 시간: 약 2~5분

---

## 관련 파일

| 파일 | 설명 |
|------|------|
| `deploy-s3.sh` | Linux/macOS 배포 스크립트 |
| `deploy-s3.ps1` | Windows 배포 스크립트 |
| `aws/cloudformation.yaml` | AWS 인프라 자동 생성 템플릿 |
| `vite.config.ts` | Vite 빌드 설정 |
| `dist/` | 빌드 결과물 (gitignore 대상) |

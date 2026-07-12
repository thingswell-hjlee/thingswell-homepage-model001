# 싱스웰 홈페이지 - 운영 배포 상태 문서

## 개요

이 문서는 현재 AWS에서 정상 동작하는 싱스웰 홈페이지의 운영 기준본 정보를 정리합니다.
배포 절차를 재현 가능하게 유지하여, 누구든 동일한 방식으로 안전하게 배포할 수 있도록 합니다.

---

## 운영 방식

| 항목 | 내용 |
|------|------|
| 호스팅 | AWS S3 정적 웹사이트 호스팅 |
| CDN | AWS CloudFront (HTTPS, 캐시, SPA 라우팅 처리) |
| DNS | 운영 환경에서 별도 관리 |
| SSL | AWS ACM 인증서 (운영 환경에서 별도 관리) |
| 빌드 도구 | Vite 5.x |
| 프레임워크 | React 18 + React Router 7 |
| 리전 | ap-northeast-2 (서울) |

---

## 빌드 절차

### 빌드 명령

```bash
cd grape
npm install
npm run build
```

### 빌드 결과물

- **출력 폴더**: `grape/dist`
- **주요 파일**:
  - `dist/index.html` — SPA 진입점
  - `dist/assets/*.js` — 번들링된 JavaScript (content hash 포함)
  - `dist/assets/*.css` — 번들링된 CSS (content hash 포함)
  - `dist/assets/*.(png|jpg|svg)` — 이미지 에셋

---

## S3 업로드 방식

### 정적 에셋 (JS, CSS, 이미지)

```bash
aws s3 sync dist/ s3://<S3_BUCKET>/ \
  --region ap-northeast-2 \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html" \
  --exclude "*.json"
```

- `--delete`: S3에서 로컬에 없는 파일 삭제
- `max-age=31536000`: 1년 캐시 (Vite가 파일명에 hash를 붙이므로 안전)

### index.html

```bash
aws s3 cp dist/index.html s3://<S3_BUCKET>/index.html \
  --region ap-northeast-2 \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html; charset=utf-8"
```

- 캐시 없음: 항상 최신 버전 제공
- SPA 라우팅의 진입점이므로 반드시 최신 상태 유지

---

## CloudFront 캐시 무효화 방식

```bash
aws cloudfront create-invalidation \
  --distribution-id <CLOUDFRONT_DISTRIBUTION_ID> \
  --paths "/*"
```

- 배포 후 반드시 실행
- 전파까지 약 5~10분 소요
- Distribution ID는 운영 환경에서 별도 관리

---

## 운영 도메인 정보

| 항목 | 값 |
|------|------|
| S3 버킷명 | 운영 환경에서 별도 관리 |
| CloudFront Distribution ID | 운영 환경에서 별도 관리 |
| 운영 도메인 | 운영 환경에서 별도 관리 |
| ACM 인증서 ARN | 운영 환경에서 별도 관리 (us-east-1 리전) |

> **주의**: 실제 AWS 키, Cognito 값, API Gateway URL, CloudFront ID 같은 민감값은 이 저장소에 커밋하지 않습니다.

---

## 주요 확인 URL

배포 후 아래 URL에서 정상 동작을 확인합니다.
(도메인은 실제 운영 도메인으로 대체하여 확인하세요.)

| URL 경로 | 설명 |
|----------|------|
| `/ko` | 한국어 메인 페이지 |
| `/ko/about/company` | 회사 소개 |
| `/ko/about/directions` | 오시는 길 |
| `/ko/products/safety` | 안전 제품 목록 |
| `/ko/cases` | 적용 사례 |
| `/ko/customer-service/announcement` | 공지사항 |
| `/ko/login` | 로그인 페이지 |
| `/en` | 영문 메인 페이지 |
| `/en/about/company` | 영문 회사 소개 |

---

## 배포 후 수동 확인 체크리스트

배포 완료 후 아래 항목을 반드시 수동으로 확인합니다.

### 기본 동작

- [ ] HTTPS 정상 접속 (http → https 리다이렉트)
- [ ] 메인 페이지 (`/ko`) 정상 표시
- [ ] 영문 페이지 (`/en`) 정상 표시
- [ ] 페이지 새로고침 시 403/404 오류 없음 (SPA 라우팅)

### 페이지별 확인

- [ ] `/ko/about/company` — 회사 소개 정상 표시
- [ ] `/ko/about/directions` — 오시는 길 (지도 포함) 정상 표시
- [ ] `/ko/products/safety` — 안전 제품 목록 정상
- [ ] `/ko/cases` — 적용 사례 정상
- [ ] `/ko/customer-service/announcement` — 공지사항 목록 정상
- [ ] `/ko/login` — 로그인 폼 표시
- [ ] `/en/about/company` — 영문 회사 소개 정상

### UI/UX 확인

- [ ] 메뉴 네비게이션 정상 (모든 링크 동작)
- [ ] 이미지 깨짐 없음
- [ ] 모바일 메뉴 (햄버거) 정상 동작
- [ ] 반응형 레이아웃 정상 (PC/태블릿/모바일)

### 인프라 확인

- [ ] CloudFront 캐시 무효화 완료 (변경 내용 반영)
- [ ] 콘솔 에러 없음 (브라우저 DevTools)
- [ ] 에셋 로딩 속도 정상 (네트워크 탭 확인)

---

## 배포 스크립트

| 파일 | 환경 | 설명 |
|------|------|------|
| `deploy-s3.sh` | Linux / macOS | Bash 배포 스크립트 |
| `deploy-s3.ps1` | Windows | PowerShell 배포 스크립트 |

### 환경변수 설정

배포 스크립트 실행 전 아래 환경변수를 설정합니다.

```bash
# Linux / macOS
export CLOUDFRONT_DISTRIBUTION_ID="운영 환경에서 확인"

# Windows PowerShell
$env:CLOUDFRONT_DISTRIBUTION_ID = "운영 환경에서 확인"
```

---

## CloudFront 설정 요약 (참고)

| 설정 | 값 |
|------|------|
| Default Root Object | `index.html` |
| Error 404 → | `/index.html` (200) |
| Viewer Protocol Policy | redirect-to-https |
| Allowed Methods | GET, HEAD |
| Compress | Yes |
| Price Class | PriceClass_200 |

> SPA 라우팅을 위해 404 에러를 index.html로 리다이렉트하는 Custom Error Response가 필수입니다.

---

## 주의사항

1. **main 브랜치 직접 수정 금지** — 항상 별도 브랜치에서 작업 후 PR을 통해 병합
2. **민감값 커밋 금지** — AWS 키, Cognito Pool ID, API Gateway URL 등은 환경변수 또는 별도 관리
3. **빌드 확인 필수** — 코드 변경 후 `npm run build` 성공을 반드시 확인
4. **배포 전 로컬 확인** — `npm run preview`로 빌드 결과를 로컬에서 미리 확인
5. **CloudFront 캐시** — 배포 후 캐시 무효화 필수 (최대 10분 소요)

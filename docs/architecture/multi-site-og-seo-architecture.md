# Multi-Site OG/SEO 통합 관리 아키텍처

## 문서 정보

| 항목 | 내용 |
|------|------|
| 문서명 | Multi-Site OG/SEO 통합 관리 아키텍처 |
| 작성일 | 2025-06-25 |
| 버전 | 1.0 |
| 대상 시스템 | thingswell.co.kr, safegai.com, platform.safegai.com |
| 목적 | siteId 기반 OG/SEO 설정, 이미지 업로드, S3/CloudFront 배포 구조 재설계 |

---

## 1. 현재 문제 진단

### 1.1 현재 구조 분석

| 구성 요소 | 현재 상태 | 문제점 |
|-----------|----------|--------|
| OG 설정 저장 | `localStorage` | 브라우저 로컬에만 존재, 서버/크롤러에 반영 안됨 |
| 이미지 업로드 | `thingswell-uploads-{ACCOUNT_ID}/og-images/` | 업로드 버킷에만 저장, 웹 배포 버킷에 미반영 |
| og:image URL | `https://www.thingswell.co.kr/og-image.jpg` | 웹 배포 버킷의 정적 파일, 관리자 업로드와 분리 |
| CloudFront 무효화 | 미구현 | 이미지 교체 후 캐시 갱신 불가 |
| 사이트 구분 | 없음 (단일 사이트) | safegai.com 확장 시 동일 문제 반복 |
| Publish 메커니즘 | 없음 | 업로드 → 서비스 반영 파이프라인 부재 |

### 1.2 데이터 흐름 문제

```
현재 흐름 (끊어진 구조):

관리자 → OG Settings UI → localStorage 저장 (끝)
                        → S3 업로드 버킷 저장 (끝)

Facebook 크롤러 → www.thingswell.co.kr/og-image.jpg
              → 웹 배포 버킷에서 직접 읽음 (관리자 업로드와 무관)
```


---

## 2. thingswell.co.kr / safegai.com 역할 분리

### 2.1 도메인별 역할

| siteId | 도메인 | 역할 | 배포 방식 |
|--------|--------|------|-----------|
| `thingswell-main` | www.thingswell.co.kr | 싱스웰 기업 홈페이지, 신뢰 확보, 실적, 제품/서비스 소개 | S3 + CloudFront (정적) |
| `safegai-main` | www.safegai.com | 스마트 안전 AI 플랫폼 서비스 사이트, 고객 진입점 | S3 + CloudFront (정적) → 향후 ECS |
| `safegai-platform` | platform.safegai.com | 고객용 스마트 안전 운영 플랫폼, 대시보드 | ECS/EC2 (동적) |

### 2.2 서브도메인 구조

```
thingswell.co.kr 계열:
  www.thingswell.co.kr     → 기업 홈페이지
  admin.thingswell.co.kr   → 내부 관리자 (thingswell 전용, 향후)

safegai.com 계열:
  www.safegai.com          → 서비스 사이트 / 고객 진입점
  platform.safegai.com     → 고객용 운영 플랫폼
  api.safegai.com          → 통합 API 서버
  admin.safegai.com        → 내부 운영자 관리
  assets.safegai.com       → 정적 자산 CDN (OG 이미지, 로고, 제품 이미지)
```

### 2.3 OG/SEO 기본값

| siteId | og:title | og:site_name | og:url |
|--------|----------|--------------|--------|
| `thingswell-main` | 싱스웰 | 싱스웰 | https://www.thingswell.co.kr/ |
| `safegai-main` | SafeGAI - 스마트 안전 AI 플랫폼 | SafeGAI | https://www.safegai.com/ |
| `safegai-platform` | SafeGAI 안전 관제 플랫폼 | SafeGAI Platform | https://platform.safegai.com/ |


---

## 3. 공통 아키텍처

### 3.1 목표 데이터 흐름

```
목표 흐름 (연결된 구조):

관리자 → OG Settings UI
       → 사이트 선택 (siteId)
       → 이미지 업로드 → 업로드 버킷 (임시)
       → "게시" 버튼 클릭
       → POST /api/admin/sites/{siteId}/seo/publish
       → Lambda (publishOgImage 서비스)
           → 이미지 검증 (MIME, 해상도)
           → 업로드 버킷 → 웹 배포 버킷/assets 버킷 복사
           → Content-Type, Cache-Control 설정
           → DynamoDB에 설정 저장
           → CloudFront invalidation 실행
           → 감사 로그 기록
       → 관리자에게 결과 반환

Facebook/카카오 크롤러 → www.thingswell.co.kr/og-image.jpg
                     → CloudFront → 웹 배포 버킷 (최신 이미지)
```

### 3.2 시스템 구성도

```
┌─────────────────────────────────────────────────────────┐
│                    관리자 브라우저                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  OG Settings UI (React)                         │    │
│  │  - 사이트 선택 (thingswell / safegai / platform)│    │
│  │  - 설정 편집 (title, description, image)        │    │
│  │  - 미리보기 (카카오, FB, Twitter, 밴드)          │    │
│  │  - 게시 (Publish) 버튼                          │    │
│  └──────────────────────┬──────────────────────────┘    │
└─────────────────────────┼───────────────────────────────┘
                          │ HTTPS (Cognito Auth)
                          ▼
┌─────────────────────────────────────────────────────────┐
│              API Gateway + Lambda                        │
│  ┌─────────────────────────────────────────────────┐    │
│  │  SEO Management Lambda                          │    │
│  │  - GET  /admin/sites                            │    │
│  │  - GET  /admin/sites/{siteId}/seo               │    │
│  │  - POST /admin/sites/{siteId}/uploads/presigned │    │
│  │  - POST /admin/sites/{siteId}/seo/publish       │    │
│  └──────────────────────┬──────────────────────────┘    │
└─────────────────────────┼───────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  DynamoDB    │ │  S3 Buckets  │ │  CloudFront  │
│  - SiteConfig│ │  - uploads   │ │  - thingswell│
│  - AuditLog  │ │  - web-tw    │ │  - safegai   │
│              │ │  - web-sg    │ │  - assets    │
│              │ │  - assets    │ │              │
│              │ │  - config    │ │              │
└──────────────┘ └──────────────┘ └──────────────┘
```


---

## 4. siteId / tenantId / pageId / locale 구조

### 4.1 계층 구조

```
tenantId (향후 SafegAI 멀티테넌트)
  └── siteId (사이트 단위)
        └── pageId (페이지 단위 OG 설정, 선택적)
              └── locale (언어별 설정)
```

### 4.2 데이터 모델

```json
{
  "tenantId": "thingswell",
  "siteId": "thingswell-main",
  "pageId": "home",
  "locale": "ko",
  "seo": {
    "title": "싱스웰",
    "description": "싱스웰은 AI 기반 산업안전...",
    "ogImage": "https://www.thingswell.co.kr/og-image.jpg",
    "ogImageWidth": 1200,
    "ogImageHeight": 630,
    "ogType": "website",
    "ogSiteName": "싱스웰",
    "ogUrl": "https://www.thingswell.co.kr/",
    "ogLocale": "ko_KR",
    "twitterCard": "summary_large_image",
    "canonical": "https://www.thingswell.co.kr/"
  },
  "site": {
    "domain": "www.thingswell.co.kr",
    "protocol": "https",
    "webBucket": "thingswell-homepage",
    "cloudfrontDistributionId": "EQTMTY6FNARD8",
    "deployType": "s3-static",
    "ogImagePath": "/og-image.jpg"
  },
  "metadata": {
    "createdAt": "2025-06-25T00:00:00Z",
    "updatedAt": "2025-06-25T12:00:00Z",
    "updatedBy": "admin@thingswell.co.kr",
    "version": 3,
    "publishedAt": "2025-06-25T12:05:00Z"
  }
}
```

### 4.3 tenantId 설계 (SafegAI 확장용)

| tenantId | 설명 | 사용 시점 |
|----------|------|-----------|
| `thingswell` | 싱스웰 내부 운영 | 현재 |
| `safegai` | SafeGAI 플랫폼 운영 | Platform 1.0 |
| `{customer-id}` | 고객사별 테넌트 | Platform 3.0 (SaaS) |

### 4.4 pageId 설계

| pageId | 설명 | 예시 URL |
|--------|------|----------|
| `home` | 홈 (기본) | / |
| `about` | 회사 소개 | /about |
| `solutions` | 솔루션 | /solutions |
| `products` | 제품 | /products |
| `cases` | 도입 사례 | /cases |

> Platform 1.0에서는 `home` pageId만 사용하고, 향후 페이지별 OG 커스텀이 필요할 때 확장한다.

### 4.5 locale 설계

| locale | og:locale | 사용 |
|--------|-----------|------|
| `ko` | `ko_KR` | 한국어 (기본) |
| `en` | `en_US` | 영어 |

> SPA 구조에서 `/ko`, `/en` 경로에 따라 SEOHead 컴포넌트가 동적으로 적용하되,
> `index.html` 정적 태그는 기본 locale(ko)을 사용한다.


---

## 5. S3 버킷/경로 설계

### 5.1 버킷 구성

| 버킷명 | 용도 | 공개 여부 | CloudFront 연결 |
|--------|------|-----------|----------------|
| `thingswell-uploads-{ACCOUNT_ID}` | 관리자 업로드 원본 (임시) | 비공개 (Presigned URL로만 접근) | 없음 |
| `thingswell-homepage` | thingswell.co.kr 웹 배포 | CloudFront OAC | www.thingswell.co.kr |
| `safegai-homepage` | safegai.com 웹 배포 | CloudFront OAC | www.safegai.com |
| `safegai-assets` | 공용 정적 자산 (OG 이미지, 로고 등) | CloudFront OAC | assets.safegai.com |
| `safegai-config` | 사이트 설정 JSON, 감사 로그 | 비공개 | 없음 |

### 5.2 업로드 버킷 경로 구조

```
thingswell-uploads-{ACCOUNT_ID}/
├── og-images/
│   ├── thingswell-main/
│   │   └── {timestamp}_{filename}.jpg     # 업로드 원본 (임시)
│   └── safegai-main/
│       └── {timestamp}_{filename}.jpg
├── boards/
│   └── announcement/
│       └── {timestamp}_{filename}.png
├── products/
│   └── {timestamp}_{filename}.jpg
└── track-records/
    └── {timestamp}_{filename}.jpg
```

### 5.3 웹 배포 버킷 경로 구조

```
thingswell-homepage/                        # www.thingswell.co.kr
├── index.html                              # SPA 엔트리 (OG 메타태그 포함)
├── og-image.jpg                            # 대표 OG 이미지 (publish로 배치)
├── og-image.png                            # 대표 OG 이미지 PNG 버전
├── assets/
│   ├── index-{hash}.js
│   └── index-{hash}.css
└── vite.svg

safegai-homepage/                           # www.safegai.com
├── index.html
├── og-image.jpg
├── assets/
└── ...
```

### 5.4 공용 Assets 버킷 경로 구조

```
safegai-assets/                             # assets.safegai.com
├── og/
│   ├── thingswell-main/
│   │   ├── og-image.jpg                    # 현재 활성 OG 이미지
│   │   └── og-image-{version}.jpg          # 버전별 백업
│   ├── safegai-main/
│   │   ├── og-image.jpg
│   │   └── og-image-{version}.jpg
│   └── safegai-platform/
│       └── og-image.jpg
├── logos/
│   ├── thingswell-logo.svg
│   ├── safegai-logo.svg
│   └── safegai-logo-white.svg
├── products/
│   └── {product-id}/
│       └── thumbnail.jpg
└── common/
    └── placeholder.jpg
```

### 5.5 설정/감사 버킷 경로 구조

```
safegai-config/
├── sites/
│   ├── thingswell-main/
│   │   └── seo-config.json                 # 현재 활성 설정
│   ├── safegai-main/
│   │   └── seo-config.json
│   └── safegai-platform/
│       └── seo-config.json
├── audit/
│   ├── 2025/06/25/
│   │   ├── {timestamp}-publish-thingswell-main.json
│   │   └── {timestamp}-publish-safegai-main.json
│   └── ...
└── registry/
    └── sites.json                           # 전체 사이트 목록/메타 정보
```


---

## 6. 설정 저장소 설계

### 6.1 S3 JSON vs DynamoDB 비교

| 기준 | S3 JSON | DynamoDB |
|------|---------|----------|
| **초기 비용** | $0 (프리티어 내) | $0 (프리티어 내) |
| **구현 복잡도** | 낮음 (파일 읽기/쓰기) | 중간 (테이블 설계 필요) |
| **조회 성능** | 단건 조회 빠름 | 단건/목록 모두 빠름 |
| **동시성 제어** | 없음 (덮어쓰기) | 조건부 쓰기 지원 |
| **이력 관리** | 수동 (버전별 파일) | 수동 (별도 이력 항목) |
| **검색/필터** | 불가 | GSI로 가능 |
| **트랜잭션** | 불가 | 지원 |
| **향후 확장** | 한계 있음 | 멀티테넌트에 적합 |
| **백업/복구** | S3 버전관리 활용 | Point-in-time Recovery |
| **Lambda 연동** | S3 SDK | DynamoDB SDK |

### 6.2 권장: 하이브리드 방식

```
1차 구현 (Platform 1.0):
  - 설정 저장: DynamoDB (SiteConfig 테이블)
  - 감사 로그: S3 JSON (safegai-config/audit/)
  - 이유: 동시성 제어, 향후 멀티테넌트 확장, 조건부 업데이트 지원

2차 확장 (Platform 2.0+):
  - DynamoDB에 이력 관리 추가
  - 감사 로그를 DynamoDB Stream → S3 아카이브로 전환
```

### 6.3 DynamoDB 테이블 설계

#### SiteConfig 테이블

| 필드 | 타입 | 키 | 설명 |
|------|------|-----|------|
| `siteId` | String | PK | 사이트 식별자 |
| `configType` | String | SK | `seo#home#ko`, `seo#about#ko`, `site-info` |
| `tenantId` | String | GSI-PK | 테넌트 식별자 |
| `data` | Map | - | 설정 데이터 (JSON) |
| `version` | Number | - | 설정 버전 |
| `status` | String | - | `draft` / `published` |
| `publishedAt` | String | - | 마지막 게시 시각 (ISO 8601) |
| `updatedAt` | String | - | 마지막 수정 시각 |
| `updatedBy` | String | - | 수정자 이메일 |

#### 예시 항목

```json
{
  "siteId": "thingswell-main",
  "configType": "seo#home#ko",
  "tenantId": "thingswell",
  "data": {
    "title": "싱스웰",
    "description": "싱스웰은 AI 기반 산업안전...",
    "ogImage": "https://www.thingswell.co.kr/og-image.jpg",
    "ogImageKey": "og/thingswell-main/og-image.jpg",
    "ogType": "website",
    "ogSiteName": "싱스웰",
    "ogUrl": "https://www.thingswell.co.kr/",
    "ogLocale": "ko_KR",
    "twitterCard": "summary_large_image",
    "canonical": "https://www.thingswell.co.kr/"
  },
  "version": 3,
  "status": "published",
  "publishedAt": "2025-06-25T12:05:00Z",
  "updatedAt": "2025-06-25T12:00:00Z",
  "updatedBy": "admin@thingswell.co.kr"
}
```

#### site-info 항목 (사이트 메타 정보)

```json
{
  "siteId": "thingswell-main",
  "configType": "site-info",
  "tenantId": "thingswell",
  "data": {
    "domain": "www.thingswell.co.kr",
    "protocol": "https",
    "webBucket": "thingswell-homepage",
    "assetsBucket": "safegai-assets",
    "cloudfrontDistributionId": "EQTMTY6FNARD8",
    "deployType": "s3-static",
    "ogImagePath": "/og-image.jpg",
    "locales": ["ko", "en"],
    "defaultLocale": "ko"
  }
}
```


---

## 7. API 설계

### 7.1 엔드포인트 목록

| Method | Path | Auth | 설명 |
|--------|------|------|------|
| GET | `/api/admin/sites` | Cognito (admin) | 관리 가능한 사이트 목록 |
| GET | `/api/admin/sites/{siteId}/seo` | Cognito (admin) | 특정 사이트 SEO 설정 조회 |
| PUT | `/api/admin/sites/{siteId}/seo` | Cognito (admin) | SEO 설정 저장 (draft) |
| POST | `/api/admin/sites/{siteId}/uploads/presigned-url` | Cognito (admin) | OG 이미지 업로드용 Presigned URL |
| POST | `/api/admin/sites/{siteId}/seo/publish` | Cognito (admin) | SEO 설정 + 이미지 게시 |
| GET | `/api/admin/sites/{siteId}/seo/history` | Cognito (admin) | 게시 이력 조회 |

### 7.2 API 상세

#### GET /api/admin/sites

**응답:**
```json
{
  "sites": [
    {
      "siteId": "thingswell-main",
      "domain": "www.thingswell.co.kr",
      "name": "싱스웰 기업 홈페이지",
      "deployType": "s3-static",
      "lastPublished": "2025-06-25T12:05:00Z"
    },
    {
      "siteId": "safegai-main",
      "domain": "www.safegai.com",
      "name": "SafeGAI 서비스 사이트",
      "deployType": "s3-static",
      "lastPublished": null
    },
    {
      "siteId": "safegai-platform",
      "domain": "platform.safegai.com",
      "name": "SafeGAI 운영 플랫폼",
      "deployType": "ecs-dynamic",
      "lastPublished": null
    }
  ]
}
```

#### GET /api/admin/sites/{siteId}/seo

**응답:**
```json
{
  "siteId": "thingswell-main",
  "status": "published",
  "version": 3,
  "seo": {
    "title": "싱스웰",
    "description": "싱스웰은 AI 기반 산업안전...",
    "ogImage": "https://www.thingswell.co.kr/og-image.jpg",
    "ogType": "website",
    "ogSiteName": "싱스웰",
    "ogUrl": "https://www.thingswell.co.kr/",
    "ogLocale": "ko_KR",
    "twitterCard": "summary_large_image"
  },
  "publishedAt": "2025-06-25T12:05:00Z",
  "updatedAt": "2025-06-25T12:00:00Z"
}
```

#### POST /api/admin/sites/{siteId}/uploads/presigned-url

**요청:**
```json
{
  "fileName": "new-og-image.jpg",
  "fileType": "image/jpeg"
}
```

**응답:**
```json
{
  "uploadUrl": "https://thingswell-uploads-xxx.s3.amazonaws.com/og-images/thingswell-main/...(presigned)",
  "sourceKey": "og-images/thingswell-main/1750000000000_new-og-image.jpg",
  "expiresIn": 300
}
```

#### POST /api/admin/sites/{siteId}/seo/publish

**요청:**
```json
{
  "seo": {
    "title": "싱스웰",
    "description": "싱스웰은 AI 기반 산업안전...",
    "ogType": "website",
    "ogSiteName": "싱스웰",
    "ogLocale": "ko_KR",
    "twitterCard": "summary_large_image"
  },
  "sourceImageKey": "og-images/thingswell-main/1750000000000_new-og-image.jpg",
  "publishImage": true
}
```

**응답 (성공):**
```json
{
  "success": true,
  "siteId": "thingswell-main",
  "version": 4,
  "publishedAt": "2025-06-25T14:00:00Z",
  "ogImageUrl": "https://www.thingswell.co.kr/og-image.jpg",
  "invalidation": {
    "id": "I3ABCDEF123456",
    "paths": ["/og-image.jpg", "/index.html", "/", "/ko", "/ko/"],
    "status": "InProgress"
  },
  "message": "게시 완료. CloudFront 캐시 반영에 5~15분 소요됩니다."
}
```

**응답 (실패):**
```json
{
  "success": false,
  "error": "IMAGE_VALIDATION_FAILED",
  "message": "이미지 크기가 800x400px입니다. 최소 1200x630px 이상이어야 합니다.",
  "details": {
    "actualWidth": 800,
    "actualHeight": 400,
    "requiredWidth": 1200,
    "requiredHeight": 630
  }
}
```


---

## 8. publishOgImage 서비스 로직

### 8.1 전체 흐름

```
publishOgImage(siteId, sourceImageKey, seoData)
│
├─ 1. 사이트 정보 조회 (DynamoDB: site-info)
│     → domain, webBucket, cloudfrontDistributionId, ogImagePath
│
├─ 2. 소스 이미지 존재 확인 (S3 HeadObject)
│     → 없으면 SOURCE_NOT_FOUND 에러
│
├─ 3. MIME 타입 검증
│     → ContentType이 image/jpeg 또는 image/png인지 확인
│     → 아니면 INVALID_MIME_TYPE 에러
│
├─ 4. 이미지 해상도 검증 (선택적, sharp 또는 헤더 기반)
│     → 최소 1200x630 확인
│     → 미달 시 경고 반환 (차단하지 않음, 최소 600x315는 차단)
│
├─ 5. 대상 경로로 이미지 복사
│     → S3 CopyObject: uploads 버킷 → 웹 버킷/og-image.jpg
│     → ContentType: image/jpeg
│     → CacheControl: public, max-age=86400
│     → (선택) assets 버킷에도 버전별 백업 복사
│
├─ 6. SEO 설정 저장 (DynamoDB)
│     → version 증가
│     → status: published
│     → publishedAt: now
│     → ogImage: https://{domain}/og-image.jpg
│
├─ 7. CloudFront Invalidation 실행
│     → 사이트별 경로 목록 무효화
│
├─ 8. 감사 로그 기록 (S3 또는 DynamoDB)
│     → 누가, 언제, 어떤 사이트에, 무엇을 변경했는지
│
└─ 9. 결과 반환
```

### 8.2 서비스 코드 구조 (Node.js)

```javascript
// services/publishOgImage.js

/**
 * publishOgImage - OG 이미지와 SEO 설정을 서비스에 게시
 *
 * @param {Object} params
 * @param {string} params.siteId - 대상 사이트 ID
 * @param {string} params.sourceImageKey - 업로드 버킷의 소스 이미지 키
 * @param {Object} params.seoData - SEO 설정 데이터
 * @param {string} params.publishedBy - 게시자 이메일
 * @returns {Object} 게시 결과
 */
async function publishOgImage({ siteId, sourceImageKey, seoData, publishedBy }) {
  // 1. 사이트 정보 조회
  const siteInfo = await getSiteInfo(siteId);
  if (!siteInfo) throw new AppError('SITE_NOT_FOUND', `사이트를 찾을 수 없습니다: ${siteId}`);

  // 2. 소스 이미지 확인
  const sourceHead = await headObject(UPLOAD_BUCKET, sourceImageKey);
  if (!sourceHead) throw new AppError('SOURCE_NOT_FOUND', '업로드된 이미지를 찾을 수 없습니다.');

  // 3. MIME 검증
  const contentType = sourceHead.ContentType;
  if (!['image/jpeg', 'image/png'].includes(contentType)) {
    throw new AppError('INVALID_MIME_TYPE', `허용되지 않는 파일 형식입니다: ${contentType}`);
  }

  // 4. 해상도 검증 (선택적)
  const dimensions = await getImageDimensions(UPLOAD_BUCKET, sourceImageKey);
  if (dimensions.width < 600 || dimensions.height < 315) {
    throw new AppError('IMAGE_TOO_SMALL', '최소 600x315px 이상이어야 합니다.');
  }
  const sizeWarning = (dimensions.width < 1200 || dimensions.height < 630)
    ? `권장 크기(1200x630) 미달: ${dimensions.width}x${dimensions.height}px`
    : null;

  // 5. 이미지 복사
  const targetKey = siteInfo.ogImagePath.replace(/^\//, ''); // "og-image.jpg"
  await copyObject({
    sourceBucket: UPLOAD_BUCKET,
    sourceKey: sourceImageKey,
    targetBucket: siteInfo.webBucket,
    targetKey: targetKey,
    contentType: contentType,
    cacheControl: 'public, max-age=86400',
  });

  // 5b. Assets 버킷에 버전별 백업
  const versionKey = `og/${siteId}/og-image-v${Date.now()}.${contentType === 'image/png' ? 'png' : 'jpg'}`;
  await copyObject({
    sourceBucket: UPLOAD_BUCKET,
    sourceKey: sourceImageKey,
    targetBucket: ASSETS_BUCKET,
    targetKey: versionKey,
    contentType: contentType,
    cacheControl: 'public, max-age=31536000',
  });

  // 6. SEO 설정 저장
  const ogImageUrl = `${siteInfo.protocol}://${siteInfo.domain}${siteInfo.ogImagePath}`;
  const newVersion = await saveSeoConfig({
    siteId,
    seoData: { ...seoData, ogImage: ogImageUrl },
    publishedBy,
  });

  // 7. CloudFront Invalidation
  const invalidation = await createInvalidation(
    siteInfo.cloudfrontDistributionId,
    getInvalidationPaths(siteId)
  );

  // 8. 감사 로그
  await writeAuditLog({
    action: 'PUBLISH_OG',
    siteId,
    publishedBy,
    version: newVersion,
    sourceImageKey,
    targetKey,
    ogImageUrl,
    invalidationId: invalidation.Id,
    timestamp: new Date().toISOString(),
  });

  // 9. 결과 반환
  return {
    success: true,
    siteId,
    version: newVersion,
    publishedAt: new Date().toISOString(),
    ogImageUrl,
    invalidation: {
      id: invalidation.Id,
      paths: getInvalidationPaths(siteId),
      status: 'InProgress',
    },
    warning: sizeWarning,
    message: '게시 완료. CloudFront 캐시 반영에 5~15분 소요됩니다.',
  };
}
```

### 8.3 에러 코드

| 에러 코드 | 설명 | HTTP |
|-----------|------|------|
| `SITE_NOT_FOUND` | 존재하지 않는 siteId | 404 |
| `SOURCE_NOT_FOUND` | 업로드 이미지 없음 | 404 |
| `INVALID_MIME_TYPE` | JPEG/PNG가 아닌 파일 | 400 |
| `IMAGE_TOO_SMALL` | 600x315 미만 | 400 |
| `COPY_FAILED` | S3 복사 실패 | 500 |
| `INVALIDATION_FAILED` | CloudFront 무효화 실패 | 500 |
| `CONFIG_SAVE_FAILED` | DynamoDB 저장 실패 | 500 |
| `UNAUTHORIZED` | 권한 없음 | 403 |


---

## 9. CloudFront Invalidation 로직

### 9.1 사이트별 무효화 경로

| siteId | CloudFront ID | 무효화 경로 |
|--------|---------------|-------------|
| `thingswell-main` | `EQTMTY6FNARD8` | `/og-image.jpg`, `/index.html`, `/`, `/ko`, `/ko/` |
| `safegai-main` | `{SAFEGAI_CF_ID}` | `/og-image.jpg`, `/index.html`, `/` |
| `safegai-platform` | `{PLATFORM_CF_ID}` | `/og-image.jpg` |

### 9.2 무효화 경로 상세 설명

```javascript
function getInvalidationPaths(siteId) {
  const basePaths = ['/og-image.jpg', '/index.html'];

  const sitePaths = {
    'thingswell-main': [...basePaths, '/', '/ko', '/ko/'],
    'safegai-main': [...basePaths, '/'],
    'safegai-platform': ['/og-image.jpg'],
  };

  return sitePaths[siteId] || basePaths;
}
```

### 9.3 무효화 이유

| 경로 | 무효화 이유 |
|------|-------------|
| `/og-image.jpg` | 대표 이미지 파일 캐시 갱신 |
| `/index.html` | 메타태그 포함 HTML (향후 동적 생성 시) |
| `/` | 루트 접속 시 301 리다이렉트 응답 캐시 |
| `/ko` | Facebook 크롤러가 리다이렉트 후 최종 도착 경로 |
| `/ko/` | 트레일링 슬래시 변형 |


---

## 10. IAM 최소권한 설계

### 10.1 SEO Management Lambda Role

```yaml
PolicyName: SeoManagementPolicy
PolicyDocument:
  Version: "2012-10-17"
  Statement:
    # DynamoDB - SiteConfig 테이블 읽기/쓰기
    - Effect: Allow
      Action:
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:Query
      Resource:
        - arn:aws:dynamodb:{REGION}:{ACCOUNT_ID}:table/SiteConfig
        - arn:aws:dynamodb:{REGION}:{ACCOUNT_ID}:table/SiteConfig/index/*

    # S3 - 업로드 버킷 읽기 (HeadObject, GetObject)
    - Effect: Allow
      Action:
        - s3:HeadObject
        - s3:GetObject
      Resource:
        - arn:aws:s3:::thingswell-uploads-{ACCOUNT_ID}/og-images/*

    # S3 - 웹 버킷 쓰기 (og-image.jpg만)
    - Effect: Allow
      Action:
        - s3:PutObject
        - s3:PutObjectAcl
      Resource:
        - arn:aws:s3:::thingswell-homepage/og-image.*
        - arn:aws:s3:::safegai-homepage/og-image.*

    # S3 - Assets 버킷 쓰기
    - Effect: Allow
      Action:
        - s3:PutObject
      Resource:
        - arn:aws:s3:::safegai-assets/og/*

    # S3 - Config 버킷 (감사 로그 쓰기)
    - Effect: Allow
      Action:
        - s3:PutObject
      Resource:
        - arn:aws:s3:::safegai-config/audit/*

    # CloudFront - Invalidation 생성만
    - Effect: Allow
      Action:
        - cloudfront:CreateInvalidation
      Resource:
        - arn:aws:cloudfront::{ACCOUNT_ID}:distribution/EQTMTY6FNARD8
        - arn:aws:cloudfront::{ACCOUNT_ID}:distribution/{SAFEGAI_CF_ID}

    # CloudWatch Logs
    - Effect: Allow
      Action:
        - logs:CreateLogGroup
        - logs:CreateLogStream
        - logs:PutLogEvents
      Resource: "*"
```

### 10.2 Presigned URL Lambda Role (기존 Upload Lambda에 추가)

```yaml
# 추가 권한 없음 - 기존 Upload Lambda의 s3:PutObject로 충분
# 단, Resource를 og-images/{siteId}/ 경로로 제한하여 사이트별 격리
- Effect: Allow
  Action:
    - s3:PutObject
  Resource:
    - arn:aws:s3:::thingswell-uploads-{ACCOUNT_ID}/og-images/*
```

### 10.3 권한 분리 원칙

| 역할 | 접근 가능 범위 | 제한 |
|------|---------------|------|
| Upload Lambda | 업로드 버킷 쓰기만 | 웹 버킷 접근 불가 |
| SEO Publish Lambda | 업로드 버킷 읽기 + 웹 버킷 쓰기 + CF 무효화 | og-image 경로만 |
| 관리자 (Cognito) | API Gateway를 통한 간접 접근만 | S3 직접 접근 불가 |


---

## 11. EC2/ECS 확장 구조

### 11.1 서비스 계층 분리 원칙

```
현재 (Lambda):
  API Gateway → Lambda Handler → 서비스 함수 (publishOgImage)
                                      ↓
                              AWS SDK (S3, DynamoDB, CloudFront)

향후 (ECS/EC2):
  ALB/API Gateway → Express/Fastify Handler → 서비스 함수 (동일 코드)
                                                   ↓
                                           AWS SDK (동일)
```

### 11.2 코드 구조 (재사용 가능한 서비스 레이어)

```
shared/
├── services/
│   ├── SeoPublishService.js        # publishOgImage 핵심 로직
│   ├── SiteConfigService.js        # DynamoDB CRUD
│   ├── ImageValidationService.js   # MIME, 해상도 검증
│   ├── StorageService.js           # S3 추상화 (copy, head, put)
│   ├── CdnService.js              # CloudFront 무효화 추상화
│   └── AuditService.js            # 감사 로그
├── models/
│   ├── SiteConfig.js              # 사이트 설정 모델
│   ├── SeoData.js                 # SEO 데이터 모델
│   └── AuditLog.js                # 감사 로그 모델
├── errors/
│   └── AppError.js                # 공통 에러 클래스
└── config/
    └── sites.js                   # 사이트 레지스트리 (환경변수 기반)

lambda/
├── seo-management.js              # Lambda handler (얇은 진입점)
└── package.json

api-server/                        # 향후 ECS/EC2 API 서버
├── routes/admin/sites.js          # Express 라우터 (얇은 진입점)
├── middleware/auth.js             # Cognito 검증
├── server.js
└── package.json
```

### 11.3 서비스 인터페이스 (추상화)

```javascript
// shared/services/StorageService.js

class StorageService {
  constructor(s3Client) {
    this.s3 = s3Client;
  }

  async headObject(bucket, key) { /* ... */ }
  async copyObject({ sourceBucket, sourceKey, targetBucket, targetKey, contentType, cacheControl }) { /* ... */ }
  async putJson(bucket, key, data) { /* ... */ }
  async getJson(bucket, key) { /* ... */ }
}

// Lambda에서 사용:
const storageService = new StorageService(new S3Client({ region: 'ap-northeast-2' }));

// ECS에서 사용 (동일):
const storageService = new StorageService(new S3Client({ region: process.env.AWS_REGION }));
```

### 11.4 SafegAI 플랫폼 API 서버에서의 재사용

```javascript
// api.safegai.com (ECS) - Express 라우터
const { SeoPublishService } = require('@safegai/shared/services');

router.post('/admin/sites/:siteId/seo/publish', authMiddleware, async (req, res) => {
  const { siteId } = req.params;
  const { seo, sourceImageKey, publishImage } = req.body;
  const publishedBy = req.user.email;

  const result = await SeoPublishService.publish({
    siteId, sourceImageKey, seoData: seo, publishedBy
  });

  res.json(result);
});
```


---

## 12. SafegAI 스마트 안전 AI 플랫폼 확장 고려사항

### 12.1 플랫폼 기능 영역과 OG/SEO 연결

| 기능 영역 | 관련 페이지 | OG 설정 필요성 |
|-----------|-------------|---------------|
| 고객사 관리 | platform.safegai.com/customers | 플랫폼 내부 (OG 불필요) |
| 사업장/현장 관리 | platform.safegai.com/sites | 플랫폼 내부 |
| AIBox 등록 및 상태 | platform.safegai.com/devices/aibox | 플랫폼 내부 |
| AI CCTV 연동 | platform.safegai.com/devices/cameras | 플랫폼 내부 |
| 센서/IoT 이벤트 수집 | platform.safegai.com/events | 플랫폼 내부 |
| 위험구역 진입 | 이벤트 유형 | 알림 시 공유 링크에 OG 필요 |
| 라인크로스 | 이벤트 유형 | 알림 시 공유 링크에 OG 필요 |
| 쓰러짐/낙상 | 이벤트 유형 | 알림 시 공유 링크에 OG 필요 |
| 배회/체류 | 이벤트 유형 | 알림 시 공유 링크에 OG 필요 |
| 미조치 위험상태 | 이벤트 유형 | 알림 시 공유 링크에 OG 필요 |
| 알림/보고서 | platform.safegai.com/reports | 공유 시 OG 필요 |
| 고객사별 대시보드 | platform.safegai.com/dashboard | 공유 시 OG 필요 |

### 12.2 이벤트 알림 공유 링크의 OG 구조

향후 위험 이벤트 알림을 카카오톡/SMS로 공유할 때:

```
URL: https://platform.safegai.com/events/{eventId}

OG 태그:
  og:title: "[긴급] 낙상 감지 - A동 2층 작업장"
  og:description: "2025-06-25 14:30 작업자 김OO 낙상 감지. 즉시 확인 필요."
  og:image: https://assets.safegai.com/og/event-alert.jpg
  og:type: article
```

이 경우 서버 사이드 렌더링(SSR) 또는 Edge Function으로 동적 OG 태그 생성 필요:

```
platform.safegai.com (ECS)
  → 크롤러 감지 (User-Agent)
  → 이벤트 데이터 조회
  → 동적 OG 메타태그 포함 HTML 반환
```

### 12.3 tenantId 기반 멀티테넌트 OG

Platform 3.0 (SaaS)에서 고객사별 대시보드 공유 시:

```json
{
  "tenantId": "customer-abc",
  "siteId": "safegai-platform",
  "pageId": "dashboard",
  "seo": {
    "title": "ABC 건설 - 안전 관제 대시보드",
    "ogImage": "https://assets.safegai.com/tenants/customer-abc/og-dashboard.jpg"
  }
}
```

### 12.4 아키텍처 확장 경로

```
Phase 1 (현재 → Platform 1.0):
  - thingswell-main, safegai-main 정적 OG 관리
  - Lambda + DynamoDB + S3
  - 관리자가 수동 Publish

Phase 2 (Platform 2.0):
  - safegai-platform 동적 OG 생성 (ECS SSR)
  - 이벤트 알림 공유 링크 OG
  - 자동 OG 이미지 생성 (텍스트 → 이미지 API)

Phase 3 (Platform 3.0 SaaS):
  - tenantId별 OG 커스텀
  - 고객사 브랜드 로고 OG 이미지 자동 합성
  - 대시보드/보고서 공유 링크 동적 OG
  - Multi-region CDN 분산
```


---

## 13. 환경변수

### 13.1 Lambda 환경변수

| 변수명 | 설명 | 예시값 |
|--------|------|--------|
| `UPLOAD_BUCKET` | 관리자 업로드 임시 버킷 | `thingswell-uploads-050649355977` |
| `CONFIG_BUCKET` | 설정/감사 로그 버킷 | `safegai-config` |
| `THINGSWELL_WEB_BUCKET` | thingswell 웹 배포 버킷 | `thingswell-homepage` |
| `SAFEGAI_WEB_BUCKET` | safegai 웹 배포 버킷 | `safegai-homepage` |
| `ASSETS_BUCKET` | 공용 정적 자산 버킷 | `safegai-assets` |
| `THINGSWELL_CF_DISTRIBUTION_ID` | thingswell CloudFront ID | `EQTMTY6FNARD8` |
| `SAFEGAI_CF_DISTRIBUTION_ID` | safegai CloudFront ID | (생성 후 입력) |
| `SITE_CONFIG_TABLE` | DynamoDB 설정 테이블명 | `SiteConfig` |
| `AWS_REGION` | AWS 리전 | `ap-northeast-2` |

### 13.2 프론트엔드 환경변수 (.env)

| 변수명 | 설명 | 예시값 |
|--------|------|--------|
| `VITE_API_BASE_URL` | API Gateway 엔드포인트 | `https://xxx.execute-api.ap-northeast-2.amazonaws.com/v1` |
| `VITE_ADMIN_EMAILS` | 관리자 이메일 목록 | `admin@thingswell.co.kr` |
| `VITE_PUBLIC_BASE_URL` | 사이트 공개 URL | `https://www.thingswell.co.kr` |

---

## 14. 수정 대상 파일 목록

### 14.1 프론트엔드 (grape/)

| 파일 | 변경 내용 |
|------|-----------|
| `src/pages/Admin/OGSettings.jsx` | siteId 선택 UI 추가, localStorage → API 호출로 전환, Publish 버튼 추가 |
| `src/pages/Admin/OGSettings.css` | 사이트 선택 탭 스타일 추가 |
| `src/components/SEOHead/index.jsx` | 이미 수정 완료 (BASE_URL = thingswell.co.kr) |
| `index.html` | 이미 수정 완료 (정적 OG 태그) |

### 14.2 백엔드 (grape/aws/)

| 파일 | 변경 내용 |
|------|-----------|
| `lambda/seo-management.js` | **신규** - SEO 관리 Lambda (CRUD + publish) |
| `lambda/upload.js` | siteId 기반 경로 분리 추가 |
| `cloudformation.yaml` | SiteConfig 테이블, SEO Lambda, API Gateway 리소스 추가 |
| `README.md` | API 문서 업데이트 |

### 14.3 공유 서비스 레이어

| 파일 | 변경 내용 |
|------|-----------|
| `shared/services/SeoPublishService.js` | **신규** - publishOgImage 핵심 로직 |
| `shared/services/SiteConfigService.js` | **신규** - DynamoDB CRUD |
| `shared/services/StorageService.js` | **신규** - S3 추상화 |
| `shared/services/CdnService.js` | **신규** - CloudFront 무효화 |
| `shared/services/AuditService.js` | **신규** - 감사 로그 |
| `shared/config/sites.js` | **신규** - 사이트 레지스트리 |
| `shared/errors/AppError.js` | **신규** - 공통 에러 |

---

## 15. 구현 우선순위

### Phase 1: 즉시 반영 (1~2일)

1. ✅ index.html OG 메타태그 수정 (완료)
2. ✅ SEOHead 컴포넌트 BASE_URL 수정 (완료)
3. ✅ OGSettings 기본값 도메인 수정 (완료)
4. S3 배포 + CloudFront 무효화 + Facebook Scrape Again

### Phase 2: 서버 저장소 구축 (1주)

1. DynamoDB SiteConfig 테이블 생성
2. seo-management Lambda 개발
3. API Gateway 엔드포인트 추가
4. OGSettings.jsx를 API 호출 방식으로 리팩토링

### Phase 3: Publish 파이프라인 (1주)

1. publishOgImage 서비스 구현
2. 이미지 검증 로직 구현
3. S3 Cross-bucket 복사 구현
4. CloudFront Invalidation 자동화
5. 감사 로그 구현

### Phase 4: 멀티사이트 지원 (1~2주)

1. safegai.com 버킷/CloudFront 생성
2. assets.safegai.com 구성
3. OGSettings UI에 사이트 선택 기능 추가
4. safegai-main, safegai-platform 설정 등록

### Phase 5: SafegAI 플랫폼 확장 (Platform 2.0+)

1. ECS/EC2 API 서버에 서비스 레이어 이식
2. 동적 OG 생성 (이벤트 알림 공유 링크)
3. tenantId 기반 멀티테넌트 OG


---

## 16. 배포 절차

### 16.1 thingswell.co.kr 배포

```bash
# 1. 프로젝트 빌드
cd grape && npm run build

# 2. S3 동기화 (정적 자산은 장기 캐시)
aws s3 sync dist/ s3://thingswell-homepage/ \
  --region ap-northeast-2 \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html" \
  --exclude "og-image.*"

# 3. index.html (캐시 없음)
aws s3 cp dist/index.html s3://thingswell-homepage/index.html \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html"

# 4. og-image.jpg (1일 캐시)
aws s3 cp dist/og-image.jpg s3://thingswell-homepage/og-image.jpg \
  --cache-control "public, max-age=86400" \
  --content-type "image/jpeg"

# 5. CloudFront 캐시 무효화
aws cloudfront create-invalidation \
  --distribution-id EQTMTY6FNARD8 \
  --paths "/index.html" "/og-image.jpg" "/" "/ko" "/ko/"
```

### 16.2 safegai.com 배포 (향후)

```bash
# 동일 패턴, 버킷명과 CloudFront ID만 변경
aws s3 sync dist/ s3://safegai-homepage/ ...
aws cloudfront create-invalidation \
  --distribution-id {SAFEGAI_CF_ID} \
  --paths "/index.html" "/og-image.jpg" "/"
```

### 16.3 Lambda 배포

```bash
# 1. Lambda 코드 패키징
cd grape/aws/lambda && zip -r thingswell-lambda.zip .

# 2. S3에 업로드
aws s3 cp thingswell-lambda.zip s3://{LAMBDA_CODE_BUCKET}/lambda/thingswell-lambda.zip

# 3. Lambda 함수 업데이트
aws lambda update-function-code \
  --function-name thingswell-seo-management \
  --s3-bucket {LAMBDA_CODE_BUCKET} \
  --s3-key lambda/thingswell-lambda.zip
```

---

## 17. 테스트 절차

### 17.1 단위 테스트

| 테스트 | 검증 내용 |
|--------|-----------|
| MIME 검증 | image/jpeg, image/png 허용, 그 외 차단 |
| 해상도 검증 | 600x315 미만 차단, 1200x630 미만 경고 |
| siteId 검증 | 등록된 siteId만 허용 |
| 경로 생성 | siteId별 올바른 S3 경로 생성 확인 |
| DynamoDB 저장 | version 증가, status 변경 확인 |

### 17.2 통합 테스트

| 테스트 | 검증 내용 |
|--------|-----------|
| Presigned URL 업로드 | 파일 업로드 후 S3에 존재 확인 |
| Publish 전체 흐름 | 업로드 → Publish → 웹 버킷 확인 → 설정 저장 확인 |
| CloudFront 무효화 | Invalidation ID 반환 확인 |
| 에러 케이스 | 존재하지 않는 이미지, 잘못된 MIME, 없는 siteId |

### 17.3 E2E 검증 (배포 후)

```bash
# 1. 이미지 직접 접근 확인
curl -I https://www.thingswell.co.kr/og-image.jpg
# → 200 OK, Content-Type: image/jpeg

# 2. OG 메타태그 확인 (HTML에서)
curl -s https://www.thingswell.co.kr/ | grep "og:image"
# → <meta property="og:image" content="https://www.thingswell.co.kr/og-image.jpg" />

# 3. Facebook Sharing Debugger
# → https://developers.facebook.com/tools/debug/
# → URL 입력 → Scrape Again

# 4. 카카오 OG 캐시 초기화
# → https://developers.kakao.com/tool/debugger/sharing
# → URL 입력 → 캐시 초기화
```

---

## 18. Facebook Sharing Debugger 검증 절차

### 18.1 thingswell.co.kr

1. 배포 완료 + CloudFront 무효화 완료 확인 (5~15분 대기)
2. 브라우저에서 `https://www.thingswell.co.kr/og-image.jpg` 직접 접근 → 새 이미지 확인
3. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 접속
4. URL 입력: `https://www.thingswell.co.kr/`
5. "Scrape Again" 클릭
6. 확인: og:title = "싱스웰", og:image = 새 이미지 미리보기
7. 추가 검증: `https://www.thingswell.co.kr/ko` 도 동일하게 확인

### 18.2 safegai.com (향후)

1. 배포 완료 후 `https://www.safegai.com/og-image.jpg` 확인
2. Facebook Debugger에서 `https://www.safegai.com/` Scrape Again
3. 확인: og:title = "SafeGAI - 스마트 안전 AI 플랫폼"

### 18.3 카카오톡 검증

1. [카카오 개발자 공유 디버거](https://developers.kakao.com/tool/debugger/sharing) 접속
2. URL 입력 → "캐시 초기화" 클릭
3. 실제 카카오톡에서 URL 공유하여 미리보기 확인

### 18.4 캐시 갱신 실패 시 대응

- Facebook: "Scrape Again" 2~3회 반복, 10분 후 재시도 (CDN 전파 최대 24시간)
- 카카오: 캐시 초기화 후 즉시 반영
- 네이버 밴드: 별도 디버거 없음, 24시간 내 자동 갱신
- Twitter: [Card Validator](https://cards-dev.twitter.com/validator) 사용

---

## 19. 롤백 절차

### 19.1 이미지 롤백

```bash
# 1. Assets 버킷에서 이전 버전 확인
aws s3 ls s3://safegai-assets/og/thingswell-main/ --recursive

# 2. 이전 버전을 웹 버킷으로 복사
aws s3 cp s3://safegai-assets/og/thingswell-main/og-image-v{이전timestamp}.jpg \
  s3://thingswell-homepage/og-image.jpg \
  --cache-control "public, max-age=86400" \
  --content-type "image/jpeg"

# 3. CloudFront 무효화
aws cloudfront create-invalidation \
  --distribution-id EQTMTY6FNARD8 \
  --paths "/og-image.jpg"

# 4. DynamoDB 설정 롤백 (이전 버전으로 복원)
# → 관리자 UI에서 이전 설정 재게시 또는 수동 DynamoDB 업데이트
```

### 19.2 설정 롤백

```bash
# DynamoDB에서 이전 버전 조회 (version 필드 기반)
# → 이전 설정값으로 PutItem 수행

# 또는 S3 config 버킷에서 이전 설정 복원
aws s3 cp s3://safegai-config/sites/thingswell-main/seo-config-backup.json \
  s3://safegai-config/sites/thingswell-main/seo-config.json
```

### 19.3 전체 배포 롤백

```bash
# S3 버전관리 활성화된 경우
aws s3api list-object-versions \
  --bucket thingswell-homepage \
  --prefix og-image.jpg

# 특정 버전으로 복원
aws s3api get-object \
  --bucket thingswell-homepage \
  --key og-image.jpg \
  --version-id {이전-version-id} \
  ./og-image-rollback.jpg

aws s3 cp ./og-image-rollback.jpg s3://thingswell-homepage/og-image.jpg
```

### 19.4 롤백 판단 기준

| 상황 | 조치 |
|------|------|
| 이미지 깨짐/부적절 | 즉시 이전 이미지로 롤백 |
| OG 설정 오류 (제목/설명) | DynamoDB 설정 롤백 + 무효화 |
| Lambda 오류 | 이전 Lambda 버전으로 $LATEST 재배포 |
| 전체 사이트 장애 | S3 이전 빌드 전체 복원 + 무효화 |

---

## 20. 요약

### 핵심 변경점

| 현재 | 목표 |
|------|------|
| localStorage 저장 | DynamoDB 서버 저장 |
| 단일 사이트 | siteId 기반 멀티사이트 |
| 업로드만 (미반영) | Upload → Publish → 서비스 반영 |
| 캐시 무효화 없음 | 자동 CloudFront Invalidation |
| 감사 없음 | 감사 로그 기록 |
| Lambda 전용 | 서비스 레이어 분리 (ECS 확장 가능) |

### 아키텍처 핵심 원칙

1. **관리자 저장 ≠ 서비스 반영**: Publish 단계를 반드시 거쳐야 크롤러에 반영됨
2. **siteId 기반 격리**: 사이트별 독립적인 설정, 이미지, CloudFront 관리
3. **서비스 레이어 분리**: Lambda와 ECS에서 동일한 비즈니스 로직 재사용
4. **최소 권한**: Lambda별 필요한 S3/DynamoDB/CloudFront 리소스만 접근
5. **버전 관리**: 설정 version 증가 + Assets 버킷 이력 보관 → 롤백 가능
6. **감사 추적**: 누가, 언제, 무엇을 변경했는지 기록

---

*End of Document*

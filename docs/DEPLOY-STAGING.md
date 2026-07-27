# STAGING 배포 절차 (CloudShell 수동 실행)

> CLAUDE.md 규칙: AWS 인프라 변경(S3/CloudFront)은 AI가 직접 실행하지 않는다.
> 이 문서의 명령을 **사용자가 AWS CloudShell에서 직접 실행**한다.
>
> 대상 커밋: `feat/safegai-platform-v2` @ `446c59f` (PR #14~#17 병합본 — v2 홈·회사소개·혁신 히스토리 포함)

## 0. 배포 대상 정보

| 항목 | 값 |
|---|---|
| 브랜치 | `feat/safegai-platform-v2` |
| S3 버킷 | `thingswell-homepage-staging` |
| CloudFront Distribution | `E39F1U1NGGUK2D` |
| 리전 | `ap-northeast-2` |
| 도메인 | `staging.thingswell.co.kr` |

⚠️ **주의**: 저장소 내 스크립트별 CloudFront ID가 상이함 (staging `E39F1U1NGGUK2D` / prod `EEWV39QWFGBHW` / root-to-ko 함수 주석 `EQTMTY6FNARD8`).
invalidation 전에 CloudFront 콘솔에서 `E39F1U1NGGUK2D`가 실제로 `staging.thingswell.co.kr`를 서빙하는지 1회 확인 권장.

## 1. 사전조건

- AWS CloudShell (리전 `ap-northeast-2`) — AWS CLI·자격증명 기본 포함
- Node.js 20 확인: `node -v` (CloudShell 기본이 다르면 `nvm install 20 && nvm use 20`)
- GitHub 저장소 접근 권한 (private 아니므로 clone 가능)

## 2. 코드 준비

```bash
git clone https://github.com/thingswell-hjlee/thingswell-homepage-model001.git
cd thingswell-homepage-model001
git checkout feat/safegai-platform-v2
git log --oneline -1   # 446c59f 인지 확인
cd grape
npm ci
```

`.env.staging`은 저장소에 포함되어 있어 별도 준비 불필요 (`VITE_SITE_URL`, `VITE_CONTACT_API_URL`).

## 3. 빌드 체인 (순서 고정 — 역순 금지)

```bash
npm run validate:content   # 1) 콘텐츠 검증 — 실패 시 여기서 중단하고 보고
npm run seo                # 2) robots.txt + sitemap.xml → public/
# 3) 빌드는 아래 배포 스크립트가 build:staging 으로 수행
```

`validate:content`가 오류(exit 1)를 내면 **배포를 진행하지 않는다** (특허 표기·센서·수치 위반).

## 4. 배포 실행

```bash
bash deploy-staging.sh
```

스크립트가 순서대로 수행: `npm run build:staging` → `dist/index.html`에 `staging.thingswell.co.kr` 존재 검증 → S3 sync(정적 자산 장기 캐시, `index.html`·json은 no-cache) → CloudFront invalidation `/*`.

<details>
<summary>스크립트 실패 시 수동 명령 (동일 동작)</summary>

```bash
npm run build:staging

# 정적 자산 (장기 캐시)
aws s3 sync dist/ s3://thingswell-homepage-staging/ \
  --region ap-northeast-2 --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html" --exclude "*.json" --exclude "robots.txt" --exclude "sitemap.xml"

# index.html·SEO 파일 (no-cache)
aws s3 cp dist/index.html s3://thingswell-homepage-staging/index.html \
  --region ap-northeast-2 --cache-control "no-cache,no-store,must-revalidate"
aws s3 cp dist/robots.txt  s3://thingswell-homepage-staging/robots.txt  --region ap-northeast-2 --cache-control "no-cache"
aws s3 cp dist/sitemap.xml s3://thingswell-homepage-staging/sitemap.xml --region ap-northeast-2 --cache-control "no-cache"

aws cloudfront create-invalidation --distribution-id E39F1U1NGGUK2D --paths "/*"
```
</details>

## 5. 검증 체크리스트 (배포 후)

기준 경로는 `/ko` (루트 `/`는 301 리다이렉트).

- [ ] `https://staging.thingswell.co.kr/ko` → **v2 홈** 표시 (hero "현장의 위험을 먼저 인지하는 멀티모달 안전 AI", 미리보기 배너 **없어야** 함)
- [ ] `/ko/about` → **v2 회사소개** (미션·비전 카드, **혁신 히스토리 3시대**, 실적 수치 5·2·7)
- [ ] `/ko/home-v2` → v2 홈 + 상단 미리보기 배너 **있음**
- [ ] 진단 위젯: 축 선택 → 조건 → 결과(제품·R&D) 동작
- [ ] **rejected 특허(수면무호흡, 10-2023-0152948) 어디에도 미노출** / 출원 중 특허에 "출원 중" 배지
- [ ] 기존 라우트 스팟체크: `/ko/safegai-platform`(문의 폼), `/ko/about/licenses`, `/ko/products/safety`, `/en/about`
- [ ] OG/메타: `/ko` 기준으로 title·og:image 확인 (카카오 공유 시 캐시 수동 초기화 필요)

## 6. 롤백

| 상황 | 방법 |
|---|---|
| v2 화면 문제 | `grape/src/App.jsx`의 `HOME_V2_ENABLED` / `ABOUT_V2_ENABLED`를 `false`로 → 커밋·재배포 (기존 화면 복귀) |
| 배포 전체 문제 | 이전 커밋 checkout 후 3~4단계 재실행 |

## 7. 프로덕션 반영 (staging 검증 후 — 별도 승인 필요)

staging 체크리스트 전부 통과 후에만. 동일 절차에서 스크립트만 교체:

```bash
bash deploy-production.sh   # 버킷 thingswell-homepage, CloudFront EEWV39QWFGBHW, 도메인 www.thingswell.co.kr 검증
```

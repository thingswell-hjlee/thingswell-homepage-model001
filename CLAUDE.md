# 싱스웰 홈페이지 작업 규칙 (v3)

이 파일은 모든 세션에서 자동으로 읽힌다. 여기 적힌 규칙은 대화 중 지시보다 우선한다.
상세 기획은 `docs/PLAN.md`, 게재 가능한 사실은 `docs/DATA-SOURCE.md` 를 참조한다.

---

## 0. 최우선 원칙

- 기존 화면 코드는 **수정하지 않는다**. 새 화면은 v2 레이어에 새로 만들고 라우트만 교체한다.
- 기존 파일 삭제는 전환 완료 후 별도 PR로만 처리한다.
- 언제든 라우트 한 줄 되돌리기로 롤백 가능한 상태를 유지한다.

## 1. 절대 규칙 (위반 시 즉시 중단하고 질문)

- `origin/main` 직접 push 금지. 모든 작업은 feature 브랜치 → PR
- push 전 변경 파일 목록 + diff 요약을 제시하고 **"push 승인"** 을 받는다
- 특허 / 인증 / 기술사양 / 실적 수치는 `docs/DATA-SOURCE.md` 에 있는 값만 사용한다.
  없으면 생성하지 말고 `TODO(확인필요):` 주석을 남기고 질문한다
- 사업실적서 · 제안서 · 견적서 등 기밀 문서는 이 public 저장소에 커밋 금지
- AWS 인프라 변경(CloudFront / Route53 / S3 정책)은 직접 실행하지 않는다.
  실행할 CLI 명령을 문서로 출력만 하고 사용자가 CloudShell에서 수동 실행한다
- 기존 파일 삭제 · 이동 · 대량 리팩터링은 사전 승인 없이 하지 않는다

## 2. 특허 표기 규칙 (허위표시 방지)

- `legalStatus` 가 `registered` 인 특허만 "등록특허"로 표기한다
- `pending` 특허는 반드시 **"출원 중"** 을 병기한다
- `rejected` 특허는 어떤 형태로도 화면에 노출하지 않는다 (로더 단계에서 필터)
- 특허 권리범위 해석이나 침해 판단을 코드나 카피에 넣지 않는다

## 3. 보호 대상 (읽기 전용으로 간주)

변경이 필요하면 먼저 이유를 설명하고 승인받는다.

- `grape/src/locales/ko.json`, `en.json` — 기존 키 수정 · 삭제 금지, **추가만 허용**
- 문의 폼 API 연동 코드 및 요청 스키마
- `/admin/inquiries` 관리자 영역 전체
- 기존 27개 라우트의 URL 경로 (SEO 인덱스 보호)
- `generate-seo-files.mjs` 의 기존 라우트 목록

## 4. v2 레이어 구조

```
grape/src/
├── content/          슬롯 JSON + 스키마 + 로더        [신규]
├── components/v2/    신규 컴포넌트                     [신규]
├── pagesV2/          신규 페이지                       [신규]
├── styles/v2/        v2 전용 스타일                    [신규]
├── pages/            기존 — 수정 금지
└── components/       기존 — 수정 금지
```

- `components/v2` 는 기존 `components/` 를 import 하지 않는다
- CSS Module 또는 `tw2-` 접두사 스코프 클래스만 사용
- **전역 선택자 추가 · 수정 금지.** 기존 화면 영향이 0이어야 한다

## 5. 스택 (변경 금지)

- React 18 + Vite SPA, JavaScript. TypeScript 전환 금지
- i18n 신규 문구는 ko/en 동시 추가. v2 키는 `v2.` 네임스페이스로 분리
- 문의 백엔드: API Gateway HTTP API + Lambda(Node 20)
  - Lambda Function URL은 조직 SCP로 차단됨. **사용 금지**
- `VITE_CONTACT_API_URL` 과 `VITE_API_BASE_URL` 은 별개. 혼용 금지
- 신규 npm 의존성 추가 시 사전 승인 필요

## 6. 빌드 / 배포

- 빌드 순서: `npm run validate:content` → `npm run seo` → `npm run build`
- `generate-seo-files.mjs` 는 `grape/public/` 에 기록 → Vite가 `dist/` 로 복사
- staging 검증 후에만 프로덕션 반영
- 루트 `/` 는 `/ko` 로 301 리다이렉트됨. 메타 / OG 검증 기준 경로는 `/ko`

## 7. 작업 방식

- 작업 시작 전 계획을 먼저 제시하고 승인받는다
- **한 번에 한 세션만** 진행한다. 다음 세션으로 자동 진행 금지
- 세션 지시문은 `docs/prompts/` 에 있다. 지정된 파일만 실행한다
- 모든 응답 · 커밋 메시지 · 문서는 한국어

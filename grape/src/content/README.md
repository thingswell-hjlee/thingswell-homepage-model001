# 콘텐츠 레이어 (`src/content/`)

v2 개편의 트랙 A 산출물. 주간 콘텐츠(특허·인증·R&D·제품·실적)를 화면 코드에서 분리해
빌드 타임 정적 데이터로 관리한다. **런타임 콘텐츠 API·CMS는 만들지 않는다** (개발 방안 결정 ②).

## 구조

```
content/
├── schema/
│   ├── slot.schema.json        슬롯 공통 계약 (JSON Schema, 문서용)
│   └── sensor-whitelist.json   허용 센서 목록 (근거 없는 센서 주장 차단)
├── slots/
│   ├── patents.json            특허 (로드맵 8건 — 현재 자산 근거 4건만 골격)
│   ├── rnd.json                R&D (로드맵 7건 — 현재 라우트 근거 6건만 골격)
│   ├── certificates.json       인증서 (기존 21건 — 대응 자명한 1건만 샘플)
│   ├── products.json           제품 3축 (구조 예시 1건)
│   └── cases.json              실적 (원문 대조 전 — 빈 배열)
├── index.js                    로더 (getSlot / getReadyItems / pick)
└── README.md                   이 문서
```

## 사용 규칙

1. **기존 `pages/`·`components/`는 이 레이어를 import하지 않는다.** 트랙 B의
   `components/v2/`·`pagesV2/`만 소비자이며, 화면은 반드시 `getPublishableItems()`로만
   슬롯을 읽는다 (rejected 특허·비고객용 항목 자동 필터).
2. **모든 슬롯은 `draft`로 시작**한다. `ready` 승격 조건:
   - 항목마다 `_evidence`(근거 원문/자산 경로) 존재
   - `_todo` 배열 비어 있음 (`TODO(확인필요)` 전부 해소)
   - `npm run validate:content` 오류 0건
3. **특허/인증/기술사양/실적 수치는 `docs/DATA-SOURCE.md`(검증된 사실 원장)에 있는 값만
   사용한다.** 원장에 없으면 값은 `null`로 두고 `_todo`에 남긴 뒤 질문한다. 파일명·기존
   마케팅 문구로 추정하지 않는다. `_evidence`는 원장의 섹션 참조(예: `docs/DATA-SOURCE.md §1 #2`).
4. **ko/en 파리티**: bilingual 필드(`{ko, en}`)는 `ready` 승격 시 둘 다 non-null.
5. `updatedAt`(YYYY-MM-DD)은 슬롯 내용 변경 시 갱신 — sitemap `lastmod` 자동 반영의 근거.
6. 사업실적서·제안서 등 **기밀 원문은 이 저장소에 커밋 금지.** 대조는 로컬에서만.

## 빌드 체인 (역순 금지)

```
npm run validate:content  →  npm run seo  →  npm run build
```

`validate:content`는 위반(허위 legalStatus, 근거 없는 센서, 글자수 초과, 없는 이미지 참조,
ready인데 TODO 잔존)을 빌드 전에 차단한다. `draft` 슬롯의 위반은 경고만 낸다.

> `build` 스크립트에 validate를 직접 삽입하는 것은 배포 영향이 있어 별도 승인 후 반영 예정.
> 그 전까지는 위 순서를 수동으로 지킨다.

---

# A-0 진단 결과 (2026-07-27)

## 콘텐츠가 박혀 있는 곳

| 콘텐츠 | 현재 위치 | 형태 |
|---|---|---|
| 인증서 21건 | `locales/{ko,en}.json` → `aboutPage.certificate.items` | 데이터 배열 (제목·기관·일자·분류) |
| 인증서 이미지 | `components/CertificateSection/CertificateSection.jsx:33-55` | import 바인딩 별도 배열 |
| 특허 | `src/assets/patent_certificate_10-{2404374,2424407,2529240,2825255}.png` | 자산 4건 (데이터화 안 됨) |
| R&D 6주제 | `locales` → `rndPage.{multimodal,onDevice,ragLlm,embedded,assistive,airQuality}` | `cards` + `s1~s6` 섹션 슬롯 |
| 제품 3축 | `locales` → `productsPage.{safety,monitoring,control}` | hero·products·domains·pipeline |
| 실적 | `locales` → `casesPage.{integrated,smartSafety,infoComm}` | hero·stats·cases (수치 포함) |

## 확인된 취약점

1. **인덱스 결합** — 인증서는 JSON 데이터(21건)와 이미지 배열(21건)이 *순서*로만 결합된다
   (`CertificateSection.jsx`의 주석도 이를 인정). 어느 한쪽 순서가 어긋나면 잘못된 인증서가
   표시된다. → 슬롯 이관 시 각 항목에 `image` 파일명을 명시해 결합을 끊는다.
2. **특허 법적 상태 미표기** — 특허는 이미지 자산으로만 존재하고 legalStatus 데이터가 없어
   출원/등록 구분을 코드가 강제할 수 없다. → `patents.json` + `legalStatus` enum 검증 도입.
3. **수치의 근거 불명** — `casesPage.*.stats` 등 실적 수치가 locales에 직접 박혀 있어 원문
   대조 이력이 없다. → cases 슬롯은 원문 대조 전 빈 배열 유지.
4. **로케일 = 번역 + 데이터 혼재** — 784키 중 상당수가 번역이 아닌 데이터. 슬롯 이관 후
   locales에는 순수 UI 문구만 남기는 것이 장기 방향 (기존 키 삭제는 트랙 B 전환 후 안정화
   단계에서).

## 로드맵 수량과의 차이 (S3 원본 확정 필요)

- 특허: 로드맵 **8건** vs 저장소 근거 **4건** → 4건 추가 대기
- R&D: 로드맵 **7건** vs 현재 라우트 **6건** → 1건 추가 대기

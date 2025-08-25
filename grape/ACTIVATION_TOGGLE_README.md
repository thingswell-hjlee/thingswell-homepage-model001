# 활성화 토글 기능 구현

## 개요
편집 버튼 옆에 활성화 토글 버튼을 추가하여 관리자가 항목의 표시 여부를 제어할 수 있는 기능을 구현했습니다.

## 주요 기능

### 1. 활성화 토글 버튼
- 편집 버튼 옆에 "활성"/"비활성" 토글 버튼 추가
- 활성 상태: 초록색 배경 (rgba(40, 167, 69, 0.9))
- 비활성 상태: 회색 배경 (rgba(108, 117, 125, 0.9))
- 관리자만 토글 버튼이 표시됨

### 2. 필터링 기능
- 일반 사용자는 활성화된 항목만 볼 수 있음
- 관리자는 모든 항목(활성/비활성)을 볼 수 있음
- 비활성화된 항목은 일반 사용자 리스트에서 자동으로 숨겨짐

### 3. 데이터베이스 변경사항
- `Product` 테이블에 `is_active` 필드 추가 (BOOLEAN, 기본값: true)
- `Track_record` 테이블에 `is_active` 필드 추가 (BOOLEAN, 기본값: true)
- RLS 정책 업데이트로 보안 강화

## 적용된 페이지

### 제품 페이지
- `Product_list_control.jsx` (통합제어)
- `Product_list_safety.jsx` (스마트안전장비)
- `Product_list_monitoring.jsx` (관제시스템)

### 고객사례 페이지
- `Case.jsx` (모든 고객사례)

## 구현된 컴포넌트

### ProductList.jsx
- `onToggleActive` prop 추가
- 비활성화된 항목 필터링 로직 추가
- 활성화 토글 버튼 UI 추가

### Case.jsx
- `handleToggleActive` 함수 추가
- `TrackRecordList` 컴포넌트에 토글 기능 전달

## 데이터베이스 마이그레이션

다음 SQL 스크립트를 Supabase에서 실행해야 합니다:

```sql
-- Product 테이블에 is_active 필드 추가
ALTER TABLE "Product" 
ADD COLUMN "is_active" BOOLEAN DEFAULT true;

-- Track_record 테이블에 is_active 필드 추가
ALTER TABLE "Track_record" 
ADD COLUMN "is_active" BOOLEAN DEFAULT true;

-- 기존 데이터는 모두 활성화 상태로 설정
UPDATE "Product" SET "is_active" = true WHERE "is_active" IS NULL;
UPDATE "Track_record" SET "is_active" = true WHERE "is_active" IS NULL;
```

## 사용법

1. 관리자로 로그인
2. 제품 또는 고객사례 목록에서 편집 버튼 옆의 토글 버튼 클릭
3. 활성화/비활성화 상태 변경
4. 일반 사용자는 비활성화된 항목을 볼 수 없음

## 보안 고려사항

- RLS(Row Level Security) 정책으로 데이터 접근 제어
- 인증된 사용자만 활성화 상태 변경 가능
- 일반 사용자는 활성화된 항목만 조회 가능

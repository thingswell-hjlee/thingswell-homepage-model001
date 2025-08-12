# Products 페이지 구조 및 CSS 공통화

## 📁 파일 구조

```
Products/
├── README.md                    # 이 파일
├── ProductsCommon.css           # 공통 CSS 스타일
├── Product_main.css             # 메인 페이지 전용 스타일
├── Product_main.jsx             # 메인 페이지 컴포넌트
├── ProductList.jsx              # 공통 제품 목록 컴포넌트
├── Product_list_control.jsx     # 제품 목록 관리 컴포넌트
├── Product_list_safety.jsx      # 안전 제품 목록 컴포넌트
├── Product_control.jsx          # 제품 관리 컴포넌트
├── Product_safety.css           # 안전 제품 페이지 전용 스타일
├── Product_safety.jsx           # 안전 제품 컴포넌트
├── ProductDetail.css            # 제품 상세 페이지 전용 스타일
└── ProductDetail.jsx            # 제품 상세 컴포넌트
```

## 🎨 CSS 공통화 구조

### 1. 공통 스타일 (`ProductsCommon.css`)
모든 Products 페이지에서 공통으로 사용되는 스타일을 정의합니다:

- **기본 레이아웃**: `.product-detail-page` 등
- **제품 목록**: `.product-list-content`, `.product-list-toolbar` 등
- **제품 카드**: `.product-card`, `.product-grid` 등
- **뷰 모드**: 그리드/리스트 뷰 토글
- **반응형 디자인**: 모바일/태블릿 대응

### 2. 페이지별 전용 스타일
각 페이지의 고유한 스타일이 필요한 경우 해당 CSS 파일에 추가:

```css
/* 페이지별 추가 스타일이 필요한 경우 여기에 작성 */
.custom-style {
  /* 페이지별 고유 스타일 */
}
```

## 🔧 사용 방법

### CSS Import
모든 Products 페이지 CSS 파일은 공통 CSS를 import합니다:

```css
/* 페이지 전용 스타일 */
@import './ProductsCommon.css';

/* 페이지별 추가 스타일이 필요한 경우 여기에 작성 */
```

### 컴포넌트에서 사용
JSX 파일에서는 해당 페이지의 CSS 파일을 import합니다:

```jsx
import './ProductsCommon.css';
```

## 📱 반응형 디자인

공통 CSS에는 다음과 같은 반응형 브레이크포인트가 포함되어 있습니다:

- **768px 이하**: 태블릿 레이아웃
- **480px 이하**: 모바일 레이아웃

## 🎯 주요 기능

### 제품 카드
- 그리드 뷰와 리스트 뷰 지원
- 호버 효과 및 애니메이션
- 반응형 이미지 처리

### 필터링 및 검색
- 툴바 레이아웃
- 뷰 모드 토글 버튼
- 검색 기능

### 빈 상태 처리
- 제품이 없을 때의 메시지 표시
- 그리드 영역 유지

## 🚀 유지보수 가이드

### 새로운 스타일 추가
1. 공통 스타일인지 확인
2. 공통 스타일 → `ProductsCommon.css`에 추가
3. 페이지별 스타일 → 해당 페이지 CSS 파일에 추가

### 스타일 수정
1. 공통 스타일 수정 시 모든 페이지에 영향
2. 페이지별 스타일 수정 시 해당 페이지에만 영향

### CSS 변수 사용
프로젝트의 CSS 변수를 활용하여 일관된 디자인 유지:

```css
var(--spacing-xl)
var(--color-primary)
var(--font-size-xl)
```

## 📝 참고사항

- 모든 Products 페이지는 `ProductsCommon.css`를 import해야 합니다
- 페이지별 고유 스타일은 최소화하고 공통 스타일을 활용하세요
- 새로운 공통 스타일 추가 시 모든 페이지에 미치는 영향을 고려하세요

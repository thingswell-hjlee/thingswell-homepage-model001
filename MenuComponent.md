# Menu 컴포넌트 사용법

## 개요
재사용 가능한 Menu 컴포넌트입니다. 다양한 테마와 방향을 지원하며, 하위 메뉴 기능을 포함하여 다른 페이지에서 쉽게 사용할 수 있습니다.

## 설치 및 import
```jsx
import Menu from './menu.jsx';
```

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `items` | Array | `[]` | 메뉴 아이템 배열 |
| `onItemClick` | Function | - | 메뉴 아이템 클릭 시 호출되는 함수 |
| `onSubmenuClick` | Function | - | 하위 메뉴 아이템 클릭 시 호출되는 함수 |
| `className` | String | `''` | 추가 CSS 클래스 |
| `orientation` | String | `'horizontal'` | 메뉴 방향 (`'horizontal'` 또는 `'vertical'`) |
| `theme` | String | `'default'` | 테마 (`'default'`, `'dark'`, `'primary'`) |

## 메뉴 아이템 구조
```jsx
const menuItem = {
  label: '메뉴 이름',        // 필수: 표시될 텍스트
  disabled: false,         // 선택: 비활성화 여부
  submenu: [               // 선택: 하위 메뉴 배열
    {
      label: '하위 메뉴 1',
      path: '/submenu1'    // 선택: 페이지 경로
    }
  ]
};
```

## 기본 메뉴 아이템
컴포넌트는 다음과 같은 기본 메뉴 아이템을 제공합니다:

### 솔루션
- AI 솔루션
- 클라우드 솔루션
- 보안 솔루션
- 데이터 분석

### 제품
- 소프트웨어 제품
- 하드웨어 제품
- 서비스 제품
- 신제품

### 적용분야
- 제조업
- 금융업
- 의료업
- 교육업
- 유통업

### 납품사례
- 대기업 사례
- 중소기업 사례
- 공공기관 사례
- 해외 사례

### 정부지원 사업안내
- R&D 지원사업
- 창업 지원사업
- 기술개발 지원
- 자금 지원

### 고객지원
- 기술지원
- 고객센터
- FAQ
- 문의하기
- 다운로드

### 회사소개
- 회사개요
- 연혁
- 조직도
- CEO 인사말
- 뉴스룸
- 채용정보

## 사용 예시

### 기본 사용법 (하위 메뉴 포함)
```jsx
// 기본 메뉴 아이템을 사용하는 경우
<Menu 
  orientation="horizontal"
  theme="primary"
/>
```

### 커스텀 메뉴 아이템
```jsx
const customMenuItems = [
  { 
    label: '서비스', 
    submenu: [
      { label: '웹 개발', path: '/services/web' },
      { label: '모바일 앱', path: '/services/mobile' },
      { label: '클라우드', path: '/services/cloud' }
    ]
  },
  { 
    label: '제품', 
    submenu: [
      { label: '소프트웨어', path: '/products/software' },
      { label: '하드웨어', path: '/products/hardware' }
    ]
  },
  { label: '연락처' } // 하위 메뉴 없는 메뉴
];
```

const handleMenuClick = (item, index) => {
  console.log('메뉴 클릭:', item.label);
  // 하위 메뉴가 있는 경우 자동으로 처리됨
};

const handleSubmenuClick = (submenuItem) => {
  console.log('하위 메뉴 클릭:', submenuItem.label);
  // 페이지 이동 또는 다른 처리
  window.location.href = submenuItem.path;
};

<Menu 
  items={customMenuItems} 
  onItemClick={handleMenuClick}
  onSubmenuClick={handleSubmenuClick}
/>
```

### 수직 메뉴
```jsx
<Menu 
  items={customMenuItems} 
  onItemClick={handleMenuClick}
  onSubmenuClick={handleSubmenuClick}
  orientation="vertical"
/>
```

### 다크 테마
```jsx
<Menu 
  items={customMenuItems} 
  onItemClick={handleMenuClick}
  onSubmenuClick={handleSubmenuClick}
  theme="dark"
/>
```

### 프라이머리 테마
```jsx
<Menu 
  items={customMenuItems} 
  onItemClick={handleMenuClick}
  onSubmenuClick={handleSubmenuClick}
  theme="primary"
/>
```

### 비활성화된 메뉴 아이템
```jsx
const menuItems = [
  { label: '활성 메뉴' },
  { label: '비활성 메뉴', disabled: true }
];
```

### 커스텀 클래스 추가
```jsx
<Menu 
  items={customMenuItems} 
  onItemClick={handleMenuClick}
  onSubmenuClick={handleSubmenuClick}
  className="my-custom-menu"
/>
```

## 하위 메뉴 기능

### 하위 메뉴 표시
- 하위 메뉴가 있는 메뉴 항목은 굵은 글씨로 표시됩니다
- 메뉴를 클릭하면 하위 메뉴가 전체 메뉴바 길이만큼 하단에 표시됩니다
- 다른 메뉴를 클릭하면 이전 하위 메뉴는 자동으로 닫힙니다

### 하위 메뉴 스타일
- 수평 메뉴: 전체 하단에 가로로 배치된 형태로 표시
- 수직 메뉴: 세로로 배치된 형태로 표시
- 호버 효과와 슬라이드 다운 애니메이션 포함
- 하위 메뉴 항목들은 균등하게 분배되어 표시됩니다

### 반응형 디자인
- 모바일에서는 하위 메뉴가 수직으로 표시됩니다
- 터치 친화적인 인터페이스

## 이벤트 핸들링

### 메뉴 클릭 이벤트
```jsx
const handleMenuClick = (item, index) => {
  // 하위 메뉴가 있는 경우 자동으로 처리됨
  if (!item.submenu || item.submenu.length === 0) {
    // 하위 메뉴가 없는 경우에만 실행
    console.log('메뉴 클릭:', item.label);
    // 라우팅 처리
    navigate(item.path);
  }
};
```

### 하위 메뉴 클릭 이벤트
```jsx
const handleSubmenuClick = (submenuItem) => {
  console.log('하위 메뉴 클릭:', submenuItem.label);
  
  // 페이지 이동
  if (submenuItem.path) {
    window.location.href = submenuItem.path;
  }
  
  // 상태 업데이트
  setActiveSubmenu(submenuItem.label);
  
  // API 호출
  fetchSubmenuData(submenuItem.path);
};
```

## 스타일링
- 기본적으로 반응형 디자인이 적용되어 있습니다
- 모바일에서는 수평 메뉴가 자동으로 수직으로 변경됩니다
- 하위 메뉴는 부드러운 애니메이션과 함께 표시됩니다
- CSS 변수를 통해 색상을 커스터마이징할 수 있습니다

## 접근성
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- ARIA 라벨 및 역할 포함

```jsx
const handleMenuClick = (item, index) => {
  // 라우팅 처리
  if (item.label === '홈') {
    navigate('/');
  }
  
  // 상태 업데이트
  setActiveMenu(index);
  
  // API 호출
  fetchData(item.label);
};
``` 
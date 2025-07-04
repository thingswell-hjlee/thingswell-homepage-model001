import React, { useState } from 'react';
import './menu.css';

// 기본 메뉴 아이템 설정 (하위 메뉴 포함)
const defaultMenuItems = [
  { 
    label: '솔루션',
    submenu: [
      { label: '솔루션 1', path: '/solutions/1' },
      { label: '솔루션 2', path: '/solutions/2' },
    ]
  },
  { 
    label: '제품',
    submenu: [
      { label: '제품 1', path: '/products/1' },
      { label: '제품 2', path: '/products/2' },
    ]
  },
  { 
    label: '적용분야',
    submenu: [
      { label: '적용분야 1', path: '/applications/1' },
      { label: '적용분야 2', path: '/applications/2' },
      { label: '적용분야 3', path: '/applications/3' },
    ]
  },
  { 
    label: '납품사례',
    submenu: [
      { label: '납품사례 1', path: '/cases/1' },
      { label: '납품사례 2', path: '/cases/2' },
    ]
  },
  { 
    label: '정부지원 사업안내',
    submenu: [
      { label: '사업안내 1', path: '/government-support/1' },
      { label: '사업안내 2', path: '/government-support/2' },
    ]
  },
  { 
    label: '고객지원',
    submenu: [
      { label: '견적문의', path: '/support/estimate' },
      { label: '공지사항', path: '/support/notice' },
    ]
  },
  { 
    label: '회사소개',
    submenu: [
      { label: '목표', path: '/about/goal' },
      { label: '연혁', path: '/about/history' },
      { label: '오시는 길', path: '/about/location', icon: '▲' },
    ]
  }
];

// 메뉴 클릭 핸들러 - 각 메뉴에 해당하는 페이지로 이동
const handleMenuClick = (item, index) => {
  console.log('메뉴 클릭:', item.label, '인덱스:', index);
  
  // 하위 메뉴가 있는 경우 클릭하지 않음 (하위 메뉴 표시만)
  if (item.submenu && item.submenu.length > 0) {
    return;
  }
  
  // 각 메뉴 항목에 따른 페이지 경로 매핑
  const pageRoutes = {
    '솔루션': '/solutions',
    '제품': '/products', 
    '적용분야': '/applications',
    '납품사례': '/cases',
    '정부지원 사업안내': '/government-support',
    '고객지원': '/support',
    '회사소개': '/about'
  };
  
  const targetPath = pageRoutes[item.label] || item.path;
  
  if (targetPath) {
    // React Router를 사용하는 경우
    // navigate(targetPath);
    
    // 일반적인 페이지 이동의 경우
    window.location.href = targetPath;
  } else {
    console.warn(`'${item.label}' 메뉴에 대한 경로가 정의되지 않았습니다.`);
  }
};

// 하위 메뉴 클릭 핸들러
const handleSubmenuClick = (submenuItem) => {
  console.log('하위 메뉴 클릭:', submenuItem.label);
  
  if (submenuItem.path) {
    window.location.href = submenuItem.path;
  } else {
    console.warn(`'${submenuItem.label}' 하위 메뉴에 대한 경로가 정의되지 않았습니다.`);
  }
};

const Menu = ({ 
  items = defaultMenuItems, 
  onItemClick = handleMenuClick, 
  onSubmenuClick = handleSubmenuClick,
  className = '', 
  orientation = 'horizontal',
  theme = 'default'
}) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleItemClick = (item, index) => {
    if (item.submenu && item.submenu.length > 0) {
      // 하위 메뉴가 있는 경우 토글
      setOpenSubmenu(openSubmenu === index ? null : index);
    } else {
      // 하위 메뉴가 없는 경우 일반 클릭 처리
      if (onItemClick) {
        onItemClick(item, index);
      }
    }
  };

  const handleSubmenuItemClick = (submenuItem) => {
    if (onSubmenuClick) {
      onSubmenuClick(submenuItem);
    }
    // 하위 메뉴 클릭 후 메뉴 닫기
    setOpenSubmenu(null);
  };

  return (
    <div
      className={`menu-wrapper${openSubmenu !== null ? ' open' : ''}`}
      style={{
        height: openSubmenu !== null ? '150px' : '65px', // 메뉴+서브메뉴 높이, 메뉴만 높이
        transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1)'
      }}
    >
      <div className={`menu-container menu-${orientation} menu-${theme} ${className}`}>
        <nav className={`menu menu-${orientation} menu-${theme}`}>
          <ul className="menu-list">
            {items.map((item, index) => (
              <li key={index} className="menu-item">
                <button
                  className={`menu-button ${item.submenu && item.submenu.length > 0 ? 'has-submenu' : ''}`}
                  onClick={() => handleItemClick(item, index)}
                  disabled={item.disabled}
                >
                  {item.icon && <span className="menu-icon">{item.icon}</span>}
                  <span className="menu-text">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* 전체 하단 하위 메뉴 */}
      {openSubmenu !== null && items[openSubmenu] && items[openSubmenu].submenu && (
        <div className="full-width-submenu static-submenu">
          <ul className="submenu-list">
            {items[openSubmenu].submenu.map((submenuItem, subIndex) => (
              <li key={subIndex} className="submenu-item">
                <button
                  className="submenu-button"
                  onClick={() => handleSubmenuItemClick(submenuItem)}
                >
                  {submenuItem.icon && <span className="submenu-icon">{submenuItem.icon}</span>}
                  <span className="submenu-text">{submenuItem.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;

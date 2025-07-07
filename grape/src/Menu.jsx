import React, { useState, useEffect, useRef } from 'react';
import './Menu.css';
import logo from './assets/logo.png';

const defaultMenuItems = [
  { label: '솔루션', submenu: [ { label: '솔루션1', path: '/solutions/ai' }, { label: '솔루션2', path: '/solutions/cloud' } ] },
  { label: '제품', submenu: [ { label: '제품1', path: '/products/software' }, { label: '제품2', path: '/products/hardware' }, { label: '제품3', path: '/products/services' }, { label: '제품4', path: '/products/new' } ] },
  { label: '적용분야', submenu: [ { label: '적용분야1', path: '/applications/manufacturing' }, { label: '적용분야2', path: '/applications/finance' }, { label: '적용분야3', path: '/applications/healthcare' }, { label: '적용분야4', path: '/applications/education' } ] },
  { label: '납품사례', submenu: [ { label: '사례1', path: '/cases/enterprise' }, { label: '사례2', path: '/cases/sme' }, { label: '사례3', path: '/cases/public' }, { label: '사례4', path: '/cases/overseas' } ] },
  { label: '정부지원 사업안내', submenu: [ { label: '사업1', path: '/government-support/rd' }, { label: '사업2', path: '/government-support/startup' }, { label: '사업3', path: '/government-support/tech' }, { label: '사업4', path: '/government-support/funding' } ] },
  { label: '고객지원', submenu: [ { label: '기술지원', path: '/support/technical' }, { label: '고객센터', path: '/support/center' }, { label: 'FAQ', path: '/support/faq' }, { label: '문의하기', path: '/support/contact' }, { label: '다운로드', path: '/support/download' } ] },
  { label: '회사소개', submenu: [ { label: '회사개요', path: '/about/overview' }, { label: '연혁', path: '/about/history' }, { label: '조직도', path: '/about/organization' }, { label: 'CEO 인사말', path: '/about/ceo' }, { label: '뉴스룸', path: '/about/news' }, { label: '채용정보', path: '/about/careers' } ] }
];

const handleMenuClick = (item, index) => {
  if (item.submenu && item.submenu.length > 0) return;
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
  if (targetPath) window.location.href = targetPath;
};

const handleSubmenuClick = (submenuItem) => {
  if (submenuItem.path) window.location.href = submenuItem.path;
};

const Menu = ({ orientation = 'horizontal', theme = 'primary' }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (item, index) => {
    if (item.submenu && item.submenu.length > 0) {
      setOpenSubmenu(openSubmenu === index ? null : index);
    } else {
      handleMenuClick(item, index);
    }
  };
  const handleSubmenuItemClick = (submenuItem) => {
    handleSubmenuClick(submenuItem);
    setOpenSubmenu(null);
  };
  return (
    <div ref={menuRef} className={`menu-container menu-${orientation} menu-${theme} ${openSubmenu !== null ? 'open' : ''}`}>
      <div className="menu-logo">
        <img src={logo} alt="로고" className="logo-image" />
      </div>
      <nav className={`menu menu-${orientation} menu-${theme}`}>
        <ul className="menu-list">
          {defaultMenuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <button
                className={`menu-button ${item.submenu && item.submenu.length > 0 ? 'has-submenu' : ''}`}
                onClick={() => handleItemClick(item, index)}
                disabled={item.disabled}
              >
                <span className="menu-text">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {openSubmenu !== null && defaultMenuItems[openSubmenu] && defaultMenuItems[openSubmenu].submenu && (
        <div className="full-width-submenu">
          <ul className="submenu-list">
            {defaultMenuItems[openSubmenu].submenu.map((submenuItem, subIndex) => (
              <li key={subIndex} className="submenu-item">
                <button
                  className="submenu-button"
                  onClick={() => handleSubmenuItemClick(submenuItem)}
                >
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
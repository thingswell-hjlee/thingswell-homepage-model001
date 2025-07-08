import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import logo from './assets/logo.png';

const defaultMenuItems = [
  { label: '정부지원 사업안내', submenu: [ { label: '사업1', path: '/government' }, { label: '사업2', path: '/government-support/startup' }, { label: '사업3', path: '/government-support/tech' }, { label: '사업4', path: '/government-support/funding' } ] },
  { label: '솔루션', submenu: [ { label: '솔루션1', path: '/solutions' }, { label: '솔루션2', path: '/solutions/cloud' } ] },
  { label: '제품', submenu: [ { label: '제품1', path: '/products/software' }, { label: '제품2', path: '/products/hardware' }, { label: '제품3', path: '/products/services' }, { label: '제품4', path: '/products/new' } ] },
  { label: '적용분야', submenu: [ { label: '적용분야1', path: '/applications/manufacturing' }, { label: '적용분야2', path: '/applications/finance' }, { label: '적용분야3', path: '/applications/healthcare' }, { label: '적용분야4', path: '/applications/education' } ] },
  { label: '납품사례', submenu: [ { label: '사례1', path: '/cases/enterprise' }, { label: '사례2', path: '/cases/sme' }, { label: '사례3', path: '/cases/public' }, { label: '사례4', path: '/cases/overseas' } ] },
  { label: '고객지원', submenu: [ { label: '견적문의', path: '/support/contact' }, { label: '공지사항', path: '/support/download' } ] },
  { label: '회사소개', submenu: [ { label: '목표', path: '/about/overview' }, { label: '연혁', path: '/about/history' }, { label: '오시는 길', path: '/about/organization' } ] }
];

const Menu = ({ orientation = 'horizontal', theme = 'primary' }) => {
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

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
    if (targetPath) navigate(targetPath);
  };

  const handleSubmenuClick = (submenuItem) => {
    if (submenuItem.path) navigate(submenuItem.path);
  };

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenSubmenu(null);
        if (isMobile) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile]);

  const handleItemClick = (item, index) => {
    if (item.submenu && item.submenu.length > 0) {
      if (isMobile) {
        // 모바일에서는 서브메뉴 토글
        setOpenSubmenu(openSubmenu === index ? null : index);
      } else {
        // 데스크톱에서는 서브메뉴 표시
        setOpenSubmenu(openSubmenu === index ? null : index);
      }
    } else {
      handleMenuClick(item, index);
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const handleSubmenuItemClick = (submenuItem) => {
    handleSubmenuClick(submenuItem);
    setOpenSubmenu(null);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setOpenSubmenu(null);
    }
  };

  return (
    <div ref={menuRef} className={`menu-container menu-${orientation} menu-${theme} ${openSubmenu !== null ? 'open' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="menu-logo">
        <img src={logo} alt="로고" className="logo-image" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
        {isMobile && (
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="메뉴 열기/닫기"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        )}
      </div>
      
      <nav className={`menu menu-${orientation} menu-${theme} ${isMobileMenuOpen ? 'mobile-visible' : ''}`}>
        <ul className="menu-list">
          {defaultMenuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <button
                className={`menu-button ${item.submenu && item.submenu.length > 0 ? 'has-submenu' : ''} ${openSubmenu === index ? 'active' : ''}`}
                onClick={() => handleItemClick(item, index)}
                disabled={item.disabled}
              >
                <span className="menu-text">{item.label}</span>
                {item.submenu && item.submenu.length > 0 && isMobile && (
                  <span className="submenu-indicator">{openSubmenu === index ? '−' : '+'}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {openSubmenu !== null && defaultMenuItems[openSubmenu] && defaultMenuItems[openSubmenu].submenu && (
        <div className={`full-width-submenu ${isMobile ? 'mobile-submenu' : ''}`}>
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
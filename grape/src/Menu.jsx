import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [activeSubmenuIndex, setActiveSubmenuIndex] = useState(null);
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
    if (targetPath) {
      navigate(targetPath);
      setActiveMenuIndex(index);
      setActiveSubmenuIndex(null);
    }
  };

  const handleSubmenuClick = (submenuItem, subIndex, parentIndex) => {
    if (submenuItem.path) {
      navigate(submenuItem.path);
      // 서브메뉴 클릭 시 부모 메뉴와 해당 서브메뉴 모두 활성화
      setActiveMenuIndex(parentIndex);
      setActiveSubmenuIndex(subIndex);
      // 서브메뉴 클릭 시 부모 메뉴의 서브메뉴는 열어두기
      if (!isMobile) {
        setOpenSubmenu(parentIndex);
      }
    }
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

  // 현재 페이지에 따라 활성화된 메뉴 설정
  useEffect(() => {
    const currentPath = location.pathname;
    let foundActiveMenu = false;
    let foundActiveSubmenu = false;
    let menuIndexForSubmenu = null;
    
    // 메인 메뉴에서 현재 페이지에 해당하는 항목 찾기
    defaultMenuItems.forEach((item, index) => {
      if (item.submenu) {
        item.submenu.forEach((subItem, subIndex) => {
          if (subItem.path === currentPath) {
            // 서브메뉴 페이지인 경우 부모 메뉴와 해당 서브메뉴 모두 활성화
            setActiveMenuIndex(index);
            setActiveSubmenuIndex(subIndex);
            foundActiveSubmenu = true;
            menuIndexForSubmenu = index;
          }
        });
      } else {
        // 서브메뉴가 없는 메뉴 항목의 경우
        const pageRoutes = {
          '솔루션': '/solutions',
          '제품': '/products',
          '적용분야': '/applications',
          '납품사례': '/cases',
          '정부지원 사업안내': '/government-support',
          '고객지원': '/support',
          '회사소개': '/about'
        };
        const targetPath = pageRoutes[item.label];
        if (targetPath === currentPath) {
          setActiveMenuIndex(index);
          setActiveSubmenuIndex(null);
          foundActiveMenu = true;
        }
      }
    });
    
    // 현재 페이지에 해당하는 메뉴가 없으면 활성화 상태 초기화
    if (!foundActiveMenu && !foundActiveSubmenu) {
      setActiveMenuIndex(null);
      setActiveSubmenuIndex(null);
    }
    
    // 메인 메뉴 페이지인 경우 해당 서브메뉴 자동 열기
    if (foundActiveMenu && !isMobile) {
      setOpenSubmenu(activeMenuIndex);
    }
    
    // 서브메뉴 페이지인 경우 해당 부모 메뉴의 서브메뉴 자동 열기
    if (foundActiveSubmenu && !isMobile && menuIndexForSubmenu !== null) {
      setOpenSubmenu(menuIndexForSubmenu);
    }
    
    // 활성화된 메뉴가 있으면 서브메뉴 열기 유지 (페이지 이동 후)
    if (activeMenuIndex !== null && !isMobile && foundActiveMenu) {
      // 페이지 이동 후 서브메뉴 열기
      setOpenSubmenu(activeMenuIndex);
    }
    
    // 서브메뉴 페이지인 경우에도 부모 메뉴의 서브메뉴 열기
    if (foundActiveSubmenu && !isMobile && menuIndexForSubmenu !== null) {
      setOpenSubmenu(menuIndexForSubmenu);
    }
  }, [location.pathname, isMobile, activeMenuIndex]);

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
      // 서브메뉴가 있는 메뉴 클릭 시
      if (isMobile) {
        // 모바일에서는 서브메뉴 토글
        setOpenSubmenu(openSubmenu === index ? null : index);
      } else {
        // 데스크톱에서는 먼저 페이지 이동 후 서브메뉴 열기
        setOpenSubmenu(null); // 먼저 닫기
      }
      // 해당 메뉴 활성화
      setActiveMenuIndex(index);
      setActiveSubmenuIndex(null);
      
      // 메인 메뉴 페이지로 이동 (서브메뉴가 있는 메뉴의 경우)
      const pageRoutes = {
        '정부지원 사업안내': '/government-support',
        '솔루션': '/solutions',
        '제품': '/products',
        '적용분야': '/applications',
        '납품사례': '/cases',
        '고객지원': '/support',
        '회사소개': '/about'
      };
      const targetPath = pageRoutes[item.label];
      if (targetPath) {
        navigate(targetPath);
        // 페이지 이동 후 서브메뉴 열기
        setTimeout(() => {
          setOpenSubmenu(index);
        }, 100);
      }
    } else {
      // 서브메뉴가 없는 메뉴 클릭 시
      handleMenuClick(item, index);
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  // 데스크톱에서 호버 시 서브메뉴 표시 (페이지 이동 없이)
  const handleMouseEnter = (index) => {
    if (!isMobile && defaultMenuItems[index].submenu && defaultMenuItems[index].submenu.length > 0) {
      setOpenSubmenu(index);
      setActiveMenuIndex(index);
      setActiveSubmenuIndex(null);
    }
  };

  // 마우스가 메뉴를 벗어날 때 서브메뉴 숨김 (활성화된 메뉴가 있으면 유지)
  const handleMouseLeave = () => {
    // 활성화된 메뉴가 있으면 서브메뉴를 계속 열어둠
    if (!isMobile && activeMenuIndex === null && openSubmenu !== null) {
      // 페이지 이동 후에는 서브메뉴를 닫지 않음
      if (location.pathname !== '/') {
        return;
      }
      setOpenSubmenu(null);
    }
  };

  const handleSubmenuItemClick = (submenuItem, subIndex) => {
    handleSubmenuClick(submenuItem, subIndex, openSubmenu);
    // 데스크톱에서는 서브메뉴를 열어두고, 모바일에서만 닫기
    if (isMobile) {
      setOpenSubmenu(null);
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
    <div 
      ref={menuRef} 
      className={`menu-container menu-${orientation} menu-${theme} ${openSubmenu !== null ? 'open' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''} ${activeMenuIndex !== null ? 'has-active-menu' : ''}`}
      onMouseLeave={handleMouseLeave}
    >
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
            <li 
              key={index} 
              className={`menu-item ${item.submenu && item.submenu.length > 0 ? 'has-submenu' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <button
                className={`menu-button ${item.submenu && item.submenu.length > 0 ? 'has-submenu' : ''} ${openSubmenu === index ? 'active' : ''} ${activeMenuIndex === index ? 'active' : ''}`}
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
        <div 
          className={`full-width-submenu ${isMobile ? 'mobile-submenu' : ''}`}
          onMouseEnter={() => !isMobile && setOpenSubmenu(openSubmenu)}
          onMouseLeave={() => {
            if (!isMobile && activeMenuIndex === null && openSubmenu !== null) {
              // 페이지 이동 후에는 서브메뉴를 닫지 않음
              if (location.pathname !== '/') {
                return;
              }
              setOpenSubmenu(null);
            }
          }}
        >
          <ul className="submenu-list">
            {defaultMenuItems[openSubmenu].submenu.map((submenuItem, subIndex) => (
              <li key={subIndex} className="submenu-item">
                <button
                  className={`submenu-button ${activeSubmenuIndex === subIndex ? 'active' : ''}`}
                  onClick={() => handleSubmenuItemClick(submenuItem, subIndex)}
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
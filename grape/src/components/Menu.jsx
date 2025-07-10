/**
 * Menu 컴포넌트
 * 
 * 네비게이션 메뉴를 렌더링하는 컴포넌트입니다.
 * 메인 메뉴와 서브메뉴를 포함하며, 반응형 디자인을 지원합니다.
 * 데스크톱에서는 호버로 서브메뉴가 열리고, 모바일에서는 클릭으로 토글됩니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.orientation - 메뉴 방향 ('horizontal' | 'vertical')
 * @param {string} props.theme - 메뉴 테마 ('primary' | 'secondary')
 * 
 * 사용법:
 * <Menu orientation="horizontal" theme="primary" />
 * 
 * 주요 기능:
 * - 반응형 디자인 (모바일/데스크톱)
 * - 서브메뉴 호버/클릭 토글
 * - 현재 페이지에 따른 메뉴 활성화
 * - 외부 클릭 시 메뉴 닫기
 */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Menu.css';
import logo from '../assets/logo.png';

const defaultMenuItems = [
  { 
    label: '정부지원 사업안내', 
    submenu: [ 
      { label: 'AI 제조 지원사업', path: '/ai-manufacturing-support' }, 
      { label: '그린에너지 지원사업', path: '/green-energy-support' }, 
      { label: '디지털 전환 지원사업', path: '/digital-transformation-support' }, 
      { label: '정부지원사업 목록', path: '/government-support' } 
    ] 
  },
  { 
    label: '솔루션', 
    submenu: [ 
      { label: '산업 안전 솔루션', path: '/solution' }, 
      { label: '화학 안전 솔루션', path: '/chemical-solution' },
      { label: '제조 안전 솔루션', path: '/manufacturing-solution' },
      { label: '건설 안전 솔루션', path: '/construction-solution' }
    ] 
  },
  { 
    label: '제품', 
    submenu: [ 
      { label: '제품1', path: '/products/software' }, 
      { label: '제품2', path: '/products/hardware' }, 
      { label: '제품3', path: '/products/services' }, 
      { label: '제품4', path: '/products/new' } 
    ] 
  },
  { 
    label: '적용분야', 
    submenu: [ 
      { label: '적용분야1', path: '/applications/manufacturing' }, 
      { label: '적용분야2', path: '/applications/finance' }, 
      { label: '적용분야3', path: '/applications/healthcare' }, 
      { label: '적용분야4', path: '/applications/education' } 
    ] 
  },
  { 
    label: '납품사례', 
    submenu: [ 
      { label: '사례1', path: '/cases/enterprise' }, 
      { label: '사례2', path: '/cases/sme' }, 
      { label: '사례3', path: '/cases/public' }, 
      { label: '사례4', path: '/cases/overseas' } 
    ] 
  },
  { 
    label: '고객지원', 
    submenu: [ 
      { label: '견적문의', path: '/support/contact' }, 
      { label: '공지사항', path: '/support/download' } 
    ] 
  },
  { 
    label: '회사소개', 
    submenu: [ 
      { label: '목표', path: '/about/overview' }, 
      { label: '연혁', path: '/about/history' }, 
      { label: '오시는 길', path: '/about/organization' } 
    ] 
  }
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
    
    // 데스크톱에서는 호버 시에만 서브메뉴가 열리도록 하므로
    // 페이지 로드 시 자동으로 서브메뉴를 열지 않음
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
              // 데스크톱에서는 호버 시에만 서브메뉴가 열리므로 클릭 시에는 페이지 이동만
      setOpenSubmenu(null);
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

  // 마우스가 메뉴를 벗어날 때 서브메뉴 숨김
  const handleMouseLeave = () => {
    if (!isMobile) {
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
    <div className="menu-wrapper">
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
              if (!isMobile) {
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
    </div>
  );
};

export default Menu; 
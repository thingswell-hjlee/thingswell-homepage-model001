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
 * - 접근성 지원
 */
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Menu.css';
import logo from '../../assets/logo.png';
import HamburgerMenu from '../HamburgerMenu';

// 메뉴 아이템 데이터
const defaultMenuItems = [
  { 
    label: '정부지원 사업안내', 
    path: '/government-support',
    submenu: [ 
      { label: '스마트 안전장비지원사업', path: '/government-support-detail' }, 
      { label: 'AI 제조 지원사업', path: '/ai-manufacturing-support' }, 
      { label: '그린에너지 지원사업', path: '/green-energy-support' }, 
      { label: '디지털 전환 지원사업', path: '/digital-transformation-support' }, 
    ] 
  },
  { 
    label: '솔루션', 
    path: '/solutions',
    submenu: [ 
      { label: '산업 안전 솔루션', path: '/solution' }, 
      { label: '화학 안전 솔루션', path: '/chemical-solution' },
      { label: '제조 안전 솔루션', path: '/manufacturing-solution' },
      { label: '건설 안전 솔루션', path: '/construction-solution' }
    ] 
  },
  { 
    label: '제품', 
    path: '/products',
    submenu: [ 
      { label: '통합제어', path: '/product-list' }, 
      { label: '영상분석', path: '/products/hardware' }, 
      { label: '모니터링', path: '/products/services' }, 
      { label: '안전장비', path: '/products/new/safety-equipment' },
      { label: '개인보호장비', path: '/products/new/personal-protective-equipment' },
      { label: '원격 모니터링', path: '/products/new/remote-monitoring' }
    ] 
  },
  { 
    label: '적용분야', 
    path: '/application-field-main',
    submenu: [ 
      { label: '건물안전 및 자산관리', path: '/application-field' }, 
      { label: '보안 및 감시', path: '/application-field-2' }, 
      { label: '제조업 안전 및 자산관리', path: '/application-field-3' }, 
      { label: '화학공업 안전 및 자산관리', path: '/application-field-4' } 
    ] 
  },
  {   
    label: '납품사례', 
    path: '/cases',
    // submenu: [ 
    //   { label: '제조업', path: '/case' }, 
    //   { label: '사례2', path: '/case-2' }, 
    //   { label: '사례3', path: '/case-3' }, 
    //   { label: '사례4', path: '/case-4' } 
    // ] 
  },
  { 
    label: '고객지원', 
    path: '/customer-service',
    submenu: [ 
      { label: '공지사항', path: '/announcement' },
      { label: '자료실', path: '/downloads' },
      { label: '문의하기', path: '/contact' }
    ] 
  },
  { 
    label: '회사소개', 
    path: '/about',
    submenu: [ 
      { label: '인사말', path: '/about#greeting' }, 
      { label: '미션 및 비전', path: '/about#mission' }, 
      { label: '연혁', path: '/about#history' }, 
      { label: '인증서', path: '/about#certificate' },
      { label: '오시는 길', path: '/about#location' } 
    ] 
  }
];

// 브레이크포인트 상수
const MOBILE_BREAKPOINT = 768;

const Menu = ({ orientation = 'horizontal', theme = 'primary' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  
  // 상태 관리
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [activeSubmenuIndex, setActiveSubmenuIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      
      // 모바일이 아닐 때 모바일 메뉴 닫기
      if (!mobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobileMenuOpen]);

  // 스크롤 감지 및 메뉴 숨김/표시
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 스크롤 방향 감지
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // 아래로 스크롤하고 100px 이상 스크롤된 경우 메뉴 숨김
        setIsMenuHidden(true);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        // 위로 스크롤하거나 상단에 가까운 경우 메뉴 표시
        setIsMenuHidden(false);
      }
      
      setLastScrollY(currentScrollY);
      
      // 스크롤이 멈추면 메뉴 다시 표시
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsMenuHidden(false);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [lastScrollY]);

  // 현재 페이지에 따른 활성화된 메뉴 설정
  useEffect(() => {
    const currentPath = location.pathname;
    const currentHash = location.hash;
    let foundActiveMenu = false;
    let foundActiveSubmenu = false;
    let menuIndexForSubmenu = null;
    
    // 메인 메뉴에서 현재 페이지에 해당하는 항목 찾기
    defaultMenuItems.forEach((item, index) => {
      if (item.submenu) {
        item.submenu.forEach((subItem, subIndex) => {
          // 해시가 포함된 경로인 경우 해시까지 비교
          if (subItem.path.includes('#')) {
            const [basePath, hash] = subItem.path.split('#');
            if (basePath === currentPath && `#${hash}` === currentHash) {
              setActiveMenuIndex(index);
              setActiveSubmenuIndex(subIndex);
              foundActiveSubmenu = true;
              menuIndexForSubmenu = index;
              // 현재 페이지에 해당하는 서브메뉴가 있으면 자동으로 열기
              if (!isMobile) {
                setOpenSubmenu(index);
              }
            }
          } else if (subItem.path === currentPath) {
            // 서브메뉴 페이지인 경우 부모 메뉴와 해당 서브메뉴 모두 활성화
            setActiveMenuIndex(index);
            setActiveSubmenuIndex(subIndex);
            foundActiveSubmenu = true;
            menuIndexForSubmenu = index;
            // 현재 페이지에 해당하는 서브메뉴가 있으면 자동으로 열기
            if (!isMobile) {
              setOpenSubmenu(index);
            }
          }
        });
      } else {
        // 서브메뉴가 없는 메뉴 항목의 경우
        if (item.path === currentPath) {
          setActiveMenuIndex(index);
          setActiveSubmenuIndex(null);
          foundActiveMenu = true;
        }
      }
    });
    
    // 메인 메뉴 페이지에 도달했을 때 해당 메뉴에 서브메뉴가 있다면 열어두기
    defaultMenuItems.forEach((item, index) => {
      if (item.path === currentPath && item.submenu && item.submenu.length > 0) {
        if (!isMobile) {
          setOpenSubmenu(index);
        }
        foundActiveMenu = true;
      }
    });
    
    // 현재 페이지에 해당하는 메뉴가 없으면 활성화 상태만 초기화 (서브메뉴는 유지)
    if (!foundActiveMenu && !foundActiveSubmenu) {
      setActiveMenuIndex(null);
      setActiveSubmenuIndex(null);
      // 서브메뉴는 수동으로 닫을 때까지 유지
    }
  }, [location.pathname, location.hash, isMobile]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // 외부 클릭 시 현재 활성화된 메뉴가 아닌 경우 서브메뉴 닫기
        if (!isMobile && openSubmenu !== null) {
          // 현재 경로와 서브메뉴 경로를 직접 비교
          const currentMenuItem = defaultMenuItems[openSubmenu];
          const isCurrentMenuActive = currentMenuItem && (
            currentMenuItem.path === location.pathname ||
            (currentMenuItem.submenu && currentMenuItem.submenu.some(subItem => 
              subItem.path === location.pathname || 
              location.pathname.startsWith(subItem.path + '/')
            ))
          );
          
          if (!isCurrentMenuActive) {
            setOpenSubmenu(null);
          }
        }
        // 모바일 메뉴 닫기
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
  }, [isMobile, openSubmenu, location.pathname]);

  // 메뉴 활성화 상태 확인 함수
  const isMenuActive = useCallback((menuIndex) => {
    // 현재 페이지가 해당 메뉴의 서브메뉴 중 하나와 일치하는 경우
    if (defaultMenuItems[menuIndex] && defaultMenuItems[menuIndex].submenu) {
      const hasActiveSubmenu = defaultMenuItems[menuIndex].submenu.some(subItem => {
        // 해시가 포함된 경로인 경우 해시까지 비교
        if (subItem.path.includes('#')) {
          const [basePath, hash] = subItem.path.split('#');
          return basePath === location.pathname && `#${hash}` === location.hash;
        }
        // 정확한 경로 일치 또는 경로가 포함되는 경우 (예: /product-list/1이 /product-list를 포함)
        return subItem.path === location.pathname || location.pathname.startsWith(subItem.path + '/');
      });
      
      if (hasActiveSubmenu) {
        return true;
      }
    }
    
    // 현재 페이지가 해당 메뉴의 메인 페이지와 일치하는 경우
    const menuItem = defaultMenuItems[menuIndex];
    if (menuItem && menuItem.path === location.pathname) {
      return true;
    }
    
    // 메인 페이지 경로가 현재 경로에 포함되는 경우 (예: /products가 /product-list/1에 포함)
    if (menuItem && menuItem.path && location.pathname.startsWith(menuItem.path + '/')) {
      return true;
    }
    
    return false;
  }, [location.pathname, location.hash]);

  // 서브메뉴 활성화 상태 확인 함수
  const isSubmenuActive = useCallback((parentIndex, subIndex) => {
    // 현재 페이지가 해당 서브메뉴의 경로와 일치하는 경우
    if (defaultMenuItems[parentIndex] && defaultMenuItems[parentIndex].submenu) {
      const subItem = defaultMenuItems[parentIndex].submenu[subIndex];
      if (subItem) {
        // 해시가 포함된 경로인 경우 해시까지 비교
        if (subItem.path.includes('#')) {
          const [basePath, hash] = subItem.path.split('#');
          if (basePath === location.pathname && `#${hash}` === location.hash) {
            return true;
          }
        } else if (subItem.path === location.pathname) {
          return true;
        } else if (location.pathname.startsWith(subItem.path + '/')) {
          // 경로가 포함되는 경우 (예: /product-list/1이 /product-list를 포함)
          return true;
        }
      }
    }
    
    return false;
  }, [location.pathname, location.hash]);

  // 메뉴 클릭 핸들러
  const handleItemClick = useCallback((item, index) => {
    if (item.submenu && item.submenu.length > 0) {
      // 서브메뉴가 있는 메뉴 클릭 시 - 페이지 이동 없이 메뉴만 토글
      if (openSubmenu === index) {
        // 같은 메뉴를 다시 클릭하면 닫기
        setOpenSubmenu(null);
      } else {
        // 다른 메뉴를 클릭하면 해당 메뉴 열기
        setOpenSubmenu(index);
      }
      setActiveMenuIndex(index);
      setActiveSubmenuIndex(null);
    } else {
      // 서브메뉴가 없는 메뉴 클릭 시
      if (item.path) {
        navigate(item.path);
      }
      setActiveMenuIndex(index);
      setActiveSubmenuIndex(null);
      // 서브메뉴가 없는 메뉴 클릭 시 다른 서브메뉴들 닫기
      setOpenSubmenu(null);
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    }
  }, [isMobile, openSubmenu, navigate]);

  // 서브메뉴 클릭 핸들러
  const handleSubmenuClick = useCallback((submenuItem, subIndex, parentIndex) => {
    if (submenuItem.path) {
      // 회사소개 하단 메뉴의 경우 해시가 포함된 경로 처리
      if (submenuItem.path.includes('#')) {
        const [basePath, hash] = submenuItem.path.split('#');
        
        // 현재 경로와 다른 경우에만 navigate 호출
        if (location.pathname !== basePath) {
          navigate(basePath);
        }
        
        // 해시가 있는 경우 약간의 지연 후 스크롤 처리
        setTimeout(() => {
          // URL 해시 업데이트
          if (window.location.hash !== `#${hash}`) {
            window.location.hash = hash;
          }
          
          const element = document.querySelector(`#${hash}`);
          if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 300);
      } else {
        navigate(submenuItem.path);
      }
      
      // 서브메뉴 클릭 시 부모 메뉴와 해당 서브메뉴 모두 활성화
      setActiveMenuIndex(parentIndex);
      setActiveSubmenuIndex(subIndex);
      
      // 서브메뉴 클릭 후에도 서브메뉴는 유지 (닫지 않음)
      // 모바일에서만 메뉴 닫기
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    }
  }, [navigate, location.pathname, isMobile]);

  // 데스크톱에서 호버 시 서브메뉴 표시 (현재는 사용하지 않음)
  const handleMouseEnter = useCallback((index) => {
    // 호버로 서브메뉴를 열지 않음 - 클릭으로만 열림
  }, []);

  // 마우스가 메뉴를 벗어날 때 서브메뉴 숨김 (현재는 사용하지 않음)
  const handleMouseLeave = useCallback(() => {
    // 마우스가 벗어나도 서브메뉴를 닫지 않음
    // 필요시 여기에 로직 추가
  }, []);

  // 모바일 메뉴 토글
  const toggleMobileMenu = useCallback(() => {
    if (isMenuAnimating) return; // 애니메이션 중에는 클릭 무시
    
    setIsMenuAnimating(true);
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    // 애니메이션 완료 후 상태 초기화
    setTimeout(() => {
      setIsMenuAnimating(false);
    }, 300);
  }, [isMobileMenuOpen, isMenuAnimating]);

  // 로고 클릭 핸들러
  const handleLogoClick = useCallback(() => {
    navigate('/');
    // active 상태 해제
    setActiveMenuIndex(null);
    setActiveSubmenuIndex(null);
    // 서브메뉴 닫기
    setOpenSubmenu(null);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [navigate, isMobile]);

  // 현재 열린 서브메뉴 데이터
  const currentSubmenu = useMemo(() => {
    if (openSubmenu !== null && defaultMenuItems[openSubmenu]) {
      return defaultMenuItems[openSubmenu].submenu;
    }
    return null;
  }, [openSubmenu]);

  return (
    <>
      {/* 데스크톱 메뉴 */}
      {!isMobile && (
        <div className={`menu-wrapper${isMenuHidden ? ' hidden' : ''}`}>
          <div 
            ref={menuRef} 
            className={`menu-container menu-${orientation} menu-${theme} ${openSubmenu !== null ? 'open' : ''} ${activeMenuIndex !== null ? 'has-active-menu' : ''}`}
          >
            <div className="menu-logo">
              <img 
                src={logo} 
                alt="로고" 
                className="logo-image" 
                onClick={handleLogoClick}
              />
            </div>
            
            <nav className={`menu menu-${orientation} menu-${theme}`}>
              <ul className="menu-list">
                {defaultMenuItems.map((item, index) => (
                  <li 
                    key={index} 
                    className={`menu-item ${item.submenu && item.submenu.length > 0 ? 'has-submenu' : ''}`}
                    data-active={activeMenuIndex === index ? 'true' : 'false'}
                  >
                    <button
                      className={`menu-button ${item.submenu && item.submenu.length > 0 ? 'has-submenu' : ''} ${openSubmenu === index ? 'active' : ''} ${activeMenuIndex === index ? 'active' : ''}`}
                      onClick={() => handleItemClick(item, index)}
                      disabled={item.disabled}
                      aria-expanded={openSubmenu === index}
                      aria-haspopup={item.submenu && item.submenu.length > 0}
                    >
                      <span className="menu-text">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* 데스크톱용 서브메뉴 */}
            {currentSubmenu && (
              <div className="full-width-submenu" onMouseEnter={() => setOpenSubmenu(openSubmenu)}>
                <ul className="submenu-list">
                  {currentSubmenu.map((submenuItem, subIndex) => (
                    <li key={subIndex} className="submenu-item">
                      <button
                        className={`submenu-button ${isSubmenuActive(openSubmenu, subIndex) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSubmenuClick(submenuItem, subIndex, openSubmenu);
                        }}
                        type="button"
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
      )}
      
      {/* 모바일 햄버거 메뉴 */}
      {isMobile && (
        <HamburgerMenu
          isOpen={isMobileMenuOpen}
          onToggle={toggleMobileMenu}
          isAnimating={isMenuAnimating}
          menuItems={defaultMenuItems}
          onItemClick={handleItemClick}
          onSubmenuClick={handleSubmenuClick}
          isMenuActive={isMenuActive}
          isSubmenuActive={isSubmenuActive}
          openSubmenu={openSubmenu}
          onLogoClick={handleLogoClick}
        />
      )}
    </>
  );
};

export default Menu; 
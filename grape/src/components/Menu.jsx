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
import logo from '../assets/logo.png';
import HamburgerMenu from './HamburgerMenu';

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
      { label: '제품1', path: '/product/1' }, 
      { label: '제품2', path: '/products/hardware' }, 
      { label: '제품3', path: '/products/services' }, 
      { label: '제품4', path: '/products/new' } 
    ] 
  },
  { 
    label: '적용분야', 
    path: '/application-field-main',
    submenu: [ 
      { label: '적용분야1', path: '/application-field' }, 
      { label: '적용분야2', path: '/application-field-2' }, 
      { label: '적용분야3', path: '/application-field-3' }, 
      { label: '적용분야4', path: '/application-field-4' } 
    ] 
  },
  {   
    label: '납품사례', 
    path: '/cases',
    submenu: [ 
      { label: '사례1', path: '/case' }, 
      { label: '사례2', path: '/case-2' }, 
      { label: '사례3', path: '/case-3' }, 
      { label: '사례4', path: '/case-4' } 
    ] 
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
            // 데스크톱에서는 서브메뉴가 있는 메뉴의 서브메뉴를 열어두기
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
    
    // 현재 페이지에 해당하는 메뉴가 없으면 활성화 상태 초기화
    if (!foundActiveMenu && !foundActiveSubmenu) {
      setActiveMenuIndex(null);
      setActiveSubmenuIndex(null);
      // 데스크톱에서는 서브메뉴도 닫기
      if (!isMobile) {
        setOpenSubmenu(null);
      }
    }
  }, [location.pathname, location.hash, isMobile]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // 페이지의 다른 부분을 클릭하면 서브메뉴 닫기
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
        return subItem.path === location.pathname;
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
        }
      }
    }
    
    return false;
  }, [location.pathname, location.hash]);

  // 메뉴 클릭 핸들러
  const handleItemClick = useCallback((item, index) => {
    if (item.submenu && item.submenu.length > 0) {
      // 서브메뉴가 있는 메뉴 클릭 시
      if (isMobile) {
        // 모바일에서는 서브메뉴 토글만 (페이지 이동 없음)
        setOpenSubmenu(openSubmenu === index ? null : index);
      } else {
        // 데스크톱에서는 클릭 시 해당 서브메뉴 자동으로 열기
        setOpenSubmenu(index);
        // 해당 메뉴 활성화
        setActiveMenuIndex(index);
        setActiveSubmenuIndex(null);
        
        // 메인 메뉴 페이지로 이동
        if (item.path) {
          navigate(item.path);
        }
      }
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
      
      // 서브메뉴 클릭 후 서브메뉴 닫기
      setOpenSubmenu(null);
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    }
  }, [navigate, location.pathname, isMobile]);

  // 데스크톱에서 호버 시 서브메뉴 표시
  const handleMouseEnter = useCallback((index) => {
    if (!isMobile && defaultMenuItems[index].submenu && defaultMenuItems[index].submenu.length > 0) {
      setOpenSubmenu(index);
    }
  }, [isMobile]);

  // 마우스가 메뉴를 벗어날 때 서브메뉴 숨김 (제거 - 다른 부분 클릭할 때까지 유지)
  // const handleMouseLeave = useCallback(() => {
  //   if (!isMobile) {
  //     setOpenSubmenu(null);
  //   }
  // }, [isMobile]);

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
                    data-active={isMenuActive(index) ? 'true' : 'false'}
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <button
                      className={`menu-button ${item.submenu && item.submenu.length > 0 ? 'has-submenu' : ''} ${openSubmenu === index ? 'active' : ''} ${isMenuActive(index) ? 'active' : ''}`}
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
              <div className="full-width-submenu">
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
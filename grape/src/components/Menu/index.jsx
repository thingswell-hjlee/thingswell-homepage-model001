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
import { useAuth } from '../../contexts/AuthContext';

// 메뉴 아이템 데이터
const defaultMenuItems = [
  { 
    label: '회사', 
    path: '/about',
    submenu: [ 
      { label: '회사소개', path: '/about#greeting' },
      { label: '연혁', path: '/about#history' },
      { label: '면허인증특허', path: '/about#certificate' },
      { label: '오시는 길', path: '/about#location' },
      { label: '게시판', path: '/customer-service/announcement' },
      // { label: '문의하기', path: '/contact' },

    ] 
  },
 
  { 
    label: '사업분야', 
    path: '/solutions',
    submenu: [ 
      { label: '산업안전 솔루션', path: '/solutions/overview' }, 
      { label: '노인장애인안전 솔루션', path: '/solutions/chemical' },
      { label: '통합제어 솔루션', path: '/solutions/manufacturing' },
    ] 
  },

  { 
    label: '연구개발', 
    path: '/rnd',
    submenu: [ 
      { label: '멀티모달 상황인지', path: '/rnd/multimodal-awareness' },
      { label: '온디바이스 AI', path: '/rnd/on-device-ai' },
      { label: 'RAG 기반 LLM', path: '/rnd/rag-llm' },
      { label: '위험상황 조기감지', path: '/rnd/embedded-system' },
      { label: '인지장애 보조', path: '/rnd/smart-assistive-technology' },
      { label: 'AI 공기질 관리', path: '/rnd/air-quality-management' }, 
    ] 
  },
      { 
        label: '제품', 
        path: '/products',
        submenu: [
          { label: '스마트안전', path: '/products/safety' }, 
          { label: '관제시스템', path: '/products/monitoring' },
          { label: '통합제어', path: '/products/control/list' }, 
      
    ] 
  },
  // { 
  //   label: '적용분야', 
  //   path: '/application-field',
  //   submenu: [ 
  //     { label: '건물안전 및 자산관리', path: '/application-field/overview' }, 
  //     { label: '보안 및 감시', path: '/application-field/field-1' }, 
  //     { label: '제조업 안전 및 자산관리', path: '/application-field/field-2' }, 
  //     { label: '화학공업 안전 및 자산관리', path: '/application-field/field-3' } 
  //   ] 
  // },
  {   
    label: '고객사례', 
    path: '/cases',
    submenu: [ 
      { label: '산업안전자동화', path: '/cases/smart-safety' }, 
      { label: '스마트통합제어', path: '/cases/integrated-control' }, 
      { label: '정보통신', path: '/cases/information-communication' } 
    ] 
  },
  { 
    label: '정부지원사업', 
    path: '/government-support',
    submenu: [ 
      { label: '스마트안전장비 지원사업', path: '/government-support-detail' }, 
      // { label: '건강일터 조성지원사업', path: '/government-support-detail' }, 
      // { label: '소공인 클린제조환경조성', path: '/government-support-detail' }, 
    ] 
  },

  { 
    label: '쇼핑몰', 
    path: 'https://haa741123.cafe24.com/skin-skin1',
    external: true, // 외부 링크임을 명시 (Menu 컴포넌트에서 이 값 활용하여 새창 이동 처리 필요)
  }

];

// 브레이크포인트 상수
const MOBILE_BREAKPOINT = 768;

const Menu = ({ orientation = 'horizontal', theme = 'primary' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const hoverCloseTimerRef = useRef(null);
  const { isAdmin, isAuthenticated, signOut } = useAuth();
  
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
        // 외부 클릭 시에는 데스크톱에서 서브메뉴 닫기
        if (!isMobile && openSubmenu !== null) {
          setOpenSubmenu(null);
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
      // 서브메뉴가 있는 메뉴 클릭 시 첫 번째 세부메뉴로 이동
      const firstSubmenu = item.submenu[0];
      if (firstSubmenu && firstSubmenu.path) {
        if (firstSubmenu.path.includes('#')) {
          // 해시가 포함된 경로인 경우
          const [basePath, hash] = firstSubmenu.path.split('#');
          navigate(basePath);
          
          // 해시가 있는 경우 약간의 지연 후 스크롤 처리
          setTimeout(() => {
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
          navigate(firstSubmenu.path);
        }
      }
      
      // 메뉴 활성화 상태 설정
      setActiveMenuIndex(index);
      setActiveSubmenuIndex(0); // 첫 번째 서브메뉴 활성화
      
      // 모바일에서 메뉴 닫기
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    } else {
      // 서브메뉴가 없는 메뉴 클릭 시
      if (item.path) {
        if (item.external) {
          window.open(item.path, '_blank');
        } else {
          navigate(item.path);
        }
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

  // 데스크톱에서 호버 시 서브메뉴 표시
  const handleMouseEnter = useCallback((index) => {
    if (isMobile) return;
    
    // 다른 메뉴에 호버할 때 active 상태 해제
    if (activeMenuIndex !== null && activeMenuIndex !== index) {
      setActiveMenuIndex(null);
      setActiveSubmenuIndex(null);
    }
    
    const hasSubmenu = !!(defaultMenuItems[index] && defaultMenuItems[index].submenu && defaultMenuItems[index].submenu.length > 0);
    setOpenSubmenu(hasSubmenu ? index : null);
  }, [isMobile, activeMenuIndex]);

  // 메뉴 영역으로 다시 진입 시 닫힘 타이머 취소
  const cancelHoverCloseTimer = useCallback(() => {
    if (hoverCloseTimerRef.current) {
      clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
  }, []);

  // 마우스를 메뉴 영역에서 떼면 약간의 지연 후 현재 페이지 기준 하단메뉴로 복원
  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    cancelHoverCloseTimer();
    hoverCloseTimerRef.current = setTimeout(() => {
      // 메뉴바에 마우스가 떠 있을 때는 서브메뉴를 닫지 않음
      // 대신 현재 페이지 기준으로 서브메뉴 상태를 유지
      if (
        activeMenuIndex !== null &&
        defaultMenuItems[activeMenuIndex] &&
        defaultMenuItems[activeMenuIndex].submenu &&
        defaultMenuItems[activeMenuIndex].submenu.length > 0
      ) {
        setOpenSubmenu(activeMenuIndex);
      }
      // activeMenuIndex가 null이어도 현재 열린 서브메뉴는 유지
      hoverCloseTimerRef.current = null;
    }, 200);
  }, [isMobile, activeMenuIndex, cancelHoverCloseTimer]);

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (hoverCloseTimerRef.current) {
        clearTimeout(hoverCloseTimerRef.current);
        hoverCloseTimerRef.current = null;
      }
    };
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

  // 로그아웃 핸들러
  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      navigate('/');
      // 모바일 메뉴 닫기
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  }, [signOut, navigate, isMobile]);

  // 관리자 권한에 따라 메뉴 아이템 필터링
  const filteredMenuItems = useMemo(() => {
    return defaultMenuItems.filter(item => {
      // 관리자가 아닌 경우 정부지원사업과 쇼핑몰 메뉴 숨김
      if (!isAdmin()) {
        if (item.label === '정부지원사업' || item.label === '쇼핑몰') {
          return false;
        }
      }
      return true;
    });
  }, [isAdmin]);

  // 현재 열린 서브메뉴 데이터
  const currentSubmenu = useMemo(() => {
    if (openSubmenu !== null && filteredMenuItems[openSubmenu]) {
      return filteredMenuItems[openSubmenu].submenu;
    }
    return null;
  }, [openSubmenu, filteredMenuItems]);

  return (
    <>
      {/* 데스크톱 메뉴 */}
      {!isMobile && (
        <div className={`menu-wrapper${isMenuHidden ? ' hidden' : ''}`}>
          <div 
            ref={menuRef} 
            className={`menu-container menu-${orientation} menu-${theme} ${openSubmenu !== null ? 'open' : ''} ${activeMenuIndex !== null ? 'has-active-menu' : ''}`}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={cancelHoverCloseTimer}
          >
            <div className="menu-logo">
              <img 
                src={logo} 
                alt="로고" 
                className="logo-image" 
                onClick={handleLogoClick}
              />
            </div>
            
            {/* 로그아웃 버튼 */}
            {isAuthenticated() && (
              <div className="menu-logout">
                <button
                  className="logout-button"
                  onClick={handleLogout}
                  aria-label="로그아웃"
                >
                  로그아웃
                </button>
              </div>
            )}
            
            <nav className={`menu menu-${orientation} menu-${theme}`}>
              <ul className="menu-list">
                {filteredMenuItems.map((item, index) => (
                  <li 
                    key={index} 
                    className={`menu-item ${item.submenu && item.submenu.length > 0 ? 'has-submenu' : ''}`}
                    data-active={activeMenuIndex === index ? 'true' : 'false'}
                    onMouseEnter={() => handleMouseEnter(index)}
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
              <div className="full-width-submenu" onMouseEnter={cancelHoverCloseTimer}>
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
          menuItems={filteredMenuItems}
          onItemClick={handleItemClick}
          onSubmenuClick={handleSubmenuClick}
          isMenuActive={isMenuActive}
          isSubmenuActive={isSubmenuActive}
          openSubmenu={openSubmenu}
          onLogoClick={handleLogoClick}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Menu; 
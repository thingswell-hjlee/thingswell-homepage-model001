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
import useTranslation from '../../hooks/useTranslation';
import { stripLangPrefix, addLangPrefix } from '../../contexts/LanguageContext';

// Generate menu items using translation function
function getMenuItems(t) {
  return [
    {
      label: t('nav.safegaiPlatform'),
      path: '/safegai-platform',
    },
    {
      label: t('nav.company'),
      path: '/about',
      submenu: [ 
        { label: t('nav.companyIntro'), path: '/about/company' },
        { label: t('nav.organization'), path: '/about/organization' },
        { label: t('nav.history'), path: '/about/history' },
        { label: t('nav.licenses'), path: '/about/licenses' },
        { label: t('nav.directions'), path: '/about/directions' },
        { label: t('nav.board'), path: '/customer-service/announcement' },
      ] 
    },
    { 
      label: t('nav.solutions'), 
      path: '/solutions',
      submenu: [ 
        { label: t('nav.solutionIndustrial'), path: '/solutions/overview' }, 
        { label: t('nav.solutionElderly'), path: '/solutions/chemical' },
        { label: t('nav.solutionIntegrated'), path: '/solutions/manufacturing' },
      ] 
    },
    { 
      label: t('nav.rnd'), 
      path: '/rnd',
      submenu: [ 
        { label: t('nav.rndMultimodal'), path: '/rnd/multimodal-awareness' },
        { label: t('nav.rndOnDevice'), path: '/rnd/on-device-ai' },
        { label: t('nav.rndRAGLLM'), path: '/rnd/rag-llm' },
        { label: t('nav.rndEarlyDetection'), path: '/rnd/embedded-system' },
        { label: t('nav.rndAssistive'), path: '/rnd/smart-assistive-technology' },
        { label: t('nav.rndAirQuality'), path: '/rnd/air-quality-management' }, 
      ] 
    },
    { 
      label: t('nav.products'), 
      path: '/products',
      submenu: [
        { label: t('nav.productSafety'), path: '/products/safety' }, 
        { label: t('nav.productMonitoring'), path: '/products/monitoring' },
        { label: t('nav.productControl'), path: '/products/control/list' }, 
      ] 
    },
    {   
      label: t('nav.cases'), 
      path: '/cases',
      submenu: [ 
        { label: t('nav.caseSmartSafety'), path: '/cases/smart-safety' }, 
        { label: t('nav.caseIntegratedControl'), path: '/cases/integrated-control' }, 
        { label: t('nav.caseInfoComm'), path: '/cases/information-communication' } 
      ] 
    },
    { 
      label: t('nav.governmentSupport'), 
      path: '/government-support',
      submenu: [ 
        { label: t('nav.governmentSupportSmart'), path: '/government-support' }, 
      ] 
    },
    { 
      label: t('nav.shop'), 
      path: 'https://thingswell.cafe24.com/',
      external: true,
    },
    {
      label: t('nav.admin'),
      path: '/admin/dashboard',
      requireAuth: true,
    },
  ];
}

// 브레이크포인트 상수
const MOBILE_BREAKPOINT = 768;

const Menu = ({ orientation = 'horizontal', theme = 'primary' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const hoverCloseTimerRef = useRef(null);
  const { isAdmin, isAuthenticated, signOut } = useAuth();
  const { t, currentLang, setLanguage } = useTranslation();
  
  // Generate translated menu items
  const defaultMenuItems = useMemo(() => getMenuItems(t), [t]);

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

  // Helper: prefix a path with the current language
  const langPath = useCallback((path) => {
    if (!path || path.startsWith('http')) return path;
    return `/${currentLang}${path.startsWith('/') ? path : '/' + path}`;
  }, [currentLang]);

  // 현재 페이지에 따른 활성화된 메뉴 설정
  useEffect(() => {
    const currentPath = stripLangPrefix(location.pathname);
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
  }, [location.pathname, location.hash, isMobile, defaultMenuItems]);

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
    const currentPath = stripLangPrefix(location.pathname);
    // 현재 페이지가 해당 메뉴의 서브메뉴 중 하나와 일치하는 경우
    if (defaultMenuItems[menuIndex] && defaultMenuItems[menuIndex].submenu) {
      const hasActiveSubmenu = defaultMenuItems[menuIndex].submenu.some(subItem => {
        // 해시가 포함된 경로인 경우 해시까지 비교
        if (subItem.path.includes('#')) {
          const [basePath, hash] = subItem.path.split('#');
          return basePath === currentPath && `#${hash}` === location.hash;
        }
        // 정확한 경로 일치 또는 경로가 포함되는 경우 (예: /product-list/1이 /product-list를 포함)
        return subItem.path === currentPath || currentPath.startsWith(subItem.path + '/');
      });
      
      if (hasActiveSubmenu) {
        return true;
      }
    }
    
    // 현재 페이지가 해당 메뉴의 메인 페이지와 일치하는 경우
    const menuItem = defaultMenuItems[menuIndex];
    if (menuItem && menuItem.path === currentPath) {
      return true;
    }
    
    // 메인 페이지 경로가 현재 경로에 포함되는 경우 (예: /products가 /product-list/1에 포함)
    if (menuItem && menuItem.path && currentPath.startsWith(menuItem.path + '/')) {
      return true;
    }
    
    return false;
  }, [location.pathname, location.hash, defaultMenuItems]);

  // 서브메뉴 활성화 상태 확인 함수
  const isSubmenuActive = useCallback((parentIndex, subIndex) => {
    const currentPath = stripLangPrefix(location.pathname);
    // 현재 페이지가 해당 서브메뉴의 경로와 일치하는 경우
    if (defaultMenuItems[parentIndex] && defaultMenuItems[parentIndex].submenu) {
      const subItem = defaultMenuItems[parentIndex].submenu[subIndex];
      if (subItem) {
        // 해시가 포함된 경로인 경우 해시까지 비교
        if (subItem.path.includes('#')) {
          const [basePath, hash] = subItem.path.split('#');
          if (basePath === currentPath && `#${hash}` === location.hash) {
            return true;
          }
        } else if (subItem.path === currentPath) {
          return true;
        } else if (currentPath.startsWith(subItem.path + '/')) {
          // 경로가 포함되는 경우 (예: /product-list/1이 /product-list를 포함)
          return true;
        }
      }
    }
    
    return false;
  }, [location.pathname, location.hash, defaultMenuItems]);

  // 메뉴 클릭 핸들러
  const handleItemClick = useCallback((item, index) => {
    if (item.submenu && item.submenu.length > 0) {
      // 서브메뉴가 있는 메뉴 클릭 시 첫 번째 세부메뉴로 이동
      const firstSubmenu = item.submenu[0];
      if (firstSubmenu && firstSubmenu.path) {
        if (firstSubmenu.path.includes('#')) {
          // 해시가 포함된 경로인 경우
          const [basePath, hash] = firstSubmenu.path.split('#');
          navigate(langPath(basePath));
          
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
          navigate(langPath(firstSubmenu.path));
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
          window.open(item.path, '_blank', 'noopener,noreferrer');
        } else {
          navigate(langPath(item.path));
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
  }, [isMobile, openSubmenu, navigate, langPath]);

  // 서브메뉴 클릭 핸들러
  const handleSubmenuClick = useCallback((submenuItem, subIndex, parentIndex) => {
    if (submenuItem.path) {
      const currentPath = stripLangPrefix(location.pathname);
      // 회사소개 하단 메뉴의 경우 해시가 포함된 경로 처리
      if (submenuItem.path.includes('#')) {
        const [basePath, hash] = submenuItem.path.split('#');
        
        // 현재 경로와 다른 경우에만 navigate 호출
        if (currentPath !== basePath) {
          navigate(langPath(basePath));
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
        navigate(langPath(submenuItem.path));
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
  }, [navigate, location.pathname, isMobile, langPath]);

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
  }, [isMobile, activeMenuIndex, defaultMenuItems]);

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
    navigate(langPath('/'));
    // active 상태 해제
    setActiveMenuIndex(null);
    setActiveSubmenuIndex(null);
    // 서브메뉴 닫기
    setOpenSubmenu(null);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [navigate, isMobile, langPath]);

  // 로그아웃 핸들러
  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      navigate(langPath('/'));
      // 모바일 메뉴 닫기
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  }, [signOut, navigate, isMobile, langPath]);

  // 로그인 상태에 따라 메뉴 아이템 필터링
  const filteredMenuItems = useMemo(() => {
    return defaultMenuItems.filter(item => {
      // requireAuth가 true인 항목은 로그인된 경우에만 표시
      if (item.requireAuth && !isAuthenticated()) {
        return false;
      }
      // 로그인하지 않은 경우 정부지원사업 메뉴 숨김
      if (!isAuthenticated()) {
        if (item.path === '/government-support') {
          return false;
        }
      }
      return true;
    });
  }, [isAuthenticated, defaultMenuItems]);

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
                alt={t('common.logoAlt')} 
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
                  aria-label={t('common.logout')}
                >
                  {t('common.logout')}
                </button>
              </div>
            )}

            {/* KOR/ENG 언어 토글 */}
            <div className="menu-lang-toggle">
              <button
                className={`lang-toggle-btn${currentLang === 'ko' ? ' active' : ''}`}
                onClick={() => setLanguage('ko')}
                aria-label={t('ui1.menu.koreanLabel')}
              >
                KOR
              </button>
              <span className="lang-toggle-divider">|</span>
              <button
                className={`lang-toggle-btn${currentLang === 'en' ? ' active' : ''}`}
                onClick={() => setLanguage('en')}
                aria-label="English"
              >
                ENG
              </button>
            </div>
            
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
          currentLang={currentLang}
          setLanguage={setLanguage}
          t={t}
        />
      )}
    </>
  );
};

export default Menu; 
/**
 * HamburgerMenu 컴포넌트
 * 
 * 모바일 환경에서 사용되는 햄버거 메뉴 컴포넌트입니다.
 * 메뉴 토글 버튼과 모바일 메뉴를 포함합니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {boolean} props.isOpen - 메뉴 열림 상태
 * @param {Function} props.onToggle - 메뉴 토글 함수
 * @param {boolean} props.isAnimating - 애니메이션 상태
 * @param {Array} props.menuItems - 메뉴 아이템 배열
 * @param {Function} props.onItemClick - 메뉴 아이템 클릭 핸들러
 * @param {Function} props.isMenuActive - 메뉴 활성화 상태 확인 함수
 * @param {Function} props.onLogoClick - 로고 클릭 핸들러
 * 
 * 사용법:
 * <HamburgerMenu 
 *   isOpen={isMobileMenuOpen}
 *   onToggle={toggleMobileMenu}
 *   isAnimating={isMenuAnimating}
 *   menuItems={defaultMenuItems}
 *   onItemClick={handleItemClick}
 *   isMenuActive={isMenuActive}
 *   onLogoClick={handleLogoClick}
 * />
 */
import React, { useEffect, useState } from 'react';
import './HamburgerMenu.css';
import logo from '../../assets/logo.png';

const HamburgerMenu = ({
  isOpen,
  onToggle,
  isAnimating,
  menuItems,
  onItemClick,
  onSubmenuClick,
  isMenuActive,
  onLogoClick,
  isAuthenticated,
  onLogout,
  currentLang,
  setLanguage,
  t
}) => {
  // 메뉴가 열렸을 때 root 스크롤 방지
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (isOpen && rootElement) {
      rootElement.style.overflow = 'hidden';
    } else if (rootElement) {
      rootElement.style.overflowY = 'auto';
      rootElement.style.overflowX = 'hidden';
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (rootElement) {
        rootElement.style.overflowY = 'auto';
        rootElement.style.overflowX = 'hidden';
      }
    };
  }, [isOpen]);

  // 세부메뉴 상태 관리
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  // menuItems prop을 사용하여 메뉴 렌더링
  // menuItems가 없으면 빈 배열 사용
  const displayMenuItems = menuItems || [];

  // 메뉴 클릭 핸들러
  const handleMenuClick = (item, index) => {
    if (item.submenu && item.submenu.length > 0) {
      // 세부메뉴가 있는 경우 토글
      setActiveSubMenu(activeSubMenu === item.label ? null : item.label);
    } else {
      // 세부메뉴가 없는 경우 기존 onItemClick 호출
      onItemClick(item, index);
    }
  };

  return (
    <>
      {/* 햄버거 토글 버튼 */}
      <button 
        className={`mobile-menu-toggle ${isOpen ? 'active' : ''}`}
        onClick={onToggle}
        aria-label={isOpen ? t('common.menuClose') : t('common.menuOpen')}
        aria-expanded={isOpen}
        disabled={isAnimating}
      >
        {!isOpen && (
          <div className="hamburger-icon">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        )}
        <span className="sr-only">
          {isOpen ? t('common.menuClose') : t('common.menuOpen')}
        </span>
      </button>

      {/* 메뉴 오버레이 */}
      {isOpen && (
        <div 
          className="menu-overlay"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
      
      <div className={`hamburger-menu-wrapper${isOpen ? ' mobile-open' : ''}`}>
        <div className="hamburger-menu-container">

          <nav className={`hamburger-menu ${isOpen ? 'mobile-visible' : ''}`}>
            <ul className="hamburger-menu-list">
              {/* 메인 메뉴 섹션 */}
              <div className="main-menu-section">
                  <li className="logo-list-item">
                    <a href="/" onClick={(e) => { e.preventDefault(); onLogoClick(); }}>
                      <img src={logo} alt={t('common.logoAlt')} />
                    </a>
                    {/* KOR/ENG 언어 토글 */}
                    <div className="hamburger-lang-toggle">
                      <button
                        className={`hamburger-lang-btn${currentLang === 'ko' ? ' active' : ''}`}
                        onClick={() => setLanguage('ko')}
                        aria-label={t('ui3.hamburger.langKoreanLabel')}
                      >
                        KOR
                      </button>
                      <span className="hamburger-lang-divider">|</span>
                      <button
                        className={`hamburger-lang-btn${currentLang === 'en' ? ' active' : ''}`}
                        onClick={() => setLanguage('en')}
                        aria-label="English"
                      >
                        ENG
                      </button>
                    </div>
                  </li>
                {displayMenuItems.map((item, index) => (
                  <li key={`main-${index}`} className="hamburger-menu-item main-item">
                    {item.submenu && item.submenu.length > 0 ? (
                      <>
                        <button
                          className={`hamburger-menu-button main-menu ${activeSubMenu === item.label ? 'active' : ''}`}
                          onClick={() => handleMenuClick(item, index)}
                        >
                          <span className="hamburger-menu-text">{item.label}</span>
                          <span className={`submenu-arrow ${activeSubMenu === item.label ? 'rotated' : ''}`}>
                            ›
                          </span>
                        </button>
                        {/* 세부메뉴 */}
                        {activeSubMenu === item.label && (
                          <ul className="submenu-list">
                            {item.submenu.map((subItem, subIndex) => (
                              <li key={`sub-${index}-${subIndex}`} className="hamburger-menu-item sub-item">
                                <a
                                  href={subItem.path}
                                  className="hamburger-menu-button sub-menu"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (onSubmenuClick) {
                                      onSubmenuClick(subItem, subIndex, index);
                                    } else {
                                      window.location.href = subItem.path;
                                    }
                                  }}
                                >
                                  <span className="hamburger-menu-text">{subItem.label}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <button
                        className="hamburger-menu-button main-menu"
                        onClick={() => handleMenuClick(item, index)}
                      >
                        <span className="hamburger-menu-text">{item.label}</span>
                      </button>
                    )}
                  </li>
                ))}
              </div>

              
              {/* 로그아웃 버튼 */}
              {isAuthenticated && isAuthenticated() && (
                <li className="hamburger-menu-item">
                  <button
                    className="hamburger-menu-button bottom-menu"
                    onClick={onLogout}
                    aria-label={t('common.logout')}
                  >
                    <span className="hamburger-menu-text">{t('common.logout')}</span>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu; 
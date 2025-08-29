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
import React, { useEffect } from 'react';
import './HamburgerMenu.css';
import logo from '../../assets/logo.png';

const HamburgerMenu = ({
  isOpen,
  onToggle,
  isAnimating,
  menuItems,
  onItemClick,
  isMenuActive,
  onLogoClick,
  isAuthenticated,
  onLogout
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

  return (
    <>
      {/* 햄버거 토글 버튼 - 항상 표시 */}
      <button 
        className={`mobile-menu-toggle ${isOpen ? 'active' : ''}`}
        onClick={onToggle}
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isOpen}
        disabled={isAnimating}
      >
        <div className="hamburger-icon">
          <span className="hamburger-line line-1"></span>
          <span className="hamburger-line line-2"></span>
          <span className="hamburger-line line-3"></span>
        </div>
        <span className="sr-only">
          {isOpen ? "메뉴 닫기" : "메뉴 열기"}
        </span>
      </button>

      {/* 메뉴 오버레이 - 메뉴가 열렸을 때만 표시 */}
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
              {isOpen && (
                <li className="hamburger-menu-item logo-list-item">
                  <img 
                    src={logo} 
                    alt="로고" 
                    className="logo-image" 
                    onClick={onLogoClick}
                  />
                </li>
              )}
              {menuItems.map((item, index) => {
                // 메뉴 타입 결정 (아이콘 표시용)
                const getMenuType = (label) => {
                  if (label.includes('회사')) return 'company';
                  if (label.includes('사업') || label.includes('솔루션')) return 'business';
                  if (label.includes('제품') || label.includes('상품')) return 'products';
                  if (label.includes('연구') || label.includes('R&D')) return 'rnd';
                  if (label.includes('고객') || label.includes('지원')) return 'customer';
                  return 'default';
                };
                
                return (
                  <li 
                    key={index} 
                    className="hamburger-menu-item"
                    data-active={isMenuActive(index) ? 'true' : 'false'}
                  >
                    <button
                      className={`hamburger-menu-button ${isMenuActive(index) ? 'active' : ''}`}
                      data-menu={getMenuType(item.label)}
                      onClick={() => onItemClick(item, index)}
                      disabled={item.disabled}
                      aria-current={isMenuActive(index) ? 'page' : undefined}
                    >
                      <span className="hamburger-menu-text">{item.label}</span>
                    </button>
                  </li>
                );
              })}
              
              {/* 모바일 로그아웃 버튼 */}
              {isAuthenticated && isAuthenticated() && (
                <li className="hamburger-menu-item">
                  <button
                    className="hamburger-menu-button logout-button"
                    data-menu="logout"
                    onClick={onLogout}
                    aria-label="로그아웃"
                  >
                    <span className="hamburger-menu-text">로그아웃</span>
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
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
import React from 'react';
import './HamburgerMenu.css';
import logo from '../assets/logo.png';
import hamburgerIcon from '../assets/hamburger.svg';

const HamburgerMenu = ({
  isOpen,
  onToggle,
  isAnimating,
  menuItems,
  onItemClick,
  isMenuActive,
  onLogoClick
}) => {
  return (
    <>
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
          <div className="hamburger-menu-logo">
            <button 
              className="mobile-menu-toggle"
              onClick={onToggle}
              aria-label="메뉴 열기"
              disabled={isAnimating}
            >
              <img src={hamburgerIcon} alt="메뉴" className="hamburger-icon" />
            </button>
          </div>
          
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
              {menuItems.map((item, index) => (
                <li 
                  key={index} 
                  className="hamburger-menu-item"
                  data-active={isMenuActive(index) ? 'true' : 'false'}
                >
                  <button
                    className={`hamburger-menu-button ${isMenuActive(index) ? 'active' : ''}`}
                    onClick={() => onItemClick(item, index)}
                    disabled={item.disabled}
                  >
                    <span className="hamburger-menu-text">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu; 
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

  // 세부메뉴 상태 관리
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  // 새로운 메뉴 구조 정의
  const mainMenuItems = [
    { label: '회사', type: 'menu', hasSubmenu: true },
    { label: '사업분야', type: 'main', hasSubmenu: true },
    { label: '연구개발', type: 'main', hasSubmenu: true },
    { label: '제품', type: 'main', hasSubmenu: true },
    { label: '고객사례', type: 'main', hasSubmenu: true }
  ];

  // 세부메뉴 데이터 (데스크톱 메뉴와 동일한 주소로 맞춤)
  const subMenuData = {
    '회사': [
      { label: '회사소개', href: '/about#greeting' },
      { label: '연혁', href: '/about#history' },
      { label: '면허인증특허', href: '/about#certificate' },
      { label: '오시는 길', href: '/about#location' },
      { label: '게시판', href: '/customer-service/announcement' }
    ],
    '사업분야': [
      { label: '산업안전 솔루션', href: '/solutions/overview' },
      { label: '노인장애인안전 솔루션', href: '/solutions/chemical' },
      { label: '통합제어 솔루션', href: '/solutions/manufacturing' }
    ],
    '연구개발': [
      { label: '멀티모달 상황인지', href: '/rnd/multimodal-awareness' },
      { label: '온디바이스 AI', href: '/rnd/on-device-ai' },
      { label: 'RAG 기반 LLM', href: '/rnd/rag-llm' },
      { label: '위험상황 조기감지', href: '/rnd/embedded-system' },
      { label: '인지장애 보조', href: '/rnd/smart-assistive-technology' },
      { label: 'AI 공기질 관리', href: '/rnd/air-quality-management' }
    ],
    '제품': [
      { label: '스마트안전', href: '/products/safety' },
      { label: '관제시스템', href: '/products/monitoring' },
      { label: '통합제어', href: '/products/control/list' }
    ],
    '고객사례': [
      { label: '산업안전자동화', href: '/cases/smart-safety' },
      { label: '스마트통합제어', href: '/cases/integrated-control' },
      { label: '정보통신', href: '/cases/information-communication' }
    ]
  };

  // 메뉴 클릭 핸들러
  const handleMenuClick = (item, index) => {
    if (item.hasSubmenu) {
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
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
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
          {isOpen ? "메뉴 닫기" : "메뉴 열기"}
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
                    <a href="/">
                      <img src={logo} alt="logo" />
                    </a>
                  </li>
                {mainMenuItems.map((item, index) => (
                  <li key={`main-${index}`} className="hamburger-menu-item main-item">
                    <button
                      className={`hamburger-menu-button main-menu ${activeSubMenu === item.label ? 'active' : ''}`}
                      onClick={() => handleMenuClick(item, index)}
                    >
                      <span className="hamburger-menu-text">{item.label}</span>
                      {item.hasSubmenu && (
                        <span className={`submenu-arrow ${activeSubMenu === item.label ? 'rotated' : ''}`}>
                          ›
                        </span>
                      )}
                    </button>
                    {/* 세부메뉴 */}
                    {activeSubMenu === item.label && item.hasSubmenu && (
                      <ul className="submenu-list">
                        {subMenuData[item.label].map((subItem, subIndex) => (
                          <li key={`sub-${index}-${subIndex}`} className="hamburger-menu-item sub-item">
                            <a
                              href={subItem.href}
                              className="hamburger-menu-button sub-menu"
                              onClick={(e) => {
                                e.preventDefault();
                                // 페이지 이동 로직 추가 가능
                                window.location.href = subItem.href;
                              }}
                            >
                              <span className="hamburger-menu-text">{subItem.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
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

  // 하단 메뉴 링크 매핑 함수
  function getBottomMenuHref(label) {
    const linkMap = {
      '방문': { href: '/about' },
      '자료실': { href: '/customer-service/announcement' },
      '고객지원': { href: '/customer-service/announcement' },
      '파트너십': { href: '/about' }
    };
    return linkMap[label] || { href: '/' };
  }
};

export default HamburgerMenu; 
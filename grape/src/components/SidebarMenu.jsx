/**
 * SidebarMenu 컴포넌트
 * 
 * 사이드바 형태의 네비게이션 메뉴를 렌더링하는 컴포넌트입니다.
 * 스크롤 위치에 따라 현재 활성화된 메뉴 항목을 자동으로 업데이트하며,
 * 메뉴 클릭 시 해당 섹션으로 부드럽게 스크롤합니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {Array} props.menuItems - 메뉴 항목 배열 (기본값: [])
 * @param {string} props.menuItems[].id - 메뉴 항목 고유 ID
 * @param {string} props.menuItems[].label - 메뉴 항목 표시 텍스트
 * @param {Object} props.sectionRefs - 섹션별 ref 객체 (기본값: {})
 * @param {string} props.menuTitle - 메뉴 제목 (기본값: '사이드메뉴')
 * 
 * 사용법:
 * <SidebarMenu 
 *   menuItems={[
 *     { id: 'section1', label: '섹션 1' },
 *     { id: 'section2', label: '섹션 2' },
 *     { id: 'section3', label: '섹션 3' }
 *   ]}
 *   sectionRefs={{
 *     section1: section1Ref,
 *     section2: section2Ref,
 *     section3: section3Ref
 *   }}
 *   menuTitle="목차"
 * />
 * 
 * 주요 기능:
 * - 스크롤 위치에 따른 자동 메뉴 활성화
 * - 클릭 시 해당 섹션으로 부드러운 스크롤
 * - 현재 활성화된 메뉴 항목 시각적 구분
 */
import React, { useState, useEffect } from 'react';
import './SidebarMenu.css';

const SidebarMenu = ({ menuItems = [], sectionRefs = {}, menuTitle = '사이드메뉴' }) => {
  const [activeItem, setActiveItem] = useState('');

  const handleMenuClick = (item) => {
    const ref = sectionRefs[item.id];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveItem(item.id);
    }
  };

  // 스크롤 위치에 따라 활성 메뉴 항목 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.filter(item => item.id);
      const scrollPosition = window.scrollY + 200; // 오프셋 증가

      let activeSection = null;

      // 각 섹션의 위치를 확인
      for (let i = 0; i < sections.length; i++) {
        const ref = sectionRefs[sections[i].id];
        if (ref && ref.current) {
          const element = ref.current;
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;

          // 스크롤 위치가 섹션 범위 내에 있는지 확인
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            activeSection = sections[i].id;
            break;
          }
        }
      }

      // 맨 아래에 도달하면 마지막 섹션 활성화
      if (
        (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2
      ) {
        if (sections.length > 0) {
          activeSection = sections[sections.length - 1].id;
        }
      } else if (!activeSection && sections.length > 0) {
        const lastSection = sections[sections.length - 1];
        const lastRef = sectionRefs[lastSection.id];
        if (lastRef && lastRef.current) {
          const lastElement = lastRef.current;
          const lastElementTop = lastElement.offsetTop;
          if (scrollPosition >= lastElementTop) {
            activeSection = lastSection.id;
          }
        }
      }

      if (activeSection) {
        setActiveItem(activeSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // 초기 로드 시에도 실행
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems, sectionRefs]);

  return (
    <div className="sidebar-content">
      <h3>{menuTitle}</h3>
      <ul>
        {menuItems.map((item, idx) => (
          <li 
            key={idx} 
            onClick={() => handleMenuClick(item)}
            className={activeItem === item.id ? 'active' : ''}
            style={{ cursor: 'pointer' }}
          >
            {item.label || item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu; 
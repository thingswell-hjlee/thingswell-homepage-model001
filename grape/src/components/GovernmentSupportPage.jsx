import React, { useState, useEffect, useRef } from 'react';
import '../pages/Goverment_support/Government_support_main.css';
import SolutionCard from './SolutionCard';
import ApplicationCardsSection from './ApplicationCardsSection';
import ApplicationPeriodCard from './ApplicationPeriodCard';
import SupportInfoCard from './SupportInfoCard';
import RestrictionCard from './RestrictionCard';
import FormCard from './FormCard';
import SidebarMenu from './SidebarMenu';
import { governmentSupportData } from '../data/governmentSupportData';

// 이미지들을 직접 import
import welding from '../assets/welding.jpg';
import grinding from '../assets/grinding.jpg';
import construction from '../assets/construction.jpg';
import manufacturing from '../assets/manufacturing.jpg';
import dangerous from '../assets/dangerous.jpg';
import fire from '../assets/fire.jpg';
import collapse from '../assets/collapse.jpg';
import collision from '../assets/collision.jpg';
import falldown from '../assets/falldown.jpg';
import poe from '../assets/poe.jpg';
import personnel_violations from '../assets/Personnel_violations.jpg';
import logo from '../assets/logo.jpg';

// 이미지 매핑 객체
const imageMapping = {
  welding,
  grinding,
  construction,
  manufacturing,
  dangerous,
  fire,
  collapse,
  collision,
  falldown,
  poe,
  "Personnel_violations": personnel_violations,
  logo
};

// 이미지 가져오기 함수
const getImage = (imageName) => {
  return imageMapping[imageName] || logo;
};

const GovernmentSupportPage = ({ supportId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallDesktop, setIsSmallDesktop] = useState(false);

  // 지원사업 데이터 가져오기
  const supportData = governmentSupportData[supportId];
  
  if (!supportData) {
    return <div>지원사업을 찾을 수 없습니다.</div>;
  }

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 768;
      const smallDesktop = window.innerWidth <= 1400;
      setIsMobile(mobile);
      setIsSmallDesktop(smallDesktop);
      
      // 1400px 이하에서는 사이드메뉴 자동으로 닫기
      if (smallDesktop) {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // 사이드메뉴 토글 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 각 섹션별 ref 생성
  const solutionRef = useRef(null);
  const applicationRef = useRef(null);
  const periodRef = useRef(null);
  const supportRef = useRef(null);
  const restrictionRef = useRef(null);
  const formRef = useRef(null);

  // ref를 객체로 묶어서 SidebarMenu에 전달
  const sectionRefs = {
    solution: solutionRef,
    application: applicationRef,
    period: periodRef,
    support: supportRef,
    restriction: restrictionRef,
    form: formRef,
  };

  // 데이터 준비
  const solutionData = {
    subtitle: supportData.subtitle,
    title: supportData.title,
    description: supportData.description,
    image: getImage(supportData.image),
    imageAlt: supportData.imageAlt
  };

  // 이미지 경로 변환
  const applicationCardsData = supportData.applicationCards.map(card => ({
    ...card,
    image: getImage(card.image)
  }));

  const applicationPeriodData = supportData.applicationPeriod;
  const supportInfoData = supportData.supportInfo;
  const restrictionData = supportData.restrictions;
  const FormData = supportData.form;

  // 사이드바 제목 및 메뉴 항목 정의
  const sidebarTitle = supportData.sidebarTitle;
  const sidebarMenuItems = [
    { id: "solution", label: "개요" },
    { id: "application", label: "적용분야" },
    { id: "period", label: "신청기간" },
    { id: "support", label: "지원정보" },
    { id: "restriction", label: "지원 제한사항" },
    { id: "form", label: "문의하기" }
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className={`sidebar ${isSidebarOpen ? 'show' : ''}`}>
            {(!isMobile) && (
              <SidebarMenu menuItems={sidebarMenuItems} sectionRefs={sectionRefs} menuTitle={sidebarTitle} />
            )}
          </div>
          <div className="main-content">
            <div className="solutions-section">
              <SolutionCard ref={solutionRef} {...solutionData} />
              
              <ApplicationCardsSection ref={applicationRef} applicationCardsData={applicationCardsData} />
              
              <ApplicationPeriodCard ref={periodRef} {...applicationPeriodData} />
              
              <SupportInfoCard ref={supportRef} {...supportInfoData} />
              
              <RestrictionCard ref={restrictionRef} {...restrictionData} />
              
              <FormCard ref={formRef} {...FormData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSupportPage; 
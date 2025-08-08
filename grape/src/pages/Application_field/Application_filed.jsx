import React, { useState, useEffect, useRef } from 'react';
import SolutionCard from '../../components/SolutionCard';
import ApplicationCardsSection from '../../components/ApplicationCardsSection';
import Form from '../../components/Form';
import SidebarMenu from '../../components/SidebarMenu';
import FeatureDescription from '../../components/FeatureDescription';
import welding from '../../assets/welding.jpg';
import falldown from '../../assets/falldown.jpg';
import dangerous from '../../assets/dangerous.jpg';
import fire from '../../assets/fire.jpg';
import Collision from '../../assets/collision.jpg';
import POE from '../../assets/poe.jpg';
import Personel_violation from '../../assets/Personnel_violations.jpg';
import Collapse from '../../assets/collapse.jpg';
import manufacturing from '../../assets/manufacturing.jpg';

const Application_filed = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallDesktop, setIsSmallDesktop] = useState(false);

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

  // 각 섹션별 ref 생성
  const solutionRef = useRef(null);
  const applicationRef = useRef(null);
  const featureDescriptionRef = useRef(null);
  const formRef = useRef(null);

  // ref를 객체로 묶어서 SidebarMenu에 전달
  const sectionRefs = {
    solution: solutionRef,  
    ApplicationCardsSection: applicationRef,
    FeatureDescription: featureDescriptionRef,
    form: formRef,
  };

  // 데이터 직접 정의
  const solutionData = {
    subtitle: "Construction safety solutions",
    title: "건설 안전 및 자산관리",
    description: "건설 현장의 특수한 환경과 위험 요소를 고려한 전문 안전 솔루션입니다. 고소작업, 중장비 운전, 구조물 시공 등 건설업 특화 위험 요소를 실시간으로 모니터링하고 예방합니다.",
    image: welding,
    imageAlt: "건설 안전 및 자산관리",
    buttonText: "데모 신청",
    link: "/contact"
  };

  const applicationCardsData = [
    {
      image: Collapse,
      imageAlt: "쓰러짐",
      label: "Collapse",
      title: "쓰러짐"
    },
    {
      image: fire,
      imageAlt: "화재",
      label: "Fire",
      title: "화재"
    },
    {
      image: Collision,
      imageAlt: "충돌",
      label: "Collision",
      title: "충돌"
    },
  ];

  const featureDescriptions = [
    {
      image: manufacturing,
      title: "AI 기반 실시간 모니터링",
      description: "산업안전 솔루션은 AI 기반 실시간 모니터링을 통해 작업 현장의 위험 요소를 사전에 감지하고 예방합니다. 고성능 영상 분석 알고리즘을 통해 작업자의 행동 패턴을 분석하여 잠재적 위험을 조기에 발견합니다."
    },  
    {
      youtubeUrl: "https://www.youtube.com/watch?v=gZ1h4kgTC28&ab_channel=intenseye",
      title: "실시간 안전 모니터링 데모",
      description: "실제 산업 현장에서 적용되는 AI 기반 안전 모니터링 시스템의 데모 영상입니다. 실시간으로 작업자의 행동을 분석하고 위험 상황을 감지하는 과정을 확인할 수 있습니다."
    }
  ];

  const formData = {
    title: "문의하기",
    subtitle: ""
  };


  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          {/* <div className={`sidebar ${isSidebarOpen ? 'show' : ''}`}>
            {(!isSmallDesktop) && (
              <SidebarMenu menuItems={sidebarMenuItems} sectionRefs={sectionRefs} menuTitle={sidebarTitle} />
            )}
          </div> */}
          <div className="main-content">
            <div className="solutions-section menu-spacing">
              <SolutionCard ref={solutionRef} {...solutionData} showButton={true} variant="compact" />
              
              {applicationCardsData && (
                <ApplicationCardsSection ref={applicationRef} applicationCardsData={applicationCardsData} boxName="건설 현장 안전 관리" subtitle="Construction safsety solutions" />
              )}
              
              {featureDescriptions && featureDescriptions.map((feature, index) => (
                <FeatureDescription 
                  key={index}
                  ref={index === 0 ? featureDescriptionRef : null}
                  {...feature} 
                  reverse={index % 2 === 1}
                />
              ))}
              
              <Form ref={formRef} {...formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application_filed;
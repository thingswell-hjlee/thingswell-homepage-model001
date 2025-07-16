import React, { useState, useEffect, useRef } from 'react';
import SolutionCard from '../../components/SolutionCard';
import ApplicationCardsSection from '../../components/ApplicationCardsSection';
import FormCard from '../../components/FormCard';
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

const Soulution = () => {
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
    subtitle: "Industrial safety solutions",
    title: "산업안전 솔루션",
    description: "산업안전 솔루션은 산업 현장에서 발생할 수 있는 각종 사고와 위험을 사전에 예방하고, 근로자의 안전을 체계적으로 관리하기 위해 도입되는 첨단 시스템입니다. AI, IoT, 빅데이터, 영상 분석 등 다양한 IT 기술이 융합되어, 실시간 위험 감지와 신속한 대응이 가능합니다",
    image: welding,
    imageAlt: "스마트 안전장비 지원사업",
    buttonText: "데모 신청"
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
    {
      image: falldown,
      imageAlt: "낙상",
      label: "Falldown",
      title: "낙상"
    },
    {
      image: dangerous,
      imageAlt: "위험지역 접근",
      label: "Dangerous areas",
      title: "위험지역 접근"
    },
    {
      image: Personel_violation,
      imageAlt: "작업인원 위반",
      label: "Personnel violations",
      title: "작업인원 위반"
    },
    {
      image: POE,
      imageAlt: "POE 미착용",
      label: "POE detection",
      title: "POE 미착용"
    },
  ];

  const featureDescriptions = [
    {
      image: manufacturing,
      title: "AI 기반 실시간 모니터링",
      description: "산업안전 솔루션은 AI 기반 실시간 모니터링을 통해 작업 현장의 위험 요소를 사전에 감지하고 예방합니다. 고성능 영상 분석 알고리즘을 통해 작업자의 행동 패턴을 분석하여 잠재적 위험을 조기에 발견합니다."
    },
    {
      image: welding,
      title: "IoT 센서 기술 활용",
      description: "IoT 센서와 영상 분석 기술을 활용하여 작업자의 안전을 최우선으로 보호합니다. 다양한 센서를 통해 환경 데이터를 수집하고, 실시간으로 위험 상황을 감지하여 즉시 대응할 수 있습니다."
    },
    {
      image: fire,
      title: "빅데이터 분석 시스템",
      description: "빅데이터 분석을 통한 사고 예방 시스템을 구축합니다. 과거 사고 데이터와 현재 상황을 비교 분석하여 위험도를 예측하고, 사전 예방 조치를 제안합니다."
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

  const sidebarTitle = "산업안전 솔루션";
  const sidebarMenuItems = [
    { id: "solution", label: "개요" },
    { id: "ApplicationCardsSection", label: "기능" },
    { id: "FeatureDescription", label: "특징" },
    { id: "form", label: "문의하기" }
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          {/* <div className={`sidebar ${isSidebarOpen ? 'show' : ''}`}>
            {(!isMobile) && (
              <SidebarMenu menuItems={sidebarMenuItems} sectionRefs={sectionRefs} menuTitle={sidebarTitle} />
            )}
          </div> */}
          <div className="main-content">
            <div className="solutions-section menu-spacing">
              <SolutionCard ref={solutionRef} {...solutionData} showButton={true} variant="compact" />
              
              {applicationCardsData && (
                <ApplicationCardsSection ref={applicationRef} applicationCardsData={applicationCardsData} boxName="AI기반 영역 제어" />
              )}
              
              {featureDescriptions && featureDescriptions.map((feature, index) => (
                <FeatureDescription 
                  key={index}
                  ref={index === 0 ? featureDescriptionRef : null}
                  {...feature} 
                  reverse={index % 2 === 1}
                />
              ))}
              
              <FormCard ref={formRef} {...formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Soulution; 
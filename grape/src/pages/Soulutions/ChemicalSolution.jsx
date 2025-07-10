import React, { useState, useEffect, useRef } from 'react';
import SolutionCard from '../../components/SolutionCard';
import ApplicationCardsSection from '../../components/ApplicationCardsSection';
import FormCard from '../../components/FormCard';
import SidebarMenu from '../../components/SidebarMenu';
import FeatureDescription from '../../components/FeatureDescription';
import fire from '../../assets/fire.jpg';
import dangerous from '../../assets/dangerous.jpg';
import welding from '../../assets/welding.jpg';
import Collision from '../../assets/collision.jpg';
import Personel_violation from '../../assets/Personnel_violations.jpg';
import POE from '../../assets/poe.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import grinding from '../../assets/grinding.jpg';

const ChemicalSolution = () => {
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
    subtitle: "Chemical industry safety solutions",
    title: "화학공업 안전 솔루션",
    description: "화학공업 현장의 특수한 위험 요소와 환경을 고려한 전문 안전 솔루션입니다. 유해화학물질 취급, 고압 고온 작업, 폭발 위험 등 화학공업 특화 위험 요소를 실시간으로 모니터링하고 예방합니다.",
    image: fire,
    imageAlt: "화학공업 안전 솔루션",
    buttonText: "데모 신청"
  };

  const applicationCardsData = [
    {
      image: fire,
      imageAlt: "화학물질 누출",
      label: "Chemical Leak",
      title: "화학물질 누출"
    },
    {
      image: dangerous,
      imageAlt: "폭발 위험",
      label: "Explosion Risk",
      title: "폭발 위험"
    },
    {
      image: welding,
      imageAlt: "고압 작업",
      label: "High Pressure Work",
      title: "고압 작업"
    },
    {
      image: Collision,
      imageAlt: "설비 충돌",
      label: "Equipment Collision",
      title: "설비 충돌"
    },
    {
      image: Personel_violation,
      imageAlt: "보호장비 미착용",
      label: "Safety Equipment Violation",
      title: "보호장비 미착용"
    },
    {
      image: POE,
      imageAlt: "가스 누출",
      label: "Gas Leak",
      title: "가스 누출"
    }
  ];

  const featureDescriptions = [
    {
      image: fire,
      title: "화학공업 특화 안전 모니터링",
      description: "화학공업 현장의 특수한 위험 요소와 환경에 특화된 안전 모니터링 시스템을 제공합니다. 유해화학물질 취급, 고압 고온 작업, 폭발 위험 등 화학공업 특화 위험 요소를 실시간으로 감지합니다."
    },
    {
      image: manufacturing,
      title: "화학물질 안전 관리 시스템",
      description: "유해화학물질의 취급과 저장을 체계적으로 관리합니다. 화학물질의 누출이나 이상 상황을 실시간으로 감지하고 즉시 대응할 수 있습니다."
    },
    {
      image: grinding,
      title: "고압 고온 설비 모니터링",
      description: "고압 고온 설비의 안전 상태를 실시간으로 모니터링하고 관리합니다. 설비의 이상 동작이나 고장 징후를 조기에 감지하여 사고를 예방합니다."
    },
    {
      youtubeUrl: "https://www.youtube.com/watch?v=example3",
      title: "화학공업 안전 모니터링 데모",
      description: "실제 화학공업 현장에서 적용되는 안전 모니터링 시스템의 데모 영상입니다. 화학공업 특화 위험 요소 감지와 예방 시스템의 작동 과정을 확인할 수 있습니다."
    }
  ];

  const formData = {
    title: "문의하기",
    subtitle: ""
  };

  const sidebarTitle = "화학공업 안전 솔루션";
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
          <div className={`sidebar ${isSidebarOpen ? 'show' : ''}`}>
            {(!isMobile) && (
              <SidebarMenu menuItems={sidebarMenuItems} sectionRefs={sectionRefs} menuTitle={sidebarTitle} />
            )}
          </div>
          <div className="main-content">
            <div className="solutions-section">
              <SolutionCard ref={solutionRef} {...solutionData} showButton={true} variant="compact" />
              
              {applicationCardsData && (
                <ApplicationCardsSection ref={applicationRef} applicationCardsData={applicationCardsData} />
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

export default ChemicalSolution; 
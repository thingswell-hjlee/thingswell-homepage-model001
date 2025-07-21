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

const Case = () => {
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
    subtitle: "Case",
    title: "서울시 중구",
    description: "서울시 중구 40개 IP 카메라의 AI 안전 피플 카운팅 및 쓰러짐 감지 시스템 공급",
    image: welding,
    imageAlt: "서울시 중구",
  };

  const featureDescriptions = [
    {
      youtubeUrl: "https://www.youtube.com/watch?v=gZ1h4kgTC28&ab_channel=intenseye",
      title: "AI를 사용한 쓰러짐 감지 시스템",
      description: "AI를 사용한 쓰러짐 감지 시스템 도입을 통해 보행자의 쓰러짐 상황을 감지하고, 신속하게 대응할 수 있었습니다"
    },
    {
      image: welding,
      title: "피플 카운팅",
      description: "피플 카운팅을 통해 보행자의 수를 카운트할 수 있었고 이를 통해 압사사고 예방에 도움이 되었습니다."
    },
    {
      image: fire,
      title: "빅데이터 분석 시스템",
      description: "빅데이터 분석을 통한 사고 예방 시스템을 구축하여. 과거 사고 데이터와 현재 상황을 비교 분석하여 위험도를 예측하고, 사전 예방 조치가 가능해졌습니다."
    },

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
            {(!isMobile) && (
              <SidebarMenu menuItems={sidebarMenuItems} sectionRefs={sectionRefs} menuTitle={sidebarTitle} />
            )}
          </div> */}
          <div className="main-content">
            <div className="solutions-section">
              <SolutionCard ref={solutionRef} {...solutionData} showButton={false} variant="compact" />
              {featureDescriptions && featureDescriptions.map((feature, index) => (
                <FeatureDescription 
                  key={index}
                  ref={index === 0 ? featureDescriptionRef : null}
                  {...feature} 
                  reverse={false}
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

export default Case;
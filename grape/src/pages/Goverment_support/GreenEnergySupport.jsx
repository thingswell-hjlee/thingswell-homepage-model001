import React, { useState, useEffect, useRef } from 'react';
import SolutionCard from '../../components/SolutionCard';
import ApplicationCardsSection from '../../components/ApplicationCardsSection';
import ApplicationPeriodCard from '../../components/ApplicationPeriodCard';
import SupportInfoCard from '../../components/SupportInfoCard';
import RestrictionCard from '../../components/RestrictionCard';
import FormCard from '../../components/FormCard';
import SidebarMenu from '../../components/SidebarMenu';
import construction from '../../assets/construction.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import grinding from '../../assets/grinding.jpg';

const GreenEnergySupport = () => {
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

  // 데이터 직접 정의
  const solutionData = {
    subtitle: "정부지원사업",
    title: "친환경 에너지 지원사업",
    description: "친환경 에너지 기술 도입을 통한 탄소중립 실현과 에너지 효율성 향상을 지원하는 사업",
    image: construction,
    imageAlt: "친환경 에너지 지원사업"
  };

  const applicationCardsData = [
    {
      image: manufacturing,
      imageAlt: "제조업",
      label: "Manufacturing",
      title: "제조업"
    },
    {
      image: construction,
      imageAlt: "건설업",
      label: "Construction",
      title: "건설업"
    },
    {
      image: grinding,
      imageAlt: "에너지업",
      label: "Energy",
      title: "에너지업"
    }
  ];

  const applicationPeriodData = {
    title: "신청기간",
    subtitle: "친환경 에너지 지원사업",
    period: {
      start: "2025년 8월 1일 ~ 9월 30일",
    },
    cards: [
      {
        date: "2025년 8월 1일",
        status: "신청시작",
        day: "금",
        time: "10:00"
      },
      {
        date: "2025년 9월 30일",
        status: "신청마감",
        day: "화",
        time: "17:00"
      }
    ]
  };

  const supportInfoData = {
    title: "지원 정보",
    subtitle: "친환경 에너지 지원사업",
    supportLimit: {
      year: "2025년",
      amount: "최대 7,000만원",
      description: "에너지 효율"
    },
    qualifications: {
      description: "친환경 에너지 기술 도입을 희망하는 중소기업",
      items: [
        {
          main: "상시근로자 수 500명 미만 기업",
        },
        {
          main: "에너지 사용량이 연간 500TOE 이상인 기업",
        },
        {
          main: "탄소중립 로드맵을 수립한 기업",
        },
      ]
    }
  };

  const restrictionData = {
    title: "지원 제한사항",
    subtitle: "친환경 에너지 지원사업",
    restrictions: [
      {
        main: "대기업 및 대기업 계열사",
      },
      {
        main: "환경법규 위반 이력이 있는 기업",
      },
      {
        main: "에너지 관련 사업을 하는 기업",
      },
      {
        main: "동일 기술로 다른 지원을 받은 기업",
      }
    ]
  };

  const formData = {
    title: "문의하기",
    subtitle: ""
  };

  const sidebarTitle = "친환경 에너지 지원사업";
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
              
              {applicationCardsData && (
                <ApplicationCardsSection ref={applicationRef} applicationCardsData={applicationCardsData} />
              )}
              
              {applicationPeriodData && (
                <ApplicationPeriodCard ref={periodRef} {...applicationPeriodData} />
              )}
              
              {supportInfoData && (
                <SupportInfoCard ref={supportRef} {...supportInfoData} />
              )}
              
              {restrictionData && (
                <RestrictionCard ref={restrictionRef} {...restrictionData} />
              )}
              
              <FormCard ref={formRef} {...formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenEnergySupport; 
import React, { useState, useEffect, useRef } from 'react';
import SolutionCard from '../../components/SolutionCard';
import ApplicationCardsSection from '../../components/ApplicationCardsSection';
import ApplicationPeriodCard from '../../components/ApplicationPeriodCard';
import SupportInfoCard from '../../components/SupportInfoCard';
import RestrictionCard from '../../components/RestrictionCard';
import FormCard from '../../components/FormCard';
import SidebarMenu from '../../components/SidebarMenu';
import manufacturing from '../../assets/manufacturing.jpg';
import construction from '../../assets/construction.jpg';
import grinding from '../../assets/grinding.jpg';

const AiManufacturingSupport = () => {
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
    title: "AI 제조업 지원사업",
    description: "인공지능 기술을 활용한 스마트 제조업 육성을 위한 지원사업",
    image: manufacturing,
    imageAlt: "AI 제조업 지원사업"
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
      imageAlt: "자동화",
      label: "Automation",
      title: "자동화"
    },
    {
      image: grinding,
      imageAlt: "AI기술",
      label: "AI Technology",
      title: "AI기술"
    }
  ];

  const applicationPeriodData = {
    title: "신청기간",
    subtitle: "AI 제조업 지원사업",
    period: {
      start: "2025년 9월 1일 ~ 10월 31일",
    },
    cards: [
      {
        date: "2025년 9월 1일",
        status: "신청시작",
        day: "월",
        time: "10:00"
      },
      {
        date: "2025년 10월 31일",
        status: "신청마감",
        day: "금",
        time: "18:00"
      }
    ]
  };

  const supportInfoData = {
    title: "지원 정보",
    subtitle: "AI 제조업 지원사업",
    supportLimit: {
      year: "2025년",
      amount: "최대 4,000만원",
      description: "AI 기술"
    },
    qualifications: {
      description: "AI 기술 도입을 희망하는 제조업 중소기업",
      items: [
        {
          main: "상시근로자 수 200명 미만 제조업 기업",
        },
        {
          main: "AI 기술 도입 계획이 있는 기업",
        },
        {
          main: "스마트팩토리 구축 의지가 있는 기업",
        },
      ]
    }
  };

  const restrictionData = {
    title: "지원 제한사항",
    subtitle: "AI 제조업 지원사업",
    restrictions: [
      {
        main: "대기업 및 대기업 계열사",
      },
      {
        main: "IT 업종 기업",
      },
      {
        main: "동일 기술로 다른 지원을 받은 기업",
      },
      {
        main: "AI 기술을 보유한 기업",
      }
    ]
  };

  const formData = {
    title: "문의하기",
    subtitle: ""
  };

  const sidebarTitle = "AI 제조업 지원사업";
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
            <div className="solutions-section menu-spacing">
              <SolutionCard ref={solutionRef} {...solutionData} variant="compact"/>
              
              {applicationCardsData && (
                <ApplicationCardsSection ref={applicationRef} applicationCardsData={applicationCardsData} boxName="적용분야" />
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

export default AiManufacturingSupport; 
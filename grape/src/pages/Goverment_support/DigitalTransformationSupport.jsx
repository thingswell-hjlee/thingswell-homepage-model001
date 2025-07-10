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

const DigitalTransformationSupport = () => {
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
    title: "디지털 전환 지원사업",
    description: "중소기업의 디지털 전환을 지원하여 경쟁력을 강화하고 생산성을 향상시키는 사업",
    image: manufacturing,
    imageAlt: "디지털 전환 지원사업"
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
      imageAlt: "서비스업",
      label: "Service",
      title: "서비스업"
    },
    {
      image: grinding,
      imageAlt: "IT업종",
      label: "IT",
      title: "IT업종"
    }
  ];

  const applicationPeriodData = {
    title: "신청기간",
    subtitle: "디지털 전환 지원사업",
    period: {
      start: "2025년 6월 1일 ~ 7월 31일",
    },
    cards: [
      {
        date: "2025년 6월 1일",
        status: "신청시작",
        day: "일",
        time: "09:00"
      },
      {
        date: "2025년 7월 31일",
        status: "신청마감",
        day: "목",
        time: "18:00"
      }
    ]
  };

  const supportInfoData = {
    title: "지원 정보",
    subtitle: "디지털 전환 지원사업",
    supportLimit: {
      year: "2025년",
      amount: "최대 3,000만원",
      description: "디지털 전환"
    },
    qualifications: {
      description: "중소기업으로서 다음 조건을 만족하는 기업",
      items: [
        {
          main: "상시근로자 수 300명 미만 기업",
        },
        {
          main: "매출액 기준 중소기업",
        },
        {
          main: "디지털 전환 의지가 있는 기업",
        },
      ]
    }
  };

  const restrictionData = {
    title: "지원 제한사항",
    subtitle: "디지털 전환 지원사업",
    restrictions: [
      {
        main: "상호출자제한 기업집단 소속회사",
      },
      {
        main: "세금 체납 기업",
      },
      {
        main: "파산 또는 회생절차 중인 기업",
      },
      {
        main: "동일 사업으로 다른 정부지원을 받은 기업",
      }
    ]
  };

  const formData = {
    title: "문의하기",
    subtitle: ""
  };

  const sidebarTitle = "디지털 전환 지원사업";
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
              <SolutionCard ref={solutionRef} {...solutionData} variant="compact" />
              
              {applicationCardsData && (
                <ApplicationCardsSection ref={applicationRef} applicationCardsData={applicationCardsData} boxName="AI기반 영역 제어" />
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

export default DigitalTransformationSupport; 
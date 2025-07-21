import React, { useState, useEffect, useRef } from 'react';
import SolutionCard from '../../components/SolutionCard';
import ApplicationCardsSection from '../../components/ApplicationCardsSection';
import ApplicationPeriodCard from '../../components/ApplicationPeriodCard';
import SupportInfoCard from '../../components/SupportInfoCard';
import RestrictionCard from '../../components/RestrictionCard';
import Form from '../../components/Form';
// import SidebarMenu from '../../components/SidebarMenu';
import welding from '../../assets/welding.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import construction from '../../assets/construction.jpg';
import grinding from '../../assets/grinding.jpg';

const Government_support = () => {
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
    title: "스마트 안전장비지원사업",
    description: "산업변화와 기술발전에 따른 다양한 산업재해를 예방하기 위해 재정 및 기술여건이 취약한 중소사업장에 스마트 안전장비 도입 시 보조금을 지원하는 사업",
    // image: welding,
    // imageAlt: "스마트 안전장비 지원사업"
  };

  const applicationCardsData = [
    {
      image: manufacturing,
      imageAlt: "제조업 공장",
      label: "Manufacturing",
      title: "제조업 공장"
    },
    {
      image: construction,
      imageAlt: "건설 현장",
      label: "Construction",
      title: "건설 현장"
    },
    {
      image: grinding,
      imageAlt: "위험작업 현장",
      label: "Dangerous Work",
      title: "위험작업 현장"
    }
  ];

  const applicationPeriodData = {
    title: "신청기간",
    subtitle: "인공지능(AI) 기반 인체감지시스템",
    period: {
      start: "2025년 7월 3일 ~ 8월 3일",
    },
    cards: [
      {
        date: "2025년 7월 3일",
        status: "신청시작",
        day: "월",
        time: "15:00"
      },
      {
        date: "2025년 8월 3일",
        status: "신청마감",
        day: "금",
        time: "15:00"
      }
    ]
  };

  const supportInfoData = {
    title: "지원 정보",
    subtitle: "인공지능(AI) 기반 인체감지시스템",
    supportLimit: {
      year: "2025년",
      amount: "최대 5,000만원",
      description: "관리품목"
    },
    qualifications: {
      description: "중소기업 및 소기업으로서 다음 조건을 만족하는 사업장",
      items: [
        {
          main: "상시근로자 수 50명 미만 사업장의 사업주 (단, 건설업의 경우 건설현장은 제외하며, 건설업 본사는 신청 가능)",
        },
        {
          main: "중소기업기본법 시행령 제8조제1항 및 별표 3에 따른 주된 업종별 평균매출액 등이 '소기업 규모 기준' 이하인 기업의 사업주 (반드시 중소기업 확인서(소기업, 소기업(소상공인))를 발급받아 제출해야 함, 단, 안전투자 혁신사업 보조금을 지급받은 설비는 제외)",
        },
        {
          main: "상시근로자 수 50명 미만 사업장의 사업주로서, 산업안전보건법 시행령 제71조 별표 21에 따른 2호~24호 설비를 보유하거나 임대업을 하는 사업장의 사업주 (단, 안전동행 지원사업 보조금을 지급받은 설비는 지원대상에서 제외)",
        },
      ]
    }
  };

  const restrictionData = {
    title: "지원 제한사항",
    subtitle: "인공지능(AI) 기반 인체감지시스템",
    restrictions: [
      {
        main: "상호출자제한 기업집단 소속회사 및 국가, 지방자치단체 등 공공단체",
      },
      {
        main: "산업안전보건법 제 158조제4항(보조금 부당수급 등)에 따른 제한기간 중인 자",
      },
      {
        main: "산업재해보상보험료을 체납한 사업주",
      },
      {
        main: "근로자를 고용하고 있지 않는 사업주 (단, 영 제거조 별표 21에 따른 기계 • 기구설비를 보유하거나 그에 대한 임대업을 하는 사업장의 사업주」 제외)",
      },
      {
        main: "24년도 사고사망 등 고위험개선사업, 산재예방시설 융자금 지원사업, 안전 투자혁신사업, 건강일터 조성 지원사업 결정 사업장",
      },
      {
        main: "스마트 안전장비 지원사업을 금년도 2회 이상 결정 받은 사업장",
      }
    ]
  };

  const formData = {
    title: "문의하기",
    subtitle: "궁금한 점이 있으시면 문의해주세요."
  };

  const sidebarTitle = "스마트 안전장비지원사업";
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
          {/* <div className={`sidebar ${isSidebarOpen ? 'show' : ''}`}>
            {(!isMobile) && (
              <SidebarMenu menuItems={sidebarMenuItems} sectionRefs={sectionRefs} menuTitle={sidebarTitle} />
            )}
          </div> */}
          <div className="main-content">
            <div className="solutions-section menu-spacing">
              
              <SolutionCard ref={solutionRef} {...solutionData} variant="default"/>
              
              {applicationCardsData && (
                <ApplicationCardsSection ref={applicationRef} applicationCardsData={applicationCardsData}boxName="적용분야" />
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
              
              <Form ref={formRef} {...formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Government_support; 
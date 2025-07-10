import React, { useState, useEffect, useRef } from 'react';
import SolutionCard from './SolutionCard';
import ApplicationCardsSection from './ApplicationCardsSection';
import ApplicationPeriodCard from './ApplicationPeriodCard';
import SupportInfoCard from './SupportInfoCard';
import RestrictionCard from './RestrictionCard';
import FormCard from './FormCard';
import SidebarMenu from './SidebarMenu';

const GovernmentSupportPageLayout = ({ 
  solutionData, 
  applicationCardsData, 
  applicationPeriodData,
  supportInfoData,
  restrictionData,
  formData, 
  sidebarTitle, 
  sidebarMenuItems 
}) => {
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

export default GovernmentSupportPageLayout; 
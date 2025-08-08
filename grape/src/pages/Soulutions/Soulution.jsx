import React, { useState, useEffect, useRef } from 'react';
import SolutionCard from '../../components/SolutionCard';
import ApplicationCardsSection from '../../components/ApplicationCardsSection';
import Form from '../../components/Form';
import FeatureDescription from '../../components/FeatureDescription';
import welding from '../../assets/welding.jpg';
import falldown from '../../assets/falldown.jpg';
import fire from '../../assets/fire.jpg';
import Collision from '../../assets/collision.jpg';
import Collapse from '../../assets/collapse.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import construction from '../../assets/construction.jpg';
import grinding from '../../assets/grinding.jpg';
import server from '../../assets/server.jpg';

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
    title: "제조 안전 솔루션",
    description: "RAG 기반의 대규모 비전 모델(LVM), 대규모 언어 모델(LLM), 실시간 센싱 시스템의 멀티모달 데이터를 통합한 작업자 안전 솔루션",
    // image: welding,
    // imageAlt: "스마트 안전장비 지원사업",
    // buttonText: "데모 신청"
  };

  const applicationCardsData = [
    {
      image: Collision,
      imageAlt: "전방 위협 요소 감지",
      label: "Forward threat detection",
      title: "전방 위협 요소 감지"
    },
    {
      image: fire,
      imageAlt: "후방 위협 요소 감지",
      label: "Backward threat detection",
      title: "후방 위협 요소 감지"
    },
    {
      image: server,
      imageAlt: "작업자 알람 및 AI 음성 대화",
      label: "Worker alert and AI voice conversation",
      title: "작업자 알람 및 AI 음성 대화"
    },
    {
      image: server,
      imageAlt: "원격관리시스템",
      label: "Remote management system",
      title: "원격 관리 시스템"
    },
  ];

  const featureDescriptions = [
    {
      image: manufacturing,
      title: "RAG 기반 멀티모달 데이터 통합 처리",
      description: "RAG 기반의 대규모 비전 모델(LVM), 대규모 언어 모델(LLM), 실시간 센싱 시스템의 멀티모달 데이터를 통합하여 작업자 안전 솔루션을 구축합니다.",
      subtitle: "Real-time monitoring"
    },
    {
      image: welding,
      title: "IoT 센서 기술 활용",
      description: "IoT 센서와 영상 분석 기술을 활용하여 작업자의 안전을 최우선으로 보호합니다. 다양한 센서를 통해 환경 데이터를 수집하고, 실시간으로 위험 상황을 감지하여 즉시 대응할 수 있습니다.",
      subtitle: "Real-time monitoring"
    },
    {
      image: fire,
      title: "빅데이터 분석 시스템",
      description: "빅데이터 분석을 통한 사고 예방 시스템을 구축합니다. 과거 사고 데이터와 현재 상황을 비교 분석하여 위험도를 예측하고, 사전 예방 조치를 제안합니다.",
      subtitle: "Real-time monitoring"
    },
    {
      youtubeUrl: "https://www.youtube.com/watch?v=gZ1h4kgTC28&ab_channel=intenseye",
      title: "실시간 안전 모니터링 데모",
      description: "실제 산업 현장에서 적용되는 AI 기반 안전 모니터링 시스템의 데모 영상입니다. 실시간으로 작업자의 행동을 분석하고 위험 상황을 감지하는 과정을 확인할 수 있습니다.",
      subtitle: "Real-time monitoring"
    }
  ];

  const formData = {
    title: "문의하기",
    subtitle: "궁금한 점이 있으시면 언제든 문의해주세요"
  };

  const handleFormSubmit = async (data) => {
    try {
      console.log('폼 데이터:', data);
      // 여기에 실제 API 호출 로직을 추가할 수 있습니다
      alert('문의가 성공적으로 제출되었습니다.');
    } catch (error) {
      console.error('폼 제출 중 오류 발생:', error);
      alert('문의 제출 중 오류가 발생했습니다.');
    }
  };



  const applicationCardsData2 = [
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

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="solutions-section menu-spacing">
              <SolutionCard ref={solutionRef} {...solutionData} showButton={false} variant="default" />

              {applicationCardsData && (
                <ApplicationCardsSection ref={applicationRef} applicationCardsData={applicationCardsData2}boxName="적용분야" subtitle="Application field" />
              )}
              
              {applicationCardsData && (
                <ApplicationCardsSection ref={applicationRef} applicationCardsData={applicationCardsData} boxName="작업자 안전 보호" subtitle="Worker safety protection" />
              )}
              
              {featureDescriptions && featureDescriptions.map((feature, index) => (
                <FeatureDescription 
                  key={index}
                  ref={index === 0 ? featureDescriptionRef : null}
                  {...feature} 
                  reverse={index % 2 === 1}
                />
              ))}
              
              <Form ref={formRef} {...formData} onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Soulution; 
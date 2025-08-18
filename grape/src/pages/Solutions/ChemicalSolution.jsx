import React from 'react';
import SolutionDetailPage from './SolutionDetailPage';
import fire from '../../assets/fire.jpg';
import dangerous from '../../assets/dangerous.jpg';
import welding from '../../assets/welding.jpg';
import Collision from '../../assets/collision.jpg';
import Personel_violation from '../../assets/Personnel_violations.jpg';
import POE from '../../assets/poe.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import grinding from '../../assets/grinding.jpg';

const ChemicalSolution = () => {
  // 데이터
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

  const formData = { title: '문의하기', subtitle: '' };

  const blocks = [
    { type: 'applicationCards', data: applicationCardsData },
    { type: 'features', data: featureDescriptions },
  ];

  return (
    <SolutionDetailPage
      solutionData={solutionData}
      solutionVariant="compact"
      blocks={blocks}
      formData={formData}
    />
  );
};

export default ChemicalSolution; 
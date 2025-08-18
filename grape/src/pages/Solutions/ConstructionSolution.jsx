import React from 'react';
import SolutionDetailPage from './SolutionDetailPage';
import construction from '../../assets/construction.jpg';
import Collapse from '../../assets/collapse.jpg';
import falldown from '../../assets/falldown.jpg';
import Collision from '../../assets/collision.jpg';
import dangerous from '../../assets/dangerous.jpg';
import fire from '../../assets/fire.jpg';
import Personel_violation from '../../assets/Personnel_violations.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import grinding from '../../assets/grinding.jpg';

const ConstructionSolution = () => {
  // 데이터
  const solutionData = {
    subtitle: "Construction safety solutions",
    title: "건설안전 솔루션",
    description: "건설 현장의 특수한 환경과 위험 요소를 고려한 전문 안전 솔루션입니다. 고소작업, 중장비 운전, 구조물 시공 등 건설업 특화 위험 요소를 실시간으로 모니터링하고 예방합니다.",
    image: construction,
    imageAlt: "건설안전 솔루션",
    buttonText: "데모 신청"
  };

  const applicationCardsData = [
    {
      image: Collapse,
      imageAlt: "구조물 붕괴",
      label: "Structure Collapse",
      title: "구조물 붕괴"
    },
    {
      image: falldown,
      imageAlt: "고소작업 낙상",
      label: "High-altitude Fall",
      title: "고소작업 낙상"
    },
    {
      image: Collision,
      imageAlt: "중장비 충돌",
      label: "Heavy Equipment Collision",
      title: "중장비 충돌"
    },
    {
      image: dangerous,
      imageAlt: "위험구역 접근",
      label: "Danger Zone Access",
      title: "위험구역 접근"
    },
    {
      image: fire,
      imageAlt: "건설현장 화재",
      label: "Construction Fire",
      title: "건설현장 화재"
    },
    {
      image: Personel_violation,
      imageAlt: "안전장비 미착용",
      label: "Safety Equipment Violation",
      title: "안전장비 미착용"
    }
  ];

  const featureDescriptions = [
    {
      image: construction,
      title: "건설현장 특화 AI 모니터링",
      description: "건설 현장의 복잡한 환경과 다양한 작업 유형에 특화된 AI 모니터링 시스템을 제공합니다. 고소작업, 중장비 운전, 구조물 시공 등 건설업 특화 위험 요소를 실시간으로 감지합니다."
    },
    {
      image: manufacturing,
      title: "3D 공간 분석 기술",
      description: "3D 공간 분석 기술을 활용하여 건설 현장의 복잡한 구조와 작업 환경을 정확히 파악합니다. 작업자의 위치와 움직임을 3차원으로 추적하여 위험 상황을 사전에 예방합니다."
    },
    {
      image: grinding,
      title: "건설장비 IoT 연동",
      description: "건설장비와 IoT 센서를 연동하여 장비의 상태와 작업 환경을 실시간으로 모니터링합니다. 장비 고장이나 이상 상황을 조기에 감지하여 사고를 예방합니다."
    },
    {
      youtubeUrl: "https://www.youtube.com/watch?v=example",
      title: "건설안전 모니터링 데모",
      description: "실제 건설 현장에서 적용되는 안전 모니터링 시스템의 데모 영상입니다. 건설업 특화 위험 요소 감지와 예방 시스템의 작동 과정을 확인할 수 있습니다."
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

export default ConstructionSolution; 
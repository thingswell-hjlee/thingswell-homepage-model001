import React from 'react';
import SolutionDetailPage from './SolutionDetailPage';
import manufacturing from '../../assets/manufacturing.jpg';
import grinding from '../../assets/grinding.jpg';
import fire from '../../assets/fire.jpg';
import welding from '../../assets/welding.jpg';
import dangerous from '../../assets/dangerous.jpg';
import Collision from '../../assets/collision.jpg';
import Personel_violation from '../../assets/Personnel_violations.jpg';

const ManufacturingSolution = () => {
  // 데이터
  const solutionData = {
    subtitle: "Manufacturing safety solutions",
    title: "제조업 안전 솔루션",
    description: "제조업 현장의 특수한 작업 환경과 위험 요소를 고려한 전문 안전 솔루션입니다. 기계 작업, 화학물질 취급, 고온 작업 등 제조업 특화 위험 요소를 실시간으로 모니터링하고 예방합니다.",
    image: manufacturing,
    imageAlt: "제조업 안전 솔루션",
    buttonText: "데모 신청"
  };

  const applicationCardsData = [
    {
      image: grinding,
      imageAlt: "기계 작업",
      label: "Machine Operation",
      title: "기계 작업"
    },
    {
      image: fire,
      imageAlt: "화학물질 사고",
      label: "Chemical Accident",
      title: "화학물질 사고"
    },
    {
      image: welding,
      imageAlt: "용접 작업",
      label: "Welding Operation",
      title: "용접 작업"
    },
    {
      image: dangerous,
      imageAlt: "고온 작업",
      label: "High Temperature Work",
      title: "고온 작업"
    },
    {
      image: Collision,
      imageAlt: "기계 충돌",
      label: "Machine Collision",
      title: "기계 충돌"
    },
    {
      image: Personel_violation,
      imageAlt: "보호장비 미착용",
      label: "PPE Violation",
      title: "보호장비 미착용"
    }
  ];

  const featureDescriptions = [
    {
      image: manufacturing,
      title: "제조업 특화 안전 모니터링",
      description: "제조업 현장의 특수한 작업 환경과 위험 요소에 특화된 안전 모니터링 시스템을 제공합니다. 기계 작업, 화학물질 취급, 고온 작업 등 제조업 특화 위험 요소를 실시간으로 감지합니다."
    },
    {
      image: grinding,
      title: "기계 안전 관리 시스템",
      description: "제조 설비와 기계의 안전 상태를 실시간으로 모니터링하고 관리합니다. 기계의 이상 동작이나 고장 징후를 조기에 감지하여 사고를 예방합니다."
    },
    {
      image: welding,
      title: "화학물질 안전 관리",
      description: "화학물질 취급 작업의 안전을 체계적으로 관리합니다. 유해화학물질의 누출이나 이상 상황을 실시간으로 감지하고 즉시 대응할 수 있습니다."
    },
    {
      youtubeUrl: "https://www.youtube.com/watch?v=example2",
      title: "제조업 안전 모니터링 데모",
      description: "실제 제조업 현장에서 적용되는 안전 모니터링 시스템의 데모 영상입니다. 제조업 특화 위험 요소 감지와 예방 시스템의 작동 과정을 확인할 수 있습니다."
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

export default ManufacturingSolution; 
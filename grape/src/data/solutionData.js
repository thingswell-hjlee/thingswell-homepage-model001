import welding from '../assets/welding.jpg';
import falldown from '../assets/falldown.jpg';
import dangerous from '../assets/dangerous.jpg';
import fire from '../assets/fire.jpg';
import Collision from '../assets/collision.jpg';
import POE from '../assets/poe.jpg';
import Personel_violation from '../assets/Personnel_violations.jpg';
import Collapse from '../assets/collapse.jpg';
import manufacturing from '../assets/manufacturing.jpg';
import construction from '../assets/construction.jpg';
import grinding from '../assets/grinding.jpg';

// 산업안전 솔루션 데이터
export const industrialSafetyData = {
  solutionData: {
    subtitle: "Industrial safety solutions",
    title: "산업안전 솔루션",
    description: "산업안전 솔루션은 산업 현장에서 발생할 수 있는 각종 사고와 위험을 사전에 예방하고, 근로자의 안전을 체계적으로 관리하기 위해 도입되는 첨단 시스템입니다. AI, IoT, 빅데이터, 영상 분석 등 다양한 IT 기술이 융합되어, 실시간 위험 감지와 신속한 대응이 가능합니다",
    image: welding,
    imageAlt: "스마트 안전장비 지원사업",
    buttonText: "데모 신청"
  },
  applicationCardsData: [
    {
      image: Collapse,
      imageAlt: "쓰러짐",
      label: "Collapse",
      title: "쓰러짐"
    },
    {
      image: fire,
      imageAlt: "화재",
      label: "Fire",
      title: "화재"
    },
    {
      image: Collision,
      imageAlt: "충돌",
      label: "Collision",
      title: "충돌"
    },
    {
      image: falldown,
      imageAlt: "낙상",
      label: "Falldown",
      title: "낙상"
    },
    {
      image: dangerous,
      imageAlt: "위험지역 접근",
      label: "Dangerous areas",
      title: "위험지역 접근"
    },
    {
      image: Personel_violation,
      imageAlt: "작업인원 위반",
      label: "Personnel violations",
      title: "작업인원 위반"
    },
    {
      image: POE,
      imageAlt: "POE 착용 감지",
      label: "POE detection",
      title: "POE 착용 감지"
    },
  ],
  featureDescriptions: [
    {
      image: manufacturing,
      title: "AI 기반 실시간 모니터링",
      description: "산업안전 솔루션은 AI 기반 실시간 모니터링을 통해 작업 현장의 위험 요소를 사전에 감지하고 예방합니다. 고성능 영상 분석 알고리즘을 통해 작업자의 행동 패턴을 분석하여 잠재적 위험을 조기에 발견합니다."
    },
    {
      image: welding,
      title: "IoT 센서 기술 활용",
      description: "IoT 센서와 영상 분석 기술을 활용하여 작업자의 안전을 최우선으로 보호합니다. 다양한 센서를 통해 환경 데이터를 수집하고, 실시간으로 위험 상황을 감지하여 즉시 대응할 수 있습니다."
    },
    {
      image: fire,
      title: "빅데이터 분석 시스템",
      description: "빅데이터 분석을 통한 사고 예방 시스템을 구축합니다. 과거 사고 데이터와 현재 상황을 비교 분석하여 위험도를 예측하고, 사전 예방 조치를 제안합니다."
    },
    {
      youtubeUrl: "https://www.youtube.com/watch?v=gZ1h4kgTC28&ab_channel=intenseye",
      title: "실시간 안전 모니터링 데모",
      description: "실제 산업 현장에서 적용되는 AI 기반 안전 모니터링 시스템의 데모 영상입니다. 실시간으로 작업자의 행동을 분석하고 위험 상황을 감지하는 과정을 확인할 수 있습니다."
    }
  ],
  formData: {
    title: "문의하기",
    subtitle: ""
  },
  sidebarTitle: "산업안전 솔루션",
  sidebarMenuItems: [
    { id: "solution", label: "개요" },
    { id: "ApplicationCardsSection", label: "기능" },
    { id: "FeatureDescription", label: "특징" },
    { id: "form", label: "문의하기" }
  ]
};

// 건설안전 솔루션 데이터
export const constructionSafetyData = {
  solutionData: {
    subtitle: "Construction safety solutions",
    title: "건설안전 솔루션",
    description: "건설 현장의 특수한 환경과 위험 요소를 고려한 전문 안전 솔루션입니다. 고소작업, 중장비 운전, 구조물 시공 등 건설업 특화 위험 요소를 실시간으로 모니터링하고 예방합니다.",
    image: construction,
    imageAlt: "건설안전 솔루션",
    buttonText: "데모 신청"
  },
  applicationCardsData: [
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
  ],
  featureDescriptions: [
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
  ],
  formData: {
    title: "문의하기",
    subtitle: ""
  },
  sidebarTitle: "건설안전 솔루션",
  sidebarMenuItems: [
    { id: "solution", label: "개요" },
    { id: "ApplicationCardsSection", label: "기능" },
    { id: "FeatureDescription", label: "특징" },
    { id: "form", label: "문의하기" }
  ]
};

// 제조업 안전 솔루션 데이터
export const manufacturingSafetyData = {
  solutionData: {
    subtitle: "Manufacturing safety solutions",
    title: "제조업 안전 솔루션",
    description: "제조업 현장의 특수한 작업 환경과 위험 요소를 고려한 전문 안전 솔루션입니다. 기계 작업, 화학물질 취급, 고온 작업 등 제조업 특화 위험 요소를 실시간으로 모니터링하고 예방합니다.",
    image: manufacturing,
    imageAlt: "제조업 안전 솔루션",
    buttonText: "데모 신청"
  },
  applicationCardsData: [
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
  ],
  featureDescriptions: [
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
  ],
  formData: {
    title: "문의하기",
    subtitle: ""
  },
  sidebarTitle: "제조업 안전 솔루션",
  sidebarMenuItems: [
    { id: "solution", label: "개요" },
    { id: "ApplicationCardsSection", label: "기능" },
    { id: "FeatureDescription", label: "특징" },
    { id: "form", label: "문의하기" }
  ]
};

// 화학공업 안전 솔루션 데이터
export const chemicalSafetyData = {
  solutionData: {
    subtitle: "Chemical industry safety solutions",
    title: "화학공업 안전 솔루션",
    description: "화학공업 현장의 특수한 위험 요소와 환경을 고려한 전문 안전 솔루션입니다. 유해화학물질 취급, 고압 고온 작업, 폭발 위험 등 화학공업 특화 위험 요소를 실시간으로 모니터링하고 예방합니다.",
    image: fire,
    imageAlt: "화학공업 안전 솔루션",
    buttonText: "데모 신청"
  },
  applicationCardsData: [
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
  ],
  featureDescriptions: [
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
  ],
  formData: {
    title: "문의하기",
    subtitle: ""
  },
  sidebarTitle: "화학공업 안전 솔루션",
  sidebarMenuItems: [
    { id: "solution", label: "개요" },
    { id: "ApplicationCardsSection", label: "기능" },
    { id: "FeatureDescription", label: "특징" },
    { id: "form", label: "문의하기" }
  ]
}; 
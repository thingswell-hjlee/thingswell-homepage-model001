import welding from '../assets/welding.jpg';
import grinding from '../assets/grinding.jpg';
import construction from '../assets/construction.jpg';
import manufacturing from '../assets/manufacturing.jpg';
import dangerous from '../assets/dangerous.jpg';
import fire from '../assets/fire.jpg';
import collapse from '../assets/collapse.jpg';
import collision from '../assets/collision.jpg';
import falldown from '../assets/falldown.jpg';
import poe from '../assets/poe.jpg';
import personnel_violations from '../assets/Personnel_violations.jpg';
import logo from '../assets/logo.jpg';

// 이미지 매핑 객체
const imageMapping = {
  welding,
  grinding,
  construction,
  manufacturing,
  dangerous,
  fire,
  collapse,
  collision,
  falldown,
  poe,
  "Personnel_violations": personnel_violations,
  logo
};

// 이미지 가져오기 함수
const getImage = (imageName) => {
  return imageMapping[imageName] || logo;
};

// 스마트 안전장비지원사업 데이터
export const smartSafetyEquipmentData = {
  solutionData: {
    subtitle: "정부지원사업",
    title: "스마트 안전장비지원사업",
    description: "산업변화와 기술발전에 따른 다양한 산업재해를 예방하기 위해 재정 및 기술여건이 취약한 중소사업장에 스마트 안전장비 도입 시 보조금을 지원하는 사업",
    image: welding,
    imageAlt: "스마트 안전장비 지원사업"
  },
  applicationCardsData: [
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
  ],
  applicationPeriodData: {
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
  },
  supportInfoData: {
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
  },
  restrictionData: {
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
  },
  formData: {
    title: "문의하기",
    subtitle: ""
  },
  sidebarTitle: "스마트 안전장비지원사업",
  sidebarMenuItems: [
    { id: "solution", label: "개요" },
    { id: "application", label: "적용분야" },
    { id: "period", label: "신청기간" },
    { id: "support", label: "지원정보" },
    { id: "restriction", label: "지원 제한사항" },
    { id: "form", label: "문의하기" }
  ]
};

// 디지털 전환 지원사업 데이터
export const digitalTransformationData = {
  solutionData: {
    subtitle: "정부지원사업",
    title: "디지털 전환 지원사업",
    description: "중소기업의 디지털 전환을 지원하여 경쟁력을 강화하고 생산성을 향상시키는 사업",
    image: manufacturing,
    imageAlt: "디지털 전환 지원사업"
  },
  applicationCardsData: [
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
  ],
  applicationPeriodData: {
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
  },
  supportInfoData: {
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
  },
  restrictionData: {
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
  },
  formData: {
    title: "문의하기",
    subtitle: ""
  },
  sidebarTitle: "디지털 전환 지원사업",
  sidebarMenuItems: [
    { id: "solution", label: "개요" },
    { id: "application", label: "적용분야" },
    { id: "period", label: "신청기간" },
    { id: "support", label: "지원정보" },
    { id: "restriction", label: "지원 제한사항" },
    { id: "form", label: "문의하기" }
  ]
};

// 친환경 에너지 지원사업 데이터
export const greenEnergyData = {
  solutionData: {
    subtitle: "정부지원사업",
    title: "친환경 에너지 지원사업",
    description: "친환경 에너지 기술 도입을 통한 탄소중립 실현과 에너지 효율성 향상을 지원하는 사업",
    image: construction,
    imageAlt: "친환경 에너지 지원사업"
  },
  applicationCardsData: [
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
  ],
  applicationPeriodData: {
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
  },
  supportInfoData: {
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
  },
  restrictionData: {
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
  },
  formData: {
    title: "문의하기",
    subtitle: ""
  },
  sidebarTitle: "친환경 에너지 지원사업",
  sidebarMenuItems: [
    { id: "solution", label: "개요" },
    { id: "application", label: "적용분야" },
    { id: "period", label: "신청기간" },
    { id: "support", label: "지원정보" },
    { id: "restriction", label: "지원 제한사항" },
    { id: "form", label: "문의하기" }
  ]
};

// AI 제조업 지원사업 데이터
export const aiManufacturingData = {
  solutionData: {
    subtitle: "정부지원사업",
    title: "AI 제조업 지원사업",
    description: "인공지능 기술을 활용한 스마트 제조업 육성을 위한 지원사업",
    image: manufacturing,
    imageAlt: "AI 제조업 지원사업"
  },
  applicationCardsData: [
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
  ],
  applicationPeriodData: {
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
  },
  supportInfoData: {
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
  },
  restrictionData: {
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
  },
  formData: {
    title: "문의하기",
    subtitle: ""
  },
  sidebarTitle: "AI 제조업 지원사업",
  sidebarMenuItems: [
    { id: "solution", label: "개요" },
    { id: "application", label: "적용분야" },
    { id: "period", label: "신청기간" },
    { id: "support", label: "지원정보" },
    { id: "restriction", label: "지원 제한사항" },
    { id: "form", label: "문의하기" }
  ]
};

// 기존 데이터 구조 유지 (하위 호환성)
export const governmentSupportData = {
  "smart-safety-equipment": {
    id: "smart-safety-equipment",
    title: "스마트 안전장비지원사업",
    subtitle: "정부지원사업",
    description: "산업변화와 기술발전에 따른 다양한 산업재해를 예방하기 위해 재정 및 기술여건이 취약한 중소사업장에 스마트 안전장비 도입 시 보조금을 지원하는 사업",
    image: "welding",
    imageAlt: "스마트 안전장비 지원사업",
    sidebarTitle: "스마트 안전장비지원사업",
    applicationCards: [
      {
        image: "manufacturing",
        imageAlt: "제조업 공장",
        label: "Manufacturing",
        title: "제조업 공장"
      },
      {
        image: "construction",
        imageAlt: "건설 현장",
        label: "Construction",
        title: "건설 현장"
      },
      {
        image: "grinding",
        imageAlt: "위험작업 현장",
        label: "Dangerous Work",
        title: "위험작업 현장"
      }
    ],
    applicationPeriod: {
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
    },
    supportInfo: {
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
    },
    restrictions: {
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
    },
    form: {
      title: "문의하기",
      subtitle: ""
    }
  },
  
  "digital-transformation": {
    id: "digital-transformation",
    title: "디지털 전환 지원사업",
    subtitle: "정부지원사업",
    description: "중소기업의 디지털 전환을 지원하여 경쟁력을 강화하고 생산성을 향상시키는 사업",
    image: "manufacturing",
    imageAlt: "디지털 전환 지원사업",
    sidebarTitle: "디지털 전환 지원사업",
    applicationCards: [
      {
        image: "manufacturing",
        imageAlt: "제조업",
        label: "Manufacturing",
        title: "제조업"
      },
      {
        image: "construction",
        imageAlt: "서비스업",
        label: "Service",
        title: "서비스업"
      },
      {
        image: "grinding",
        imageAlt: "IT업종",
        label: "IT",
        title: "IT업종"
      }
    ],
    applicationPeriod: {
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
    },
    supportInfo: {
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
    },
    restrictions: {
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
    },
    form: {
      title: "문의하기",
      subtitle: ""
    }
  },

  "green-energy": {
    id: "green-energy",
    title: "친환경 에너지 지원사업",
    subtitle: "정부지원사업",
    description: "친환경 에너지 기술 도입을 통한 탄소중립 실현과 에너지 효율성 향상을 지원하는 사업",
    image: "construction",
    imageAlt: "친환경 에너지 지원사업",
    sidebarTitle: "친환경 에너지 지원사업",
    applicationCards: [
      {
        image: "manufacturing",
        imageAlt: "제조업",
        label: "Manufacturing",
        title: "제조업"
      },
      {
        image: "construction",
        imageAlt: "건설업",
        label: "Construction",
        title: "건설업"
      },
      {
        image: "grinding",
        imageAlt: "에너지업",
        label: "Energy",
        title: "에너지업"
      }
    ],
    applicationPeriod: {
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
    },
    supportInfo: {
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
    },
    restrictions: {
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
    },
    form: {
      title: "문의하기",
      subtitle: ""
    }
  },

  "ai-manufacturing": {
    id: "ai-manufacturing",
    title: "AI 제조업 지원사업",
    subtitle: "정부지원사업",
    description: "인공지능 기술을 활용한 스마트 제조업 육성을 위한 지원사업",
    image: "manufacturing",
    imageAlt: "AI 제조업 지원사업",
    sidebarTitle: "AI 제조업 지원사업",
    applicationCards: [
      {
        image: "manufacturing",
        imageAlt: "제조업",
        label: "Manufacturing",
        title: "제조업"
      },
      {
        image: "construction",
        imageAlt: "자동화",
        label: "Automation",
        title: "자동화"
      },
      {
        image: "grinding",
        imageAlt: "AI기술",
        label: "AI Technology",
        title: "AI기술"
      }
    ],
    applicationPeriod: {
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
    },
    supportInfo: {
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
    },
    restrictions: {
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
    },
    form: {
      title: "문의하기",
      subtitle: ""
    }
  }
}; 
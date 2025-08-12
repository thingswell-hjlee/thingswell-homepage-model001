import React from 'react';
import SupportDetailPage from './SupportDetailPage';
import construction from '../../assets/construction.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import grinding from '../../assets/grinding.jpg';

const GreenEnergySupport = () => {
  // 데이터
  const solutionData = {
    subtitle: "정부지원사업",
    title: "친환경 에너지 지원사업",
    description: "친환경 에너지 기술 도입을 통한 탄소중립 실현과 에너지 효율성 향상을 지원하는 사업",
    image: construction,
    imageAlt: "친환경 에너지 지원사업"
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
  ];

  const applicationPeriodData = {
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
  };

  const supportInfoData = {
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
  };

  const restrictionData = {
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
  };

  const formData = { title: '문의하기', subtitle: '' };

  return (
    <SupportDetailPage
      solutionData={solutionData}
      solutionVariant="compact"
      applicationCardsData={applicationCardsData}
      applicationPeriodData={applicationPeriodData}
      supportInfoData={supportInfoData}
      restrictionData={restrictionData}
      formData={formData}
    />
  );
};

export default GreenEnergySupport; 
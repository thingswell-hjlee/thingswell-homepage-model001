import React from 'react';
import SupportDetailPage from './SupportDetailPage';
import manufacturing from '../../assets/manufacturing.jpg';
import construction from '../../assets/construction.jpg';
import grinding from '../../assets/grinding.jpg';

const DigitalTransformationSupport = () => {
  // 데이터
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

export default DigitalTransformationSupport; 
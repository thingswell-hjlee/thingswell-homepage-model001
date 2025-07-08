import React from 'react';
import '../App.css';
import welding from '../assets/welding.jpg';
import SolutionCard from '../components/SolutionCard';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationPeriodCard from '../components/ApplicationPeriodCard';
import SupportInfoCard from '../components/SupportInfoCard';
import RestrictionCard from '../components/RestrictionCard';
import FormCard from '../components/FormCard';

const Government_support = () => {
  // 데이터 정의
  const solutionData = {
    subtitle: "정부지원사업",
    title: "스마트안전장비지원사업",
    description: "산업변화와 기술발전에 따른 다양한 산업재해를 예방하기 위해 재정 및 기술여건이 취약한 중소사업장에 스마트 안전장비 도입 시 보조금을 지원하는 사업",
    image: welding,
    imageAlt: "스마트 안전장비 지원사업"
  };

  const applicationCardsData = [
    {
      image: welding,
      imageAlt: "제조업 공장",
      label: "Manufacturing",
      title: "제조업 공장"
    },
    {
      image: welding,
      imageAlt: "건설 현장",
      label: "Manufacturing",
      title: "건설 현장"
    },
    {
      image: welding,
      imageAlt: "위험작업 현장",
      label: "Manufacturing",
      title: "위험작업 현장"
    }
  ];

  const applicationPeriodData = {
    title: "신청기간",
    subtitle: "인공지능(AI) 기반 인체감지시스템",
    period: {
      start: "2025년 7월 3일 ~",
      end: "8월 3일"
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
    title: "지원한도 / 신청자격",
    subtitle: "인공지능(AI) 기반 인체감지시스템",
    supportLimit: {
      year: "2025년",
      amount: "3000만원",
      description: "관리품목"
    },
    qualifications: {
      description: "산업재해보상보험에 가입한 사업주 중 다음 어느 하나에 해당하는 자",
      items: [
        {
          main: "상시근로자 수 50명 미만 사업장의 사업주",
          sub: "단, 건설업의 경우 건설현장은 제외하며, 건설업 본사는 신청 가능"
        },
        {
          main: "중소기업기본법 시행령 제8조제1항 및 별표 3에 따른 주된 업종별 평균매출액 등이 '소기업 규모 기준' 이하인 기업의 사업주",
          sub: "※ 반드시 중소기업 확인서(소기업, 소기업(소상공인))를 발급받아 제출해야 함\n※ 단, 안전투자 혁신사업 보조금을 지급받은 설비는 제외"
        },
        {
          main: "상시근로자 수 50명 미만 사업장의 사업주로서, 산업안전보건법 시행령 제71조 별표 21에 따른 2호~24호 설비를 보유하거나 임대업을 하는 사업장의 사업주",
          sub: "※ 단, 안전동행 지원사업 보조금을 지급받은 설비는 지원대상에서 제외"
        }
      ]
    }
  };

  const restrictionData = {
    title: "참여제한",
    subtitle: "인공지능(AI) 기반 인체감지시스템",
    restrictions: [
      {
        main: "상호출자제한 기업집단 소속회사 및 국가, 지방자치단체 등 공공단체"
      },
      {
        main: "산업안전보건법 제 158조제4항(보조금 부당수급 등)에 따른 제한기간 중인 자"
      },
      {
        main: "산업재해보상보험료을 체납한 사업주"
      },
      {
        main: "근로자를 고용하고 있지 않는 사업주",
        sub: "단, 영 제거조 별표 21에 따른 기계 • 기구설비를 보유하거나 그에 대한 임대업을 하는 사업장의 사업주 제외"
      },
      {
        main: "24년도 사고사망 등 고위험개선사업, 산재예방시설 융자금 지원사업, 안전 투자혁신사업, 건강일터 조성 지원사업 결정 사업장",
        sub: "스마트 안전장비 지원사업을 금년도 2회 이상 결정 받은 사업장"
      }
    ]
  };
    const FormData = {
      title: "신청방법",
      subtitle: "인공지능(AI) 기반 인체감지시스템",
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="sidebar">
            <div className="sidebar-content">
              <h3>사이드메뉴</h3>
              <ul>
                <li>메뉴 항목 1</li>
                <li>메뉴 항목 2</li>
                <li>메뉴 항목 3</li>
                <li>메뉴 항목 4</li>
              </ul>
            </div>
          </div>
          <div className="main-content">
            <div className="solutions-section">
              <SolutionCard {...solutionData} />
              
              <div className="solution-card" style={{background: '#000'}}>
                <div className="application-cards no-line">
                  {applicationCardsData.map((card, index) => (
                    <ApplicationCard key={index} {...card} />
                  ))}
                </div>
              </div>
              
              <ApplicationPeriodCard {...applicationPeriodData} />
              <SupportInfoCard {...supportInfoData} />
              <RestrictionCard {...restrictionData} />
              <FormCard {...FormData} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Government_support; 
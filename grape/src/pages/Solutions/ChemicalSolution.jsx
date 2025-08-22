import React from 'react';
import SolutionDetailPage from './SolutionDetailPage';
import fire from '../../assets/fire.jpg';
import Collision from '../../assets/collision.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import construction from '../../assets/construction.jpg';
import grinding from '../../assets/grinding.jpg';
import server from '../../assets/server.jpg';
import main from '../../assets/solution_1/main.png';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import ProductInfo from '../../components/ProductPage/ProductInfo';
import ContactInfo from '../../components/ContactInfo';
import solution from '../../assets/header_image/Solution.jpg';
import care from '../../assets/care.png';
import service_1 from '../../assets/service/batch_2-1.png';
import service_2 from '../../assets/service/batch_2-2.png';
import service_3 from '../../assets/service/batch_2-3.png';
import service_4 from '../../assets/service/batch_2-4.png';
import service_5 from '../../assets/service_2/2-1.png';
import service_6 from '../../assets/service_2/2-2.png';
import service_7 from '../../assets/service_2/2-3.png';
import service_8 from '../../assets/service_2/2-4.png'; 

const BREADCRUMBS = ["Home", "Solutions", "노인 및 장애인 홈케어 솔루션"];

const SOLUTION_DATA = {
  title: "노인 및 장애인을 위한 홈케어 솔루션",
  description:
    "AI 기반의 상황/행동 인지 홈케어 솔루션은 인지장애를 가진 노인 및 장애인의 안전과 편의를 향상하기 위해 개발된 비접촉식 스마트 모니터링 시스템입니다. 사생활 침해 우려 없이 위험 상황을 조기에 감지하고, 단계별 알림을 통해 신속한 대응을 돕습니다. 또한, 사용자의 일상생활 패턴을 학습하여 개개인에게 최적화된 맞춤형 케어를 제공합니다.",
};

const WORKER_SAFETY_CARDS = [
  {
    image: service_5,
    imageAlt: "위험 상황 감지",
    title: "위험 상황 감지 및 알림",
    desc: [
      "낙상 감지: 침대, 거실, 화장실 등에서 넘어지거나 쓰러지는 상황을 즉시 감지하여 알림을 보냅니다.",
      "이상 행동 감지: 자해, 폭행 등 위험 행동이나 과도한 흥분, 과몰입, 배회 등 비정상적인 행동을 파악해 경고합니다.",
      "생활 위험 감지: 주방에서 요리 중 장시간 방치하거나, 위험한 공간에 접근하는 것을 감지해 알립니다."
    ]
  },
  {
    image: service_6,
    imageAlt: "스마트 환경 제어",
    title: "스마트 환경 제어",
    desc: [
      "다양한 센서 데이터(영상, 음향, 공기질, 모션)를 분석하여 사용자의 상태에 따라 조명, 음향, 환기 등 스마트 홈 기기를 자동으로 제어합니다.",
      "사용자의 심리 상태를 안정시키기 위한 테라피 콘텐츠(에어케어, 사운드, 비주얼)를 제공하여 정서적 안정에 도움을 줍니다."
    ]
  },
  {
    image: service_7,
    imageAlt: "IoT 연동",
    title: "스마트폰 및 IoT 연동",
    desc: [
      "스마트밴드, 스마트폰 등 IoT 기기와 연동하여 사용자의 움직임, 위치 등 다양한 데이터를 수집합니다.",
      "수집된 데이터를 기반으로 개인화된 대화 및 알림 서비스를 제공합니다."
    ]
  },
  {
    image: service_8,
    imageAlt: "개인 맞춤형 서비스",
    title: "개인 맞춤형 솔루션",
    desc: [
      "사용자의 생활 패턴을 학습하여 투약 시간 알림, 건강 관리 스케줄 관리 등 인지장애 유형과 개인 특성을 고려한 맞춤형 서비스를 제공합니다.",
      "지속적인 업그레이드와 사용성 평가를 통해 항상 최신 기술을 접목한 서비스를 제공합니다."
    ]
  },
];

const FEATURE_DESCRIPTIONS = [
  {
    image: care,
    title: "서비스 구성도",
    description: [
      "데이터 수집 단계: AI 카메라/레이더 모듈, 복합 센서 모듈, 개인 IoT 기기에서 움직임, 행동, 환경, 생체 데이터를 수집합니다.",
      "데이터 분석 단계: 융합형 멀티모달 모듈, AI 상황 추론 엔진, 클라우드 서버를 통해 수집된 데이터를 통합 분석하고 위험 상황을 실시간으로 판단합니다.",
      "서비스 제공 단계: 스마트폰 앱, 단계별 알림, 홈 기기 통합 제어를 통해 실시간 상황 알림과 자동화된 환경 제어를 제공합니다."
    ],
    // Enable large image for the service architecture diagram
    largeImage: true
  },
];

const APPLICATION_FIELD_CARDS = [
  {
    image: service_1,
    imageAlt: "프라이버시 보호",
    title: "프라이버시를 고려한 모니터링",
    desc: "침실, 화장실 등 사생활 공간에서도 CCTV 없이 AI 카메라, 레이더, 복합 센서를 활용해 낙상이나 이상 행동을 감지합니다. 사용자의 모습이 아닌 행동 패턴만을 분석하여 개인 정보를 보호합니다."
  },
  {
    image: service_2,
    imageAlt: "3단계 알림 시스템",
    title: "3단계 스마트 알림 시스템",
    desc: "위험 상황 감지 시, 음성 안내 → 강력한 경고음 → 보호자 및 유관기관 알림 순으로 상황의 심각성에 맞는 알림을 제공해 골든타임을 확보합니다."
  },
  {
    image: service_3,
    imageAlt: "맞춤형 서비스",
    title: "개인 맞춤형 솔루션",
    desc: "사용자의 생활 패턴을 학습하여 투약 시간 알림, 건강 관리 스케줄 관리 등 인지장애 유형과 개인 특성을 고려한 맞춤형 서비스를 제공합니다."
  },
  {
    image: service_4,
    imageAlt: "지속적 관리",
    title: "지속 가능한 관리 및 지원",
    desc: "솔루션의 지속적인 업그레이드와 사용성 평가를 통해, 항상 최신 기술을 접목한 서비스를 제공하며 장애인·노인 삶의 질 제고에 기여합니다."
  },
];



const BLOCKS = [
  {
    type: 'applicationCards',
    data: APPLICATION_FIELD_CARDS,
    props: { boxName: '서비스 특징', columnsPerRow: 4 },
  },
  {
    type: 'applicationCards',
    data: WORKER_SAFETY_CARDS,
    props: { boxName: '주요 기능', columnsPerRow: 3 },
  },
    {
      type: 'features',
      data: FEATURE_DESCRIPTIONS,
      props: { boxName: '서비스 구성도', columnsPerRow: 1 },
    },
];

const ChemicalSolution = () => {
  return (
    <>
      <ProductHeader image={solution} alt="solution" />
      <div className="product-page-content">
        <div className="container">
          <ProductInfo
            productName={SOLUTION_DATA.title}
            productTitle={SOLUTION_DATA.title}
            description={SOLUTION_DATA.description}
            breadcrumbs={BREADCRUMBS}
          />
           <SolutionDetailPage
        solutionData={SOLUTION_DATA}
        solutionVariant="default"
        blocks={BLOCKS}
        />

        
        </div>
      </div>
     
    </>
  );
};

export default ChemicalSolution; 
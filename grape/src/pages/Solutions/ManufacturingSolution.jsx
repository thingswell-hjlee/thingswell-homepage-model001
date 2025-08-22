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
import control from '../../assets/control.png';

const BREADCRUMBS = ["Home", "Solutions", "스마트 통합제어 솔루션"];

const SOLUTION_DATA = {
  title: "스마트 통합제어 솔루션",
  description:
    "스마트 통합제어 솔루션은 대회의실, 강당, 강의실, 컨벤션홀 등 다양한 공간에 분산된 영상, 음향, 조명, 냉난방, 공조 등 여러 설비들을 하나의 스마트 인터페이스(스마트패드, PC 등)로 통합하여 원격 제어 및 관리하는 혁신적인 시스템입니다. 다중 센서 기술(카메라, 레이더, 공기질 센서 등)과 멀티모달 상황인지 기반의 자동화 제어를 통해 공간의 효율성을 극대화하며, 유지관리 비용 절감 및 운영의 편리성을 제공하는 것을 목표로 합니다.",
};

const WORKER_SAFETY_CARDS = [
  {
    image: Collision,
    imageAlt: "통합 제어 기능",
    title: "통합 제어 기능",
    link: "/solutions/multimodal-awareness",
    desc: [
      "영상(비디오월, 매트릭스), 음향(마이크, 믹서, DSP), 조명(DMX512 제어, 스팟 조명), 환경 설비(냉난방, 전등) 등 모든 장비를 단일 인터페이스로 제어합니다.",
      "복잡한 장비 조작의 어려움을 해소하고 운영을 간소화합니다."
    ]
  },
  { 
    image: fire,
    imageAlt: "상황 인지 기반 자동화",
    title: "상황 인지 기반 자동화",
    link: "/solutions/rag-llm",
    desc: [
      "공기질, 모션, 카메라 등 멀티모달 센서 데이터를 활용하여 공간의 상황을 인지하고 자동으로 설비를 제어하는 기능을 제공합니다.",
      "다중 센서 기술을 통해 공간의 효율성을 극대화합니다."
    ]
  },
  {
    image: server,
    imageAlt: "화상회의 및 발표 지원",
    title: "화상회의 및 발표 지원",
    link: "/solutions/overview",
    desc: [
      "화자 추적 시스템, 화상회의 시스템 연동, 하울링 제거, 카메라 프리셋 기반 위치 추적 제어 등 최적의 비즈니스 환경을 제공합니다.",
      "회의실, 강의실, 전시장 등 각 공간의 특성에 최적화된 서비스를 제공합니다."
    ]
  },
  {
    image: server,
    imageAlt: "매크로 및 스케줄링",
    title: "매크로 및 스케줄링",
    link: "/solutions/on-device-ai",
    desc: [
      "자주 사용하는 설비 조합을 '프리셋'으로 저장하여 한 번의 터치로 실행하거나, 특정 시간에 자동으로 설비를 제어하는 '스케줄링' 기능을 제공합니다.",
      "자동화 운영으로 에너지 절감과 운영 효율을 극대화합니다."
    ]
  },
];

const FEATURE_DESCRIPTIONS = [
  {
    image: control,
    title: "서비스 구성도",
    description: [
      "사용자 인터페이스: PC, 태블릿, 스마트폰, 스마트패드 등 사용자가 직접 시스템을 조작하는 모든 기기를 포함하며, 사용자의 편의에 맞춰 맞춤형 앱 및 웹 인터페이스를 제공합니다.",
      "중앙 제어 시스템: 통합 제어기(Advanced Integrated Controller XCN-3000)와 관리 서버(ThingsEye)를 통해 모든 장비의 정보를 취합하고 제어 명령을 전달하며, 원격 모니터링, 데이터 수집 및 분석, 자동화 스케줄링 등을 담당합니다.",
      "제어 대상 설비: 영상 설비(DID/LED 비디오월, 비디오 매트릭스, 화상회의 카메라), 음향 설비(무선 마이크, 오디오 믹서 및 DSP, 입체 음향 시스템), 조명 설비(DMX512 기반 감성 조명, 스팟 조명, 룸 조명), 환경 설비(룸 에어컨, 전등, 공조 시스템), 센서(공기질, 카메라, 레이더, 모션 센서) 등 통합 제어 시스템으로부터 명령을 받아 작동하는 모든 장비들입니다."
    ],
    // Enable large image for the service architecture diagram
    largeImage: true,
  },
];

const APPLICATION_FIELD_CARDS = [
  {
    image: manufacturing,
    imageAlt: "스마트 공간 통합 제어",
    title: "스마트 공간 통합 제어",
    desc: "방송, 음향, 조명, 냉난방, 환경설비 등 다양한 종류의 설비를 하나의 시스템으로 통합하여 제어할 수 있습니다. 이를 통해 복잡한 장비 조작의 어려움을 해소하고 운영을 간소화합니다."
  },
  {
    image: construction,
    imageAlt: "환경 맞춤형 UI/UX 디자인",
    title: "환경 맞춤형 UI/UX 디자인",
    desc: "회의실, 강의실, 전시장 등 각 공간의 특성과 사용자 요구사항에 최적화된 맞춤형 인터페이스를 제공하여 사용 편의성을 극대화합니다."
  },
  {
    image: grinding,
    imageAlt: "원격 및 자동화 관리",
    title: "원격 및 자동화 관리",
    desc: "'ThingsEye' 솔루션을 통해 다중 공간의 설비 상태를 원격으로 모니터링하고 제어할 수 있습니다. 또한, 스케줄링 및 매크로 기능을 활용한 자동화 운영으로 에너지 절감과 운영 효율을 극대화합니다."
  },
  {
    image: grinding,
    imageAlt: "확장성 및 안정성",
    title: "뛰어난 확장성 및 안정성",
    desc: "'Advanced Integrated Controller XCN-3000'은 RS232/485, TCP/IP, IR, 릴레이 등 다양한 프로토콜 및 인터페이스를 지원하여 여러 장치를 유연하게 연결하고 시스템을 확장할 수 있습니다. 안정적인 네트워크 연결성을 기반으로 시스템 다운타임을 최소화합니다."
  },
];

const SERVICE_ARCHITECTURE_CARDS = [
  {
    image: control,
    imageAlt: "서비스 구성도",
    desc: [
      "사용자 인터페이스: PC, 태블릿, 스마트폰, 스마트패드 등 사용자가 직접 시스템을 조작하는 모든 기기를 포함하며, 사용자의 편의에 맞춰 맞춤형 앱 및 웹 인터페이스를 제공합니다.",
      "중앙 제어 시스템: 통합 제어기(Advanced Integrated Controller XCN-3000)와 관리 서버(ThingsEye)를 통해 모든 장비의 정보를 취합하고 제어 명령을 전달하며, 원격 모니터링, 데이터 수집 및 분석, 자동화 스케줄링 등을 담당합니다.",
      "제어 대상 설비: 영상 설비(DID/LED 비디오월, 비디오 매트릭스, 화상회의 카메라), 음향 설비(무선 마이크, 오디오 믹서 및 DSP, 입체 음향 시스템), 조명 설비(DMX512 기반 감성 조명, 스팟 조명, 룸 조명), 환경 설비(룸 에어컨, 전등, 공조 시스템), 센서(공기질, 카메라, 레이더, 모션 센서) 등 통합 제어 시스템으로부터 명령을 받아 작동하는 모든 장비들입니다."
    ],
    fullWidthImage: true,
    reverse: true,
  },
];

const BLOCKS = [
  {
    type: 'applicationCards',
    data: APPLICATION_FIELD_CARDS,
    props: { boxName: '서비스 특징' },
  },
  {
    type: 'applicationCards',
    data: WORKER_SAFETY_CARDS,
    props: { boxName: '주요 기능' },
  },
  {
    type: 'features',
    data: FEATURE_DESCRIPTIONS,
    props: { boxName: '서비스 구성도', columnsPerRow: 1 },
  },
];

const ManufacturingSolution = () => {
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

export default ManufacturingSolution; 
import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import ApplicationCardsSection from '../../components/ApplicationCardsSection';
import FeatureDescription from '../../components/FeatureDescription';
import main from '../../assets/solution_1/main.png';
import solution from '../../assets/header_image/Solution.jpg';
import service_1 from '../../assets/service/batch_1-1.png';
import service_2 from '../../assets/service/batch_1-2.png';
import service_3 from '../../assets/service/batch_1-3.png';
import service_4 from '../../assets/service/batch_1-4.png';
import service_5 from '../../assets/service_2/1-1.png';
import service_6 from '../../assets/service_2/1-2.png';
import service_7 from '../../assets/service_2/1-3.png';
import service_8 from '../../assets/service_2/1-4.png';

const BREADCRUMBS = ["Home", "사업분야", "산업 안전 솔루션"];

const SOLUTION_DATA = {
  title: "산업안전 솔루션",
  description:
    "AI 기반 멀티모달 산업안전 솔루션은 RAG(Retrieval-Augmented Generation) 기술을적용한 대규모 비전 모델(LVM)과 언어 모델(LLM), 그리고 다양한 실시간 센싱시스템에서 수집되는 데이터를 통합 분석하여 작업자 안전을 극대화하는 혁신적인 솔루션입니다.이 솔루션은 제조 현장의 안전 매뉴얼 정보를 기반으로 카메라, 레이더, 음향 센서 등여러 센서로부터 들어오는 멀티모달 데이터를 실시간으로 융합 및 분석합니다. 이를통해 작업자의 위험 행동을 정확하게 감지하고, 유해한 환경 요인을 미리 예측하여 사고를 예방하는 통합적인 데이터 처리 엔진을 제공합니다. 기존의 사후 대응 방식을 넘어, AI 기반의 예측적 위험 완화를 통해 제조 현장의 안전성과 생산성을 동시에 향상시킵니다.",
};

const WORKER_SAFETY_CARDS = [
  {
    image: service_5,
    imageAlt: "전방 위협 요소 감지",
    title: "멀티모달 데이터 수집 및 전처리",
    desc:"입력 소스: 카메라(객체 감지, 행동 분석), ToF(깊이 매핑), 레이더(움직임 추적), 마이크(알람 감지), 공기질 센서, 모션 센서 등 다양한 센서에서 데이터를 실시간으로 수집합니다",
    desc2:"데이터 정규화: 다양한 형식의 센서 데이터를 표준화하여 분석 준비를 완료합니다"
  },
  {
    image: service_6,
    imageAlt: "후방 위협 요소 감지",
    title: "지능형 데이터 융합 및 추론",
    desc: [
      "데이터 융합: 수집된 데이터를 시간순으로 정렬하고 상관관계를 분석하여 단일화된 데이터로 융합합니다.",
      "RAG-LVM/LLM 통합:",
      "LVM: 카메라 데이터를 활용해 객체 위치, 장면 이해, 공간 추론을 수행하여 위험 구역이나 막힌 출입구를 식별합니다.",
      "LLM: 실시간 데이터와 안전 매뉴얼을 비교하여 \"작업자가 특정 장비에 접근하여 위험하다\"와 같은 지능적인 추론 결과를 생성합니다."
    ]
  },
  {
    image: service_7,
    imageAlt: "원격관리시스템",
    title: "자동화된 의사결정 및 조치",
    desc: [
      "위험 평가: 추론된 데이터를 기반으로 위험 수준을 저-중-고로 분류하고, 상황에 맞는 즉각적인 조치를 결정합니다.",
      "조치 생성: 경고 알림 발송, 장비 자동 중단, 작업자에게 수정 조치 제안 등 자동화된 개입을 실행합니다."
    ]
  },
  {
    image: service_8,
    imageAlt: "엣지-클라우드 연동",
    title: "엣지-클라우드 연동 처리",
    desc: [
      "엣지 처리: 저지연 환경에서 즉각적인 위험 감지와 경고를 위해 디바이스 수준에서 핵심 연산을 수행합니다.",
      "클라우드 통합: 장기적인 데이터 분석, 모델 학습, 시스템 관리 등 비핵심 작업을 클라우드에서 처리하여 시스템의 확장성과 안정성을 확보합니다."
    ]
  },
];

// const FEATURE_DESCRIPTIONS = [
//   {
//     image: manufacturing,
//     title: "RAG 기반 멀티모달 데이터 통합 처리",
//     description:
//       "RAG 기반의 대규모 비전 모델(LVM), 대규모 언어 모reversE
    
//   },
//   {
//     image: welding,
//     title: "IoT 센서 기술 활용",
//     description:
//       "IoT 센서와 영상 분석 기술을 활용하여 작업자의 안전을 최우선으로 보호합니다. 다양한 센서를 통해 환경 데이터를 수집하고, 실시간으로 위험 상황을 감지하여 즉시 대응할 수 있습니다.",
//     subtitle: "Real-time monitoring",
//   },
//   {
//     image: fire,
//     title: "빅데이터 분석 시스템",
//     description:
//       "빅데이터 분석을 통한 사고 예방 시스템을 구축합니다. 과거 사고 데이터와 현재 상황을 비교 분석하여 위험도를 예측하고, 사전 예방 조치를 제안합니다.",
//     subtitle: "Real-time monitoring",
//   },
//   {
//     youtubeUrl:
//       "https://www.youtube.com/watch?v=gZ1h4kgTC28&ab_channel=intenseye",
//     title: "실시간 안전 모니터링 데모",
//     description:
//       "실제 산업 현장에서 적용되는 AI 기반 안전 모니터링 시스템의 데모 영상입니다. 실시간으로 작업자의 행동을 분석하고 위험 상황을 감지하는 과정을 확인할 수 있습니다.",
//     subtitle: "Real-time monitoring",
//   },
// ];

const FEATURE_DESCRIPTIONS = [
  {
    image: main,
    title: "서비스 구성도",
    description: [
      "데이터 수집단계: 카메라, ToF/레이더, 마이크, 공기질 센서, 모션 센서 등에서 데이터를 실시간으로 수집·전처리합니다.",
      "통합 엔진단계: 수집된 데이터를 융합하고, RAG-LVM/LLM을 활용해 지능적으로 추론하여 의사결정을 수행합니다.",
      "조치 및 피드백단계: 작업자 피드백(시각/청각/촉각), 경고 알람, 자동 제어, 클라우드 서버 연동을 통해 조치 및 피드백을 제공합니다."
    ],
    // Enable large image display for the service architecture diagram
    largeImage: true
  },
];

const APPLICATION_FIELD_CARDS = [
  {
    image: service_1,
    imageAlt: "제조업 공장",
    // label: "Manufacturing",
    title: "실시간 위험 예측 및 예방",
    desc:"단순히 위험을 감지하는 것을 넘어, 과거 데이터를 학습하여 위험 행동 패턴과 환경 변화를 사전에 예측하고 선제적 조치를 제안합니다"
  },
  {
    image: service_2,
    imageAlt: "건설 현장",
    title: "통합 멀티모달 데이터 분석",
    desc:"시각(카메라), 공간(TOF/레이더), 음향(마이크), 환경(공기질), 동작(모션 센서) 등 다양한 센서 데이터를 융합하여 단일 센서로는 불가능했던 복잡하고 미묘한 상황까지 정확하게 인지합니다"
  },
  {
    image: service_3,
    imageAlt: "위험작업 현장",
    title: "지능형 RAG 기반 추론",
    desc:'작업자 및 환경 데이터를 안전 매뉴얼과 실시간으로 교차 분석하여, "작업자가 장비 X에 너무 가까이 있다" 와 같은 상황에 대한 컨텍스트 기반의 지능적인 판단을 내립니다'
  },
  {
    image: service_4,
    imageAlt: "위험작업 현장",
    title: "모듈형 및 확장성 높은 설계",
    desc:"다양한 산업 환경과 규제에 맞춰 유연하게 시스템을 구성할 수 있는 모듈형으로 설계되어 있어, 높은 확장성을 보장합니다"
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

const Soulution = () => {
  return (
    <BaseLayout
      header={() => <ProductHeader image={solution} alt="solution" />}
      breadcrumbs={BREADCRUMBS}
      title={SOLUTION_DATA.title}
    >
      <div className="solution-detail-page">
        <div className="solution-description">
          <p>{SOLUTION_DATA.description}</p>
        </div>
        
        {BLOCKS.map((block, index) => {
          switch (block.type) {
            case 'applicationCards':
              return (
                <ApplicationCardsSection
                  key={index}
                  boxName={block.props.boxName}
                  applicationCardsData={block.data}
                  columnsPerRow={block.props.columnsPerRow}
                />
              );
            case 'features':
              return (
                <div key={index}>
                  {block.data.map((feature, featureIndex) => (
                    <FeatureDescription
                      key={featureIndex}
                      image={feature.image}
                      title={feature.title}
                      description={feature.description}
                      largeImage={feature.largeImage}
                    />
                  ))}
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </BaseLayout>
  );
};

export default Soulution; 
import React from 'react';
import SolutionDetailPage from './SolutionDetailPage';
import welding from '../../assets/welding.jpg';
import fire from '../../assets/fire.jpg';
import Collision from '../../assets/collision.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import construction from '../../assets/construction.jpg';
import grinding from '../../assets/grinding.jpg';
import server from '../../assets/server.jpg';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import ProductInfo from '../../components/ProductPage/ProductInfo';

const BREADCRUMBS = ["Home", "Solutions", "제조 안전 솔루션"];

const SOLUTION_DATA = {
  title: "제조 안전 솔루션",
  description:
    "AI 기반 멀티모달 산업안전 솔루션은 RAG(Retrieval-Augmented Generation) 기술을적용한 대규모 비전 모델(LVM)과 언어 모델(LLM), 그리고 다양한 실시간 센싱시스템에서 수집되는 데이터를 통합 분석하여 작업자 안전을 극대화하는 혁신적인 솔루션입니다.이 솔루션은 제조 현장의 안전 매뉴얼 정보를 기반으로 카메라, 레이더, 음향 센서 등여러 센서로부터 들어오는 멀티모달 데이터를 실시간으로 융합 및 분석합니다. 이를통해 작업자의 위험 행동을 정확하게 감지하고, 유해한 환경 요인을 미리 예측하여 사고를 예방하는 통합적인 데이터 처리 엔진을 제공합니다. 기존의 사후 대응 방식을 넘어, AI 기반의 예측적 위험 완화를 통해 제조 현장의 안전성과 생산성을 동시에 향상시킵니다.",
};

const WORKER_SAFETY_CARDS = [
  {
    image: Collision,
    imageAlt: "전방 위협 요소 감지",
    label: "Forward threat detection",
    title: "전방 위협 요소 감지",
    link: "/solution/forward-threat-detection",
  },
  {
    image: fire,
    imageAlt: "후방 위협 요소 감지",
    label: "Backward threat detection",
    title: "후방 위협 요소 감지",
  },
  {
    image: server,
    imageAlt: "작업자 알람 및 AI 음성 대화",
    label: "Worker alert and AI voice conversation",
    title: "작업자 알람 및 AI 음성 대화",
  },
  {
    image: server,
    imageAlt: "원격관리시스템",
    label: "Remote management system",
    title: "원격 관리 시스템",
  },
];

const FEATURE_DESCRIPTIONS = [
  {
    image: manufacturing,
    title: "RAG 기반 멀티모달 데이터 통합 처리",
    description:
      "RAG 기반의 대규모 비전 모델(LVM), 대규모 언어 모델(LLM), 실시간 센싱 시스템의 멀티모달 데이터를 통합하여 작업자 안전 솔루션을 구축합니다.",
    subtitle: "Real-time monitoring",
  },
  {
    image: welding,
    title: "IoT 센서 기술 활용",
    description:
      "IoT 센서와 영상 분석 기술을 활용하여 작업자의 안전을 최우선으로 보호합니다. 다양한 센서를 통해 환경 데이터를 수집하고, 실시간으로 위험 상황을 감지하여 즉시 대응할 수 있습니다.",
    subtitle: "Real-time monitoring",
  },
  {
    image: fire,
    title: "빅데이터 분석 시스템",
    description:
      "빅데이터 분석을 통한 사고 예방 시스템을 구축합니다. 과거 사고 데이터와 현재 상황을 비교 분석하여 위험도를 예측하고, 사전 예방 조치를 제안합니다.",
    subtitle: "Real-time monitoring",
  },
  {
    youtubeUrl:
      "https://www.youtube.com/watch?v=gZ1h4kgTC28&ab_channel=intenseye",
    title: "실시간 안전 모니터링 데모",
    description:
      "실제 산업 현장에서 적용되는 AI 기반 안전 모니터링 시스템의 데모 영상입니다. 실시간으로 작업자의 행동을 분석하고 위험 상황을 감지하는 과정을 확인할 수 있습니다.",
    subtitle: "Real-time monitoring",
  },
];

const FORM_DATA = {
  title: '문의하기',
  subtitle: '궁금한 점이 있으시면 언제든 문의해주세요',
};

const APPLICATION_FIELD_CARDS = [
  {
    image: manufacturing,
    imageAlt: "제조업 공장",
    label: "Manufacturing",
    title: "제조업 공장",
  },
  {
    image: construction,
    imageAlt: "건설 현장",
    label: "Construction",
    title: "건설 현장",
  },
  {
    image: grinding,
    imageAlt: "위험작업 현장",
    label: "Dangerous Work",
    title: "위험작업 현장",
  },
];

const BLOCKS = [
  {
    type: 'applicationCards',
    data: APPLICATION_FIELD_CARDS,
    props: { boxName: '서비스 특징', subtitle: 'Service Features' },
  },
  {
    type: 'applicationCards',
    data: WORKER_SAFETY_CARDS,
    props: { boxName: '작업자 안전 보호', subtitle: 'Worker safety protection' },
  },
  { type: 'features', data: FEATURE_DESCRIPTIONS },
];

const Soulution = () => {
  return (
    <>
      <ProductHeader />
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
        formData={FORM_DATA}
      />
        </div>
      </div>
     
    </>
  );
};

export default Soulution; 
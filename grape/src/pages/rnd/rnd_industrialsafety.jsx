import React from 'react';
import RndSolutionPage from '../../components/RndSolutionPage';
import multimodal from '../../assets/rnd_main/multimodal.png';
import rag from '../../assets/rnd_main/RAG_LLM.png';
import ai from '../../assets/rnd_main/AI.png';
const BREADCRUMBS = ["Home", "연구개발", "산업 안전"];

const SOLUTION_DATA = {
  title: "산업 안전",
  description:
    "AI 기반 멀티모달 산업안전 솔루션은 RAG(Retrieval-Augmented Generation) 기술을 적용한 대규모 비전 모델(LVM)과 언어 모델(LLM), 그리고 다양한 실시간 센싱 시스템에서 수집되는 데이터를 통합 분석하여 작업자 안전을 극대화하는 혁신적인 솔루션입니다. 이 솔루션은 제조 현장의 안전 매뉴얼 정보를 기반으로 카메라, 레이더, 음향 센서 등 여러 센서로부터 들어오는 멀티모달 데이터를 실시간으로 융합 및 분석합니다. 이를 통해 작업자의 위험 행동을 정확하게 감지하고, 유해한 환경 요인을 미리 예측하여 사고를 예방하는 통합적인 데이터 처리 엔진을 제공합니다.",
};

const WORKER_SAFETY_CARDS = [
  {
    image: multimodal,
    title: "멀티모달 센서 기술",
    description: [
      "다양한 센서(카메라, ToF, 레이더, 마이크, 공기질, 모션)의 데이터를 통합 수집하고 전처리하는 기술을 연구합니다",
      "실시간 데이터 정규화 및 표준화 기술을 개발하여 분석 준비를 완료합니다"
    ],
    link: "/rnd/multimodal-awareness"
  },
  {
    image: rag,
    title: "RAG-LLM 통합 기술",
    description: [
      "LVM: 대규모 비전 모델을 활용한 객체 인식, 장면 이해, 공간 추론 기술을 개발합니다.",
      "LLM: 실시간 데이터와 안전 매뉴얼을 결합한 지능형 추론 시스템을 연구합니다."
    ],
    link: "/rnd/rag-llm"
  },
  {
    image: ai,
    title: "온디바이스 AI 기술",
    description: [
      "통신이 불안정하거나 제한된 환경에서도 실시간으로 위험을 감지하고 즉각적으로 대응할 수 있는 기술을 개발합니다"
    ],
    link: "/rnd/on-device-ai"
  },
];

const BLOCKS = [
  {
    type: 'features',
    data: WORKER_SAFETY_CARDS,
  },
];

const IndustrialSafetySolution = () => {
  return (
    <RndSolutionPage
      breadcrumbs={BREADCRUMBS}
      solutionData={SOLUTION_DATA}
      blocks={BLOCKS}
    />
  );
};

export default IndustrialSafetySolution; 
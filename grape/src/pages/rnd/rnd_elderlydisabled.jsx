import React from 'react';
import RndSolutionPage from '../../components/RndSolutionPage';
import old from '../../assets/rnd_main/old.png';
import danger from '../../assets/rnd_main/danger.png';

const BREADCRUMBS = ["Home", "연구개발", "노인 장애인 안전"];

const SOLUTION_DATA = {
  title: "노인 장애인 안전",
  description:
    "AI 기반의 상황/행동 인지 홈케어 솔루션은 인지장애를 가진 노인 및 장애인의 안전과 편의를 향상하기 위해 개발된 비접촉식 스마트 모니터링 시스템입니다. 사생활 침해 우려 없이 위험상황을 조기에 감지하고, 단계별 알림을 통해 신속한 대응을 돕습니다. 또한, 사용자의 일상생활 패턴을 학습하여 개개인에게 최적화된 맞춤형 케어를 제공합니다.",
};

const WORKER_SAFETY_CARDS = [
  {
    image: old,
    title: "인지장애 노인 및 장애인을 위한 스마트 보조 기술",
    description: [
      "AI 기반 비전 분석을 통해 노인과 장애인의 낙상레이더 및 카메라를 활용한 위험 상황 조기 감지용 임베디드 시스템"
    ],
    link: "/rnd/smart-assistive-technology"
  },
  {
    image: danger,
    title: "위험상황 조기감지용 임베디드 시스템 기술",
    description: [
      "자동 응급 신고 시스템:",
      "낙상이나 이상 상황 감지 시 자동으로 응급 서비스에 신고하는 기술을 개발합니다.",
      "보호자 연락 시스템: 긴급 상황 발생 시 보호자에게 즉시 알림을 보내는 기술을 연구합니다."
    ],
    link: "/rnd/embedded-system"
  },
];

const BLOCKS = [
  {
    type: 'features',
    data: WORKER_SAFETY_CARDS,
  },
];

const ElderlyDisabledSolution = () => {
  return (
    <RndSolutionPage
      breadcrumbs={BREADCRUMBS}
      solutionData={SOLUTION_DATA}
      blocks={BLOCKS}
    />
  );
};

export default ElderlyDisabledSolution; 
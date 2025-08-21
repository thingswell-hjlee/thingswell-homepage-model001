import React from 'react';
import RndSolutionPage from '../../components/RndSolutionPage';
import air from '../../assets/rnd_main/AI_air.png';

const BREADCRUMBS = ["Home", "연구개발", "통합제어"];

const SOLUTION_DATA = {
  title: "통합제어",
  description:
    "AI 기반 통합제어 솔루션은 다양한 산업 장비와 시스템을 하나의 플랫폼에서 통합 관리하고 제어하는 혁신적인 기술입니다. IoT 센서, PLC, SCADA 시스템 등 다양한 제어 장치의 데이터를 수집하고, AI 알고리즘을 통해 최적화된 제어 로직을 실시간으로 생성합니다. 이를 통해 생산성 향상, 에너지 효율성 증대, 안전성 강화를 동시에 달성하는 스마트 팩토리 솔루션을 제공합니다.",
};

const WORKER_SAFETY_CARDS = [
  {
    image: air,
    title: "건강하고 쾌적한 생활 환경 조성",
    description: [
      "'AI 기반 공기질 관리 기술'은 머신러닝을 활용하여 실내외 공기질 데이터를 고도화하고, 쾌적한 환경을 능동적으로 제어하는 혁신적인 시스템입니다. 이 기술은 센서 오차 및 노후화 문제를 스스로 해결하여 데이터의 '신뢰성'을 확보하며, 공공 사업이나 정밀한 환경 분석에 활용될 수 있는 기반을 제공합니다.",
      "특히, 머신러닝 기반의 '비정상 감지' 기술은 센서 오염이나 노후화로 발생하는 오류를 자동으로 보정하여 항상 정확한 정보를 유지합니다. 또한, '예측 유지보수 기술'은 단말기 고장 가능성을 사전에 예측하여 불필요한 현장 방문 및 관리 비용을 절감합니다. '스마트 환경 제어 기술'은 공기청정기, 에어컨 등과 연동되어 미세먼지 급증 시 자동 가동하거나 이산화탄소 농도에 따라 환기 시스템을 최적으로 제어하는 등 능동적인 서비스를 제공합니다. 이 기술은 어린이집, 병원, 학교 등 환경에 민감한 시설부터 스마트 아파트, 복합쇼핑몰에 이르기까지 다양한 공간에 적용되어 사용자 맞춤형의 안전하고 건강한 생활 환경을 조성하는 데 기여하고 있습니다."
    ],
    link: "/rnd/air-quality-management"
  },
];

const BLOCKS = [
  {
    type: 'features',
    data: WORKER_SAFETY_CARDS,
  },
];

const IntegratedControlSolution = () => {
  return (
    <RndSolutionPage
      breadcrumbs={BREADCRUMBS}
      solutionData={SOLUTION_DATA}
      blocks={BLOCKS}
    />
  );
};

export default IntegratedControlSolution; 
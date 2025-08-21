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
    title: "존엄하고 안전한 돌봄의 미래",
    description: [
      "'인지장애 노인 및 장애인을 위한 스마트 보조 기술'은 현대 돌봄 시스템의 한계를 극복하는 혁신적인 해법입니다. 이 기술은 인지장애를 가진 분들이 겪을 수 있는 낙상, 배회와 같은 위험 상황을 조기에 감지하여 안전을 향상시킵니다. 특히, CCTV가 설치되기 어려운 침실이나 화장실 등 사생활이 중요한 공간에서도 비접촉식 멀티모달 센싱 기술을 활용해 개인의 존엄성을 지키면서도 빈틈없는 모니터링이 가능하도록 설계되었습니다.\n\n이 시스템은 단순히 위험을 감지하는 데 그치지 않습니다. 사용자의 행동 패턴을 정밀하게 학습하여 평소와 다른 이상 행동을 예측하고, 돌봄 인력에게 즉시 알림을 전달합니다. 이는 24시간 내내 대기하기 어려운 돌봄 인력의 업무 부담을 크게 줄여주고, 돌발 상황에 대한 신속한 대응을 가능하게 합니다. 궁극적으로 이 기술은 인지장애를 가진 분들에게는 안전하고 존엄한 삶을, 보호자와 관리자에게는 효율적이고 체계적인 돌봄 환경을 제공하여 우리 사회의 복지 수준을 한 단계 끌어올리는 데 기여할 것입니다."
    ],
    link: "/rnd/smart-assistive-technology"
  },
  {
    image: danger,
    title: "의료 현장의 환자 안전 강화",
    description: [
      "병원과 요양 시설에 최적화된 이 솔루션은 '레이더와 카메라를 융합한 복합 센서 모듈'을 통해 환자의 상태를 실시간으로 정밀하게 분석합니다. 단순한 동작 감지를 넘어, 'AI 기반 추론 엔진'이 낙상, 이상 행동, 심지어 생체 신호 변화까지 스스로 감지하고 분류하여 의료진에게 즉시 알림을 전달합니다.",
      "가장 중요한 가치는 '환자의 프라이버시를 보호'하면서도 안전 관리가 가능하다는 점입니다. 비접촉식 레이더 기술은 환자의 신체 노출 없이도 위험을 감지하여 CCTV 설치가 부적절한 공간에서도 안심하고 사용할 수 있습니다.",
      "또한, 초소형, 저전력으로 설계된 'SW-SoC 기반 임베디드 시스템'은 통신망에 의존하지 않고 현장에서 즉각적인 분석 및 경고를 수행하므로, 응급 상황에 대한 신속한 대처를 가능하게 합니다. 이 기술은 의료진의 업무 부담을 줄여주는 동시에, 환자 안전 관리의 새로운 표준을 제시하며 의료 환경의 질을 높이는 데 기여할 것입니다."
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
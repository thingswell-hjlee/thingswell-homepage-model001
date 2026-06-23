import React from 'react';
import SolutionDetailPage from './SolutionDetailPage';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import main from '../../assets/solution_1/main.png';
import solution from '../../assets/header_image/Solution.jpg';
import './SolutionIcons.css';

const BREADCRUMBS = ["Home", "사업분야", "스마트 안전 플랫폼"];

const SOLUTION_DATA = {
  title: "SafeGAI 스마트 안전 플랫폼",
  description:
    "SafeGAI는 NVIDIA Jetson RTX 엣지 AI와 Amazon AWS 클라우드 인프라를 기반으로 산업현장의 안전을 혁신하는 차세대 스마트 안전 플랫폼입니다. 멀티모달 AI 영상분석, IoT 센서 융합, 디지털 트윈 기술을 통합하여 산업안전, 건설안전, 공공안전 전 영역에서 실시간 위험 감지, 예측형 사고 예방, 자동화된 관제를 제공합니다. NVIDIA DeepStream SDK 기반의 실시간 영상 처리와 TensorRT 최적화 추론으로 현장에서 즉각적인 안전 판단을 수행하며, AWS IoT Core와 SageMaker를 통한 클라우드 연동으로 지속적인 AI 모델 학습과 원격 관제를 실현합니다.",
};

// SVG 아이콘 컴포넌트들
const IconNvidia = () => (
  <div className="solution-icon nvidia">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="48" height="40" rx="4" stroke="currentColor" strokeWidth="2"/>
      <rect x="14" y="18" width="16" height="10" rx="2" fill="currentColor" opacity="0.3"/>
      <rect x="34" y="18" width="16" height="10" rx="2" fill="currentColor" opacity="0.3"/>
      <rect x="14" y="32" width="36" height="4" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="14" y="40" width="36" height="4" rx="1" fill="currentColor" opacity="0.5"/>
      <circle cx="52" cy="15" r="3" fill="#76b900"/>
      <text x="32" y="50" textAnchor="middle" fill="currentColor" fontSize="6" fontWeight="bold">GPU</text>
    </svg>
  </div>
);

const IconAWS = () => (
  <div className="solution-icon aws">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 36C12 36 16 28 32 28C48 28 52 36 52 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 40C8 40 14 32 32 32C50 32 56 40 56 40" stroke="currentColor" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
      <rect x="22" y="14" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="2"/>
      <line x1="22" y1="20" x2="42" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <line x1="22" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <circle cx="32" cy="48" r="3" fill="#ff9900"/>
      <line x1="32" y1="36" x2="32" y2="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
      <circle cx="20" cy="48" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="44" cy="48" r="2" fill="currentColor" opacity="0.4"/>
    </svg>
  </div>
);

const IconSensor = () => (
  <div className="solution-icon sensor">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="32" r="3" fill="#00b4d8"/>
      <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.3"/>
      <line x1="32" y1="8" x2="32" y2="14" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="32" y1="50" x2="32" y2="56" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="32" x2="14" y2="32" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="50" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="48" cy="16" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="16" cy="48" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="48" cy="48" r="2" fill="currentColor" opacity="0.4"/>
    </svg>
  </div>
);

const IconDigitalTwin = () => (
  <div className="solution-icon twin">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="18" height="28" rx="2" stroke="currentColor" strokeWidth="2"/>
      <rect x="36" y="20" width="18" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
      <line x1="28" y1="30" x2="36" y2="30" stroke="#00b4d8" strokeWidth="1.5"/>
      <line x1="28" y1="34" x2="36" y2="34" stroke="#00b4d8" strokeWidth="1.5"/>
      <line x1="28" y1="38" x2="36" y2="38" stroke="#00b4d8" strokeWidth="1.5"/>
      <rect x="13" y="23" width="12" height="6" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="39" y="23" width="12" height="6" rx="1" fill="#00b4d8" opacity="0.2"/>
      <text x="19" y="14" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="bold">3D</text>
      <circle cx="32" cy="54" r="3" fill="currentColor" opacity="0.3"/>
    </svg>
  </div>
);

const IconFactory = () => (
  <div className="solution-icon factory">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="28" width="16" height="28" stroke="currentColor" strokeWidth="2"/>
      <rect x="24" y="20" width="16" height="36" stroke="currentColor" strokeWidth="2"/>
      <rect x="40" y="12" width="16" height="44" stroke="currentColor" strokeWidth="2"/>
      <rect x="44" y="16" width="4" height="6" fill="#ff6b35" opacity="0.6"/>
      <rect x="28" y="24" width="4" height="6" fill="#ff6b35" opacity="0.6"/>
      <rect x="12" y="32" width="4" height="6" fill="#ff6b35" opacity="0.6"/>
      <circle cx="52" cy="10" r="3" fill="#00b4d8" opacity="0.6"/>
      <path d="M48 8L52 6L56 8" stroke="#00b4d8" strokeWidth="1" opacity="0.4"/>
    </svg>
  </div>
);

const IconConstruction = () => (
  <div className="solution-icon construction">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="32,8 52,56 12,56" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="22" y1="32" x2="42" y2="32" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="17" y1="44" x2="47" y2="44" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="28" y="2" width="8" height="6" rx="1" fill="#ffb800" opacity="0.8"/>
      <circle cx="32" cy="24" r="4" stroke="#00b4d8" strokeWidth="1.5" fill="none"/>
      <circle cx="32" cy="24" r="1.5" fill="#00b4d8"/>
    </svg>
  </div>
);

const IconPublicSafety = () => (
  <div className="solution-icon public">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8L52 18V34C52 46 42 54 32 58C22 54 12 46 12 34V18L32 8Z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M32 14L46 22V34C46 43 38 49 32 52C26 49 18 43 18 34V22L32 14Z" fill="currentColor" opacity="0.1"/>
      <polyline points="24,34 30,40 42,28" stroke="#00b4d8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const IconDataCollect = () => (
  <div className="solution-icon collect">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="16" rx="18" ry="6" stroke="currentColor" strokeWidth="2"/>
      <path d="M14 16V28C14 31.3 22 34 32 34C42 34 50 31.3 50 28V16" stroke="currentColor" strokeWidth="2"/>
      <path d="M14 28V40C14 43.3 22 46 32 46C42 46 50 43.3 50 40V28" stroke="currentColor" strokeWidth="2"/>
      <path d="M14 40V52C14 55.3 22 58 32 58C42 58 50 55.3 50 52V40" stroke="currentColor" strokeWidth="2"/>
      <circle cx="52" cy="12" r="3" fill="#00b4d8"/>
      <line x1="52" y1="15" x2="52" y2="20" stroke="#00b4d8" strokeWidth="1"/>
    </svg>
  </div>
);

const IconAiInfer = () => (
  <div className="solution-icon infer">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="16" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="44" cy="16" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="36" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="32" cy="36" r="4" stroke="currentColor" strokeWidth="1.5" fill="#00b4d8" fillOpacity="0.3"/>
      <circle cx="52" cy="36" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="20" cy="56" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="44" cy="56" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="20" y1="20" x2="12" y2="32" stroke="currentColor" strokeWidth="1"/>
      <line x1="20" y1="20" x2="32" y2="32" stroke="currentColor" strokeWidth="1"/>
      <line x1="44" y1="20" x2="32" y2="32" stroke="currentColor" strokeWidth="1"/>
      <line x1="44" y1="20" x2="52" y2="32" stroke="currentColor" strokeWidth="1"/>
      <line x1="12" y1="40" x2="20" y2="52" stroke="currentColor" strokeWidth="1"/>
      <line x1="32" y1="40" x2="20" y2="52" stroke="currentColor" strokeWidth="1"/>
      <line x1="32" y1="40" x2="44" y2="52" stroke="currentColor" strokeWidth="1"/>
      <line x1="52" y1="40" x2="44" y2="52" stroke="currentColor" strokeWidth="1"/>
    </svg>
  </div>
);

const IconCloudSync = () => (
  <div className="solution-icon cloud">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 40C12 40 8 36 8 30C8 24 12 20 18 20C18 14 24 8 32 8C40 8 46 14 46 20C52 20 56 24 56 30C56 36 52 40 46 40" stroke="currentColor" strokeWidth="2"/>
      <line x1="24" y1="44" x2="24" y2="56" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="32" y1="44" x2="32" y2="56" stroke="#00b4d8" strokeWidth="1.5"/>
      <line x1="40" y1="44" x2="40" y2="56" stroke="currentColor" strokeWidth="1.5"/>
      <polygon points="32,42 28,48 36,48" fill="#00b4d8"/>
      <polygon points="24,56 20,50 28,50" fill="currentColor" opacity="0.4"/>
      <polygon points="40,56 36,50 44,50" fill="currentColor" opacity="0.4"/>
    </svg>
  </div>
);

const IconCommand = () => (
  <div className="solution-icon command">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="10" width="52" height="36" rx="3" stroke="currentColor" strokeWidth="2"/>
      <rect x="10" y="14" width="22" height="14" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="34" y="14" width="20" height="6" rx="1" fill="#00b4d8" opacity="0.2"/>
      <rect x="34" y="22" width="20" height="6" rx="1" fill="#ff6b35" opacity="0.2"/>
      <rect x="10" y="30" width="44" height="4" rx="1" fill="currentColor" opacity="0.1"/>
      <rect x="10" y="36" width="44" height="4" rx="1" fill="currentColor" opacity="0.1"/>
      <line x1="22" y1="46" x2="42" y2="46" stroke="currentColor" strokeWidth="2"/>
      <rect x="26" y="48" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="18" r="2" fill="#00b4d8"/>
      <circle cx="20" cy="18" r="2" fill="#76b900"/>
      <circle cx="26" cy="18" r="2" fill="#ff9900"/>
    </svg>
  </div>
);

// 아이콘 매핑
const iconComponents = {
  nvidia: <IconNvidia />,
  aws: <IconAWS />,
  sensor: <IconSensor />,
  twin: <IconDigitalTwin />,
  factory: <IconFactory />,
  construction: <IconConstruction />,
  public: <IconPublicSafety />,
  collect: <IconDataCollect />,
  infer: <IconAiInfer />,
  cloud: <IconCloudSync />,
  command: <IconCommand />,
};

// 아이콘 카드 컴포넌트
const IconCard = ({ icon, title, desc }) => {
  const descriptions = Array.isArray(desc) ? desc : [desc];
  return (
    <div className="solution-icon-card">
      {iconComponents[icon]}
      <h3 className="solution-icon-card-title">{title}</h3>
      <div className="solution-icon-card-desc">
        {descriptions.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </div>
  );
};

// 섹션 컴포넌트
const IconCardSection = ({ title, cards, columns = 4 }) => (
  <div className="solution-icon-section">
    <h2 className="solution-icon-section-title">{title}</h2>
    <div className={`solution-icon-cards-grid cols-${columns}`}>
      {cards.map((card, i) => (
        <IconCard key={i} {...card} />
      ))}
    </div>
  </div>
);

// 데이터
const PLATFORM_TECH_CARDS = [
  {
    icon: "nvidia",
    title: "NVIDIA Jetson RTX 엣지 AI",
    desc: "NVIDIA Jetson Orin 기반의 고성능 엣지 컴퓨팅으로 현장에서 실시간 AI 추론을 수행합니다. DeepStream SDK로 다채널 영상을 동시 분석하고, TensorRT로 최적화된 모델이 밀리초 단위의 위험 감지를 보장합니다."
  },
  {
    icon: "aws",
    title: "Amazon AWS 클라우드 인프라",
    desc: "AWS IoT Core, SageMaker, Lambda, DynamoDB를 활용한 서버리스 클라우드 아키텍처로 무한 확장이 가능합니다. 엣지에서 수집된 이벤트 데이터를 클라우드에서 분석하고, AI 모델을 지속적으로 재학습합니다."
  },
  {
    icon: "sensor",
    title: "멀티모달 센서 융합 엔진",
    desc: "IP 카메라, 스마트밴드, 환경센서, 화재감지기, 레이더 등 다양한 센서 데이터를 시간 동기화하여 통합 분석합니다. 단일 센서로는 불가능한 복합 상황 인지와 정밀한 위험도 판단을 수행합니다."
  },
  {
    icon: "twin",
    title: "디지털 트윈 관제 시스템",
    desc: "현장의 물리적 공간을 3D 디지털 트윈으로 구현하여, 실시간 센서 데이터와 AI 분석 결과를 직관적으로 시각화합니다. 관제센터에서 모든 시설을 한 화면에서 통합 모니터링할 수 있습니다."
  },
];

const SAFETY_DOMAIN_CARDS = [
  {
    icon: "factory",
    title: "산업안전",
    desc: [
      "제조 현장의 작업자 안전을 AI로 보호합니다.",
      "낙상, 쓰러짐, 장시간 미움직임 실시간 감지",
      "위험구역 침입 자동 경고 및 장비 연동 차단",
      "유해가스, 고온, 소음 등 환경 위험 모니터링",
      "작업자별 스마트밴드 연동 건강 이상 감지",
      "AI 기반 위험 행동 패턴 분석 및 예측 경고"
    ]
  },
  {
    icon: "construction",
    title: "건설안전",
    desc: [
      "건설 현장의 복합 위험을 실시간으로 관제합니다.",
      "고소작업, 중장비 접근 위험 실시간 감지",
      "안전모, 안전조끼 등 보호구 미착용 자동 탐지",
      "크레인, 굴삭기 작업 반경 내 인원 자동 경고",
      "붕괴 위험 구간 진동 센서 연동 모니터링",
      "일일 안전 리포트 자동 생성 및 관리자 알림"
    ]
  },
  {
    icon: "public",
    title: "공공안전",
    desc: [
      "공공시설과 생활공간의 시민 안전을 지킵니다.",
      "경로당, 복지시설 고령자 건강 이상 실시간 감지",
      "버스 쉼터, 공원 등 공공장소 이상행동 탐지",
      "화재, 연기, 침수 등 재난 상황 조기 감지 및 경보",
      "다중이용시설 인원 밀집도 분석 및 안전 관리",
      "스마트 CCTV 연동 범죄 예방 및 긴급 대응"
    ]
  },
];

const PIPELINE_CARDS = [
  {
    icon: "collect",
    title: "1. 현장 데이터 수집",
    desc: [
      "DeepStream 기반 멀티채널 RTSP 영상 수집",
      "스마트밴드 BLE 생체 데이터 실시간 수신",
      "환경센서 (온도, 습도, 가스, 분진) 수집",
      "화재감지 접점 신호 연동",
      "시간 동기화 및 적응형 롤링버퍼 저장"
    ]
  },
  {
    icon: "infer",
    title: "2. 엣지 AI 실시간 추론",
    desc: [
      "TensorRT 최적화 모델 실시간 추론",
      "멀티모달 센서 융합 복합 상황 판단",
      "활동지수 기반 저장 레벨 자동 조정",
      "이벤트 전후 구간 데이터 자동 보존",
      "네트워크 장애 시 로컬 독립 동작"
    ]
  },
  {
    icon: "cloud",
    title: "3. AWS 클라우드 연동",
    desc: [
      "IoT Core 이벤트 메타데이터 실시간 전송",
      "SageMaker AI 모델 지속 학습 및 배포",
      "DynamoDB 이벤트 이력 저장 및 분석",
      "Lambda 기반 자동 알림 에스컬레이션",
      "다중 시설 통합 대시보드 원격 관제"
    ]
  },
  {
    icon: "command",
    title: "4. 통합 관제 및 대응",
    desc: [
      "위험등급별 자동 알람 (시각, 청각, 진동)",
      "접점연동 경광등, 사이렌 자동 제어",
      "관리자 모바일 앱 즉시 푸시 알림",
      "이벤트 조치 이력 및 피드백 관리",
      "월간 안전 리포트 및 위험도 트렌드"
    ]
  },
];

const FEATURE_DESCRIPTIONS = [
  {
    image: main,
    title: "SafeGAI 플랫폼 아키텍처",
    description: [
      "엣지 레이어: NVIDIA Jetson RTX에서 DeepStream + TensorRT 기반 실시간 영상분석, 센서 융합, 즉시 알람 처리",
      "통신 레이어: MQTT/AWS IoT Core를 통한 이벤트 메타데이터 전송, 네트워크 장애 시 로컬 버퍼링 및 자동 재전송",
      "클라우드 레이어: AWS SageMaker AI 재학습, DynamoDB 이벤트 저장, API Gateway + Lambda 서버리스 관제 API",
      "관제 레이어: 웹/모바일 대시보드, 디지털 트윈 3D 시각화, 다중 시설 통합 모니터링"
    ],
    largeImage: true
  },
];

const Soulution = () => {
  return (
    <BaseLayout
      header={() => <ProductHeader image={solution} alt="solution" />}
      breadcrumbs={BREADCRUMBS}
      title={SOLUTION_DATA.title}
    >
      <SolutionDetailPage
        solutionData={SOLUTION_DATA}
        solutionVariant="default"
        blocks={[
          {
            type: 'features',
            data: FEATURE_DESCRIPTIONS,
            props: { boxName: '플랫폼 아키텍처', columnsPerRow: 1 },
          },
        ]}
        customSections={
          <>
            <IconCardSection title="핵심 기술 스택" cards={PLATFORM_TECH_CARDS} columns={4} />
            <IconCardSection title="적용 분야" cards={SAFETY_DOMAIN_CARDS} columns={3} />
            <IconCardSection title="안전 파이프라인" cards={PIPELINE_CARDS} columns={4} />
          </>
        }
      />
    </BaseLayout>
  );
};

export default Soulution;

import React from 'react';
import SolutionDetailPage from './SolutionDetailPage';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import main from '../../assets/solution_1/main.png';
import solution from '../../assets/header_image/Solution.jpg';
import service_1 from '../../assets/service/batch_1-1.png';
import service_2 from '../../assets/service/batch_1-2.png';
import service_3 from '../../assets/service/batch_1-3.png';
import service_4 from '../../assets/service/batch_1-4.png';
import service_5 from '../../assets/service/batch_2-1.png';
import service_6 from '../../assets/service/batch_2-2.png';
import service_7 from '../../assets/service/batch_2-3.png';
import service_8 from '../../assets/service/batch_2-4.png';
import service_9 from '../../assets/service/batch_3-1.png';
import service_10 from '../../assets/service/batch_3-2.png';
import service_11 from '../../assets/service/batch_3-3.png';
import service_12 from '../../assets/service/batch_3-4.png';

const BREADCRUMBS = ["Home", "사업분야", "스마트 안전 플랫폼"];

const SOLUTION_DATA = {
  title: "SafeGAI 스마트 안전 플랫폼",
  description:
    "SafeGAI는 NVIDIA Jetson RTX 엣지 AI와 Amazon AWS 클라우드 인프라를 기반으로 산업현장의 안전을 혁신하는 차세대 스마트 안전 플랫폼입니다. 멀티모달 AI 영상분석, IoT 센서 융합, 디지털 트윈 기술을 통합하여 산업안전, 건설안전, 공공안전 전 영역에서 실시간 위험 감지, 예측형 사고 예방, 자동화된 관제를 제공합니다. NVIDIA DeepStream SDK 기반의 실시간 영상 처리와 TensorRT 최적화 추론으로 현장에서 즉각적인 안전 판단을 수행하며, AWS IoT Core와 SageMaker를 통한 클라우드 연동으로 지속적인 AI 모델 학습과 원격 관제를 실현합니다.",
};

const PLATFORM_TECH_CARDS = [
  {
    image: service_1,
    imageAlt: "NVIDIA Jetson RTX",
    title: "NVIDIA Jetson RTX 엣지 AI",
    desc: "NVIDIA Jetson Orin 기반의 고성능 엣지 컴퓨팅으로 현장에서 실시간 AI 추론을 수행합니다. DeepStream SDK로 다채널 영상을 동시 분석하고, TensorRT로 최적화된 모델이 밀리초 단위의 위험 감지를 보장합니다."
  },
  {
    image: service_2,
    imageAlt: "Amazon AWS 클라우드",
    title: "Amazon AWS 클라우드 인프라",
    desc: "AWS IoT Core, SageMaker, Lambda, DynamoDB를 활용한 서버리스 클라우드 아키텍처로 무한 확장이 가능합니다. 엣지에서 수집된 이벤트 데이터를 클라우드에서 분석하고, AI 모델을 지속적으로 재학습합니다."
  },
  {
    image: service_3,
    imageAlt: "멀티모달 센서 융합",
    title: "멀티모달 센서 융합 엔진",
    desc: "IP 카메라, 스마트밴드, 환경센서, 화재감지기, 레이더 등 다양한 센서 데이터를 시간 동기화하여 통합 분석합니다. 단일 센서로는 불가능한 복합 상황 인지와 정밀한 위험도 판단을 수행합니다."
  },
  {
    image: service_4,
    imageAlt: "디지털 트윈",
    title: "디지털 트윈 관제 시스템",
    desc: "현장의 물리적 공간을 3D 디지털 트윈으로 구현하여, 실시간 센서 데이터와 AI 분석 결과를 직관적으로 시각화합니다. 관제센터에서 모든 시설을 한 화면에서 통합 모니터링할 수 있습니다."
  },
];

const SAFETY_DOMAIN_CARDS = [
  {
    image: service_5,
    imageAlt: "산업안전",
    title: "산업안전 (Manufacturing Safety)",
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
    image: service_6,
    imageAlt: "건설안전",
    title: "건설안전 (Construction Safety)",
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
    image: service_7,
    imageAlt: "공공안전",
    title: "공공안전 (Public Safety)",
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
    image: service_9,
    imageAlt: "데이터 수집",
    title: "1단계: 현장 데이터 수집",
    desc: [
      "NVIDIA DeepStream 기반 멀티채널 RTSP 영상 수집",
      "스마트밴드 BLE 생체 데이터 실시간 수신",
      "환경센서 (온도, 습도, 가스, 분진) 데이터 수집",
      "화재감지 접점 신호 연동",
      "모든 데이터 시간 동기화 및 적응형 롤링버퍼 저장"
    ]
  },
  {
    image: service_10,
    imageAlt: "AI 추론",
    title: "2단계: 엣지 AI 실시간 추론",
    desc: [
      "TensorRT 최적화 모델로 실시간 객체 검출 및 행동 인식",
      "멀티모달 센서 융합을 통한 복합 상황 판단",
      "활동지수 기반 저장 레벨 자동 조정 (L0~L3)",
      "이벤트 전후 구간 데이터 자동 보존",
      "네트워크 장애 시에도 로컬 독립 동작 보장"
    ]
  },
  {
    image: service_11,
    imageAlt: "클라우드 연동",
    title: "3단계: AWS 클라우드 연동",
    desc: [
      "AWS IoT Core를 통한 이벤트 메타데이터 실시간 전송",
      "SageMaker 기반 AI 모델 지속 학습 및 배포",
      "DynamoDB 이벤트 이력 저장 및 분석",
      "Lambda 기반 자동 알림 및 에스컬레이션",
      "다중 시설 통합 대시보드 원격 관제"
    ]
  },
  {
    image: service_12,
    imageAlt: "관제 및 대응",
    title: "4단계: 통합 관제 및 자동 대응",
    desc: [
      "위험등급별 자동 알람 (시각, 청각, 진동)",
      "접점연동 경광등, 사이렌 자동 제어",
      "관리자 모바일 앱 즉시 푸시 알림",
      "이벤트 조치 이력 및 오탐/미탐 피드백 관리",
      "월간 안전 리포트 및 위험도 트렌드 분석"
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

const BLOCKS = [
  {
    type: 'applicationCards',
    data: PLATFORM_TECH_CARDS,
    props: { boxName: '핵심 기술 스택', columnsPerRow: 4 },
  },
  {
    type: 'applicationCards',
    data: SAFETY_DOMAIN_CARDS,
    props: { boxName: '적용 분야', columnsPerRow: 3 },
  },
  {
    type: 'applicationCards',
    data: PIPELINE_CARDS,
    props: { boxName: '안전 파이프라인', columnsPerRow: 4 },
  },
  {
    type: 'features',
    data: FEATURE_DESCRIPTIONS,
    props: { boxName: '플랫폼 아키텍처', columnsPerRow: 1 },
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
        blocks={BLOCKS}
      />
    </BaseLayout>
  );
};

export default Soulution;

import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import solutionHeader from '../../assets/header_image/Solution.jpg';
import main from '../../assets/solution_1/main.png';
import './SolutionPage.css';

// 이미지 import
import edgeComputing from '../../assets/solutions/edge-computing.jpg';
import cloudInfra from '../../assets/solutions/cloud-infra.jpg';
import sensorFusion from '../../assets/solutions/sensor-fusion.jpg';
import digitalTwin from '../../assets/solutions/digital-twin.jpg';
import industrialSafety from '../../assets/solutions/industrial-safety.jpg';
import constructionSafety from '../../assets/solutions/construction-safety.jpg';
import publicSafety from '../../assets/solutions/public-safety.jpg';
import dataCollection from '../../assets/solutions/data-collection.jpg';
import aiInference from '../../assets/solutions/ai-inference.jpg';
import cloudSync from '../../assets/solutions/cloud-sync.jpg';
import commandCenter from '../../assets/solutions/command-center.jpg';

const BREADCRUMBS = ["Home", "사업분야", "스마트 안전 플랫폼"];

// 핵심 기술 스택
const TECH_STACK = [
  {
    image: edgeComputing,
    title: "NVIDIA Jetson RTX 엣지 AI",
    subtitle: "Edge AI Computing",
    desc: "NVIDIA Jetson Orin 기반 고성능 엣지 컴퓨팅으로 현장에서 실시간 AI 추론을 수행합니다. DeepStream SDK 다채널 영상 동시 분석, TensorRT 최적화 밀리초 단위 위험 감지.",
  },
  {
    image: cloudInfra,
    title: "Amazon AWS 클라우드",
    subtitle: "Cloud Infrastructure",
    desc: "AWS IoT Core, SageMaker, Lambda, DynamoDB 기반 서버리스 아키텍처로 무한 확장 가능. 엣지 이벤트 데이터 클라우드 분석 및 AI 모델 지속 재학습.",
  },
  {
    image: sensorFusion,
    title: "멀티모달 센서 융합",
    subtitle: "Multimodal Sensor Fusion",
    desc: "IP 카메라, 스마트밴드, 환경센서, 화재감지기, 레이더 등 다양한 센서 시간 동기화 통합 분석. 복합 상황 인지와 정밀 위험도 판단 수행.",
  },
  {
    image: digitalTwin,
    title: "디지털 트윈 관제",
    subtitle: "Digital Twin Control",
    desc: "현장 물리 공간을 3D 디지털 트윈으로 구현, 실시간 센서 데이터와 AI 분석 결과를 직관적 시각화. 다중 시설 통합 모니터링 지원.",
  },
];

// 적용 분야
const DOMAINS = [
  {
    image: industrialSafety,
    title: "산업안전",
    subtitle: "Manufacturing Safety",
    items: [
      "낙상, 쓰러짐, 장시간 미움직임 실시간 감지",
      "위험구역 침입 자동 경고 및 장비 연동 차단",
      "유해가스, 고온, 소음 등 환경 위험 모니터링",
      "작업자별 스마트밴드 연동 건강 이상 감지",
      "AI 기반 위험 행동 패턴 분석 및 예측 경고",
    ],
  },
  {
    image: constructionSafety,
    title: "건설안전",
    subtitle: "Construction Safety",
    items: [
      "고소작업, 중장비 접근 위험 실시간 감지",
      "안전모, 안전조끼 등 보호구 미착용 자동 탐지",
      "크레인, 굴삭기 작업 반경 내 인원 자동 경고",
      "붕괴 위험 구간 진동 센서 연동 모니터링",
      "일일 안전 리포트 자동 생성 및 관리자 알림",
    ],
  },
  {
    image: publicSafety,
    title: "공공안전",
    subtitle: "Public Safety",
    items: [
      "경로당, 복지시설 고령자 건강 이상 실시간 감지",
      "버스 쉼터, 공원 등 공공장소 이상행동 탐지",
      "화재, 연기, 침수 등 재난 상황 조기 경보",
      "다중이용시설 인원 밀집도 분석 및 안전 관리",
      "스마트 CCTV 연동 범죄 예방 및 긴급 대응",
    ],
  },
];

// 안전 파이프라인
const PIPELINE = [
  {
    image: dataCollection,
    step: "01",
    title: "현장 데이터 수집",
    subtitle: "Data Acquisition",
    items: [
      "DeepStream 멀티채널 RTSP 영상 수집",
      "스마트밴드 BLE 생체 데이터 실시간 수신",
      "환경센서 (온도, 습도, 가스, 분진) 수집",
      "화재감지 접점 신호 연동",
      "시간 동기화 및 적응형 롤링버퍼 저장",
    ],
  },
  {
    image: aiInference,
    step: "02",
    title: "엣지 AI 실시간 추론",
    subtitle: "Edge AI Inference",
    items: [
      "TensorRT 최적화 모델 실시간 객체 검출",
      "멀티모달 센서 융합 복합 상황 판단",
      "활동지수 기반 저장 레벨 자동 조정",
      "이벤트 전후 구간 데이터 자동 보존",
      "네트워크 장애 시 로컬 독립 동작 보장",
    ],
  },
  {
    image: cloudSync,
    step: "03",
    title: "AWS 클라우드 연동",
    subtitle: "Cloud Integration",
    items: [
      "IoT Core 이벤트 메타데이터 실시간 전송",
      "SageMaker AI 모델 지속 학습 및 배포",
      "DynamoDB 이벤트 이력 저장 및 분석",
      "Lambda 기반 자동 알림 에스컬레이션",
      "다중 시설 통합 대시보드 원격 관제",
    ],
  },
  {
    image: commandCenter,
    step: "04",
    title: "통합 관제 및 대응",
    subtitle: "Command & Response",
    items: [
      "위험등급별 자동 알람 (시각, 청각, 진동)",
      "접점연동 경광등, 사이렌 자동 제어",
      "관리자 모바일 앱 즉시 푸시 알림",
      "이벤트 조치 이력 및 피드백 관리",
      "월간 안전 리포트 및 위험도 트렌드 분석",
    ],
  },
];

const Soulution = () => {
  return (
    <BaseLayout
      header={() => <ProductHeader image={solutionHeader} alt="solution" />}
      breadcrumbs={BREADCRUMBS}
      title="SafeGAI 스마트 안전 플랫폼"
    >
      <div className="solution-page">
        {/* 히어로 설명 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">NVIDIA + AWS Powered</div>
          <h1 className="sol-hero-title">
            AI로 지키는 안전,<br />기술로 여는 미래
          </h1>
          <p className="sol-hero-desc">
            SafeGAI는 NVIDIA Jetson RTX 엣지 AI와 Amazon AWS 클라우드 인프라를 기반으로
            산업현장의 안전을 혁신하는 차세대 스마트 안전 플랫폼입니다.
            멀티모달 AI 영상분석, IoT 센서 융합, 디지털 트윈 기술을 통합하여
            산업안전, 건설안전, 공공안전 전 영역에서 실시간 위험 감지, 예측형 사고 예방,
            자동화된 관제를 제공합니다.
          </p>
        </section>

        {/* 핵심 기술 스택 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Core Technology</span>
            <h2 className="sol-section-title">핵심 기술 스택</h2>
          </div>
          <div className="sol-tech-grid">
            {TECH_STACK.map((tech, i) => (
              <div key={i} className="sol-tech-card">
                <div className="sol-tech-card-img">
                  <img src={tech.image} alt={tech.title} />
                  <div className="sol-tech-card-overlay" />
                </div>
                <div className="sol-tech-card-body">
                  <span className="sol-tech-card-subtitle">{tech.subtitle}</span>
                  <h3 className="sol-tech-card-title">{tech.title}</h3>
                  <p className="sol-tech-card-desc">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 적용 분야 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Application Areas</span>
            <h2 className="sol-section-title">적용 분야</h2>
          </div>
          <div className="sol-domain-grid">
            {DOMAINS.map((domain, i) => (
              <div key={i} className="sol-domain-card">
                <div className="sol-domain-card-img">
                  <img src={domain.image} alt={domain.title} />
                  <div className="sol-domain-card-overlay">
                    <span className="sol-domain-card-subtitle">{domain.subtitle}</span>
                    <h3 className="sol-domain-card-title">{domain.title}</h3>
                  </div>
                </div>
                <ul className="sol-domain-card-list">
                  {domain.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 안전 파이프라인 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Safety Pipeline</span>
            <h2 className="sol-section-title">안전 파이프라인</h2>
          </div>
          <div className="sol-pipeline-grid">
            {PIPELINE.map((step, i) => (
              <div key={i} className="sol-pipeline-card">
                <div className="sol-pipeline-card-img">
                  <img src={step.image} alt={step.title} />
                  <div className="sol-pipeline-card-step">{step.step}</div>
                </div>
                <div className="sol-pipeline-card-body">
                  <span className="sol-pipeline-card-subtitle">{step.subtitle}</span>
                  <h3 className="sol-pipeline-card-title">{step.title}</h3>
                  <ul className="sol-pipeline-card-list">
                    {step.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 플랫폼 아키텍처 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Platform Architecture</span>
            <h2 className="sol-section-title">플랫폼 아키텍처</h2>
          </div>
          <div className="sol-architecture">
            <img src={main} alt="SafeGAI Platform Architecture" className="sol-architecture-img" />
            <div className="sol-architecture-layers">
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge edge">Edge</span>
                <p>NVIDIA Jetson RTX에서 DeepStream + TensorRT 기반 실시간 영상분석, 센서 융합, 즉시 알람 처리</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge comm">Comm</span>
                <p>MQTT/AWS IoT Core를 통한 이벤트 메타데이터 전송, 네트워크 장애 시 로컬 버퍼링 및 자동 재전송</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge cloud">Cloud</span>
                <p>AWS SageMaker AI 재학습, DynamoDB 이벤트 저장, API Gateway + Lambda 서버리스 관제 API</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge ctrl">Control</span>
                <p>웹/모바일 대시보드, 디지털 트윈 3D 시각화, 다중 시설 통합 모니터링</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
};

export default Soulution;

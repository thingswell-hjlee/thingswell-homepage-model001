import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import headerImage from '../../assets/header_image/product.jpg';
import '../Solutions/SolutionPage.css';

// 이미지 import
import aiCamera from '../../assets/products/safety/ai-camera.jpg';
import sensorNetwork from '../../assets/products/safety/sensor-network.jpg';
import smartBand from '../../assets/products/safety/smart-band.jpg';
import edgeAi from '../../assets/products/safety/edge-ai.jpg';
import industrialSafety from '../../assets/products/safety/industrial-safety.jpg';
import factoryWorker from '../../assets/products/safety/factory-worker.jpg';
import fireDetection from '../../assets/products/safety/fire-detection.jpg';
import circuitBoard from '../../assets/products/safety/circuit-board.jpg';

const BREADCRUMBS = ["Home", "제품", "스마트안전"];

// 핵심 제품 라인업
const PRODUCTS = [
  {
    image: aiCamera,
    title: "AI 안전 카메라",
    subtitle: "AI Safety Camera",
    desc: "딥러닝 기반 영상 분석으로 작업자 낙상, 쓰러짐, 장시간 미움직임을 실시간 감지합니다. NVIDIA DeepStream 기반 멀티채널 동시 분석으로 8대 카메라를 단일 서버에서 처리합니다.",
  },
  {
    image: smartBand,
    title: "스마트 안전밴드",
    subtitle: "Smart Safety Band",
    desc: "작업자 생체신호(심박수, 체온)와 위치를 실시간 모니터링합니다. 낙상 감지 가속도 센서, SOS 긴급호출, 위험구역 접근 경고 기능을 제공합니다.",
  },
  {
    image: sensorNetwork,
    title: "환경 안전센서",
    subtitle: "Environmental Safety Sensor",
    desc: "온도, 습도, 가스 농도, 분진 농도를 실시간 측정하여 작업환경 위험도를 판단합니다. LoRa/WiFi 무선 통신으로 배선 없이 설치가 가능합니다.",
  },
  {
    image: fireDetection,
    title: "화재감지 시스템",
    subtitle: "Fire Detection System",
    desc: "열감지, 연기감지, 불꽃감지를 다중으로 적용하여 화재를 조기에 감지합니다. 접점 연동으로 기존 소방 설비와 즉시 연동되며 자동 경보를 발생시킵니다.",
  },
];

// 적용 분야
const DOMAINS = [
  {
    image: industrialSafety,
    title: "제조 현장",
    subtitle: "Manufacturing Site",
    items: [
      "프레스, CNC 등 위험 기계 접근 감지",
      "작업자 보호구 착용 여부 AI 판별",
      "유해가스 누출 조기 경보 시스템",
      "협착, 끼임 위험구역 실시간 모니터링",
      "야간/교대 근무 시 안전 감시 강화",
    ],
  },
  {
    image: factoryWorker,
    title: "건설 현장",
    subtitle: "Construction Site",
    items: [
      "고소작업 추락 방지 실시간 감시",
      "중장비 접근 경고 및 충돌 방지",
      "안전모·안전대 착용 AI 자동 감지",
      "밀폐공간 가스 농도 실시간 모니터링",
      "작업자 위치 추적 및 인원 관리",
    ],
  },
  {
    image: edgeAi,
    title: "복지시설",
    subtitle: "Welfare Facility",
    items: [
      "장애인 작업장 낙상·쓰러짐 감지",
      "작업자별 건강상태 실시간 모니터링",
      "비상 상황 자동 감지 및 알림",
      "접근성 고려 다중 알람 출력(시각/청각/진동)",
      "보호자·관리자 모바일 즉시 알림",
    ],
  },
];

// 기술 파이프라인
const PIPELINE = [
  {
    image: sensorNetwork,
    step: "01",
    title: "데이터 수집",
    subtitle: "Data Collection",
    items: [
      "IP 카메라 8채널 RTSP 실시간 스트림",
      "스마트밴드 8개 생체·위치 데이터",
      "환경센서 온도·습도·가스 측정값",
      "화재감지 접점 상태 신호",
      "시간 동기화 기반 통합 수집",
    ],
  },
  {
    image: edgeAi,
    step: "02",
    title: "Edge AI 분석",
    subtitle: "Edge AI Analysis",
    items: [
      "NVIDIA TensorRT 기반 고속 추론",
      "낙상·쓰러짐·미움직임 실시간 판별",
      "멀티모달 센서 융합 상황 분석",
      "적응형 롤링버퍼 이벤트 전후 보존",
      "오프라인 동작 보장 (네트워크 장애 대응)",
    ],
  },
  {
    image: fireDetection,
    step: "03",
    title: "알람 및 대응",
    subtitle: "Alert & Response",
    items: [
      "위험 등급별 차등 알람 발생",
      "접점연동 경광등·사이렌 자동 제어",
      "관리자 모바일·대시보드 즉시 알림",
      "이벤트 영상 자동 저장 및 NVR 연동",
      "대응 매뉴얼 자동 안내",
    ],
  },
  {
    image: circuitBoard,
    step: "04",
    title: "클라우드 연동",
    subtitle: "Cloud Integration",
    items: [
      "AWS 클라우드 이벤트 메타데이터 전송",
      "AI 모델 버전 관리 및 원격 배포",
      "운영 리포트 자동 생성",
      "다중 시설 통합 원격 관제",
      "데이터 기반 안전 개선 분석",
    ],
  },
];

export default function ProductListSafetyPage() {
  return (
    <BaseLayout
      header={() => <ProductHeader image={headerImage} alt="safety products" />}
      breadcrumbs={BREADCRUMBS}
      title="스마트안전"
    >
      <div className="solution-page">
        {/* 히어로 섹션 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">Smart Safety Products</div>
          <h1 className="sol-hero-title">
            AI가 지키는 안전,<br />현장을 바꾸다
          </h1>
          <p className="sol-hero-desc">
            AI 카메라, 스마트밴드, 환경센서, 화재감지 시스템을 통합한
            차세대 산업안전 솔루션입니다. Edge AI 기반 실시간 위험 감지와
            자동 알람으로 작업자의 생명과 안전을 보호합니다.
            네트워크 장애 시에도 현장에서 독립적으로 동작하여
            어떤 상황에서도 안전을 보장합니다.
          </p>
        </section>

        {/* 핵심 제품 라인업 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Product Lineup</span>
            <h2 className="sol-section-title">핵심 제품</h2>
          </div>
          <div className="sol-tech-grid">
            {PRODUCTS.map((product, i) => (
              <div key={i} className="sol-tech-card">
                <div className="sol-tech-card-img">
                  <img src={product.image} alt={product.title} />
                  <div className="sol-tech-card-overlay" />
                </div>
                <div className="sol-tech-card-body">
                  <span className="sol-tech-card-subtitle">{product.subtitle}</span>
                  <h3 className="sol-tech-card-title">{product.title}</h3>
                  <p className="sol-tech-card-desc">{product.desc}</p>
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

        {/* 기술 파이프라인 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Technology Pipeline</span>
            <h2 className="sol-section-title">동작 흐름</h2>
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

        {/* 시스템 아키텍처 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">System Architecture</span>
            <h2 className="sol-section-title">시스템 구성</h2>
          </div>
          <div className="sol-architecture">
            <div className="sol-architecture-layers">
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge edge">EDGE</span>
                <p>AI 카메라 8대, 스마트밴드 8개, 환경센서 2개, 화재감지 접점, NVR 2TB 저장, Edge AI 서버 실시간 추론</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge comm">NETWORK</span>
                <p>LoRa/WiFi/이더넷 복합 통신, 오프라인 독립 동작, 네트워크 복구 시 자동 재전송</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge cloud">CLOUD</span>
                <p>AWS 이벤트 저장, AI 모델 버전 관리, 원격 배포, 운영 리포트 자동화</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge ctrl">CONTROL</span>
                <p>접점연동 알람장치, 경광등·사이렌 자동 제어, 관리자 대시보드, 모바일 알림</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

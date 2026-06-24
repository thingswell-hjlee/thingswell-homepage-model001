import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import headerImage from '../../assets/header_image/product.jpg';
import '../Solutions/SolutionPage.css';

// 이미지 import
import dashboard from '../../assets/products/monitoring/dashboard.jpg';
import serverRoom from '../../assets/products/monitoring/server-room.jpg';
import dataCenter from '../../assets/products/monitoring/data-center.jpg';
import monitoringScreen from '../../assets/products/monitoring/monitoring-screen.jpg';
import analytics from '../../assets/products/monitoring/analytics.jpg';
import environmentalSensor from '../../assets/products/monitoring/environmental-sensor.jpg';
import network from '../../assets/products/monitoring/network.jpg';
import iotDevice from '../../assets/products/monitoring/iot-device.jpg';

const BREADCRUMBS = ["Home", "제품", "관제시스템"];

// 핵심 제품 라인업
const PRODUCTS = [
  {
    image: environmentalSensor,
    title: "복합 환경센서",
    subtitle: "Multi-Environment Sensor",
    desc: "온도, 습도, CO2, PM2.5, VOC, 소음을 단일 장치에서 동시 측정합니다. LoRa/WiFi 이중 통신을 지원하며 IP67 방수 등급으로 실내외 모두 설치 가능합니다.",
  },
  {
    image: monitoringScreen,
    title: "통합 관제 플랫폼",
    subtitle: "Integrated Monitoring Platform",
    desc: "다중 시설의 환경·안전·설비 데이터를 단일 대시보드에서 실시간 모니터링합니다. 이상 감지 시 자동 알림과 대응 매뉴얼을 제공합니다.",
  },
  {
    image: iotDevice,
    title: "IoT 게이트웨이",
    subtitle: "IoT Gateway",
    desc: "다양한 프로토콜(LoRa, Zigbee, BLE, RS485)의 센서 데이터를 수집하여 클라우드로 전송합니다. Edge 컴퓨팅으로 로컬 판단과 알람을 자체 처리합니다.",
  },
  {
    image: analytics,
    title: "데이터 분석 엔진",
    subtitle: "Data Analytics Engine",
    desc: "수집된 센서 데이터를 AI 기반으로 분석하여 이상 패턴을 조기에 감지합니다. 예측형 유지보수 알림과 에너지 최적화 인사이트를 제공합니다.",
  },
];

// 적용 분야
const DOMAINS = [
  {
    image: serverRoom,
    title: "데이터센터/서버실",
    subtitle: "Data Center",
    items: [
      "온습도 정밀 모니터링 및 공조 연동",
      "전력 사용량 실시간 계측 및 PUE 분석",
      "화재 조기 감지 및 자동 소화 연동",
      "출입 보안 관제 및 이력 관리",
      "장비 상태 원격 진단 및 장애 예측",
    ],
  },
  {
    image: dataCenter,
    title: "스마트빌딩",
    subtitle: "Smart Building",
    items: [
      "실내 공기질(IAQ) 실시간 모니터링",
      "에너지 사용 패턴 분석 및 절감 제어",
      "재실 감지 기반 조명·공조 자동 제어",
      "주차장 환기 시스템 CO 농도 관제",
      "비상 상황 대피 안내 시스템 연동",
    ],
  },
  {
    image: dashboard,
    title: "산업 현장",
    subtitle: "Industrial Site",
    items: [
      "유해가스(CO, H2S, CH4) 누출 감지",
      "분진 농도 실시간 측정 및 경보",
      "소음·진동 레벨 모니터링",
      "작업환경 측정 데이터 자동 리포트",
      "법정 기준 초과 시 즉시 알림",
    ],
  },
];

// 서비스 파이프라인
const PIPELINE = [
  {
    image: environmentalSensor,
    step: "01",
    title: "센서 배치",
    subtitle: "Sensor Deployment",
    items: [
      "현장 환경 분석 및 최적 배치 설계",
      "복합 환경센서 무선 설치",
      "IoT 게이트웨이 네트워크 구성",
      "기존 설비 센서 연동 설정",
      "통신 상태 검증 및 최적화",
    ],
  },
  {
    image: network,
    step: "02",
    title: "데이터 수집",
    subtitle: "Data Collection",
    items: [
      "실시간 센서 데이터 시계열 저장",
      "1초~5분 주기 유연한 수집 설정",
      "네트워크 장애 시 로컬 버퍼링",
      "데이터 무결성 검증 및 보정",
      "이벤트 트리거 기반 고속 수집",
    ],
  },
  {
    image: analytics,
    step: "03",
    title: "분석 및 판단",
    subtitle: "Analysis & Decision",
    items: [
      "임계값 기반 이상 상태 자동 감지",
      "AI 패턴 분석으로 이상 징후 예측",
      "복합 조건 기반 위험도 산출",
      "시계열 트렌드 분석 및 예측",
      "오탐 방지 다단계 검증 로직",
    ],
  },
  {
    image: monitoringScreen,
    step: "04",
    title: "관제 및 대응",
    subtitle: "Monitoring & Response",
    items: [
      "웹/모바일 실시간 대시보드",
      "위험 등급별 알림 정책 적용",
      "이벤트 이력 및 조치 기록 관리",
      "운영 리포트 자동 생성",
      "원격 설비 제어 및 연동",
    ],
  },
];

export default function ProductListMonitoringPage() {
  return (
    <BaseLayout
      header={() => <ProductHeader image={headerImage} alt="monitoring products" />}
      breadcrumbs={BREADCRUMBS}
      title="관제시스템"
    >
      <div className="solution-page">
        {/* 히어로 섹션 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">Monitoring & Control System</div>
          <h1 className="sol-hero-title">
            보이지 않는 위험을,<br />데이터로 감지하다
          </h1>
          <p className="sol-hero-desc">
            복합 환경센서와 IoT 게이트웨이를 통해 현장의 온도, 습도, 가스 농도, 분진,
            소음 등을 실시간으로 모니터링하는 통합 관제 시스템입니다.
            AI 기반 이상 감지와 예측 분석으로 위험을 사전에 차단하고,
            데이터 기반 의사결정으로 운영 효율을 극대화합니다.
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

        {/* 서비스 파이프라인 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Service Pipeline</span>
            <h2 className="sol-section-title">서비스 흐름</h2>
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
                <span className="sol-layer-badge edge">SENSOR</span>
                <p>복합 환경센서, 가스감지기, 분진계, 소음계, 온습도 센서, 전력계측기 등 다양한 IoT 디바이스</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge comm">GATEWAY</span>
                <p>LoRa/WiFi/BLE/RS485 복합 프로토콜 수집, Edge 컴퓨팅 로컬 판단, 데이터 버퍼링</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge cloud">PLATFORM</span>
                <p>시계열 데이터베이스, AI 분석 엔진, 이벤트 처리, 알림 서비스, API 게이트웨이</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge ctrl">DASHBOARD</span>
                <p>웹/모바일 실시간 관제, 리포트 자동화, 원격 제어, 다중 시설 통합 모니터링</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

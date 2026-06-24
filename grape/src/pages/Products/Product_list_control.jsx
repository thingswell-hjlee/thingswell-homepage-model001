import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import headerImage from '../../assets/header_image/product.jpg';
import '../Solutions/SolutionPage.css';

// 이미지 import
import integratedControl from '../../assets/products/control/integrated-control.jpg';
import smartBuilding from '../../assets/products/control/smart-building.jpg';
import conference from '../../assets/products/control/conference.jpg';
import technology from '../../assets/products/control/technology.jpg';
import automation from '../../assets/products/control/automation.jpg';
import buildingExterior from '../../assets/products/control/building-exterior.jpg';
import touchPanel from '../../assets/products/control/touch-panel.jpg';
import remoteControl from '../../assets/products/control/remote-control.jpg';

const BREADCRUMBS = ["Home", "제품", "통합제어"];

// 핵심 제품 라인업
const PRODUCTS = [
  {
    image: integratedControl,
    title: "통합제어기 XCN-3000",
    subtitle: "Integrated Controller",
    desc: "RS232/485, TCP/IP, IR, 릴레이 등 다양한 프로토콜을 지원하는 차세대 통합제어기입니다. 영상, 음향, 조명, 환경 설비를 단일 인터페이스로 통합 제어합니다.",
  },
  {
    image: remoteControl,
    title: "원격관리 ThingsEye",
    subtitle: "Remote Management Platform",
    desc: "다중 공간의 설비 상태를 원격으로 모니터링하고 제어하는 클라우드 플랫폼입니다. 실시간 데이터 수집, 분석, 스케줄링을 통한 자동화 운영을 지원합니다.",
  },
  {
    image: touchPanel,
    title: "터치패널 컨트롤러",
    subtitle: "Touch Panel Controller",
    desc: "직관적인 GUI 기반 10인치/7인치 터치패널로 현장에서 손쉽게 설비를 제어합니다. 프리셋 저장으로 원터치 환경 전환이 가능합니다.",
  },
  {
    image: technology,
    title: "상황인지 자동화",
    subtitle: "Context-Aware Automation",
    desc: "공기질, 모션, 카메라 등 멀티모달 센서 데이터를 활용하여 공간의 상황을 인지하고 설비를 최적 제어합니다. 에너지 절감과 공간 효율성을 극대화합니다.",
  },
];

// 적용 분야
const DOMAINS = [
  {
    image: conference,
    title: "대회의실/강당",
    subtitle: "Conference Hall",
    items: [
      "비디오월, 매트릭스 영상 시스템 통합 제어",
      "무선 마이크, 오디오 믹서 음향 자동 설정",
      "DMX512 기반 감성 조명 및 스팟 조명 제어",
      "화자 추적 카메라 및 화상회의 시스템 연동",
      "프리셋 저장으로 원터치 회의 환경 전환",
    ],
  },
  {
    image: smartBuilding,
    title: "강의실/교육시설",
    subtitle: "Education Facility",
    items: [
      "강의 모드별 조명, 음향, 영상 자동 전환",
      "화자 추적 기반 카메라 자동 줌/팬 제어",
      "녹화 시스템 연동 및 원격 수업 지원",
      "시간표 기반 자동 스케줄링 운영",
      "에너지 절감형 자동 전원 관리 시스템",
    ],
  },
  {
    image: buildingExterior,
    title: "전시장/컨벤션",
    subtitle: "Exhibition & Convention",
    items: [
      "대규모 공간 다중 구역 독립 제어 지원",
      "이벤트 시나리오 기반 설비 일괄 전환",
      "입체 음향 시스템 및 공간 음향 최적화",
      "실시간 환경 모니터링 및 공조 자동 제어",
      "원격 관제를 통한 다중 시설 통합 운영",
    ],
  },
];

// 서비스 파이프라인
const PIPELINE = [
  {
    image: automation,
    step: "01",
    title: "현장 분석",
    subtitle: "Site Analysis",
    items: [
      "공간 구조 및 설비 현황 조사",
      "기존 제어 시스템 호환성 분석",
      "사용자 요구사항 및 시나리오 정의",
      "최적 제어 아키텍처 설계",
      "프로토콜 및 인터페이스 규격 확인",
    ],
  },
  {
    image: integratedControl,
    step: "02",
    title: "시스템 구축",
    subtitle: "System Integration",
    items: [
      "XCN-3000 통합제어기 설치 및 배선",
      "영상/음향/조명/환경 설비 연동",
      "터치패널 GUI 맞춤 개발",
      "프리셋/매크로 시나리오 프로그래밍",
      "ThingsEye 클라우드 연동 설정",
    ],
  },
  {
    image: touchPanel,
    step: "03",
    title: "자동화 설정",
    subtitle: "Automation Setup",
    items: [
      "센서 기반 상황인지 자동 제어 설정",
      "스케줄링 기반 시간대별 운영 프로그램",
      "에너지 절감 자동화 정책 적용",
      "비상 상황 안전모드 설정",
      "사용자별 권한 및 제어 범위 설정",
    ],
  },
  {
    image: remoteControl,
    step: "04",
    title: "원격 운영",
    subtitle: "Remote Operation",
    items: [
      "PC/태블릿/모바일 다중 접속 지원",
      "다중 시설 통합 대시보드 원격 관제",
      "설비 이상 자동 알림 및 유지보수 요청",
      "운영 리포트 자동 생성 및 분석",
      "클라우드 기반 데이터 백업 관리",
    ],
  },
];

export default function ProductListControlPage() {
  return (
    <BaseLayout
      header={() => <ProductHeader image={headerImage} alt="control products" />}
      breadcrumbs={BREADCRUMBS}
      title="통합제어"
    >
      <div className="solution-page">
        {/* 히어로 섹션 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">Integrated Control Products</div>
          <h1 className="sol-hero-title">
            하나의 인터페이스로,<br />모든 공간을 제어하다
          </h1>
          <p className="sol-hero-desc">
            영상, 음향, 조명, 냉난방, 공조 등 다양한 설비를 XCN-3000 통합제어기와
            ThingsEye 원격관리 플랫폼으로 제어하는 차세대 통합제어 시스템입니다.
            멀티모달 센서 기반 상황인지 자동화와 클라우드 원격관리로
            공간 효율성을 극대화하고 운영 비용을 절감합니다.
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
            <h2 className="sol-section-title">구축 프로세스</h2>
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
                <span className="sol-layer-badge edge">DEVICE</span>
                <p>영상(프로젝터, 디스플레이), 음향(앰프, 마이크), 조명(DMX512), 환경(공조, 전동커튼) 설비</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge comm">CONTROLLER</span>
                <p>XCN-3000 통합제어기, RS232/485/TCP/IP/IR/릴레이 멀티 프로토콜, 터치패널 인터페이스</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge cloud">CLOUD</span>
                <p>ThingsEye 원격관리 플랫폼, 데이터 수집·분석, 스케줄링 자동화, 모델 버전 관리</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge ctrl">INTERFACE</span>
                <p>웹/모바일 대시보드, 터치패널 GUI, 벽부형 스위치, 음성제어, 타이머/스케줄 자동 운영</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

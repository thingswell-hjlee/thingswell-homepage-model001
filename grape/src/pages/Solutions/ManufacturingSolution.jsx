import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import solution from '../../assets/header_image/Solution.jpg';
import './SolutionPage.css';

// 이미지 import
import conferenceRoom from '../../assets/solutions/control/conference-room.jpg';
import smartOffice from '../../assets/solutions/control/smart-office.jpg';
import presentation from '../../assets/solutions/control/presentation.jpg';
import automation from '../../assets/solutions/control/automation.jpg';
import building from '../../assets/solutions/control/building.jpg';
import tabletControl from '../../assets/solutions/control/tablet-control.jpg';
import lighting from '../../assets/solutions/control/lighting.jpg';
import auditorium from '../../assets/solutions/control/auditorium.jpg';

const BREADCRUMBS = ["Home", "사업분야", "스마트 통합제어 플랫폼"];

// 핵심 기술 스택
const TECH_STACK = [
  {
    image: conferenceRoom,
    title: "통합제어기 (XCN-3000)",
    subtitle: "Integrated Controller",
    desc: "Advanced Integrated Controller XCN-3000은 RS232/485, TCP/IP, IR, 릴레이 등 다양한 프로토콜을 지원하여 영상, 음향, 조명, 환경 설비를 단일 인터페이스로 통합 제어합니다.",
  },
  {
    image: tabletControl,
    title: "원격관리 (ThingsEye)",
    subtitle: "Remote Management",
    desc: "ThingsEye 솔루션을 통해 다중 공간의 설비 상태를 원격으로 모니터링하고 제어합니다. 실시간 데이터 수집, 분석, 스케줄링을 통한 자동화 운영을 지원합니다.",
  },
  {
    image: automation,
    title: "상황인지 자동화",
    subtitle: "Context-Aware Automation",
    desc: "공기질, 모션, 카메라 등 멀티모달 센서 데이터를 활용하여 공간의 상황을 인지하고 자동으로 설비를 최적 제어합니다. 에너지 절감과 공간 효율성을 극대화합니다.",
  },
  {
    image: presentation,
    title: "화상회의 연동",
    subtitle: "Video Conference Integration",
    desc: "화자 추적 시스템, 화상회의 시스템 연동, 하울링 제거, 카메라 프리셋 기반 위치 추적 제어를 통해 최적의 회의 및 발표 환경을 자동으로 구성합니다.",
  },
];

// 적용 분야
const DOMAINS = [
  {
    image: auditorium,
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
    image: smartOffice,
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
    image: building,
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
    image: lighting,
    step: "01",
    title: "센서수집",
    subtitle: "Sensor Collection",
    items: [
      "공기질, 온습도, 조도 환경센서 데이터 수집",
      "모션, 카메라 기반 재실 인원 감지",
      "설비 상태 및 에너지 사용량 모니터링",
      "네트워크 장비 통신 상태 실시간 확인",
      "시간 동기화 기반 데이터 통합 관리",
    ],
  },
  {
    image: smartOffice,
    step: "02",
    title: "통합분석",
    subtitle: "Integrated Analysis",
    items: [
      "멀티모달 센서 데이터 융합 분석",
      "공간 사용 패턴 학습 및 예측",
      "에너지 효율 최적화 알고리즘 적용",
      "이상 상황 자동 판단 및 분류",
      "운영 데이터 기반 인사이트 도출",
    ],
  },
  {
    image: automation,
    step: "03",
    title: "자동제어",
    subtitle: "Auto Control",
    items: [
      "상황 인지 기반 설비 자동 최적 제어",
      "프리셋/매크로 기반 원터치 환경 전환",
      "스케줄링 기반 시간대별 자동 운영",
      "에너지 절감형 자동 전원 관리",
      "비상 상황 시 안전 모드 자동 전환",
    ],
  },
  {
    image: tabletControl,
    step: "04",
    title: "원격관리",
    subtitle: "Remote Management",
    items: [
      "PC, 태블릿, 모바일 다중 접속 지원",
      "다중 시설 통합 대시보드 원격 관제",
      "설비 이상 자동 알림 및 유지보수 요청",
      "운영 리포트 자동 생성 및 분석",
      "클라우드 기반 데이터 백업 및 이력 관리",
    ],
  },
];

const ManufacturingSolution = () => {
  return (
    <BaseLayout
      header={() => <ProductHeader image={solution} alt="solution" />}
      breadcrumbs={BREADCRUMBS}
      title="스마트 통합제어 플랫폼"
    >
      <div className="solution-page">
        {/* 히어로 설명 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">Smart Control Platform</div>
          <h1 className="sol-hero-title">
            하나의 인터페이스로,<br />모든 공간을 제어하다
          </h1>
          <p className="sol-hero-desc">
            영상, 음향, 조명, 냉난방, 공조 등 다양한 설비를 하나의 스마트 인터페이스로
            통합하여 원격 제어하는 차세대 통합제어 플랫폼입니다.
            멀티모달 센서 기반 상황인지 자동화와 원격관리를 통해
            공간 효율성을 극대화하고 운영 비용을 절감합니다.
          </p>
        </section>

        {/* 핵심 기술 스택 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Core Technology</span>
            <h2 className="sol-section-title">핵심 기술</h2>
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

        {/* 서비스 파이프라인 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Service Pipeline</span>
            <h2 className="sol-section-title">서비스 파이프라인</h2>
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
      </div>
    </BaseLayout>
  );
};

export default ManufacturingSolution;

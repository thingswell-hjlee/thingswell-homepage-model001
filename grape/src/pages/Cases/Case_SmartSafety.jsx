import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import headerImage from '../../assets/header_image/performance.jpg';
import '../Solutions/SolutionPage.css';

// 이미지 import
import factorySite from '../../assets/cases/smart-safety/factory-site.jpg';
import constructionSite from '../../assets/cases/smart-safety/construction-site.jpg';
import abstractTech from '../../assets/cases/smart-safety/abstract-tech.jpg';
import teamMeeting from '../../assets/cases/smart-safety/team-meeting.jpg';
import warehouse from '../../assets/cases/smart-safety/warehouse.jpg';
import industrialRobot from '../../assets/cases/smart-safety/industrial-robot.jpg';
import manufacturing from '../../assets/cases/smart-safety/manufacturing.jpg';
import cityNight from '../../assets/cases/smart-safety/city-night.jpg';

const BREADCRUMBS = ["Home", "고객사례", "산업안전자동화"];

// 주요 납품 실적
const CASES = [
  {
    image: factorySite,
    title: "장애인직업재활시설 스마트안전시스템",
    subtitle: "AI Smart Safety System",
    desc: "AI 카메라 8대, 스마트밴드 8개, 환경센서 2개를 연동한 통합 안전 시스템을 구축했습니다. 낙상·쓰러짐·장시간 미움직임을 실시간 감지하여 장애인 작업자의 안전을 보호합니다.",
  },
  {
    image: constructionSite,
    title: "건설현장 AI 안전관리 시스템",
    subtitle: "Construction Site Safety",
    desc: "고소작업 추락 감지, 중장비 접근 경고, 안전모 미착용 탐지 등 건설현장 맞춤형 AI 안전 시스템을 구축했습니다. Edge AI 기반 실시간 분석으로 사고를 사전에 예방합니다.",
  },
  {
    image: manufacturing,
    title: "제조공장 유해환경 모니터링",
    subtitle: "Factory Environment Monitoring",
    desc: "유해가스, 분진, 소음, 온습도를 실시간으로 모니터링하고 법정 기준 초과 시 자동 경보를 발생시킵니다. 작업환경 측정 데이터 자동 리포트로 규제 대응을 지원합니다.",
  },
  {
    image: industrialRobot,
    title: "스마트공장 자동화 안전 솔루션",
    subtitle: "Smart Factory Safety",
    desc: "로봇·자동화 설비 주변 작업자 침입 감지 및 비상정지 연동 시스템을 구축했습니다. AI 기반 동선 분석으로 위험구역 접근을 사전에 차단합니다.",
  },
];

// 시스템 구성 요소
const COMPONENTS = [
  {
    image: abstractTech,
    title: "Edge AI 서버",
    subtitle: "Edge AI Server",
    items: [
      "NVIDIA DeepStream 기반 실시간 영상 분석",
      "TensorRT 고속 추론 엔진 탑재",
      "8채널 카메라 동시 분석 처리",
      "네트워크 장애 시 독립 동작 보장",
      "적응형 롤링버퍼 이벤트 데이터 보존",
    ],
  },
  {
    image: teamMeeting,
    title: "통합 관제 대시보드",
    subtitle: "Control Dashboard",
    items: [
      "실시간 이벤트 현황 모니터링",
      "카메라·센서·밴드 통합 상태 표시",
      "위험 등급별 알림 이력 관리",
      "영상 클립 자동 저장 및 재생",
      "운영 리포트 및 통계 분석",
    ],
  },
  {
    image: cityNight,
    title: "클라우드 플랫폼",
    subtitle: "Cloud Platform",
    items: [
      "AWS 기반 이벤트 메타데이터 저장",
      "AI 모델 버전 관리 및 원격 배포",
      "다중 시설 통합 원격 관제",
      "데이터 기반 안전 개선 분석",
      "SaaS형 플랫폼 확장 지원",
    ],
  },
];

// 납품 프로세스
const PROCESS = [
  {
    image: teamMeeting,
    step: "01",
    title: "현장 분석",
    subtitle: "Site Survey",
    items: [
      "현장 환경 및 위험 요소 조사",
      "기존 안전 시스템 현황 파악",
      "작업자 동선 및 위험구역 분석",
      "법규 요건 및 규제 확인",
      "맞춤형 솔루션 설계 제안",
    ],
  },
  {
    image: warehouse,
    step: "02",
    title: "시스템 구축",
    subtitle: "System Build",
    items: [
      "AI 카메라 및 센서 최적 위치 설치",
      "Edge AI 서버 구성 및 모델 배포",
      "네트워크 인프라 구축 및 검증",
      "알람장치 및 접점 연동 설정",
      "NVR 영상 저장 시스템 구성",
    ],
  },
  {
    image: abstractTech,
    step: "03",
    title: "AI 최적화",
    subtitle: "AI Optimization",
    items: [
      "현장 데이터 기반 AI 모델 학습",
      "오탐·미탐 피드백 반영 튜닝",
      "환경 변화 적응형 모델 업데이트",
      "성능 검증 및 정확도 리포트",
      "최적화 모델 Edge 서버 배포",
    ],
  },
  {
    image: factorySite,
    step: "04",
    title: "운영 지원",
    subtitle: "Operation Support",
    items: [
      "24/7 원격 모니터링 및 장애 대응",
      "정기 AI 모델 업데이트 및 개선",
      "운영 데이터 분석 리포트 제공",
      "관리자 교육 및 매뉴얼 지원",
      "SLA 기반 유지보수 체계 운영",
    ],
  },
];

export default function CaseSmartSafetyPage() {
  return (
    <BaseLayout
      header={() => <ProductHeader image={headerImage} alt="smart safety cases" />}
      breadcrumbs={BREADCRUMBS}
      title="산업안전자동화"
    >
      <div className="solution-page">
        {/* 히어로 섹션 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">Smart Safety Delivery Cases</div>
          <h1 className="sol-hero-title">
            AI 안전 시스템,<br />현장에서 검증하다
          </h1>
          <p className="sol-hero-desc">
            제조, 건설, 복지시설 등 다양한 산업 현장에 AI 기반 스마트안전 시스템을
            성공적으로 구축한 실적입니다. Edge AI 실시간 분석, 멀티모달 센서 융합,
            클라우드 원격관리를 통해 작업자 안전을 혁신적으로 개선하고
            산업재해를 예방하는 차세대 안전 솔루션을 제공합니다.
          </p>
        </section>

        {/* 주요 납품 실적 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Key Projects</span>
            <h2 className="sol-section-title">주요 납품 실적</h2>
          </div>
          <div className="sol-tech-grid">
            {CASES.map((caseItem, i) => (
              <div key={i} className="sol-tech-card">
                <div className="sol-tech-card-img">
                  <img src={caseItem.image} alt={caseItem.title} />
                  <div className="sol-tech-card-overlay" />
                </div>
                <div className="sol-tech-card-body">
                  <span className="sol-tech-card-subtitle">{caseItem.subtitle}</span>
                  <h3 className="sol-tech-card-title">{caseItem.title}</h3>
                  <p className="sol-tech-card-desc">{caseItem.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 시스템 구성 요소 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">System Components</span>
            <h2 className="sol-section-title">핵심 구성 요소</h2>
          </div>
          <div className="sol-domain-grid">
            {COMPONENTS.map((comp, i) => (
              <div key={i} className="sol-domain-card">
                <div className="sol-domain-card-img">
                  <img src={comp.image} alt={comp.title} />
                  <div className="sol-domain-card-overlay">
                    <span className="sol-domain-card-subtitle">{comp.subtitle}</span>
                    <h3 className="sol-domain-card-title">{comp.title}</h3>
                  </div>
                </div>
                <ul className="sol-domain-card-list">
                  {comp.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 납품 프로세스 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Delivery Process</span>
            <h2 className="sol-section-title">납품 프로세스</h2>
          </div>
          <div className="sol-pipeline-grid">
            {PROCESS.map((step, i) => (
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

        {/* 성과 및 효과 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Results & Impact</span>
            <h2 className="sol-section-title">도입 효과</h2>
          </div>
          <div className="sol-architecture">
            <div className="sol-architecture-layers">
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge edge">안전성</span>
                <p>AI 실시간 감지로 위험 상황 즉각 대응, 산업재해 발생률 감소, 작업자 안전 의식 향상</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge comm">효율성</span>
                <p>자동 모니터링으로 안전관리 인력 부담 감소, 24/7 무중단 감시, 데이터 기반 의사결정</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge cloud">규제대응</span>
                <p>중대재해처벌법 대응, 자동 리포트 생성, 안전조치 이력 관리, 감사 대비 증빙 확보</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge ctrl">비용절감</span>
                <p>산재보험료 절감, 생산성 향상, 설비 고장 예방, 유지보수 비용 최적화</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

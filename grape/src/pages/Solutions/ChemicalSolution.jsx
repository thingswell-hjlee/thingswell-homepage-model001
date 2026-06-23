import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import solution from '../../assets/header_image/Solution.jpg';
import './SolutionPage.css';

// 이미지 import
import elderlyCare from '../../assets/solutions/care/elderly-care.jpg';
import healthMonitor from '../../assets/solutions/care/health-monitor.jpg';
import smartHome from '../../assets/solutions/care/smart-home.jpg';
import iotDevice from '../../assets/solutions/care/iot-device.jpg';
import telehealth from '../../assets/solutions/care/telehealth.jpg';
import alertSystem from '../../assets/solutions/care/alert-system.jpg';
import wearable from '../../assets/solutions/care/wearable.jpg';
import personalized from '../../assets/solutions/care/personalized.jpg';

const BREADCRUMBS = ["Home", "사업분야", "노인·장애인 스마트 안전 플랫폼"];

// 핵심 기술 스택
const TECH_STACK = [
  {
    image: elderlyCare,
    title: "비접촉 레이더/AI 감지",
    subtitle: "Non-contact Radar & AI",
    desc: "CCTV 없이 AI 레이더와 영상 분석 기술을 활용하여 사생활 침해 없이 낙상, 이상행동, 배회 등을 실시간으로 감지합니다. 침실, 화장실 등 프라이버시 공간에서도 안전하게 모니터링합니다.",
  },
  {
    image: wearable,
    title: "스마트밴드 연동",
    subtitle: "Smart Band Integration",
    desc: "스마트밴드를 통해 심박수, 체온, 활동량, 수면 패턴 등 생체 데이터를 실시간 수집합니다. 건강 이상 징후를 조기에 감지하고 위치 추적을 통한 배회 감지를 지원합니다.",
  },
  {
    image: smartHome,
    title: "환경센서 통합",
    subtitle: "Environment Sensor Fusion",
    desc: "온습도, 공기질, 조도, 소음 등 실내 환경 데이터를 복합 분석합니다. 쾌적한 생활 환경을 자동으로 유지하고 화재, 가스 누출 등 위험 상황을 즉시 감지합니다.",
  },
  {
    image: alertSystem,
    title: "3단계 알림시스템",
    subtitle: "3-Step Alert System",
    desc: "위험 감지 시 음성 안내, 강력한 경고음, 보호자 및 유관기관 알림의 3단계 에스컬레이션을 자동 수행합니다. 상황 심각도에 따른 맞춤형 대응으로 골든타임을 확보합니다.",
  },
];

// 적용 분야
const DOMAINS = [
  {
    image: healthMonitor,
    title: "경로당/복지관",
    subtitle: "Senior Community Center",
    items: [
      "경로당 내 고령자 건강 상태 실시간 모니터링",
      "낙상 및 의식 저하 즉시 감지 알림",
      "복지관 프로그램 중 이상행동 조기 탐지",
      "출입 관리 및 인원 현황 자동 파악",
      "관리자 대시보드 통합 관제 지원",
    ],
  },
  {
    image: telehealth,
    title: "독거노인 가정",
    subtitle: "Elderly Living Alone",
    items: [
      "비접촉 레이더 기반 생활 패턴 모니터링",
      "장시간 미활동 자동 감지 및 안부 확인",
      "투약 시간 알림 및 건강 스케줄 관리",
      "스마트밴드 연동 건강 이상 즉시 알림",
      "보호자 모바일 앱 실시간 상태 공유",
    ],
  },
  {
    image: iotDevice,
    title: "장애인 직업재활시설",
    subtitle: "Vocational Rehabilitation",
    items: [
      "작업 중 위험 행동 및 사고 실시간 감지",
      "과도한 흥분, 자해 행동 조기 탐지 및 개입",
      "개인별 맞춤 환경(조명, 음향) 자동 조절",
      "일과 패턴 분석 및 행동 변화 리포트",
      "관리자 즉시 알림 및 이력 관리 시스템",
    ],
  },
];

// 서비스 파이프라인
const PIPELINE = [
  {
    image: elderlyCare,
    step: "01",
    title: "위험감지",
    subtitle: "Risk Detection",
    items: [
      "AI 레이더 기반 낙상/쓰러짐 실시간 감지",
      "이상행동(배회, 자해, 폭행) 영상 분석",
      "스마트밴드 생체 데이터 이상치 탐지",
      "환경센서 위험 상황(화재, 가스) 감지",
      "멀티모달 데이터 융합 정밀 판단",
    ],
  },
  {
    image: healthMonitor,
    step: "02",
    title: "상태분석",
    subtitle: "Status Analysis",
    items: [
      "생활 패턴 학습 기반 이상 여부 판단",
      "활동량, 수면, 식사 패턴 종합 분석",
      "건강 상태 트렌드 및 변화 추적",
      "위험도 등급 자동 산정",
      "개인별 맞춤 기준선 지속 업데이트",
    ],
  },
  {
    image: alertSystem,
    step: "03",
    title: "자동알림",
    subtitle: "Auto Alert",
    items: [
      "1단계: 본인 음성 안내 및 확인 요청",
      "2단계: 강력 경고음 및 환경 제어 연동",
      "3단계: 보호자/119/관리자 동시 알림",
      "상황별 에스컬레이션 자동 수행",
      "알림 이력 및 대응 결과 자동 기록",
    ],
  },
  {
    image: personalized,
    step: "04",
    title: "맞춤케어",
    subtitle: "Personalized Care",
    items: [
      "개인 건강 스케줄 자동 관리(투약, 운동)",
      "정서 안정 테라피 콘텐츠 자동 제공",
      "환경(조명, 음향, 온도) 맞춤 자동 제어",
      "주간/월간 건강 리포트 자동 생성",
      "AI 모델 지속 학습 기반 케어 품질 향상",
    ],
  },
];

const ChemicalSolution = () => {
  return (
    <BaseLayout
      header={() => <ProductHeader image={solution} alt="solution" />}
      breadcrumbs={BREADCRUMBS}
      title="노인·장애인 스마트 안전 플랫폼"
    >
      <div className="solution-page">
        {/* 히어로 설명 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">NVIDIA + AWS Powered</div>
          <h1 className="sol-hero-title">
            AI 기반 비접촉식 모니터링,<br />맞춤형 스마트 케어
          </h1>
          <p className="sol-hero-desc">
            AI 기반의 비접촉식 모니터링 시스템으로 낙상감지, 이상행동감지, 스마트밴드 연동,
            환경센서 통합을 통해 노인과 장애인의 안전을 24시간 지킵니다.
            사생활 침해 없이 위험 상황을 조기에 감지하고, 개인 맞춤형 케어를 제공하여
            삶의 질을 향상시키는 차세대 스마트 안전 플랫폼입니다.
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

export default ChemicalSolution;

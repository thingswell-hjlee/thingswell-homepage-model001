import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import useTranslation from '../../hooks/useTranslation';
import headerImage from '../../assets/header_image/performance.jpg';
import '../Solutions/SolutionPage.css';
import './CaseSmartSafety.css';

const BREADCRUMBS_KEY = 'cases';

// 실제 납품 실적 데이터 (thingswell.co.kr 동일 데이터)
const CASES = [
  {
    id: 571,
    title: "서울 버스 스마트쉼터 AI 상황인지 시스템",
    orderer: "서울시 중구, 강남구",
    date: "2025",
    type: "AI 상황인지 시스템",
    overviewTitle: "AI 상황인지 시스템",
    desc: [
      "서울시 중구형 버스 그린스마트쉼터 20개소",
      "서울시 강남구형 버스 스마트쉼터 20개소",
      "원격관리 시스템 구축",
      "AI 상황인지 시스템 (피플카운터, 쓰러짐 감지, 폭력행위 감지)",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756962984188-bo8dyvalx5d.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756962984319-wkhefmuuhj.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756962984162-1rsy4o4oo8c.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756962984163-w5a0wab2qmn.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756962984163-v3dlgu21ect.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756962984213-0fkg88ddxo0l.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756962984164-1sbro4ciz92.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756962984273-0ke3m8kaf8g.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756962984255-1hec4hdqb0a.webp",
    ],
  },
  {
    id: 402,
    title: "서울 중구 40개소 IP 카메라 AI 시스템",
    orderer: "서울 중구청",
    date: "2024",
    type: "온디바이스AI",
    overviewTitle: "AI 피플카운팅 및 쓰러짐 감지 시스템",
    desc: [
      "AI 피플카운팅 및 쓰러짐 감지 시스템 공급",
      "온디바이스 AI 기술 접목으로 상황별 안전·편의 기능 강화",
      "조명, 온열벤치, LED 디스플레이, 자동문, 공기질 측정, 냉난방 자동제어",
      "CCTV 등 원격 제어 및 모니터링 시스템 개발 및 구축, 관제센터 구축/연동",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963158807-0da27zdb2okq.webp",
    ],
  },
  {
    id: 392,
    title: "서울 강남구 버스쉼터 관제센터",
    orderer: "서울 강남구청",
    date: "2024",
    type: "AI 관제센터",
    overviewTitle: "그린스마트쉼터 관제센터",
    desc: [
      "그린스마트쉼터 관제센터 구축",
      "쓰러짐감지 기능 AI 적용 20채널",
      "실시간 영상 모니터링 및 이벤트 관리",
      "원격 설비 제어 및 상태 모니터링",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963036929-usuzyeeeqq.webp",
    ],
  },
  {
    id: 401,
    title: "AI SoC 기반 인지장애 홈케어 개발",
    orderer: "보건복지부",
    date: "2024",
    type: "AI",
    overviewTitle: "AI SoC 기반 헬스케어 시스템",
    desc: [
      "AI SoC 기반 인지장애 홈케어 시스템 개발",
      "경량화 AI 모델 탑재 전용 하드웨어",
      "실시간 생체신호 모니터링 및 이상 감지",
      "보호자 알림 및 원격 모니터링 플랫폼",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756977319427-m6lrnan4qas.webp",
    ],
  },
  {
    id: 390,
    title: "서울 중구 버스쉼터 원격관리",
    orderer: "서울 중구청",
    date: "2024",
    type: "원격관리시스템",
    overviewTitle: "그린스마트쉼터 원격관리시스템",
    desc: [
      "그린스마트쉼터 20개소 원격관리시스템 구축",
      "조명, 냉난방, 공기질 원격 모니터링",
      "자동제어 스케줄링 및 이상 알림",
      "통합 대시보드를 통한 실시간 관제",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963144664-1mm3siiy4k1.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963144672-ihg9rx7gfdi.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963144673-jqh8qbb7bmb.webp",
    ],
  },
  {
    id: 424,
    title: "숭실대학교 mmWave Radar",
    orderer: "숭실대학교",
    date: "2022",
    type: "레이더 센서",
    overviewTitle: "생체정보 수집 레이더",
    desc: [
      "생체정보 수집 레이더 반도체 응용 시제품 제작",
      "mmWave 레이더 기반 비접촉 바이탈 센싱",
      "호흡, 심박수 실시간 비접촉 측정",
      "산학협력 R&D 프로젝트 수행",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756977395233-7gstbuluw8c.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756977186493-qc8mzcjm0fl.webp",
    ],
  },
  {
    id: 418,
    title: "비접촉식 레이더 기반 안전힐링 시스템",
    orderer: "R&D",
    date: "2022",
    type: "안전힐링",
    overviewTitle: "바이탈사인 기반 안전힐링 시스템",
    desc: [
      "바이탈사인+공기질 기반 안전힐링 시스템 개발",
      "비접촉 레이더로 생체신호 실시간 모니터링",
      "공기질 센서 연동 환경 분석",
      "이상징후 자동 감지 및 알림",
    ],
    images: [],
  },
  {
    id: 429,
    title: "국민건강보험공단 실증센터",
    orderer: "국민건강보험공단",
    date: "2022",
    type: "AI인체감지",
    overviewTitle: "AI 인체감지 실증 프로젝트",
    desc: [
      "AI 인체감지 시스템 실증 테스트",
      "국민건강보험공단 실증센터 구축",
      "낙상 감지 및 이상행동 모니터링",
      "실증 데이터 기반 알고리즘 고도화",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963234472-0y97423syoqq.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963234504-rvbq6hoomga.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963234486-ntppzh9sh9j.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963234477-m18s6tq5xu8.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963234448-rudu9qtwp5.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963234448-y6nwc87fm8f.webp",
    ],
  },
];

// 개별 케이스 카드 컴포넌트
const CaseCard = ({ caseItem }) => {
  const mainImage = caseItem.images && caseItem.images.length > 0 ? caseItem.images[0] : null;
  const hasMultipleImages = caseItem.images && caseItem.images.length > 1;

  return (
    <div className="case-card">
      {/* 메인 이미지 영역 */}
      <div className="case-card-image-area">
        {mainImage ? (
          <img src={mainImage} alt={caseItem.title} className="case-card-main-image" />
        ) : (
          <div className="case-card-no-image">
            <span>No Image</span>
          </div>
        )}
        <div className="case-card-image-overlay" />
        {/* 배지 */}
        <div className="case-card-badges">
          <span className="case-card-year">{caseItem.date}</span>
          {caseItem.type && <span className="case-card-type">{caseItem.type}</span>}
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="case-card-content">
        <div className="case-card-header">
          <h3 className="case-card-title">{caseItem.title}</h3>
          <span className="case-card-orderer">{caseItem.orderer}</span>
        </div>

        <ul className="case-card-desc-list">
          {caseItem.desc.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        {/* 썸네일 이미지 그리드 (여러 이미지가 있을 때) */}
        {hasMultipleImages && (
          <div className="case-card-thumbnails">
            {caseItem.images.slice(1, 5).map((img, idx) => (
              <div key={idx} className="case-card-thumb">
                <img src={img} alt={`${caseItem.title} ${idx + 2}`} />
              </div>
            ))}
            {caseItem.images.length > 5 && (
              <div className="case-card-thumb case-card-thumb-more">
                <span>+{caseItem.images.length - 5}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function CaseSmartSafetyPage() {
  const { t } = useTranslation();
  return (
    <BaseLayout
      header={() => <ProductHeader image={headerImage} alt="smart safety cases" />}
      breadcrumbs={[t('cases.breadcrumbs.0'), t('cases.breadcrumbs.1'), t('cases.smartSafety')]}
      title={t('cases.smartSafety')}
    >
      <div className="solution-page">
        {/* 히어로 섹션 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">Industrial Safety Automation</div>
          <h1 className="sol-hero-title">
            AI 안전 시스템,<br />현장에서 검증하다
          </h1>
          <p className="sol-hero-desc">
            서울시 버스쉼터 AI 상황인지 시스템, 온디바이스 AI 카메라, 관제센터 구축,
            비접촉 레이더 바이탈 센싱, AI 인체감지 등 다양한 산업안전 프로젝트를
            성공적으로 수행한 실적입니다.
          </p>
        </section>

        {/* 주요 수치 */}
        <section className="case-stats">
          <div className="case-stat-item">
            <span className="case-stat-number">8+</span>
            <span className="case-stat-label">납품 프로젝트</span>
          </div>
          <div className="case-stat-item">
            <span className="case-stat-number">60+</span>
            <span className="case-stat-label">설치 거점</span>
          </div>
          <div className="case-stat-item">
            <span className="case-stat-number">AI</span>
            <span className="case-stat-label">핵심 기술</span>
          </div>
          <div className="case-stat-item">
            <span className="case-stat-number">24/7</span>
            <span className="case-stat-label">실시간 관제</span>
          </div>
        </section>

        {/* 납품 실적 목록 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Delivery Cases</span>
            <h2 className="sol-section-title">납품 실적</h2>
          </div>
          <div className="case-grid">
            {CASES.map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} />
            ))}
          </div>
        </section>

        {/* 기술 역량 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Core Capabilities</span>
            <h2 className="sol-section-title">핵심 기술 역량</h2>
          </div>
          <div className="sol-architecture">
            <div className="sol-architecture-layers">
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge edge">AI 영상분석</span>
                <p>온디바이스 AI 기반 피플카운팅, 쓰러짐 감지, 폭력행위 감지, 인체감지 등 실시간 영상 분석 기술</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge comm">비접촉 센싱</span>
                <p>mmWave Radar 기반 비접촉 바이탈사인 측정, 호흡·심박수 모니터링, 재실 감지 기술</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge cloud">원격 관제</span>
                <p>다중 거점 통합 관제센터, 원격 설비 제어, 실시간 모니터링, 이벤트 기반 자동 알림 시스템</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge ctrl">IoT 통합제어</span>
                <p>조명, 냉난방, 공기질, 자동문, LED 등 설비 통합 제어 및 환경 자동화 시스템</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

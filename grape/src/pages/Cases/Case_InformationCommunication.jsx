import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import useTranslation from '../../hooks/useTranslation';
import headerImage from '../../assets/header_image/performance.jpg';
import '../Solutions/SolutionPage.css';
import './CaseSmartSafety.css';



// 주요 납품 실적 (실제 데이터)
const CASES = [
  {
    id: 573,
    title: "안양시 공중화장실 IoT 안심비상벨",
    orderer: "안양시",
    date: "2025",
    type: "통신공사",
    desc: [
      "공중화장실 IoT 안심비상벨 시스템 구축",
      "비상 상황 발생 시 즉시 관제센터 연동",
      "실시간 모니터링 및 위치 기반 출동 시스템",
      "시민 안전 강화를 위한 스마트 인프라 구축",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963544438-1yte44adnz7.webp",
    ],
  },
  {
    id: 384,
    title: "107 정보통신대대 정보통신공사",
    orderer: "107 정보통신대대",
    date: "2025",
    type: "정보통신",
    desc: [
      "정보통신공사 수주",
      "군 통신 인프라 구축 및 정비",
      "네트워크 설비 설치 및 연동",
      "보안 통신 시스템 구축",
    ],
    images: [],
  },
  {
    id: 386,
    title: "동안구 공영주차장 및 안심귀갓길 CCTV 설치",
    orderer: "동안구청",
    date: "2024",
    type: "CCTV",
    desc: [
      "동안구 공영주차장 CCTV 설치",
      "안심귀갓길 방범 CCTV 인프라 구축",
      "실시간 영상 모니터링 시스템 연동",
      "시민 안전을 위한 방범 인프라 강화",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963577955-dl403jvmqh6.webp",
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963577955-dl403jvmqh6.webp",
    ],
  },
  {
    id: 394,
    title: "HD현대중공업 울산 문화관 리모델링",
    orderer: "HD현대중공업",
    date: "2024",
    type: "리모델링",
    desc: [
      "문화관 2층 1영업장 통합제어시스템 리모델링",
      "영상·음향·조명 설비 교체 및 업그레이드",
      "최신 통합제어 인터페이스 적용",
      "기존 설비와의 호환성 확보",
    ],
    images: [],
  },
  {
    id: 417,
    title: "국방조사본부 상황분석센터",
    orderer: "국방조사본부",
    date: "2023",
    type: "국방",
    desc: [
      "상황분석 통합제어시스템 구축",
      "다중 영상소스 통합 관제 시스템",
      "보안 네트워크 기반 통신 인프라",
      "실시간 상황 분석 및 보고 체계",
    ],
    images: [],
  },
  {
    id: 432,
    title: "광주 은혜학교 스누젤렌실",
    orderer: "광주 은혜학교",
    date: "2022",
    type: "복지시설",
    desc: [
      "중고등부 고요자리2 통합제어 시스템",
      "감각통합 치료 공간 맞춤 설비 제어",
      "조명·음향·영상 감성 환경 자동화",
      "장애학생 맞춤 인터페이스 설계",
    ],
    images: [],
  },
  {
    id: 423,
    title: "국민건강보험공단 이동형 영상 수집 시스템",
    orderer: "국민건강보험공단",
    date: "2022",
    type: "영상시스템",
    desc: [
      "이동형 영상 수집 시스템 구축",
      "현장 데이터 실시간 수집 및 전송",
      "모바일 환경 최적화 설계",
      "원격 모니터링 플랫폼 연동",
    ],
    images: [],
  },
  {
    id: 489,
    title: "현대자동차 울산공장 본관",
    orderer: "현대자동차",
    date: "2020",
    type: "기업",
    desc: [
      "대회의실 스마트통합제어",
      "영상·음향·조명 통합 자동화 시스템",
      "프리셋 기반 원터치 환경 전환",
      "화상회의 시스템 연동",
    ],
    images: [],
  },
];

// 개별 케이스 카드 컴포넌트
const CaseCard = ({ caseItem }) => {
  const mainImage = caseItem.images && caseItem.images.length > 0 ? caseItem.images[0] : null;
  const hasMultipleImages = caseItem.images && caseItem.images.length > 1;

  return (
    <div className="case-card">
      <div className="case-card-image-area">
        {mainImage ? (
          <img src={mainImage} alt={caseItem.title} className="case-card-main-image" />
        ) : (
          <div className="case-card-no-image">
            <span>No Image</span>
          </div>
        )}
        <div className="case-card-image-overlay" />
        <div className="case-card-badges">
          <span className="case-card-year">{caseItem.date}</span>
          {caseItem.type && <span className="case-card-type">{caseItem.type}</span>}
        </div>
      </div>
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
        {hasMultipleImages && (
          <div className="case-card-thumbnails">
            {caseItem.images.slice(1, 5).map((img, idx) => (
              <div key={idx} className="case-card-thumb">
                <img src={img} alt={`${caseItem.title} ${idx + 2}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function CaseInformationCommunicationPage() {
  const { t } = useTranslation();
  return (
    <BaseLayout
      header={() => <ProductHeader image={headerImage} alt="information communication cases" />}
      breadcrumbs={[t('cases.breadcrumbs.0'), t('cases.breadcrumbs.1'), t('cases.infoComm')]}
      title={t('cases.infoComm')}
    >
      <div className="solution-page">
        {/* 히어로 섹션 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">Information & Communication</div>
          <h1 className="sol-hero-title">
            안전한 도시를 위한<br />정보통신 인프라를 구축하다
          </h1>
          <p className="sol-hero-desc">
            CCTV 방범 인프라, IoT 안심비상벨, 국방 통신공사, 영상 수집 시스템 등
            시민 안전과 공공 인프라 강화를 위한 정보통신 사업을 수행합니다.
            설계부터 시공, 유지보수까지 정보통신공사 전 과정을 책임지며
            안전하고 신뢰할 수 있는 통신 환경을 제공합니다.
          </p>
        </section>

        {/* 주요 수치 */}
        <section className="case-stats">
          <div className="case-stat-item">
            <span className="case-stat-number">8+</span>
            <span className="case-stat-label">납품 프로젝트</span>
          </div>
          <div className="case-stat-item">
            <span className="case-stat-number">공공</span>
            <span className="case-stat-label">공공·국방 사업</span>
          </div>
          <div className="case-stat-item">
            <span className="case-stat-number">IoT</span>
            <span className="case-stat-label">스마트 인프라</span>
          </div>
          <div className="case-stat-item">
            <span className="case-stat-number">CCTV</span>
            <span className="case-stat-label">방범·관제 시스템</span>
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

        {/* 사업 영역 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Business Areas</span>
            <h2 className="sol-section-title">사업 영역</h2>
          </div>
          <div className="sol-architecture">
            <div className="sol-architecture-layers">
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge edge">CCTV·방범</span>
                <p>공영주차장·안심귀갓길·공공시설 CCTV 설치, 실시간 영상 관제 시스템 구축, AI 영상분석 연동</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge comm">IoT 안전</span>
                <p>공중화장실 IoT 안심비상벨, 긴급 호출 시스템, 위치 기반 출동 연동, 스마트 안전 인프라</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge cloud">국방·공공</span>
                <p>군 정보통신공사, 상황분석센터, 보안 네트워크, 공공기관 통신 인프라 구축 및 정비</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge ctrl">영상·통합</span>
                <p>이동형 영상 수집, 문화시설 리모델링, 복지시설 통합제어, 기업 회의 시스템 구축</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

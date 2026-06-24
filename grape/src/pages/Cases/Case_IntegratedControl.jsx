import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import useTranslation from '../../hooks/useTranslation';
import headerImage from '../../assets/header_image/performance.jpg';
import '../Solutions/SolutionPage.css';
import './CaseSmartSafety.css';



// 하이라이트 프로젝트 (이미지 있는 주요 납품)
const HIGHLIGHT_CASES = [
  {
    id: 385,
    title: "유한대학교 대강당 통합제어 시스템",
    orderer: "유한대학교",
    date: "2025",
    type: "대강당",
    desc: [
      "대강당 통합제어시스템 구축",
      "영상·음향·조명 통합 자동화",
      "터치패널 기반 원터치 환경 전환",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963275470-b07s6jaf4xr.webp",
    ],
  },
  {
    id: 484,
    title: "UAE BNPP 바라카원전",
    orderer: "UAE 원전",
    date: "2020",
    type: "해외사업",
    desc: [
      "아랍에미리트(UAE) 바라카 원자력발전소 시뮬레이션센터",
      "Simulator, CCTV, VMS, Audio System 통합제어",
      "해외 프로젝트 성공 납품",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963414645-s53namryiv.webp",
    ],
  },
  {
    id: 422,
    title: "판교 더블트리 힐튼호텔 연회장",
    orderer: "더블트리 힐튼",
    date: "2022",
    type: "호텔",
    desc: [
      "12개 연회장 및 회의실 통합제어시스템 구축",
      "다구역 독립 제어 및 시나리오 운영",
      "터치패널 기반 설비 일괄 전환",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963390516-hshovsb7mau.webp",
    ],
  },
  {
    id: 545,
    title: "용인 한화생명 연수원",
    orderer: "한화생명",
    date: "2018",
    type: "연수원",
    desc: [
      "제2연수원 스마트통합제어 구축",
      "다목적 강의실·회의실 통합 운영",
      "원격 관리 시스템 연동",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963499409-uh1d844pcki.webp",
    ],
  },
  {
    id: 539,
    title: "DRB 베트남 지사",
    orderer: "DRB",
    date: "2018",
    type: "해외사업",
    desc: [
      "베트남 지사 화상회의실 통합제어",
      "해외 원격 화상회의 시스템 연동",
      "다국적 커뮤니케이션 환경 구축",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963464479-gfylwscxwnc.webp",
    ],
  },
  {
    id: 547,
    title: "홍천 미래에셋 연수원",
    orderer: "미래에셋 연수원",
    date: "2018",
    type: "연수원",
    desc: [
      "스마트통합제어시스템 구축",
      "대형 연수시설 다목적 공간 제어",
      "영상·음향·조명 통합 운영",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963518188-u0nm03zhkro.webp",
    ],
  },
  {
    id: 508,
    title: "고려대 SK미래관 최종현홀",
    orderer: "고려대학교",
    date: "2019",
    type: "대학교",
    desc: [
      "다목적홀 스마트통합제어",
      "대형 강연·행사 시나리오 자동 전환",
      "화자추적 카메라 연동",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963434526-g28xgkul1fb.webp",
    ],
  },
  {
    id: 518,
    title: "전남대 여수 수산해양대 실습선",
    orderer: "전남대학교",
    date: "2019",
    type: "실습선",
    desc: [
      "새동백호 실습선 스마트통합제어",
      "선박 환경 특수 조건 대응 설계",
      "강의실·실습실 통합 제어 시스템",
    ],
    images: [
      "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963444142-q6ht9rtdr8j.webp",
    ],
  },
];

// 연도별 납품 리스트 (주요 건)
const YEARLY_CASES = [
  {
    year: "2025",
    cases: [
      { title: "유한대학교 대강당 통합제어 시스템", orderer: "유한대학교" },
    ],
  },
  {
    year: "2024",
    cases: [
      { title: "경상국립대학교 4200t급 실습선 강의실", orderer: "경상국립대학교" },
      { title: "이트너스 과천사옥 대교육장", orderer: "이트너스" },
      { title: "고려대 생명과학대학 서관 PBL 강의실", orderer: "고려대학교" },
      { title: "가천대학교 교무회의실", orderer: "가천대학교" },
      { title: "LX 판토스 대회의실", orderer: "LX 판토스" },
      { title: "삼성전자로지텍 대회의실·중회의실 통합제어", orderer: "삼성전자로지텍" },
      { title: "카시아호텔 속초 연회장 통합제어", orderer: "카시아호텔" },
      { title: "고려대 생명과학대학 PBL컴퓨터실 화자추적", orderer: "고려대학교" },
      { title: "신 사옥 다목적 대형강의실", orderer: "이트너스" },
    ],
  },
  {
    year: "2023",
    cases: [
      { title: "스마트팜 자동화 시스템", orderer: "호서대학교" },
      { title: "국가정보자원관리원 공주센터 화자추적", orderer: "국가정보자원관리원" },
      { title: "안동시민회관 낙동홀", orderer: "안동시청" },
      { title: "국가정보자원관리원 공주·대구센터 회의실", orderer: "국가정보자원관리원" },
      { title: "부산송도 Wyndham Grand 연회장", orderer: "Wyndham Grand 호텔" },
      { title: "군 OO사단 상황실", orderer: "국방부" },
      { title: "판교 국가기관 강의실", orderer: "국가기관" },
      { title: "순창군 순정축협 한우명품관", orderer: "순창군 순정축협" },
      { title: "자운대 국군종합의무훈련센터", orderer: "국방부" },
      { title: "스마트팜 모니터링 통합제어", orderer: "호서대학교" },
      { title: "용인시청 회의실 리프트 제어", orderer: "용인시청" },
      { title: "디지털 VR룸 통합제어", orderer: "국내 기업" },
      { title: "TI Fluid System VR룸", orderer: "TI Fluid System" },
    ],
  },
  {
    year: "2022",
    cases: [
      { title: "판교 더블트리 힐튼호텔 연회장 (12개실)", orderer: "더블트리 힐튼" },
      { title: "한국연구재단 회의실 (서울·대전)", orderer: "한국연구재단" },
      { title: "연세의료원 신촌세브란스 교수회의실", orderer: "연세의료원" },
      { title: "대한통운 사옥 회의실", orderer: "대한통운" },
      { title: "육군방공학교 강당", orderer: "육군방공학교" },
      { title: "대구 국가정보자원관리원 중회의실", orderer: "국가정보자원관리원" },
      { title: "LIG넥스원 대회의실·대강의실", orderer: "LIG넥스원" },
      { title: "부산 고등학교 방음스튜디오", orderer: "부산교육청" },
      { title: "레미안용산 하이파이 AV시스템", orderer: "삼성물산" },
      { title: "안산교육청 회의실", orderer: "안산교육청" },
    ],
  },
  {
    year: "2021",
    cases: [
      { title: "한양대학교 AI 스마트부스", orderer: "한양대학교" },
      { title: "부산 동아대학교 강의실", orderer: "동아대학교" },
      { title: "한밭대학교 집중토론 화상회의실", orderer: "한밭대학교" },
      { title: "보령시청 문화전당 조명제어", orderer: "보령시청" },
      { title: "고려대학교 지구과학관 PBL강의실", orderer: "고려대학교" },
      { title: "인텔리언테크놀로지 평택 강당", orderer: "인텔리언테크놀로지" },
      { title: "효성 티앤에스 화상회의실", orderer: "효성티앤에스" },
      { title: "한국철도공사 서울본부", orderer: "한국철도공사" },
      { title: "인천시의회 화자추적시스템", orderer: "인천시의회" },
      { title: "고려대 경영대학·수당학습정보관 PBL실", orderer: "고려대학교" },
    ],
  },
  {
    year: "2020",
    cases: [
      { title: "UAE BNPP 바라카원전 시뮬레이션센터", orderer: "UAE 원전" },
      { title: "오스템임플란트 마곡사옥 (9개실)", orderer: "오스템임플란트" },
      { title: "강남대성기숙학원 의대관 (20개 강의실)", orderer: "강남대성학원" },
      { title: "넥슨코리아 회의실 G1", orderer: "넥슨코리아" },
      { title: "충남교육청 상황실", orderer: "충남교육청" },
      { title: "국립아시아문화전당 미디어사파드", orderer: "국립아시아문화전당" },
      { title: "한화디펜스 창원 경영회의실", orderer: "한화디펜스" },
      { title: "호반건설 서초사옥", orderer: "호반건설" },
      { title: "현대자동차 울산공장 본관 대회의실", orderer: "현대자동차" },
      { title: "서울 노원구 불빛정원 미디어파사드", orderer: "노원구청" },
    ],
  },
  {
    year: "2019",
    cases: [
      { title: "국가물산업클러스터 (6개실)", orderer: "환경부" },
      { title: "고려대 SK미래관 최종현홀", orderer: "고려대학교" },
      { title: "전남대 여수 실습선 새동백호", orderer: "전남대학교" },
      { title: "한국에너지공단 울산", orderer: "한국에너지공단" },
      { title: "부산항 국제여객터미널 컨벤션센터", orderer: "부산항만공사" },
      { title: "대전 재난안전대책본부 종합상황실", orderer: "대전광역시" },
      { title: "한국해양대 한나라호 실습선", orderer: "한국해양대학교" },
      { title: "목포해양대 새유달호 실습선", orderer: "목포해양대학교" },
      { title: "인천시의회 화상회의+화자추적", orderer: "인천시의회" },
      { title: "전남교육청 순천 에코에듀센터", orderer: "전남교육청" },
    ],
  },
  {
    year: "2018",
    cases: [
      { title: "DRB 베트남 지사 화상회의실", orderer: "DRB" },
      { title: "홍천 미래에셋 연수원", orderer: "미래에셋" },
      { title: "용인 한화생명 제2연수원", orderer: "한화생명" },
      { title: "CJ 남산본사 (피트니스홀·임원회의실·대회의실)", orderer: "CJ" },
      { title: "송도컨벤시아 (14개 회의실)", orderer: "인천 송도컨벤시아" },
      { title: "카카오프렌즈 홍대 플래그십 전시관", orderer: "카카오프렌즈" },
      { title: "한화그룹 장교동 사옥", orderer: "한화그룹" },
      { title: "벤츠 V클래스 차량 제어", orderer: "Mercedes-Benz" },
      { title: "SKT 전국 대리점 원격방송", orderer: "SK텔레콤" },
      { title: "국립대학교 실습선 5척 (8000t×2, 2000t×3)", orderer: "국립대학" },
    ],
  },
];

// 케이스 카드 컴포넌트
const CaseCard = ({ caseItem }) => {
  const mainImage = caseItem.images && caseItem.images.length > 0 ? caseItem.images[0] : null;

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
      </div>
    </div>
  );
};

export default function CaseIntegratedControlPage() {
  const { t } = useTranslation();
  return (
    <BaseLayout
      header={() => <ProductHeader image={headerImage} alt="integrated control cases" />}
      breadcrumbs={[t('cases.breadcrumbs.0'), t('cases.breadcrumbs.1'), t('cases.integratedControl')]}
      title={t('cases.integratedControl')}
    >
      <div className="solution-page">
        {/* 히어로 섹션 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">Smart Integrated Control</div>
          <h1 className="sol-hero-title">
            165건 이상의 통합제어<br />프로젝트를 완수하다
          </h1>
          <p className="sol-hero-desc">
            대학교, 기업, 호텔, 병원, 공공기관, 국방, 해외까지 —
            XCN-3000 통합제어기와 ThingsEye 원격관리 플랫폼을 기반으로
            영상·음향·조명·환경 설비를 단일 인터페이스로 통합 제어하는
            스마트통합제어 시스템을 성공적으로 구축했습니다.
          </p>
        </section>

        {/* 주요 수치 */}
        <section className="case-stats">
          <div className="case-stat-item">
            <span className="case-stat-number">165+</span>
            <span className="case-stat-label">납품 프로젝트</span>
          </div>
          <div className="case-stat-item">
            <span className="case-stat-number">8년+</span>
            <span className="case-stat-label">연속 사업 수행</span>
          </div>
          <div className="case-stat-item">
            <span className="case-stat-number">해외</span>
            <span className="case-stat-label">UAE·베트남 진출</span>
          </div>
          <div className="case-stat-item">
            <span className="case-stat-number">200+</span>
            <span className="case-stat-label">제어 공간 수</span>
          </div>
        </section>

        {/* 하이라이트 프로젝트 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Featured Projects</span>
            <h2 className="sol-section-title">주요 납품 실적</h2>
          </div>
          <div className="case-grid">
            {HIGHLIGHT_CASES.map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} />
            ))}
          </div>
        </section>

        {/* 연도별 납품 리스트 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Yearly Records</span>
            <h2 className="sol-section-title">연도별 납품 이력</h2>
          </div>
          <div className="case-yearly-list">
            {YEARLY_CASES.map((yearGroup) => (
              <div key={yearGroup.year} className="case-year-group">
                <div className="case-year-badge">{yearGroup.year}</div>
                <div className="case-year-items">
                  {yearGroup.cases.map((c, idx) => (
                    <div key={idx} className="case-year-item">
                      <span className="case-year-item-title">{c.title}</span>
                      <span className="case-year-item-orderer">{c.orderer}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 핵심 역량 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Core Capabilities</span>
            <h2 className="sol-section-title">핵심 역량</h2>
          </div>
          <div className="sol-architecture">
            <div className="sol-architecture-layers">
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge edge">통합제어</span>
                <p>XCN-3000 기반 RS232/485/TCP/IP/IR/릴레이 멀티 프로토콜 제어, 터치패널 GUI, 프리셋 시나리오</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge comm">화자추적</span>
                <p>PTZ 카메라 연동 화자 자동 추적, 화상회의 시스템 통합, 하울링 제거, 마이크 자동 믹싱</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge cloud">원격관리</span>
                <p>ThingsEye 클라우드 플랫폼, 다중 시설 원격 관제, 스케줄링 자동화, 장애 알림</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge ctrl">해외사업</span>
                <p>UAE 바라카원전, 베트남 DRB 등 해외 프로젝트 수행 역량, 글로벌 표준 대응</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

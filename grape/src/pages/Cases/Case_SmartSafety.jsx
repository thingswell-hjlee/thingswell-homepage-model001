import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import useTranslation from '../../hooks/useTranslation';
import { getCasesSmartSafetyData } from '../../data/i18n/casesSmartSafety';
import headerImage from '../../assets/header_image/performance.jpg';
import '../Solutions/SolutionPage.css';
import './CaseSmartSafety.css';

// 이미지 데이터는 언어와 무관하게 고정
const CASE_IMAGES = {
  571: [
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
  402: ["https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963158807-0da27zdb2okq.webp"],
  392: ["https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963036929-usuzyeeeqq.webp"],
  401: ["https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756977319427-m6lrnan4qas.webp"],
  390: [
    "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963144664-1mm3siiy4k1.webp",
    "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963144672-ihg9rx7gfdi.webp",
    "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963144673-jqh8qbb7bmb.webp",
  ],
  424: [
    "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756977395233-7gstbuluw8c.webp",
    "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756977186493-qc8mzcjm0fl.webp",
  ],
  418: [],
  429: [
    "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963234472-0y97423syoqq.webp",
    "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963234504-rvbq6hoomga.webp",
    "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963234486-ntppzh9sh9j.webp",
    "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963234477-m18s6tq5xu8.webp",
    "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963234448-rudu9qtwp5.webp",
    "https://ybahnhnvdnelyxzzgdgn.supabase.co/storage/v1/object/public/track_record/track_record/1756963234448-y6nwc87fm8f.webp",
  ],
};


// 개별 케이스 카드 컴포넌트
const CaseCard = ({ caseItem, images }) => {
  const mainImage = images && images.length > 0 ? images[0] : null;
  const hasMultipleImages = images && images.length > 1;

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
            {images.slice(1, 5).map((img, idx) => (
              <div key={idx} className="case-card-thumb">
                <img src={img} alt={`${caseItem.title} ${idx + 2}`} />
              </div>
            ))}
            {images.length > 5 && (
              <div className="case-card-thumb case-card-thumb-more">
                <span>+{images.length - 5}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function CaseSmartSafetyPage() {
  const { t, currentLang } = useTranslation();
  const d = getCasesSmartSafetyData(currentLang);
  return (
    <BaseLayout
      header={() => <ProductHeader image={headerImage} alt="smart safety cases" />}
      breadcrumbs={[t('cases.breadcrumbs.0'), t('cases.breadcrumbs.1'), t('cases.smartSafety')]}
      title={t('cases.smartSafety')}
    >
      <div className="solution-page">
        {/* 히어로 섹션 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">{d.hero.badge}</div>
          <h1 className="sol-hero-title">
            {d.hero.title.split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
            ))}
          </h1>
          <p className="sol-hero-desc">{d.hero.desc}</p>
        </section>


        {/* 주요 수치 */}
        <section className="case-stats">
          {d.stats.map((stat, i) => (
            <div key={i} className="case-stat-item">
              <span className="case-stat-number">{stat.number}</span>
              <span className="case-stat-label">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* 납품 실적 목록 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">{d.sections.cases.label}</span>
            <h2 className="sol-section-title">{d.sections.cases.title}</h2>
          </div>
          <div className="case-grid">
            {d.cases.map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} images={CASE_IMAGES[caseItem.id] || []} />
            ))}
          </div>
        </section>

        {/* 기술 역량 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">{d.sections.capabilities.label}</span>
            <h2 className="sol-section-title">{d.sections.capabilities.title}</h2>
          </div>
          <div className="sol-architecture">
            <div className="sol-architecture-layers">
              {d.capabilities.map((cap, i) => (
                <div key={i} className="sol-architecture-layer">
                  <span className={`sol-layer-badge ${cap.badgeClass}`}>{cap.badge}</span>
                  <p>{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

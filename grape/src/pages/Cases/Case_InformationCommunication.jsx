import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import useTranslation from '../../hooks/useTranslation';
import headerImage from '../../assets/header_image/performance.jpg';
import '../Solutions/SolutionPage.css';
import './CaseSmartSafety.css';



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
  const CASES = t('casesPage.infoComm.cases');
  const STATS = t('casesPage.infoComm.stats');
  const CAPABILITIES = t('casesPage.infoComm.capabilities');
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
            {t('casesPage.infoComm.hero.title1')}<br />{t('casesPage.infoComm.hero.title2')}
          </h1>
          <p className="sol-hero-desc">
            {t('casesPage.infoComm.hero.desc')}
          </p>
        </section>

        {/* 주요 수치 */}
        <section className="case-stats">
          <div className="case-stat-item">
            <span className="case-stat-number">{STATS[0].number}</span>
            <span className="case-stat-label">{STATS[0].label}</span>
          </div>
          <div className="case-stat-item">
            <span className="case-stat-number">{STATS[1].number}</span>
            <span className="case-stat-label">{STATS[1].label}</span>
          </div>
          <div className="case-stat-item">
            <span className="case-stat-number">{STATS[2].number}</span>
            <span className="case-stat-label">{STATS[2].label}</span>
          </div>
          <div className="case-stat-item">
            <span className="case-stat-number">{STATS[3].number}</span>
            <span className="case-stat-label">{STATS[3].label}</span>
          </div>
        </section>

        {/* 납품 실적 목록 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Delivery Cases</span>
            <h2 className="sol-section-title">{t('casesPage.infoComm.sections.cases')}</h2>
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
            <h2 className="sol-section-title">{t('casesPage.infoComm.sections.businessAreas')}</h2>
          </div>
          <div className="sol-architecture">
            <div className="sol-architecture-layers">
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge edge">{CAPABILITIES[0].title}</span>
                <p>{CAPABILITIES[0].desc}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge comm">{CAPABILITIES[1].title}</span>
                <p>{CAPABILITIES[1].desc}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge cloud">{CAPABILITIES[2].title}</span>
                <p>{CAPABILITIES[2].desc}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge ctrl">{CAPABILITIES[3].title}</span>
                <p>{CAPABILITIES[3].desc}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import useTranslation from '../../hooks/useTranslation';
import headerImage from '../../assets/header_image/performance.jpg';
import '../Solutions/SolutionPage.css';
import './CaseSmartSafety.css';



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
  const HIGHLIGHT_CASES = t('casesPage.integrated.highlightCases');
  const YEARLY_CASES = t('casesPage.integrated.yearlyCases');
  const STATS = t('casesPage.integrated.stats');
  const CAPABILITIES = t('casesPage.integrated.capabilities');
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
            {t('casesPage.integrated.hero.title1')}<br />{t('casesPage.integrated.hero.title2')}
          </h1>
          <p className="sol-hero-desc">
            {t('casesPage.integrated.hero.desc')}
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

        {/* 하이라이트 프로젝트 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Featured Projects</span>
            <h2 className="sol-section-title">{t('casesPage.integrated.sections.featured')}</h2>
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
            <h2 className="sol-section-title">{t('casesPage.integrated.sections.yearly')}</h2>
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
            <h2 className="sol-section-title">{t('casesPage.integrated.sections.capabilities')}</h2>
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

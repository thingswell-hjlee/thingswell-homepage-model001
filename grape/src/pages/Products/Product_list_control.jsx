import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import useTranslation from '../../hooks/useTranslation';
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

export default function ProductListControlPage() {
  const { t } = useTranslation();

  // 핵심 제품 라인업
  const PRODUCTS = [
    { image: integratedControl, title: t('productsPage.control.products.0.title'), subtitle: "Integrated Controller", desc: t('productsPage.control.products.0.desc') },
    { image: remoteControl, title: t('productsPage.control.products.1.title'), subtitle: "Remote Management Platform", desc: t('productsPage.control.products.1.desc') },
    { image: touchPanel, title: t('productsPage.control.products.2.title'), subtitle: "Touch Panel Controller", desc: t('productsPage.control.products.2.desc') },
    { image: technology, title: t('productsPage.control.products.3.title'), subtitle: "Context-Aware Automation", desc: t('productsPage.control.products.3.desc') },
  ];

  // 적용 분야
  const DOMAINS = [
    { image: conference, title: t('productsPage.control.domains.0.title'), subtitle: "Conference Hall", items: t('productsPage.control.domains.0.items') },
    { image: smartBuilding, title: t('productsPage.control.domains.1.title'), subtitle: "Education Facility", items: t('productsPage.control.domains.1.items') },
    { image: buildingExterior, title: t('productsPage.control.domains.2.title'), subtitle: "Exhibition & Convention", items: t('productsPage.control.domains.2.items') },
  ];

  // 서비스 파이프라인
  const PIPELINE = [
    { image: automation, step: "01", title: t('productsPage.control.pipeline.0.title'), subtitle: "Site Analysis", items: t('productsPage.control.pipeline.0.items') },
    { image: integratedControl, step: "02", title: t('productsPage.control.pipeline.1.title'), subtitle: "System Integration", items: t('productsPage.control.pipeline.1.items') },
    { image: touchPanel, step: "03", title: t('productsPage.control.pipeline.2.title'), subtitle: "Automation Setup", items: t('productsPage.control.pipeline.2.items') },
    { image: remoteControl, step: "04", title: t('productsPage.control.pipeline.3.title'), subtitle: "Remote Operation", items: t('productsPage.control.pipeline.3.items') },
  ];

  return (
    <BaseLayout
      header={() => <ProductHeader image={headerImage} alt="control products" />}
      breadcrumbs={[t('products.breadcrumbs.0'), t('products.breadcrumbs.1'), t('products.control.breadcrumb')]}
      title={t('products.control.title')}
    >
      <div className="solution-page">
        {/* 히어로 섹션 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">Integrated Control Products</div>
          <h1 className="sol-hero-title">
            {t('productsPage.control.hero.title1')}<br />{t('productsPage.control.hero.title2')}
          </h1>
          <p className="sol-hero-desc">
            {t('productsPage.control.hero.desc')}
          </p>
        </section>

        {/* 핵심 제품 라인업 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Product Lineup</span>
            <h2 className="sol-section-title">{t('productsPage.control.sectionProductsTitle')}</h2>
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
            <h2 className="sol-section-title">{t('productsPage.control.sectionDomainsTitle')}</h2>
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
            <h2 className="sol-section-title">{t('productsPage.control.sectionPipelineTitle')}</h2>
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
            <h2 className="sol-section-title">{t('productsPage.control.sectionArchTitle')}</h2>
          </div>
          <div className="sol-architecture">
            <div className="sol-architecture-layers">
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge edge">DEVICE</span>
                <p>{t('productsPage.control.architecture.device')}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge comm">CONTROLLER</span>
                <p>{t('productsPage.control.architecture.controller')}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge cloud">CLOUD</span>
                <p>{t('productsPage.control.architecture.cloud')}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge ctrl">INTERFACE</span>
                <p>{t('productsPage.control.architecture.interface')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import useTranslation from '../../hooks/useTranslation';
import headerImage from '../../assets/header_image/product.jpg';
import '../Solutions/SolutionPage.css';

// 이미지 import
import aiCamera from '../../assets/products/safety/ai-camera.jpg';
import sensorNetwork from '../../assets/products/safety/sensor-network.jpg';
import smartBand from '../../assets/products/safety/smart-band.jpg';
import edgeAi from '../../assets/products/safety/edge-ai.jpg';
import industrialSafety from '../../assets/products/safety/industrial-safety.jpg';
import factoryWorker from '../../assets/products/safety/factory-worker.jpg';
import fireDetection from '../../assets/products/safety/fire-detection.jpg';
import circuitBoard from '../../assets/products/safety/circuit-board.jpg';

export default function ProductListSafetyPage() {
  const { t } = useTranslation();

  // 핵심 제품 라인업
  const PRODUCTS = [
    { image: aiCamera, title: t('productsPage.safety.products.0.title'), subtitle: "AI Safety Camera", desc: t('productsPage.safety.products.0.desc') },
    { image: smartBand, title: t('productsPage.safety.products.1.title'), subtitle: "Smart Safety Band", desc: t('productsPage.safety.products.1.desc') },
    { image: sensorNetwork, title: t('productsPage.safety.products.2.title'), subtitle: "Environmental Safety Sensor", desc: t('productsPage.safety.products.2.desc') },
    { image: fireDetection, title: t('productsPage.safety.products.3.title'), subtitle: "Fire Detection System", desc: t('productsPage.safety.products.3.desc') },
  ];

  // 적용 분야
  const DOMAINS = [
    { image: industrialSafety, title: t('productsPage.safety.domains.0.title'), subtitle: "Manufacturing Site", items: t('productsPage.safety.domains.0.items') },
    { image: factoryWorker, title: t('productsPage.safety.domains.1.title'), subtitle: "Construction Site", items: t('productsPage.safety.domains.1.items') },
    { image: edgeAi, title: t('productsPage.safety.domains.2.title'), subtitle: "Welfare Facility", items: t('productsPage.safety.domains.2.items') },
  ];

  // 기술 파이프라인
  const PIPELINE = [
    { image: sensorNetwork, step: "01", title: t('productsPage.safety.pipeline.0.title'), subtitle: "Data Collection", items: t('productsPage.safety.pipeline.0.items') },
    { image: edgeAi, step: "02", title: t('productsPage.safety.pipeline.1.title'), subtitle: "Edge AI Analysis", items: t('productsPage.safety.pipeline.1.items') },
    { image: fireDetection, step: "03", title: t('productsPage.safety.pipeline.2.title'), subtitle: "Alert & Response", items: t('productsPage.safety.pipeline.2.items') },
    { image: circuitBoard, step: "04", title: t('productsPage.safety.pipeline.3.title'), subtitle: "Cloud Integration", items: t('productsPage.safety.pipeline.3.items') },
  ];

  return (
    <BaseLayout
      header={() => <ProductHeader image={headerImage} alt="safety products" />}
      breadcrumbs={[t('products.breadcrumbs.0'), t('products.breadcrumbs.1'), t('products.safety.breadcrumb')]}
      title={t('products.safety.title')}
    >
      <div className="solution-page">
        {/* 히어로 섹션 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">Smart Safety Products</div>
          <h1 className="sol-hero-title">
            {t('productsPage.safety.hero.title1')}<br />{t('productsPage.safety.hero.title2')}
          </h1>
          <p className="sol-hero-desc">
            {t('productsPage.safety.hero.desc')}
          </p>
        </section>

        {/* 핵심 제품 라인업 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Product Lineup</span>
            <h2 className="sol-section-title">{t('productsPage.safety.sectionProductsTitle')}</h2>
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
            <h2 className="sol-section-title">{t('productsPage.safety.sectionDomainsTitle')}</h2>
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

        {/* 기술 파이프라인 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Technology Pipeline</span>
            <h2 className="sol-section-title">{t('productsPage.safety.sectionPipelineTitle')}</h2>
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
            <h2 className="sol-section-title">{t('productsPage.safety.sectionArchTitle')}</h2>
          </div>
          <div className="sol-architecture">
            <div className="sol-architecture-layers">
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge edge">EDGE</span>
                <p>{t('productsPage.safety.architecture.edge')}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge comm">NETWORK</span>
                <p>{t('productsPage.safety.architecture.network')}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge cloud">CLOUD</span>
                <p>{t('productsPage.safety.architecture.cloud')}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge ctrl">CONTROL</span>
                <p>{t('productsPage.safety.architecture.control')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

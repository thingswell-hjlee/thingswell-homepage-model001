import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import useTranslation from '../../hooks/useTranslation';
import headerImage from '../../assets/header_image/product.jpg';
import '../Solutions/SolutionPage.css';

// 이미지 import
import dashboard from '../../assets/products/monitoring/dashboard.jpg';
import serverRoom from '../../assets/products/monitoring/server-room.jpg';
import dataCenter from '../../assets/products/monitoring/data-center.jpg';
import monitoringScreen from '../../assets/products/monitoring/monitoring-screen.jpg';
import analytics from '../../assets/products/monitoring/analytics.jpg';
import environmentalSensor from '../../assets/products/monitoring/environmental-sensor.jpg';
import network from '../../assets/products/monitoring/network.jpg';
import iotDevice from '../../assets/products/monitoring/iot-device.jpg';

export default function ProductListMonitoringPage() {
  const { t } = useTranslation();

  // 핵심 제품 라인업
  const PRODUCTS = [
    { image: environmentalSensor, title: t('productsPage.monitoring.products.0.title'), subtitle: "Multi-Environment Sensor", desc: t('productsPage.monitoring.products.0.desc') },
    { image: monitoringScreen, title: t('productsPage.monitoring.products.1.title'), subtitle: "Integrated Monitoring Platform", desc: t('productsPage.monitoring.products.1.desc') },
    { image: iotDevice, title: t('productsPage.monitoring.products.2.title'), subtitle: "IoT Gateway", desc: t('productsPage.monitoring.products.2.desc') },
    { image: analytics, title: t('productsPage.monitoring.products.3.title'), subtitle: "Data Analytics Engine", desc: t('productsPage.monitoring.products.3.desc') },
  ];

  // 적용 분야
  const DOMAINS = [
    { image: serverRoom, title: t('productsPage.monitoring.domains.0.title'), subtitle: "Data Center", items: t('productsPage.monitoring.domains.0.items') },
    { image: dataCenter, title: t('productsPage.monitoring.domains.1.title'), subtitle: "Smart Building", items: t('productsPage.monitoring.domains.1.items') },
    { image: dashboard, title: t('productsPage.monitoring.domains.2.title'), subtitle: "Industrial Site", items: t('productsPage.monitoring.domains.2.items') },
  ];

  // 서비스 파이프라인
  const PIPELINE = [
    { image: environmentalSensor, step: "01", title: t('productsPage.monitoring.pipeline.0.title'), subtitle: "Sensor Deployment", items: t('productsPage.monitoring.pipeline.0.items') },
    { image: network, step: "02", title: t('productsPage.monitoring.pipeline.1.title'), subtitle: "Data Collection", items: t('productsPage.monitoring.pipeline.1.items') },
    { image: analytics, step: "03", title: t('productsPage.monitoring.pipeline.2.title'), subtitle: "Analysis & Decision", items: t('productsPage.monitoring.pipeline.2.items') },
    { image: monitoringScreen, step: "04", title: t('productsPage.monitoring.pipeline.3.title'), subtitle: "Monitoring & Response", items: t('productsPage.monitoring.pipeline.3.items') },
  ];

  return (
    <BaseLayout
      header={() => <ProductHeader image={headerImage} alt="monitoring products" />}
      breadcrumbs={[t('products.breadcrumbs.0'), t('products.breadcrumbs.1'), t('products.monitoring.breadcrumb')]}
      title={t('products.monitoring.title')}
    >
      <div className="solution-page">
        {/* 히어로 섹션 */}
        <section className="sol-hero">
          <div className="sol-hero-badge">Monitoring & Control System</div>
          <h1 className="sol-hero-title">
            {t('productsPage.monitoring.hero.title1')}<br />{t('productsPage.monitoring.hero.title2')}
          </h1>
          <p className="sol-hero-desc">
            {t('productsPage.monitoring.hero.desc')}
          </p>
        </section>

        {/* 핵심 제품 라인업 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">Product Lineup</span>
            <h2 className="sol-section-title">{t('productsPage.monitoring.sectionProductsTitle')}</h2>
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
            <h2 className="sol-section-title">{t('productsPage.monitoring.sectionDomainsTitle')}</h2>
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
            <h2 className="sol-section-title">{t('productsPage.monitoring.sectionPipelineTitle')}</h2>
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
            <h2 className="sol-section-title">{t('productsPage.monitoring.sectionArchTitle')}</h2>
          </div>
          <div className="sol-architecture">
            <div className="sol-architecture-layers">
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge edge">SENSOR</span>
                <p>{t('productsPage.monitoring.architecture.sensor')}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge comm">GATEWAY</span>
                <p>{t('productsPage.monitoring.architecture.gateway')}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge cloud">PLATFORM</span>
                <p>{t('productsPage.monitoring.architecture.platform')}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge ctrl">DASHBOARD</span>
                <p>{t('productsPage.monitoring.architecture.dashboard')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

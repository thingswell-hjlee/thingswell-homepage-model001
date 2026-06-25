import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import useTranslation from '../../hooks/useTranslation';
import { getProductsSafetyData } from '../../data/i18n/productsSafety';
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

const PRODUCT_IMAGES = [aiCamera, smartBand, sensorNetwork, fireDetection];
const DOMAIN_IMAGES = [industrialSafety, factoryWorker, edgeAi];
const PIPELINE_IMAGES = [sensorNetwork, edgeAi, fireDetection, circuitBoard];

export default function ProductListSafetyPage() {
  const { t, currentLang } = useTranslation();
  const d = getProductsSafetyData(currentLang);
  return (
    <BaseLayout
      header={() => <ProductHeader image={headerImage} alt="safety products" />}
      breadcrumbs={[t('products.breadcrumbs.0'), t('products.breadcrumbs.1'), t('products.safety.breadcrumb')]}
      title={t('products.safety.title')}
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

        {/* 핵심 제품 라인업 */}
        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">{d.sections.productLineup.label}</span>
            <h2 className="sol-section-title">{d.sections.productLineup.title}</h2>
          </div>

          <div className="sol-tech-grid">
            {d.products.map((product, i) => (
              <div key={i} className="sol-tech-card">
                <div className="sol-tech-card-img">
                  <img src={PRODUCT_IMAGES[i]} alt={product.title} />
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
            <span className="sol-section-label">{d.sections.applicationAreas.label}</span>
            <h2 className="sol-section-title">{d.sections.applicationAreas.title}</h2>
          </div>
          <div className="sol-domain-grid">
            {d.domains.map((domain, i) => (
              <div key={i} className="sol-domain-card">
                <div className="sol-domain-card-img">
                  <img src={DOMAIN_IMAGES[i]} alt={domain.title} />
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
            <span className="sol-section-label">{d.sections.pipeline.label}</span>
            <h2 className="sol-section-title">{d.sections.pipeline.title}</h2>
          </div>
          <div className="sol-pipeline-grid">
            {d.pipeline.map((step, i) => (
              <div key={i} className="sol-pipeline-card">
                <div className="sol-pipeline-card-img">
                  <img src={PIPELINE_IMAGES[i]} alt={step.title} />
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
            <span className="sol-section-label">{d.sections.architecture.label}</span>
            <h2 className="sol-section-title">{d.sections.architecture.title}</h2>
          </div>
          <div className="sol-architecture">
            <div className="sol-architecture-layers">
              {d.architecture.map((layer, i) => (
                <div key={i} className="sol-architecture-layer">
                  <span className={`sol-layer-badge ${layer.badgeClass}`}>{layer.badge}</span>
                  <p>{layer.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

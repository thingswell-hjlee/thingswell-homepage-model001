import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import solutionHeader from '../../assets/header_image/Solution.jpg';
import main from '../../assets/solution_1/main.png';
import useTranslation from '../../hooks/useTranslation';
import './SolutionPage.css';

import edgeComputing from '../../assets/solutions/edge-computing.jpg';
import cloudInfra from '../../assets/solutions/cloud-infra.jpg';
import sensorFusion from '../../assets/solutions/sensor-fusion.jpg';
import digitalTwin from '../../assets/solutions/digital-twin.jpg';
import industrialSafety from '../../assets/solutions/industrial-safety.jpg';
import constructionSafety from '../../assets/solutions/construction-safety.jpg';
import publicSafety from '../../assets/solutions/public-safety.jpg';
import dataCollection from '../../assets/solutions/data-collection.jpg';
import aiInference from '../../assets/solutions/ai-inference.jpg';
import cloudSync from '../../assets/solutions/cloud-sync.jpg';
import commandCenter from '../../assets/solutions/command-center.jpg';

const techImages = [edgeComputing, cloudInfra, sensorFusion, digitalTwin];
const domainImages = [industrialSafety, constructionSafety, publicSafety];
const pipelineImages = [dataCollection, aiInference, cloudSync, commandCenter];

const Soulution = () => {
  const { t } = useTranslation();
  const sol = 'solutions.industrial';

  const BREADCRUMBS = [t('solutions.breadcrumbs.0'), t('solutions.breadcrumbs.1'), t(`${sol}.breadcrumb`)];
  const TECH_STACK = (t(`${sol}.techStack`) || []).map((item, i) => ({ ...item, image: techImages[i] }));
  const DOMAINS = (t(`${sol}.domains`) || []).map((item, i) => ({ ...item, image: domainImages[i] }));
  const PIPELINE = (t(`${sol}.pipeline`) || []).map((item, i) => ({ ...item, image: pipelineImages[i] }));

  return (
    <BaseLayout
      header={() => <ProductHeader image={solutionHeader} alt="solution" />}
      breadcrumbs={BREADCRUMBS}
      title={t(`${sol}.title`)}
    >
      <div className="solution-page">
        <section className="sol-hero">
          <div className="sol-hero-badge">{t(`${sol}.badge`)}</div>
          <h1 className="sol-hero-title">{t(`${sol}.heroTitle`)}</h1>
          <p className="sol-hero-desc">{t(`${sol}.heroDesc`)}</p>
        </section>

        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">{t(`${sol}.coreTechLabel`)}</span>
            <h2 className="sol-section-title">{t(`${sol}.coreTechTitle`)}</h2>
          </div>
          <div className="sol-tech-grid">
            {TECH_STACK.map((tech, i) => (
              <div key={i} className="sol-tech-card">
                <div className="sol-tech-card-img">
                  <img src={tech.image} alt={tech.title} />
                  <div className="sol-tech-card-overlay" />
                </div>
                <div className="sol-tech-card-body">
                  <span className="sol-tech-card-subtitle">{tech.subtitle}</span>
                  <h3 className="sol-tech-card-title">{tech.title}</h3>
                  <p className="sol-tech-card-desc">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">{t(`${sol}.applicationLabel`)}</span>
            <h2 className="sol-section-title">{t(`${sol}.applicationTitle`)}</h2>
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
                  {(domain.items || []).map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">{t(`${sol}.pipelineLabel`)}</span>
            <h2 className="sol-section-title">{t(`${sol}.pipelineTitle`)}</h2>
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
                    {(step.items || []).map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sol-section">
          <div className="sol-section-header">
            <span className="sol-section-label">{t(`${sol}.architectureLabel`)}</span>
            <h2 className="sol-section-title">{t(`${sol}.architectureTitle`)}</h2>
          </div>
          <div className="sol-architecture">
            <img src={main} alt="SafeGAI Platform Architecture" className="sol-architecture-img" />
            <div className="sol-architecture-layers">
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge edge">Edge</span>
                <p>{t(`${sol}.archEdge`)}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge comm">Comm</span>
                <p>{t(`${sol}.archComm`)}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge cloud">Cloud</span>
                <p>{t(`${sol}.archCloud`)}</p>
              </div>
              <div className="sol-architecture-layer">
                <span className="sol-layer-badge ctrl">Control</span>
                <p>{t(`${sol}.archControl`)}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
};

export default Soulution;

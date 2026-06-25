import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import rndHeader from '../../assets/header_image/rnd.jpg';
import './Rnd.css';
import air from '../../assets/rnd_main/AI_air.png';
import { BaseLayout } from '../../components/Layout';
import useTranslation from '../../hooks/useTranslation';
import { getRndAirQualityData } from '../../data/i18n/rndAirQuality';

const AirQualityManagement = () => {
  const { t, currentLang } = useTranslation();
  const d = getRndAirQualityData(currentLang);
  return (
    <BaseLayout
      header={() => <ProductHeader image={rndHeader} />}
      breadcrumbs={[t('rnd.breadcrumbs.0'), t('rnd.breadcrumbs.1'), t('rnd.airQuality.breadcrumb')]}
      title={t('rnd.airQuality.title')}
      subtitle={t('rnd.airQuality.subtitle')}
    >
      <div className="product-page-content">
        <div className="container">
          <div className="rnd-feature-cards-section">
            <div className="rnd-feature-description-container">
              <div className="rnd-feature-description-image-section">
                <img src={air} alt="feature" className="rnd-feature-description-image" />
              </div>
              <div className="rnd-feature-description-text-section">
                <h2 className="rnd-feature-description-subtitle">{d.card.subtitle}</h2>
                <div className="rnd-feature-description-list">
                  {d.card.description.map((item, idx) => (
                    <p key={idx} className="rnd-feature-description-list-item">{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gs-container">
          <section className="gs-section">
            <h3><span className="num">1</span> {d.sections.concept}</h3>
            {d.concept.map((para, idx) => (
              <p key={idx} className="gs-text">{para}</p>
            ))}
          </section>

          <section className="gs-section">
            <h3><span className="num">2</span> {d.sections.features}</h3>
            {d.features.map((feature, idx) => (
              <div key={idx} className="gs-subsection">
                <h4>{feature.title}</h4>
                <p className="gs-text">{feature.desc}</p>
              </div>
            ))}
          </section>

          <section className="gs-section">
            <h3><span className="num">3</span> {d.sections.system}</h3>
            <p className="gs-text">{d.systemIntro}</p>

            <div className="gs-subsection">
              <h4>{d.devProcess.title}</h4>
              <ul className="gs-list">
                {d.devProcess.items.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.strong}</strong>{item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="gs-subsection">
              <h4>{d.systemProcess.title}</h4>
              <ol className="gs-list">
                {d.systemProcess.items.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.strong}</strong>{item.text}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="gs-section">
            <h3><span className="num">4</span> {d.sections.applications}</h3>
            <p className="gs-text">{d.applicationsIntro}</p>

            <div className="gs-subsection">
              <h4>{d.targetTitle}</h4>
              <p className="gs-text">{d.targetDesc}</p>
            </div>

            <div className="gs-subsection">
              <h4>{d.effectsTitle}</h4>
              <ul className="gs-list">
                {d.effects.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.strong}</strong>{item.text}
                  </li>
                ))}
              </ul>
            </div>

            <p className="gs-text">{d.conclusion}</p>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default AirQualityManagement;

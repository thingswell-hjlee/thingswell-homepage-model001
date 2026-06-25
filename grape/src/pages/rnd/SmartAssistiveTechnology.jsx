import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import rndHeader from '../../assets/header_image/rnd.jpg';
import './Rnd.css';
import old from '../../assets/rnd_main/old.png';
import { BaseLayout } from '../../components/Layout';
import useTranslation from '../../hooks/useTranslation';
import { getRndSmartAssistiveData } from '../../data/i18n/rndSmartAssistive';

const SmartAssistiveTechnology = () => {
  const { t, currentLang } = useTranslation();
  const d = getRndSmartAssistiveData(currentLang);
  return (
    <BaseLayout
      header={() => <ProductHeader image={rndHeader} />}
      breadcrumbs={[t('rnd.breadcrumbs.0'), t('rnd.breadcrumbs.1'), t('rnd.assistive.breadcrumb')]}
      title={t('rnd.assistive.title')}
      subtitle={t('rnd.assistive.subtitle')}
    >
      <div className="product-page-content">
        <div className="container">
          <div className="rnd-feature-cards-section">
            <div className="rnd-feature-description-container">
              <div className="rnd-feature-description-image-section">
                <img src={old} alt="feature" className="rnd-feature-description-image" />
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
            <h3><span className="num">1</span> {d.sections.techOverview}</h3>
            <p className="gs-text">{d.techOverview}</p>
          </section>

          <section className="gs-section">
            <h3><span className="num">2</span> {d.sections.necessity}</h3>
            <p className="gs-text">{d.necessity}</p>
          </section>

          <section className="gs-section">
            <h3><span className="num">3</span> {d.sections.coreTech}</h3>
            <p className="gs-text">{d.coreTechIntro}</p>

            <div className="gs-subsection">
              <h4>{d.pocTitle}</h4>
              <ul className="gs-list">
                {d.pocItems.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.strong}</strong>{item.text}
                  </li>
                ))}
              </ul>
              <p className="gs-text">{d.pocDesc}</p>
            </div>

            {d.coreElements.map((section, idx) => (
              <div key={idx} className="gs-subsection">
                <h4>{section.title}</h4>
                <ul className="gs-list">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <strong>{item.strong}</strong>{item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="gs-section">
            <h3><span className="num">4</span> {d.sections.benefits}</h3>
            <ul className="gs-list">
              {d.benefits.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.strong}</strong>{item.text}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default SmartAssistiveTechnology;

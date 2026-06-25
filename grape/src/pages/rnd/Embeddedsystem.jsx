import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import rndHeader from '../../assets/header_image/rnd.jpg';
import './Rnd.css';
import danger from '../../assets/rnd_main/danger.png';
import { BaseLayout } from '../../components/Layout';
import useTranslation from '../../hooks/useTranslation';
import { getRndEmbeddedSystemData } from '../../data/i18n/rndEmbeddedSystem';

const Embeddedsystem = () => {
  const { t, currentLang } = useTranslation();
  const d = getRndEmbeddedSystemData(currentLang);
  return (
    <BaseLayout
      header={() => <ProductHeader image={rndHeader} />}
      breadcrumbs={[t('rnd.breadcrumbs.0'), t('rnd.breadcrumbs.1'), t('rnd.embedded.breadcrumb')]}
      title={t('rnd.embedded.title')}
      subtitle={t('rnd.embedded.subtitle')}
    >
      <div className="product-page-content">
        <div className="container">
          <div className="rnd-feature-cards-section">
            <div className="rnd-feature-description-container">
              <div className="rnd-feature-description-image-section">
                <img src={danger} alt="feature" className="rnd-feature-description-image" />
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
            <h3><span className="num">1</span> {d.sections.intro}</h3>
            <p className="gs-text">{d.intro}</p>
          </section>

          <section className="gs-section">
            <h3><span className="num">2</span> {d.sections.coreTech}</h3>
            {d.techSubsections.map((sub, idx) => (
              <div key={idx} className="gs-subsection">
                <h4>{sub.title}</h4>
                <ul className="gs-list">
                  {sub.items.map((item, i) => (
                    <li key={i}>
                      <strong>{item.strong}</strong>{item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="gs-section">
            <h3><span className="num">3</span> {d.sections.value}</h3>
            <ul className="gs-list">
              {d.valueItems.map((item, idx) => (
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

export default Embeddedsystem;

import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import rndHeader from '../../assets/header_image/rnd.jpg';
import './Rnd.css';
import multimodal from '../../assets/rnd_main/multimodal.png';
import { BaseLayout } from '../../components/Layout';
import useTranslation from '../../hooks/useTranslation';
import { getRndMultimodalData } from '../../data/i18n/rndMultimodal';

const MultimodalAwareness = () => {
  const { t, currentLang } = useTranslation();
  const d = getRndMultimodalData(currentLang);
  return (
    <BaseLayout
      header={() => <ProductHeader image={rndHeader} />}
      breadcrumbs={[t('rnd.breadcrumbs.0'), t('rnd.breadcrumbs.1'), t('rnd.multimodal.breadcrumb')]}
      title={t('rnd.multimodal.title')}
      subtitle={t('rnd.multimodal.subtitle')}
    >
      <div className="product-page-content">
        <div className="container">
          <div className="rnd-feature-cards-section">
            <div className="rnd-feature-description-container">
              <div className="rnd-feature-description-image-section">
                <img src={multimodal} alt="feature" className="rnd-feature-description-image" />
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
            <h3><span className="num">1</span> {d.sections.overview}</h3>
            <p className="gs-text">{d.overview}</p>
          </section>

          <section className="gs-section">
            <h3><span className="num">2</span> {d.sections.techComponents}</h3>
            <div className="gs-table-wrapper">
              <table className="gs-table">
                <thead>
                  <tr>
                    <th className="col-type">{d.techTable.headers[0]}</th>
                    <th>{d.techTable.headers[1]}</th>
                    <th>{d.techTable.headers[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.techTable.rows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="col-type">{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="gs-section">
            <h3><span className="num">3</span> {d.sections.services}</h3>
            <ul className="gs-list">
              {d.services.map((svc, idx) => (
                <li key={idx}>
                  <strong>{svc.title}</strong> — {svc.desc}
                </li>
              ))}
            </ul>
          </section>

          <section className="gs-section">
            <h3><span className="num">4</span> {d.sections.differentiation}</h3>
            <div className="gs-table-wrapper">
              <table className="gs-table">
                <thead>
                  <tr>
                    <th className="col-type">{d.diffTable.headers[0]}</th>
                    <th>{d.diffTable.headers[1]}</th>
                    <th>{d.diffTable.headers[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.diffTable.rows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="col-type">{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default MultimodalAwareness;

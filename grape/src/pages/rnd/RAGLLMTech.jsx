import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import rndHeader from '../../assets/header_image/rnd.jpg';
import './Rnd.css';
import rag from '../../assets/rnd_main/RAG_LLM.png';
import { BaseLayout } from '../../components/Layout';
import useTranslation from '../../hooks/useTranslation';
// Breadcrumbs는 BaseLayout이 렌더링하므로 여기서는 배열만 전달합니다.

const RAGLLMTech = () => {
  const { t } = useTranslation();
  const RAG_CARDS = [
    {
      image: rag,
      subtitle: t('rndPage.ragLlm.cards.0.subtitle'),
      description: t('rndPage.ragLlm.cards.0.description'),
    }
  ];
  return (
    <BaseLayout
      header={() => <ProductHeader image={rndHeader} />}
      breadcrumbs={[t('rnd.breadcrumbs.0'), t('rnd.breadcrumbs.1'), t('rnd.ragLlm.breadcrumb')]}
      title={t('rnd.ragLlm.title')}
      subtitle={t('rnd.ragLlm.subtitle')}
    >
      <div className="product-page-content">
        {/* RND 전용 FeatureDescription 카드 섹션 */}
        <div className="container">
          <div className="rnd-feature-cards-section">
            {RAG_CARDS.map((card, index) => (
              <div key={index} className="rnd-feature-description-container">
                <div className="rnd-feature-description-image-section">
                  <img src={card.image} alt="feature" className="rnd-feature-description-image" />
                </div>
                <div className="rnd-feature-description-text-section">
                  {card.subtitle && (
                    <h2 className="rnd-feature-description-subtitle">{card.subtitle}</h2>
                  )}
                  <div className="rnd-feature-description-list">
                    {card.description.map((item, idx) => (
                      <p key={idx} className="rnd-feature-description-list-item">{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gs-container">
          <section className="gs-section">
            <h3><span className="num">1</span> {t('rndPage.ragLlm.s1.heading')}</h3>
            <p className="gs-text">
              {t('rndPage.ragLlm.s1.text')}
            </p>
          </section>

          <section className="gs-section">
            <h3><span className="num">2</span> {t('rndPage.ragLlm.s2.heading')}</h3>
            <div className="gs-table-wrapper">
              <table className="gs-table">
                <thead>
                  <tr>
                    <th className="col-type">{t('rndPage.ragLlm.s2.headers.0')}</th>
                    <th>{t('rndPage.ragLlm.s2.headers.1')}</th>
                    <th>{t('rndPage.ragLlm.s2.headers.2')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="col-type">LLM (Large Language Model)</td>
                    <td>{t('rndPage.ragLlm.s2.rows.0.1')}</td>
                    <td>{t('rndPage.ragLlm.s2.rows.0.2')}</td>
                  </tr>
                  <tr>
                    <td className="col-type">RAG (Retrieve-Augment-Generate)</td>
                    <td>{t('rndPage.ragLlm.s2.rows.1.1')}</td>
                    <td>{t('rndPage.ragLlm.s2.rows.1.2')}</td>
                  </tr>
                  <tr>
                    <td className="col-type">{t('rndPage.ragLlm.s2.rows.2.0')}</td>
                    <td>{t('rndPage.ragLlm.s2.rows.2.1')}</td>
                    <td>{t('rndPage.ragLlm.s2.rows.2.2')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="gs-section">
            <h3><span className="num">3</span> {t('rndPage.ragLlm.s3.heading')}</h3>
            <ul className="gs-list">
              <li>
                <strong>{t('rndPage.ragLlm.s3.items.0.term')}</strong> {t('rndPage.ragLlm.s3.items.0.desc')}
              </li>
              <li>
                <strong>{t('rndPage.ragLlm.s3.items.1.term')}</strong> {t('rndPage.ragLlm.s3.items.1.desc')}
              </li>
              <li>
                <strong>{t('rndPage.ragLlm.s3.items.2.term')}</strong> {t('rndPage.ragLlm.s3.items.2.desc')}
              </li>
              <li>
                <strong>{t('rndPage.ragLlm.s3.items.3.term')}</strong> {t('rndPage.ragLlm.s3.items.3.desc')}
              </li>
            </ul>
          </section>

          <section className="gs-section">
            <h3><span className="num">4</span> {t('rndPage.ragLlm.s4.heading')}</h3>
            <div className="gs-table-wrapper">
              <table className="gs-table">
                <thead>
                  <tr>
                    <th className="col-type">{t('rndPage.ragLlm.s4.headers.0')}</th>
                    <th>{t('rndPage.ragLlm.s4.headers.1')}</th>
                    <th>{t('rndPage.ragLlm.s4.headers.2')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="col-type">{t('rndPage.ragLlm.s4.rows.0.0')}</td>
                    <td>{t('rndPage.ragLlm.s4.rows.0.1')}</td>
                    <td>{t('rndPage.ragLlm.s4.rows.0.2')}</td>
                  </tr>
                  <tr>
                    <td className="col-type">{t('rndPage.ragLlm.s4.rows.1.0')}</td>
                    <td>{t('rndPage.ragLlm.s4.rows.1.1')}</td>
                    <td>{t('rndPage.ragLlm.s4.rows.1.2')}</td>
                  </tr>
                  <tr>
                    <td className="col-type">{t('rndPage.ragLlm.s4.rows.2.0')}</td>
                    <td>{t('rndPage.ragLlm.s4.rows.2.1')}</td>
                    <td>{t('rndPage.ragLlm.s4.rows.2.2')}</td>
                  </tr>
                  <tr>
                    <td className="col-type">{t('rndPage.ragLlm.s4.rows.3.0')}</td>
                    <td>{t('rndPage.ragLlm.s4.rows.3.1')}</td>
                    <td>{t('rndPage.ragLlm.s4.rows.3.2')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="gs-section">
            <h3><span className="num">5</span> {t('rndPage.ragLlm.s5.heading')}</h3>
            <ul className="gs-list">
              <li>{t('rndPage.ragLlm.s5.items.0')}</li>
              <li>{t('rndPage.ragLlm.s5.items.1')}</li>
              <li>{t('rndPage.ragLlm.s5.items.2')}</li>
              <li>{t('rndPage.ragLlm.s5.items.3')}</li>
            </ul>
          </section>

          <section className="gs-section">
            <h3><span className="num">6</span> {t('rndPage.ragLlm.s6.heading')}</h3>
            <ul className="gs-list">
              <li>{t('rndPage.ragLlm.s6.items.0')}</li>
              <li>{t('rndPage.ragLlm.s6.items.1')}</li>
              <li>{t('rndPage.ragLlm.s6.items.2')}</li>
              <li>{t('rndPage.ragLlm.s6.items.3')}</li>
              <li>{t('rndPage.ragLlm.s6.items.4')}</li>
            </ul>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default RAGLLMTech;



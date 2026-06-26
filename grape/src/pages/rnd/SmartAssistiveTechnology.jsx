import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import rndHeader from '../../assets/header_image/rnd.jpg';
import './Rnd.css';
import old from '../../assets/rnd_main/old.png';
import { BaseLayout } from '../../components/Layout';
import useTranslation from '../../hooks/useTranslation';
// Breadcrumbs는 BaseLayout이 렌더링하므로 여기서는 배열만 전달합니다.

const SmartAssistiveTechnology = () => {
  const { t } = useTranslation();
  const WORKER_SAFETY_CARDS = [
    {
      image: old,
      subtitle: t('rndPage.assistive.cards.0.subtitle'),
      description: t('rndPage.assistive.cards.0.description'),
    }
  ];
  return (
    <BaseLayout
      header={() => <ProductHeader image={rndHeader} />}
      breadcrumbs={[t('rnd.breadcrumbs.0'), t('rnd.breadcrumbs.1'), t('rnd.assistive.breadcrumb')]}
      title={t('rnd.assistive.title')}
      subtitle={t('rnd.assistive.subtitle')}
    >
      <div className="product-page-content">
        {/* RND 전용 FeatureDescription 카드 섹션 */}
        <div className="container">
          <div className="rnd-feature-cards-section">
            {WORKER_SAFETY_CARDS.map((card, index) => (
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
            <h3><span className="num">1</span> {t('rndPage.assistive.s1.heading')}</h3>
            <p className="gs-text">
              {t('rndPage.assistive.s1.text')}
            </p>
          </section>

          <section className="gs-section">
            <h3><span className="num">2</span> {t('rndPage.assistive.s2.heading')}</h3>
            <p className="gs-text">
              {t('rndPage.assistive.s2.text')}
            </p>
          </section>

          <section className="gs-section">
            <h3><span className="num">3</span> {t('rndPage.assistive.s3.heading')}</h3>
            <p className="gs-text">
              {t('rndPage.assistive.s3.p1a')}<strong>{t('rndPage.assistive.s3.p1strong')}</strong>{t('rndPage.assistive.s3.p1b')}
            </p>

            <div className="gs-subsection">
              <h4>{t('rndPage.assistive.s3.sub1.heading')}</h4>
              <ul className="gs-list">
                <li>
                  <strong>{t('rndPage.assistive.s3.sub1.items.0.term')}</strong> {t('rndPage.assistive.s3.sub1.items.0.desc')}
                </li>
                <li>
                  <strong>{t('rndPage.assistive.s3.sub1.items.1.term')}</strong> {t('rndPage.assistive.s3.sub1.items.1.desc')}
                </li>
              </ul>
              <p className="gs-text">
                {t('rndPage.assistive.s3.sub1.text')}
              </p>
            </div>

            <div className="gs-subsection">
              <h4>{t('rndPage.assistive.s3.sub2.heading')}</h4>
              <ul className="gs-list">
                <li>
                  <strong>{t('rndPage.assistive.s3.sub2.items.0.term')}</strong> {t('rndPage.assistive.s3.sub2.items.0.desc')}
                </li>
                <li>
                  <strong>{t('rndPage.assistive.s3.sub2.items.1.term')}</strong> {t('rndPage.assistive.s3.sub2.items.1.desc')}
                </li>
              </ul>
            </div>
          </section>

          <section className="gs-section">
            <h3><span className="num">4</span> {t('rndPage.assistive.s4.heading')}</h3>
            <ul className="gs-list">
              <li>
                <strong>{t('rndPage.assistive.s4.items.0.term')}</strong> {t('rndPage.assistive.s4.items.0.desc')}
              </li>
              <li>
                <strong>{t('rndPage.assistive.s4.items.1.term')}</strong> {t('rndPage.assistive.s4.items.1.desc')}
              </li>
              <li>
                <strong>{t('rndPage.assistive.s4.items.2.term')}</strong> {t('rndPage.assistive.s4.items.2.desc')}
              </li>
              <li>
                <strong>{t('rndPage.assistive.s4.items.3.term')}</strong> {t('rndPage.assistive.s4.items.3.desc')}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default SmartAssistiveTechnology;

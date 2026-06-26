import React from 'react';
import { Link } from 'react-router-dom';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import useTranslation from '../../hooks/useTranslation';
import './Government_support.css';
import ProductInfo from '../../components/ProductPage/ProductInfo';
import government from '../../assets/header_image/government_support.png';
import BaseLayout from '../../components/Layout/BaseLayout';

const Government_support = () => {
  const { t, currentLang } = useTranslation();
  return (
    <div className="gs-page">
      <ProductHeader image={government} alt="government" />
      <BaseLayout>
        <div className="container">
          <ProductInfo productName={t('governmentSupport.title')} productTitle={t('governmentSupport.title')} breadcrumbs={[t('governmentSupport.breadcrumbs.0'), t('governmentSupport.breadcrumbs.1'), t('governmentSupport.breadcrumbs.2')]} />
        </div>
        <div className="gs-container">
          <section className="gs-section">
            <h3><span className="num">1</span> {t('ui1.government.overviewTitle')}</h3>
            <p className="gs-text">
              {t('ui1.government.overviewText')}
            </p>
          </section>

          <section className="gs-section">
            <h3><span className="num">2</span> {t('ui1.government.targetTitle')}</h3>
            <ul className="gs-list">
              <li>{t('ui1.government.target1')}</li>
              <li>{t('ui1.government.target2')}</li>
              <li>{t('ui1.government.target3')}</li>
            </ul>
          </section>

          <section className="gs-section">
            <h3><span className="num">3</span> {t('ui1.government.conditionTitle')}</h3>
            <ul className="gs-list">
              <li>{t('ui1.government.condition1')}</li>
              <li>{t('ui1.government.condition2')}</li>
              <li>{t('ui1.government.condition3')}</li>
            </ul>
          </section>

          <section className="gs-section">
            <h3><span className="num">4</span> {t('ui1.government.itemsTitle')}</h3>
            <div className="gs-table-wrapper">
              <table className="gs-table">
                <thead>
                  <tr>
                    <th className="col-type">{t('ui1.government.colType')}</th>
                    <th>{t('ui1.government.colItem')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="col-type">{t('ui1.government.safetyType')}</td>
                    <td>
                      {t('ui1.government.safetyItems')}
                    </td>
                  </tr>
                  <tr>
                    <td className="col-type">{t('ui1.government.healthType')}</td>
                    <td>
                      {t('ui1.government.healthItems')}
                    </td>
                  </tr>
                  <tr>
                    <td className="col-type">{t('ui1.government.etcType')}</td>
                    <td>
                      {t('ui1.government.etcItems')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="gs-section">
            <h3><span className="num">5</span> {t('ui1.government.processTitle')}</h3>
            <div className="gs-steps">
              <div className="gs-step">
                <div className="gs-step-title">{t('ui1.government.step1Title')}</div>
                <div className="gs-step-desc">{t('ui1.government.step1Desc')}</div>
              </div>
              <div className="gs-step">
                <div className="gs-step-title">{t('ui1.government.step2Title')}</div>
                <div className="gs-step-desc">{t('ui1.government.step2Desc')}</div>
              </div>
              <div className="gs-step">
                <div className="gs-step-title">{t('ui1.government.step3Title')}</div>
                <div className="gs-step-desc">{t('ui1.government.step3Desc')}</div>
              </div>
              <div className="gs-step">
                <div className="gs-step-title">{t('ui1.government.step4Title')}</div>
                <div className="gs-step-desc">{t('ui1.government.step4Desc')}</div>
              </div>
              <div className="gs-step">
                <div className="gs-step-title">{t('ui1.government.step5Title')}</div>
                <div className="gs-step-desc">{t('ui1.government.step5Desc')}</div>
              </div>
              <div className="gs-step">
                <div className="gs-step-title">{t('ui1.government.step6Title')}</div>
                <div className="gs-step-desc">{t('ui1.government.step6Desc')}</div>
              </div>
            </div>
          </section>

          <div className="gs-cta">
            <Link className="gs-button" to={`/${currentLang}/contact`}>{t('governmentSupport.contact')}</Link>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default Government_support;
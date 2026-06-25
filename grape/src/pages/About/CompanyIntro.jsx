import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import BaseLayout from '../../components/Layout/BaseLayout';
import useTranslation from '../../hooks/useTranslation';
import { getCompanyIntroData } from '../../data/i18n/companyIntro';
import company from '../../assets/header_image/company.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import construction from '../../assets/construction.jpg';
import logo from '../../assets/logo.png';
import ceo from '../../assets/about/ceo.png';
import './About.css';

const CompanyIntro = () => {
  const { t, currentLang } = useTranslation();
  const d = getCompanyIntroData(currentLang);
  return (
    <div className="page-container about-page">
      <ProductHeader image={company} alt="company" />
      <BaseLayout breadcrumbs={[t('about.breadcrumbs.0'), t('about.companyIntroBreadcrumb')]} title={t('about.title')}>
        <div className="solutions-section">
          <div id="greeting" className="about-section-responsive">
            <div className="about-section-value-container-responsive">
              <div className="ceo-container-responsive">
                <div className="ceo-content-responsive">
                  <div className="about-section-title-image-description-responsive">
                    <div className="about-section-title-responsive">
                      <img className="ceo-logo-responsive" src={logo} alt="logo" />
                      <h1>{d.ceo.slogan}</h1>
                    </div>
                    <div className="about-intro-responsive">
                      <p>{d.ceo.intro}</p>
                      <p className="thank-you-text-responsive">{d.ceo.thankYou}</p>
                    </div>
                  </div>
                  <div className="ceo-info-section-responsive">
                    <div
                      className="about-section-title-image-responsive"
                      style={{ backgroundImage: `url(${ceo})` }}
                    ></div>
                    <div className="ceo-info-section-content-responsive">
                      <h1>{d.ceo.name}</h1>
                      <h2>{d.ceo.title}</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="core-value-section-responsive">
                <div className="about-section-title-responsive">
                  <p className="about-section-title-subtitle-responsive">{d.mission.label} </p>
                  <h1 className="about-section-content-title-responsive">{d.mission.title}</h1>
                </div>
                <div className="mission-vision-container-responsive">
                  <div className="mission-card-responsive">
                    <img
                      src={manufacturing}
                      alt="Manufacturing"
                      className="mission-background-responsive"
                    />
                    <div className="mission-overlay-responsive"></div>
                    <div className="mission-content-responsive">
                      <p className="mission-description-responsive">{d.mission.content}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="core-value-section-responsive">
                <div className="about-section-title-responsive">
                  <p className="about-section-title-subtitle-responsive">{d.vision.label}</p>
                  <h1 className="about-section-content-title-responsive">{d.vision.title}</h1>
                </div>
                <div className="mission-vision-container-responsive">
                  <div className="vision-card-responsive">
                    <img
                      src={construction}
                      alt="Construction"
                      className="vision-background-responsive"
                    />
                    <div className="vision-overlay-responsive"></div>
                    <div className="vision-content-responsive">
                      <p className="vision-description-responsive">{d.vision.content}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="core-value-section-responsive">
                <div className="about-section-title-responsive">
                  <p className="about-section-title-subtitle-responsive">{d.coreValues.label}</p>
                  <h1 className="about-section-content-title-responsive">{d.coreValues.title}</h1>
                </div>
                <div className="core-value-list-responsive">
                  <ul>
                    {d.coreValues.items.map((item, idx) => (
                      <li key={idx}>
                        <div className="core-value-title-container">{item.title}</div>
                        <div className="core-value-content">{item.content}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default CompanyIntro;

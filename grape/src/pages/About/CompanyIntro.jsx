import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import BaseLayout from '../../components/Layout/BaseLayout';
import useTranslation from '../../hooks/useTranslation';
import company from '../../assets/header_image/company.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import construction from '../../assets/construction.jpg';
import logo from '../../assets/logo.png';
import ceo from '../../assets/about/ceo.png';
import './About.css';

const CompanyIntro = () => {
  const { t } = useTranslation();
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
                      <h1>{t('aboutPage.intro.title')}</h1>
                    </div>
                    <div className="about-intro-responsive">
                      <p>
                        {t('aboutPage.intro.intro')}
                      </p>
                      <p className="thank-you-text-responsive">{t('aboutPage.intro.thankYou')}</p>
                    </div>
                  </div>
                  <div className="ceo-info-section-responsive">
                    <div 
                      className="about-section-title-image-responsive"
                      style={{ backgroundImage: `url(${ceo})` }}
                    ></div>
                    <div className="ceo-info-section-content-responsive">
                      <h1>{t('aboutPage.intro.ceoName')}</h1>
                      <h2>{t('aboutPage.intro.ceoPosition')}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="core-value-section-responsive">
                <div className="about-section-title-responsive">
                  <p className="about-section-title-subtitle-responsive">Mission </p>
                  <h1 className="about-section-content-title-responsive">{t('aboutPage.intro.missionLabel')}</h1>
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
                      <p className="mission-description-responsive">
                        {t('aboutPage.intro.missionDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="core-value-section-responsive">
                <div className="about-section-title-responsive">
                  <p className="about-section-title-subtitle-responsive">Vision</p>
                  <h1 className="about-section-content-title-responsive">{t('aboutPage.intro.visionLabel')}</h1>
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
                      <p className="vision-description-responsive">
                        {t('aboutPage.intro.visionDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="core-value-section-responsive">
                <div className="about-section-title-responsive">
                  <p className="about-section-title-subtitle-responsive">Core Value</p>
                  <h1 className="about-section-content-title-responsive">{t('aboutPage.intro.coreValueLabel')}</h1>
                </div>
                <div className="core-value-list-responsive">
                  <ul>
                    {t('aboutPage.intro.coreValueItems').map((cv, i) => (
                      <li key={i}>
                        <div className="core-value-title-container">{cv.title}</div>
                        <div className="core-value-content">{cv.desc}</div>
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



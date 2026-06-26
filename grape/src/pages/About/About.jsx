import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useTranslation from "../../hooks/useTranslation";
import "./About.css";
import manufacturing from "../../assets/manufacturing.jpg";
import construction from "../../assets/construction.jpg";
import logo from "../../assets/logo.png";
import ProductHeader from '../../components/ProductPage/ProductHeader';
import company from "../../assets/header_image/company.jpg";
import ContactInfo from "../../components/ContactInfo";
import ceo from "../../assets/about/ceo.png";
import CertificateSection from "../../components/CertificateSection";
import BaseLayout from "../../components/Layout/BaseLayout";

const About = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // URL 해시에 따라 해당 섹션으로 스크롤
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.substring(1); // # 제거

      const scrollToElement = () => {
        let element = document.querySelector(`#${hash}`);
        if (!element) {
          element = document.querySelector(`[name="${hash}"]`);
        }
        if (!element) {
          element = document.querySelector(`.${hash}`);
        }

        if (element) {
          const headerOffset = 120;
          const elementRect = element.getBoundingClientRect();
          const elementTop = elementRect.top + window.pageYOffset;
          const scrollTop = elementTop - headerOffset;

          console.log("About page scrolling to:", hash, "position:", scrollTop);

          window.scrollTo({
            top: scrollTop,
            behavior: "smooth",
          });
        } else {
          const hashElement = document.getElementById(hash);
          if (hashElement) {
            hashElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      };

      // 여러 번 시도하여 확실히 실행되도록 함
      scrollToElement();
      setTimeout(scrollToElement, 50);
      setTimeout(scrollToElement, 200);
      setTimeout(scrollToElement, 500);
    }
  }, [location.hash]);
  
  return (
    <div className="page-container about-page">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <ProductHeader image={company} alt="company" />

            <BaseLayout 
              breadcrumbs={[t('about.breadcrumbs.0'), "About"]}
              title={t('about.title')}
            >
              <div className="solutions-section">
                <div id="greeting" className="about-section-responsive">
                  <div className="about-section-value-container-responsive">
                    <div className="ceo-container-responsive">
                      <div className="ceo-content-responsive">
                        <div className="about-section-title-image-description-responsive">
                          <div className="about-section-title-responsive">
                            <img className="ceo-logo-responsive" src={logo} alt="logo" />
                            <h1>{t('aboutPage.main.greeting.title')}</h1>
                          </div>
                          <div className="about-intro-responsive">
                            <p>
                              {t('aboutPage.main.greeting.intro')}
                            </p>
                            <p className="thank-you-text-responsive">{t('aboutPage.main.greeting.thankYou')}</p>
                          </div>
                        </div>
                        <div className="ceo-info-section-responsive">
                          <div 
                            className="about-section-title-image-responsive"
                            style={{ backgroundImage: `url(${ceo})` }}
                          ></div>
                          <div className="ceo-info-section-content-responsive">
                            <h1>{t('aboutPage.main.ceo.name')}</h1>
                            <h2>{t('aboutPage.main.ceo.position')}</h2>
                            {t('aboutPage.main.ceo.info1').map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                          <div className="ceo-info-section-content-responsive">
                            {t('aboutPage.main.ceo.info2').map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                          <div className="ceo-info-section-content-responsive">
                            {t('aboutPage.main.ceo.info3').map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="core-value-section-responsive">
                      <div className="about-section-title-responsive">
                        <p className="about-section-title-subtitle-responsive">Mission </p>
                        <h1 className="about-section-content-title-responsive">{t('aboutPage.main.mission.label')}</h1>
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
                              {t('aboutPage.main.mission.desc')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="core-value-section-responsive">
                      <div className="about-section-title-responsive">
                        <p className="about-section-title-subtitle-responsive">Vision</p>
                        <h1 className="about-section-content-title-responsive">{t('aboutPage.main.vision.label')}</h1>
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
                              {t('aboutPage.main.vision.desc')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="core-value-section-responsive">
                      <div className="about-section-title-responsive">
                        <p className="about-section-title-subtitle-responsive">Core Value</p>
                        <h1 className="about-section-content-title-responsive">{t('aboutPage.main.coreValue.label')}</h1>
                      </div>
                      <div className="core-value-list-responsive">
                        <ul>
                          {t('aboutPage.main.coreValue.items').map((cv, i) => (
                            <li key={i}>
                              <strong>{cv.title}</strong>{cv.desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="history" className="about-section">
                  <div className="about-section-title-image-container">
                    <div className="about-section-title">
                      <p className="about-section-title-subtitle">
                        Company History
                      </p>
                      <h1 className="about-section-content-title">{t('aboutPage.main.history.title')}</h1>
                    </div>
                    <div className="timeline-container">
                      <div className="timeline">
                        {t('aboutPage.main.history.items').map((block, bi) => (
                          <div className="timeline-item" key={bi}>
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                              <div className="timeline-date">{block.date}</div>
                              <div className="timeline-title">{block.title}</div>
                              <div className="timeline-description">
                                <ul>
                                  {block.items.map((item, ii) => (
                                    <li key={ii}>
                                      {typeof item === 'string' ? item : (
                                        <>
                                          {item.text}
                                          <br />
                                          <span
                                            style={{
                                              fontSize: "0.95em",
                                              color: "var(--color-text-secondary)",
                                            }}
                                          >
                                            {item.note}
                                          </span>
                                        </>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <CertificateSection />
                <div id="location" className="about-section">
                  <div className="about-section-title-image-container">
                    <div className="about-section-title">
                      <p className="about-section-title-subtitle">
                        Location & Contact
                      </p>
                      <h1 className="about-section-content-title">{t('aboutPage.main.location.title')}</h1>
                    </div>
                    <div className="location-container">
                      <div className="map-container">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.532835223222!2d126.96427059698114!3d37.40087886162995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b5e3a312a3d07%3A0x8362eaabc267ff81!2z6riI6rCV7Y6c7YWM66as7JuASVTtg4Dsm4w!5e0!3m2!1sko!2skr!4v1752822417888!5m2!1sko!2skr" width="100%" height="300" style={{ border: 0, width: '100%' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                      </div>
                    </div>
                  </div>
                </div>
                <ContactInfo />
              </div>
            </BaseLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


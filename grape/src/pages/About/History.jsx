import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import BaseLayout from '../../components/Layout/BaseLayout';
import useTranslation from '../../hooks/useTranslation';
import company from '../../assets/header_image/company.jpg';
import './About.css';
import manufacturing from '../../assets/manufacturing.jpg';
import construction from '../../assets/construction.jpg';

const History = () => {
  const { t } = useTranslation();
  return (
    <div className="page-container about-page">
      <ProductHeader image={company} alt="history" />
      <BaseLayout breadcrumbs={[t('about.breadcrumbs.0'), t('about.historyBreadcrumb')]} title={t('about.historyTitle')}>
        <div id="history" className="about-section">
          <div className="about-section-title-image-container">
            <div className="about-section-title">
              <p className="about-section-title-subtitle">
                Company History
              </p>
              <h1 className="about-section-content-title">{t('aboutPage.history.title')}</h1>
            </div>
            <div className="timeline-container">
              <div className="timeline">
                {t('aboutPage.history.items').map((block, bi) => (
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
      </BaseLayout>
    </div>
  );
};

export default History;



import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import BaseLayout from '../../components/Layout/BaseLayout';
import useTranslation from '../../hooks/useTranslation';
import { getHistoryData } from '../../data/i18n/history';
import company from '../../assets/header_image/company.jpg';
import './About.css';

const History = () => {
  const { t, currentLang } = useTranslation();
  const d = getHistoryData(currentLang);
  return (
    <div className="page-container about-page">
      <ProductHeader image={company} alt="history" />
      <BaseLayout breadcrumbs={[t('about.breadcrumbs.0'), t('about.historyBreadcrumb')]} title={t('about.historyTitle')}>
        <div id="history" className="about-section">
          <div className="about-section-title-image-container">
            <div className="about-section-title">
              <p className="about-section-title-subtitle">{d.sectionLabel}</p>
              <h1 className="about-section-content-title">{d.sectionTitle}</h1>
            </div>
            <div className="timeline-container">
              <div className="timeline">
                {d.timeline.map((entry, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-date">{entry.year}</div>
                      <div className="timeline-title">{entry.title}</div>
                      <div className="timeline-description">
                        <ul>
                          {entry.items.map((item, i) => (
                            <li key={i}>{item}</li>
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

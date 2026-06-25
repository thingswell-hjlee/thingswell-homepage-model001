import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import BaseLayout from '../../components/Layout/BaseLayout';
import useTranslation from '../../hooks/useTranslation';
import company from '../../assets/header_image/company.jpg';
import './About.css';
import ContactInfo from '../../components/ContactInfo';

// TODO: ContactInfo component has hardcoded Korean strings (문의하기, 대표번호, 이메일, 오시는 길, address).
// i18n for ContactInfo should be implemented as a follow-up task.

const Directions = () => {
  const { t } = useTranslation();
  return (
    <div className="page-container about-page">
      <ProductHeader image={company} alt="directions" />
      <BaseLayout breadcrumbs={[t('about.breadcrumbs.0'), t('about.directionsBreadcrumb')]} title={t('about.directionsTitle')}>
        <div className="about-section">
          <div className="about-section-title-image-container">
            <div className="about-section-title">
              <p className="about-section-title-subtitle">{t('about.locationLabel')}</p>
              <h1 className="about-section-content-title">{t('about.locationTitle')}</h1>
            </div>
            <div className="location-container">
              <div className="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.532835223222!2d126.96427059698114!3d37.40087886162995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b5e3a312a3d07%3A0x8362eaabc267ff81!2z6riI6rCV7Y6c7YWM66as7JuASVTtg4Dsm4w!5e0!3m2!1sko!2skr!4v1752822417888!5m2!1sko!2skr" width="100%" height="300" style={{ border: 0, width: '100%' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
          <ContactInfo />
        </div>
      </BaseLayout>
    </div>
  );
};

export default Directions;



import React from 'react';
import useTranslation from '../../hooks/useTranslation';
import './index.css';

const ContactInfo = () => {
  const { t } = useTranslation();
  return (
    <section className="contact-section">
      <p className="contact-section-title-subtitle">Contact Us</p>
      <h2 className="contact-section-title">{t('ui3.contactInfo.title')}</h2>
      <div className="contact-card-grid">
        <div className="contact-card">
          <h3 className="contact-card-title">{t('ui3.contactInfo.phoneLabel')}</h3>
          <p className="contact-card-text-call" style={{fontWeight: 'var(--font-weight-bold)'}}><a href="tel:1833-7758">1833-7758</a></p>
        </div>
        <div className="contact-card">
          <h3 className="contact-card-title">{t('ui3.contactInfo.emailLabel')}</h3>
          <p className="contact-card-text"><a href="mailto:contact@thingswell.co.kr">contact@thingswell.co.kr</a></p>
        </div>
        <div className="contact-card">
          <h3 className="contact-card-title">{t('ui3.contactInfo.locationLabel')}</h3>
          <p className="contact-card-text">{t('ui3.contactInfo.address')}</p>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;



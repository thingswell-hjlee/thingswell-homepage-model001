import React from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import './NotFound.css';

const NotFound = () => {
  const { t, currentLang } = useTranslation();
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <span className="error-code">{t('notFound.code')}</span>
        </div>
        <h1 className="not-found-title">{t('notFound.title')}</h1>
        <p className="not-found-description">
          {t('notFound.description')}
        </p>
        <div className="not-found-actions">
          <Link to={`/${currentLang}`} className="not-found-button primary">
            {t('notFound.goHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import React, { useEffect } from 'react';
import useTranslation from '../../../hooks/useTranslation';
import './Lightbox.css';

const Lightbox = ({ isOpen, src, alt = '', caption, onClose }) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose && onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label={t('ui3.lightbox.closeLabel')}>×</button>
        {src ? (
          <img className="lightbox-image" src={src} alt={alt} />
        ) : null}
        {caption ? <div className="lightbox-caption">{caption}</div> : null}
      </div>
    </div>
  );
};

export default Lightbox;



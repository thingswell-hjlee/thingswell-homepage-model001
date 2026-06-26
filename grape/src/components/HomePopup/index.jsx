import { useState, useEffect } from "react";
import "./HomePopup.css";
import logoSmallKorean from "../../assets/logos/logo_small_korean.png";
import useTranslation from "../../hooks/useTranslation";

const STORAGE_KEY = "homePopupHiddenDate";
const POPUP_TARGET_URL = "https://thingswell.co.kr/customer-service/announcement?detail=3";

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function shouldShowPopup() {
  try {
    const hiddenDate = localStorage.getItem(STORAGE_KEY);
    const today = getTodayString();
    return hiddenDate !== today;
  } catch {
    return true;
  }
}

export default function HomePopup() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(shouldShowPopup());
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  const handleDontShowToday = () => {
    try {
      localStorage.setItem(STORAGE_KEY, getTodayString());
    } catch (e) {
      console.warn("localStorage setItem failed", e);
    }
    setVisible(false);
  };

  const handlePopupNavigate = () => {
    window.open(POPUP_TARGET_URL, "_blank", "noopener,noreferrer");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="home-popup-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="home-popup-title"
    >
      <div className="home-popup-box" onClick={(e) => e.stopPropagation()}>
        <div
          className="home-popup-body home-popup-body-link"
          role="button"
          tabIndex={0}
          onClick={handlePopupNavigate}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handlePopupNavigate();
            }
          }}
        >
          <img
            src={logoSmallKorean}
            alt={t('ui1.popup.logoAlt')}
            className="home-popup-logo"
          />

          <h2 id="home-popup-title" className="home-popup-year">{t('ui1.popup.year')}</h2>
          <div className="home-popup-badges">
            <span className="home-popup-badge home-popup-badge-light">{t('ui1.popup.badge1')}</span>
            <span className="home-popup-badge home-popup-badge-dark">{t('ui1.popup.badge2')}</span>
          </div>
          <p className="home-popup-highlight">{t('ui1.popup.highlight')}</p>
          <p className="home-popup-desc">{t('ui1.popup.desc')}</p>
          <p className="home-popup-tagline">
            <strong className="home-popup-ai">AI</strong>{" "}
            <strong className="home-popup-smart">{t('ui1.popup.smartStore')}</strong>
          </p>
          <p className="home-popup-features">
            {t('ui1.popup.feature1')} <span className="home-popup-divider">|</span> {t('ui1.popup.feature2')}{" "}
            <span className="home-popup-divider">|</span> {t('ui1.popup.feature3')}
          </p>

          <button
            type="button"
            className="home-popup-cta"
            onClick={(e) => {
              e.stopPropagation();
              handlePopupNavigate();
            }}
          >
            {t('ui1.popup.cta')}
          </button>
        </div>

        <div className="home-popup-actions">
          <button
            type="button"
            className="home-popup-btn home-popup-btn-dont-show"
            onClick={handleDontShowToday}
          >
            {t('ui1.popup.dontShowToday')}
          </button>
          <button
            type="button"
            className="home-popup-btn home-popup-btn-close"
            onClick={handleClose}
          >
            {t('ui1.popup.close')}
          </button>
        </div>
      </div>
    </div>
  );
}

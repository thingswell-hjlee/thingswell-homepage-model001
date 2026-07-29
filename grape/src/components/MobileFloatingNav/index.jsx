import { useLocation, useNavigate } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import { stripLangPrefix } from '../../contexts/LanguageContext';
import './MobileFloatingNav.css';

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const MobileFloatingNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, currentLang } = useTranslation();

  const path = stripLangPrefix(location.pathname);
  const isHome = path === '/' || path === '';

  // React Router는 history.state.idx로 앱 내 이동 위치를 추적.
  // idx>0 이면 앱 안에서 돌아갈 곳이 있음. (직접 진입=0 또는 없음 → 숨김)
  const idx = window.history.state && window.history.state.idx;
  const canGoBack = typeof idx === 'number' && idx > 0;

  const goHome = () => navigate(`/${currentLang}/`);
  const goBack = () => {
    // 직접 진입 등으로 앱 내 히스토리가 없으면 사이트 밖으로 나가지 않도록 홈으로 폴백
    if (canGoBack && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(`/${currentLang}/`);
    }
  };

  return (
    <div className="mobile-floating-nav">
      {canGoBack && (
        <button type="button" className="mfn-btn mfn-back"
                onClick={goBack} aria-label={t('common.back')}>
          <BackIcon />
        </button>
      )}
      {!isHome && (
        <button type="button" className="mfn-btn mfn-home"
                onClick={goHome} aria-label={t('common.home')}>
          <HomeIcon />
        </button>
      )}
    </div>
  );
};

export default MobileFloatingNav;

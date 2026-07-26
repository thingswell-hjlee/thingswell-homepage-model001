// v2 홈 (B-1) — 6블록: hero · axes · howitworks · proof · ai-diagnosis · finalcta
// 데이터는 전부 콘텐츠 슬롯(getPublishableItems)에서 온다. 하드코딩된 특허·실적·수치 금지.
// 기존 pages/·components/ import 금지. 스타일은 tw2- 스코프만.
import { Link } from 'react-router-dom';
import useTranslation from '../hooks/useTranslation';
import { getPublishableItems, axes, pick, patentBadgeKey } from '../content';
import DiagnosisWidget from '../components/v2/DiagnosisWidget';
import '../styles/v2/home-v2.css';

function HomeV2() {
  const { t, currentLang } = useTranslation();
  const patents = getPublishableItems('patents');
  const rnd = getPublishableItems('rnd');
  const products = getPublishableItems('products');
  const platformSteps = products.filter((p) => p.axis === 'platform').slice(0, 4);
  const contactPath = `/${currentLang}/safegai-platform`;

  return (
    <div className="tw2-home">
      <p className="tw2-preview-notice">{t('v2.previewNotice')}</p>

      {/* 블록 1 — hero */}
      <section className="tw2-hero">
        <p className="tw2-eyebrow">{t('v2.home.hero.eyebrow')}</p>
        <h1 className="tw2-hero-title">{t('v2.home.hero.title')}</h1>
        <p className="tw2-hero-sub">{t('v2.home.hero.subtitle')}</p>
        <div className="tw2-cta-row">
          <Link className="tw2-btn tw2-btn-primary" to={contactPath}>
            {t('v2.home.hero.ctaPrimary')}
          </Link>
          <a className="tw2-btn tw2-btn-ghost" href="#tw2-diagnosis">
            {t('v2.home.hero.ctaSecondary')}
          </a>
        </div>
      </section>

      {/* 블록 2 — axes (적용 축 4종 + 축별 제품군) */}
      <section className="tw2-section">
        <h2 className="tw2-h2">{t('v2.home.axes.heading')}</h2>
        <p className="tw2-sub">{t('v2.home.axes.sub')}</p>
        <div className="tw2-axes-grid">
          {axes.map((axis) => (
            <div key={axis.code} className="tw2-axis-card">
              <p className="tw2-axis-code">{axis.code}</p>
              <h3 className="tw2-axis-name">{pick(axis, currentLang)}</h3>
              <ul className="tw2-axis-products">
                {products
                  .filter((p) => p.axis === axis.code)
                  .map((p) => (
                    <li key={p.id}>{pick(p.name, currentLang)}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 블록 3 — how it works (platform 제품군 순서 = 처리 흐름) */}
      <section className="tw2-section">
        <h2 className="tw2-h2">{t('v2.home.how.heading')}</h2>
        <p className="tw2-sub">{t('v2.home.how.sub')}</p>
        <div className="tw2-how-flow">
          {platformSteps.map((p) => (
            <div key={p.id} className="tw2-how-step">
              <p className="tw2-how-name">{pick(p.name, currentLang)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 블록 4 — proof (특허·R&D — 슬롯 데이터만, rejected는 로더가 이미 필터) */}
      <section className="tw2-section">
        <h2 className="tw2-h2">{t('v2.home.proof.heading')}</h2>
        <div className="tw2-proof-cols">
          <div>
            <h3 className="tw2-proof-col-title">{t('v2.home.proof.patentsTitle')}</h3>
            <ul className="tw2-proof-list">
              {patents.map((p) => (
                <li key={p.id} className="tw2-proof-item">
                  <p className="tw2-proof-item-title">
                    {patentBadgeKey(p) && (
                      <span
                        className={`tw2-badge ${
                          p.legalStatus === 'registered'
                            ? 'tw2-badge-registered'
                            : 'tw2-badge-pending'
                        }`}
                      >
                        {t(patentBadgeKey(p))}
                      </span>
                    )}
                    {p.isFlagship && (
                      <span className="tw2-badge tw2-badge-flagship">
                        {t('v2.home.proof.flagship')}
                      </span>
                    )}
                    {pick(p.title, currentLang)}
                  </p>
                  <p className="tw2-proof-meta">
                    {p.legalStatus === 'registered' ? (
                      <span>{t('v2.home.proof.regNoLabel')} {p.regNumber}</span>
                    ) : (
                      <span>{t('v2.home.proof.appNoLabel')} {p.appNumber}</span>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="tw2-proof-col-title">{t('v2.home.proof.rndTitle')}</h3>
            <ul className="tw2-proof-list">
              {rnd.map((r) => (
                <li key={r.id} className="tw2-proof-item">
                  <p className="tw2-proof-item-title">{pick(r.title, currentLang)}</p>
                  <p className="tw2-proof-meta">
                    <span>{pick(r.ministry, currentLang)}</span>
                    <span>{r.period}</span>
                    <span>{r.role}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 블록 5 — ai-diagnosis */}
      <section className="tw2-section">
        <DiagnosisWidget />
      </section>

      {/* 블록 6 — finalcta */}
      <section className="tw2-section tw2-final">
        <h2 className="tw2-h2">{t('v2.home.finalCta.title')}</h2>
        <p className="tw2-sub">{t('v2.home.finalCta.body')}</p>
        <Link className="tw2-btn tw2-btn-primary" to={contactPath}>
          {t('v2.home.finalCta.button')}
        </Link>
      </section>
    </div>
  );
}

export default HomeV2;

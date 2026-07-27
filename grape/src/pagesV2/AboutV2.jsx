// v2 회사소개 — 방향성(멀티모달 안전 AI·4축·검증된 실적)에 맞춘 개편.
// 사실 콘텐츠는 두 원천에서만 온다:
//   1) 기존 i18n 키(about.*, aboutPage.intro.*) — 이미 게재·번역된 검증 콘텐츠 재사용
//   2) 콘텐츠 슬롯(getPublishableItems/getSlot) — docs/DATA-SOURCE.md 원장
// 실적 수치는 하드코딩하지 않고 슬롯에서 계산한다.
// 기존 pages/·components/ import 금지. 스타일은 tw2- 스코프만.
import { Link } from 'react-router-dom';
import useTranslation from '../hooks/useTranslation';
import { getPublishableItems, getSlot, axes, pick } from '../content';
import '../styles/v2/home-v2.css';
import '../styles/v2/about-v2.css';

function AboutV2() {
  const { t, currentLang } = useTranslation();
  const patents = getPublishableItems('patents');
  const rnd = getPublishableItems('rnd', { includeInternal: true }); // 회사소개는 IR 성격 — 사이버폭력 과제 포함 7건
  const products = getPublishableItems('products');
  const partners = getSlot('rnd').partners;
  const registered = patents.filter((p) => p.legalStatus === 'registered').length;
  const pending = patents.filter((p) => p.legalStatus === 'pending').length;
  const contactPath = `/${currentLang}/safegai-platform`;
  const coreValues = t('aboutPage.intro.coreValueItems');

  return (
    <div className="tw2-home tw2-about">
      {/* 블록 1 — hero (기존 인사말 타이틀 재사용) */}
      <section className="tw2-hero">
        <p className="tw2-eyebrow">{t('v2.about.heroEyebrow')}</p>
        <h1 className="tw2-hero-title">{t('about.ceoGreeting')}</h1>
        <p className="tw2-hero-sub">{t('v2.about.heroSub')}</p>
      </section>

      {/* 블록 2 — 미션·비전·핵심가치 (기존 검증 콘텐츠 재사용) */}
      <section className="tw2-section">
        <h2 className="tw2-h2">{t('v2.about.identityHeading')}</h2>
        <div className="tw2-axes-grid">
          <div className="tw2-axis-card">
            <p className="tw2-axis-code">{t('about.missionLabel')}</p>
            <h3 className="tw2-axis-name">{t('about.missionTitle')}</h3>
            <p className="tw2-about-desc">{t('about.missionDesc')}</p>
          </div>
          <div className="tw2-axis-card">
            <p className="tw2-axis-code">{t('about.visionLabel')}</p>
            <h3 className="tw2-axis-name">{t('about.visionTitle')}</h3>
            <p className="tw2-about-desc">{t('about.visionDesc')}</p>
          </div>
          <div className="tw2-axis-card">
            <p className="tw2-axis-code">{t('about.coreValueLabel')}</p>
            <h3 className="tw2-axis-name">{t('about.coreValueTitle')}</h3>
            <ul className="tw2-axis-products">
              {Array.isArray(coreValues) &&
                coreValues.map((v) => <li key={v.title}>{v.title} — {v.desc}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* 블록 3 — 사업 영역 (4축 + 축별 제품 수) */}
      <section className="tw2-section">
        <h2 className="tw2-h2">{t('v2.about.axesHeading')}</h2>
        <p className="tw2-sub">{t('v2.about.axesSub')}</p>
        <div className="tw2-axes-grid">
          {axes.map((axis) => {
            const count = products.filter((p) => p.axis === axis.code).length;
            return (
              <div key={axis.code} className="tw2-axis-card">
                <p className="tw2-axis-code">{axis.code}</p>
                <h3 className="tw2-axis-name">{pick(axis, currentLang)}</h3>
                <p className="tw2-about-desc">
                  {count}{t('v2.about.axesProductsSuffix')}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 블록 4 — 숫자로 보는 실적 (슬롯에서 계산 — 하드코딩 0) */}
      <section className="tw2-section">
        <h2 className="tw2-h2">{t('v2.about.proofHeading')}</h2>
        <div className="tw2-about-stats">
          <div className="tw2-about-stat">
            <p className="tw2-about-stat-num">{registered}{t('v2.about.proofUnit')}</p>
            <p className="tw2-about-stat-label">{t('v2.about.proofRegistered')}</p>
          </div>
          <div className="tw2-about-stat">
            <p className="tw2-about-stat-num">{pending}{t('v2.about.proofUnit')}</p>
            <p className="tw2-about-stat-label">{t('v2.about.proofPending')}</p>
          </div>
          <div className="tw2-about-stat">
            <p className="tw2-about-stat-num">{rnd.length}{t('v2.about.proofUnit')}</p>
            <p className="tw2-about-stat-label">{t('v2.about.proofRnd')}</p>
          </div>
        </div>
        <p className="tw2-diag-note">{t('v2.about.proofNote')}</p>
        <div className="tw2-cta-row tw2-about-cta-left">
          <Link className="tw2-btn tw2-btn-ghost" to={`/${currentLang}/about/licenses`}>
            {t('v2.about.proofCta')}
          </Link>
        </div>
      </section>

      {/* 블록 5 — 공동연구·산학협력 (슬롯 partners) */}
      <section className="tw2-section">
        <h2 className="tw2-h2">{t('v2.about.partnersHeading')}</h2>
        <div className="tw2-proof-cols">
          {[
            ['partnersCompanies', partners.companies],
            ['partnersUniversities', partners.universities],
            ['partnersPublic', partners.public],
          ].map(([labelKey, list]) => (
            <div key={labelKey}>
              <h3 className="tw2-proof-col-title">{t(`v2.about.${labelKey}`)}</h3>
              <div className="tw2-diag-tags">
                {list.map((name) => <span key={name} className="tw2-tag">{name}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 블록 6 — CTA */}
      <section className="tw2-section tw2-final">
        <h2 className="tw2-h2">{t('v2.about.ctaHeading')}</h2>
        <p className="tw2-sub">{t('v2.about.ctaBody')}</p>
        <div className="tw2-cta-row">
          <Link className="tw2-btn tw2-btn-primary" to={contactPath}>
            {t('v2.about.ctaContact')}
          </Link>
          <Link className="tw2-btn tw2-btn-ghost" to={`/${currentLang}/about/directions`}>
            {t('v2.about.ctaDirections')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutV2;

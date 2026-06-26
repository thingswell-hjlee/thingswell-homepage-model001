/**
 * SafegaiPlatform 페이지
 *
 * SafeGAI Platform 전용 독립 랜딩 페이지(/safegai-platform).
 * i18n의 safegaiPage.* 키만 읽어 9개 섹션을 렌더링합니다.
 * 구조는 Home.jsx(풀블리드 랜딩)를 따르고, 배열 렌더링은
 * (t('...') || []).map(...) 관용구(Soulution.jsx)를 차용합니다.
 *
 * 9개 섹션: hero / overview / features / architecture / patents /
 *           userPreview / adminPreview / portfolio / contact
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import './SafegaiPlatform.css';

const SafegaiPlatform = () => {
  const { t, currentLang } = useTranslation();
  const navigate = useNavigate();

  // 섹션 데이터 (배열은 객체 반환 키에서 직접 읽음)
  const dashboardCards = t('safegaiPage.hero.dashboardCards') || [];
  const overviewCards = t('safegaiPage.overview.cards') || [];
  const featureCards = t('safegaiPage.features.cards') || [];
  const archLayers = t('safegaiPage.architecture.layers') || [];
  const patent1Keywords = t('safegaiPage.patents.patent1.keywords') || [];
  const patent2Keywords = t('safegaiPage.patents.patent2.keywords') || [];
  const patent2Metrics = t('safegaiPage.patents.patent2.metrics') || [];
  const userCards = t('safegaiPage.userPreview.cards') || [];
  const adminSummary = t('safegaiPage.adminPreview.summary') || [];
  const adminHeaders = t('safegaiPage.adminPreview.tableHeaders') || [];
  const adminRows = t('safegaiPage.adminPreview.tableRows') || [];
  const adminSideItems = t('safegaiPage.adminPreview.sidePanel.items') || [];
  const portfolioGroups = [
    t('safegaiPage.portfolio.group1'),
    t('safegaiPage.portfolio.group2'),
    t('safegaiPage.portfolio.group3'),
  ];
  const contactPhone = t('safegaiPage.contact.phone');
  const contactEmail = t('safegaiPage.contact.email');

  // 폼 로컬 상태 (백엔드 연동 없음 — 프론트 전용)
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // CTA: 해당 섹션으로 스무스 스크롤
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 포트폴리오 카드 클릭 → 현재 언어 prefix 부착 후 이동
  const goTo = (href) => {
    if (!href) return;
    navigate(`/${currentLang}${href}`);
  };

  return (
    <div className="sgp-page">
      {/* 1. Hero */}
      <section className="sgp-hero">
        <div className="sgp-hero-inner">
          <div className="sgp-hero-content">
            <h1 className="sgp-hero-title">
              <span className="sgp-brand">
                <span className="sgp-brand-safe">Safe</span>
                <span className="sgp-brand-gai">GAI</span>
              </span>{' '}
              Platform
            </h1>
            <p className="sgp-hero-eyebrow">{t('safegaiPage.hero.mainCopyEn')}</p>
            <p className="sgp-hero-subcopy">{t('safegaiPage.hero.subCopy')}</p>
            <p className="sgp-hero-body">{t('safegaiPage.hero.body')}</p>
            <div className="sgp-hero-cta-row">
              <button
                type="button"
                className="sgp-cta sgp-cta-primary"
                onClick={() => scrollToSection('sgp-user')}
              >
                {t('safegaiPage.hero.ctaUser')}
              </button>
              <button
                type="button"
                className="sgp-cta sgp-cta-secondary"
                onClick={() => scrollToSection('sgp-admin')}
              >
                {t('safegaiPage.hero.ctaAdmin')}
              </button>
              <button
                type="button"
                className="sgp-cta sgp-cta-ghost"
                onClick={() => scrollToSection('sgp-contact')}
              >
                {t('safegaiPage.hero.ctaContact')}
              </button>
            </div>
          </div>
          <div className="sgp-hero-dashboard" aria-hidden="true">
            {dashboardCards.map((card, i) => (
              <div key={i} className={`sgp-dash-card sgp-dash-card-${i}`}>
                <span className="sgp-dash-dot" />
                <span className="sgp-dash-text">{card}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Overview */}
      <section className="sgp-section sgp-overview">
        <div className="sgp-section-header">
          <p className="sgp-section-label">{t('safegaiPage.overview.label')}</p>
          <h2 className="sgp-section-title">{t('safegaiPage.overview.title')}</h2>
        </div>
        <div className="sgp-grid sgp-grid-3">
          {overviewCards.map((card, i) => (
            <div key={i} className="sgp-card">
              <h3 className="sgp-card-title">{card.title}</h3>
              <p className="sgp-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Features */}
      <section className="sgp-section sgp-features">
        <div className="sgp-section-header">
          <p className="sgp-section-label">{t('safegaiPage.features.label')}</p>
          <h2 className="sgp-section-title">{t('safegaiPage.features.title')}</h2>
        </div>
        <div className="sgp-grid sgp-grid-3">
          {featureCards.map((card, i) => (
            <div key={i} className="sgp-card sgp-feature-card">
              {card.patent ? <span className="sgp-patent-badge">{card.patent}</span> : null}
              <h3 className="sgp-card-title">{card.title}</h3>
              <p className="sgp-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Architecture */}
      <section className="sgp-section sgp-architecture">
        <div className="sgp-section-header">
          <p className="sgp-section-label">{t('safegaiPage.architecture.label')}</p>
          <h2 className="sgp-section-title">{t('safegaiPage.architecture.title')}</h2>
        </div>
        <div className="sgp-arch-stack">
          {archLayers.map((layer, i) => (
            <div key={i} className={`sgp-arch-layer${layer.patent ? ' sgp-arch-layer-hl' : ''}`}>
              <div className="sgp-arch-layer-head">
                <h3 className="sgp-arch-layer-title">{layer.title}</h3>
                {layer.patent ? <span className="sgp-patent-badge">{layer.patent}</span> : null}
              </div>
              <p className="sgp-arch-layer-items">{layer.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Patents */}
      <section className="sgp-section sgp-patents">
        <div className="sgp-section-header">
          <h2 className="sgp-section-title">{t('safegaiPage.patents.title')}</h2>
          <p className="sgp-section-sub">{t('safegaiPage.patents.subtitle')}</p>
        </div>
        <div className="sgp-grid sgp-grid-2">
          {/* 특허 1 */}
          <div className="sgp-patent-card">
            <span className="sgp-patent-reg">{t('safegaiPage.patents.patent1.badge')}</span>
            <h3 className="sgp-patent-title">{t('safegaiPage.patents.patent1.title')}</h3>
            <p className="sgp-patent-title-en">{t('safegaiPage.patents.patent1.titleEn')}</p>
            <ul className="sgp-patent-keywords">
              {patent1Keywords.map((kw, i) => (
                <li key={i}>{kw}</li>
              ))}
            </ul>
            <p className="sgp-patent-body">{t('safegaiPage.patents.patent1.body')}</p>
          </div>
          {/* 특허 2 (강조) */}
          <div className="sgp-patent-card sgp-patent-card-hl">
            <span className="sgp-patent-reg">{t('safegaiPage.patents.patent2.badge')}</span>
            <span className="sgp-patent-highlight">{t('safegaiPage.patents.patent2.highlight')}</span>
            <h3 className="sgp-patent-title">{t('safegaiPage.patents.patent2.title')}</h3>
            <p className="sgp-patent-title-en">{t('safegaiPage.patents.patent2.titleEn')}</p>
            <ul className="sgp-patent-keywords">
              {patent2Keywords.map((kw, i) => (
                <li key={i}>{kw}</li>
              ))}
            </ul>
            <div className="sgp-patent-metrics">
              {patent2Metrics.map((m, i) => (
                <span key={i} className="sgp-metric">{m}</span>
              ))}
            </div>
            <p className="sgp-patent-body">{t('safegaiPage.patents.patent2.body')}</p>
          </div>
        </div>
        <p className="sgp-patents-footer">{t('safegaiPage.patents.footer')}</p>
      </section>

      {/* 6. User Mode Preview */}
      <section id="sgp-user" className="sgp-section sgp-user-preview">
        <div className="sgp-section-header">
          <p className="sgp-section-label">{t('safegaiPage.userPreview.label')}</p>
          <h2 className="sgp-section-title">{t('safegaiPage.userPreview.title')}</h2>
        </div>
        <div className="sgp-grid sgp-grid-3">
          {userCards.map((card, i) => (
            <div key={i} className={`sgp-preview-card sgp-level-${card.levelColor}`}>
              <div className="sgp-preview-card-head">
                <h3 className="sgp-card-title">{card.title}</h3>
                <span className={`sgp-level-badge sgp-level-${card.levelColor}`}>{card.level}</span>
              </div>
              <ul className="sgp-preview-items">
                {(card.items || []).map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
              {card.buttons && card.buttons.length > 0 ? (
                <div className="sgp-preview-buttons">
                  {card.buttons.map((btn, k) => (
                    <button key={k} type="button" className="sgp-preview-btn">
                      {btn}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Admin Mode Preview */}
      <section id="sgp-admin" className="sgp-section sgp-admin-preview">
        <div className="sgp-section-header">
          <p className="sgp-section-label">{t('safegaiPage.adminPreview.label')}</p>
          <h2 className="sgp-section-title">{t('safegaiPage.adminPreview.title')}</h2>
        </div>
        <div className="sgp-admin-summary">
          {adminSummary.map((s, i) => (
            <div key={i} className="sgp-summary-card">
              <span className="sgp-summary-value">{s.value}</span>
              <span className="sgp-summary-label">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="sgp-admin-body">
          <div className="sgp-admin-table-wrap">
            <table className="sgp-admin-table">
              <thead>
                <tr>
                  {adminHeaders.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {adminRows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.time}</td>
                    <td>{row.site}</td>
                    <td>{row.event}</td>
                    <td>{row.level}</td>
                    <td>{row.status}</td>
                    <td>{row.manager}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <aside className="sgp-admin-side">
            <h3 className="sgp-admin-side-title">{t('safegaiPage.adminPreview.sidePanel.title')}</h3>
            <ul className="sgp-admin-side-list">
              {adminSideItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* 8. Portfolio */}
      <section className="sgp-section sgp-portfolio">
        <div className="sgp-section-header">
          <h2 className="sgp-section-title">{t('safegaiPage.portfolio.title')}</h2>
          <p className="sgp-section-sub">{t('safegaiPage.portfolio.subtitle')}</p>
        </div>
        {portfolioGroups.map((group, gi) => (
          <div key={gi} className="sgp-portfolio-group">
            <h3 className="sgp-portfolio-group-title">{group.title}</h3>
            <div className="sgp-grid sgp-grid-3">
              {(group.cards || []).map((card, ci) => (
                <button
                  key={ci}
                  type="button"
                  className="sgp-card sgp-portfolio-card"
                  onClick={() => goTo(card.href)}
                >
                  <h4 className="sgp-card-title">{card.title}</h4>
                  {card.subtitle ? <p className="sgp-card-desc">{card.subtitle}</p> : null}
                  <span className="sgp-portfolio-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>
        ))}
        <p className="sgp-portfolio-footer">{t('safegaiPage.portfolio.footer')}</p>
      </section>

      {/* 9. Contact */}
      <section id="sgp-contact" className="sgp-section sgp-contact">
        <div className="sgp-section-header">
          <h2 className="sgp-section-title">{t('safegaiPage.contact.title')}</h2>
          <p className="sgp-section-sub">{t('safegaiPage.contact.body')}</p>
        </div>
        <div className="sgp-contact-body">
          <div className="sgp-contact-info">
            <a className="sgp-contact-line" href={`tel:${contactPhone}`}>{contactPhone}</a>
            <a className="sgp-contact-line" href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
          <form className="sgp-contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="sgp-field"
              placeholder={t('safegaiPage.contact.formName')}
              value={form.name}
              onChange={handleFormChange('name')}
            />
            <input
              type="text"
              className="sgp-field"
              placeholder={t('safegaiPage.contact.formCompany')}
              value={form.company}
              onChange={handleFormChange('company')}
            />
            <input
              type="email"
              className="sgp-field"
              placeholder={t('safegaiPage.contact.formEmail')}
              value={form.email}
              onChange={handleFormChange('email')}
            />
            <textarea
              className="sgp-field sgp-field-textarea"
              placeholder={t('safegaiPage.contact.formMessage')}
              value={form.message}
              onChange={handleFormChange('message')}
              rows={4}
            />
            <button type="submit" className="sgp-cta sgp-cta-primary sgp-submit">
              {t('safegaiPage.contact.submitButton')}
            </button>
            {submitted ? (
              <p className="sgp-submit-message">{t('safegaiPage.contact.submitMessage')}</p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
};

export default SafegaiPlatform;

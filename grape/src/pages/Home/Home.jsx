import { useMemo } from "react";
import { Link } from "react-router-dom";
import useTranslation from "../../hooks/useTranslation";
import "./Home.css";

export default function Home() {
  const { t, currentLang } = useTranslation();

  const platformLayers = useMemo(() => {
    const layers = t('home.platform.layers');
    return Array.isArray(layers) ? layers : [];
  }, [t]);

  const solutions = useMemo(() => {
    const sols = t('home.solutions.items');
    return Array.isArray(sols) ? sols : [];
  }, [t]);

  const technologies = useMemo(() => {
    const techs = t('home.technology.items');
    return Array.isArray(techs) ? techs : [];
  }, [t]);

  const stats = useMemo(() => {
    const s = t('home.trackRecord.stats');
    return Array.isArray(s) ? s : [];
  }, [t]);

  const partners = useMemo(() => {
    const p = t('home.trust.partners');
    return Array.isArray(p) ? p : [];
  }, [t]);

  const layerClasses = ['edge', 'ai', 'cloud', 'control'];
  const layerIcons = ['\u2B22', '\u2B21', '\u2601', '\u2318'];
  const solutionIcons = ['\uD83C\uDFD9\uFE0F', '\uD83D\uDEA7', '\uD83C\uDFED', '\u267F', '\uD83C\uDFEA'];
  const techIcons = ['\u26A1', '\uD83E\uDDBE', '\uD83E\uDDE0', '\uD83D\uDFE2', '\u2601\uFE0F'];

  return (
    <div className="safegai-home">
      {/* Hero Section */}
      <section className="safegai-hero">
        <div className="safegai-hero-content">
          <span className="safegai-hero-badge">
            {t('home.hero.badge')}
          </span>

          <h1 className="safegai-hero-title">
            <span className="safegai-brand safegai-brand-lg">
              <span className="safe">Safe</span><span className="gai">GAI</span>
            </span>
            {' '}Platform
          </h1>

          <p className="safegai-hero-subtitle">
            {t('home.hero.subtitle')}
          </p>

          <p className="safegai-hero-desc">
            {t('home.hero.description')}
          </p>

          <div className="safegai-hero-cta-row">
            <Link
              to={`/${currentLang}/solutions/overview`}
              className="safegai-hero-cta safegai-hero-cta-primary"
            >
              {t('home.hero.ctaPrimary')}
            </Link>
            <Link
              to={`/${currentLang}/cases/smart-safety`}
              className="safegai-hero-cta safegai-hero-cta-secondary"
            >
              {t('home.hero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="safegai-section">
        <div className="safegai-section-header">
          <p className="safegai-section-label">{t('home.platform.label')}</p>
          <h2 className="safegai-section-title">{t('home.platform.title')}</h2>
          <p className="safegai-section-desc">{t('home.platform.desc')}</p>
        </div>
        <div className="safegai-platform-grid">
          {platformLayers.map((layer, i) => (
            <div key={i} className={`safegai-platform-card ${layerClasses[i] || ''}`}>
              <div className="safegai-platform-card-icon">
                {layerIcons[i] || '\u25CF'}
              </div>
              <p className="safegai-platform-card-label">{layer.label}</p>
              <h3 className="safegai-platform-card-title">{layer.title}</h3>
              <p className="safegai-platform-card-desc">{layer.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="safegai-section">
        <div className="safegai-section-header">
          <p className="safegai-section-label">{t('home.solutions.label')}</p>
          <h2 className="safegai-section-title">{t('home.solutions.title')}</h2>
        </div>
        <div className="safegai-solutions-grid">
          {solutions.slice(0, 3).map((sol, i) => (
            <Link
              key={i}
              to={sol.href ? `/${currentLang}${sol.href}` : `/${currentLang}/solutions/overview`}
              className="safegai-solution-card"
            >
              <span className="safegai-solution-card-icon">{solutionIcons[i] || '\u25CF'}</span>
              <h3 className="safegai-solution-card-title">{sol.title}</h3>
              <p className="safegai-solution-card-desc">{sol.desc}</p>
            </Link>
          ))}
        </div>
        {solutions.length > 3 && (
          <div className="safegai-solutions-extra">
            {solutions.slice(3).map((sol, i) => (
              <Link
                key={i + 3}
                to={sol.href ? `/${currentLang}${sol.href}` : `/${currentLang}/solutions/overview`}
                className="safegai-solution-card"
              >
                <span className="safegai-solution-card-icon">{solutionIcons[i + 3] || '\u25CF'}</span>
                <h3 className="safegai-solution-card-title">{sol.title}</h3>
                <p className="safegai-solution-card-desc">{sol.desc}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Technology */}
      <section className="safegai-section">
        <div className="safegai-section-header">
          <p className="safegai-section-label">{t('home.technology.label')}</p>
          <h2 className="safegai-section-title">{t('home.technology.title')}</h2>
        </div>
        <div className="safegai-tech-grid">
          {technologies.map((tech, i) => (
            <div key={i} className="safegai-tech-card">
              <span className="safegai-tech-card-icon">{techIcons[i] || '\u25CF'}</span>
              <h3 className="safegai-tech-card-title">{tech.title}</h3>
              <p className="safegai-tech-card-desc">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Track Record */}
      <section className="safegai-section">
        <div className="safegai-section-header">
          <p className="safegai-section-label">{t('home.trackRecord.label')}</p>
          <h2 className="safegai-section-title">{t('home.trackRecord.title')}</h2>
        </div>
        <div className="safegai-stats">
          {stats.map((stat, i) => (
            <div key={i} className="safegai-stat">
              <div className="safegai-stat-number">{stat.number}</div>
              <div className="safegai-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust / Partners */}
      <section className="safegai-section safegai-trust">
        <div className="safegai-section-header">
          <p className="safegai-section-label">{t('home.trust.label')}</p>
          <h2 className="safegai-section-title">{t('home.trust.title')}</h2>
        </div>
        <div className="safegai-trust-logos">
          {partners.map((partner, i) => (
            <span key={i} className="safegai-trust-logo">{partner}</span>
          ))}
        </div>
      </section>

      {/* CTA Section - SafeGAI 관제시스템 */}
      <section className="safegai-cta-section">
        <div className="safegai-cta-content">
          <h2 className="safegai-cta-title">{t('home.cta.title')}</h2>
          <p className="safegai-cta-desc">{t('home.cta.desc')}</p>
          <div className="safegai-hero-cta-row">
            <Link
              to={`/${currentLang}/products/monitoring`}
              className="safegai-hero-cta safegai-hero-cta-primary"
            >
              {t('home.cta.ctaButton')}
            </Link>
            <Link
              to={`/${currentLang}/about/company`}
              className="safegai-hero-cta safegai-hero-cta-secondary"
            >
              {t('home.cta.ctaCompany')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

// v2 사업분야 개요 (플랫폼 소개) — SafeGAI Smart Safety & Efficiency Platform.
// 콘텐츠 근거: 지명원 2026-03(중대재해처벌법 대응·Edge AI·기대 효과), DATA-SOURCE §2 #1(R&D 2024–2028)·§8(구축 실적),
// 플랫폼 아키텍처 다이어그램(대표 제공, 2026-07-28). 임의 수치 없음 (S2 규칙).
// 기존 pages/·components/ import 금지. 스타일은 tw2- 스코프만.
import { Link } from 'react-router-dom';
import useTranslation from '../hooks/useTranslation';
import architectureDiagram from '../assets/v2-safegai-platform-architecture.webp';
import { IconPlatform, IconShield, IconEdge } from '../components/v2/icons';
import '../styles/v2/home-v2.css';
import '../styles/v2/solutions-v2.css';

function SolutionsOverviewV2() {
  const { t, currentLang } = useTranslation();
  const contactPath = `/${currentLang}/safegai-platform`;
  const coreItems = t('v2.solutions.coreItems');

  return (
    <div className="tw2-home tw2-solutions">
      {/* 블록 1 — hero */}
      <section className="tw2-hero">
        <p className="tw2-eyebrow">{t('v2.solutions.heroEyebrow')}</p>
        <h1 className="tw2-hero-title">{t('v2.solutions.heroTitle')}</h1>
        <p className="tw2-hero-sub">{t('v2.solutions.heroSub')}</p>
      </section>

      {/* 블록 2 — 필요성 (Why Now) */}
      <section className="tw2-section">
        <h2 className="tw2-h2">{t('v2.solutions.whyHeading')}</h2>
        <p className="tw2-sub">{t('v2.solutions.whySub')}</p>
        <div className="tw2-axes-grid">
          {[1, 2, 3].map((n) => {
            const whyIcons = {
              1: <IconPlatform className="tw2-axis-icon" />,
              2: <IconShield className="tw2-axis-icon" />,
              3: <IconEdge className="tw2-axis-icon" />,
            };
            return (
              <div key={n} className="tw2-axis-card">
                {whyIcons[n]}
                <h3 className="tw2-axis-name">{t(`v2.solutions.why${n}Title`)}</h3>
                <p className="tw2-about-desc">{t(`v2.solutions.why${n}Desc`)}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 블록 3 — 구조 (다이어그램 + 파이프라인) */}
      <section className="tw2-section">
        <h2 className="tw2-h2">{t('v2.solutions.archHeading')}</h2>
        <p className="tw2-sub">{t('v2.solutions.archSub')}</p>
        <img
          className="tw2-arch-image"
          src={architectureDiagram}
          alt={t('v2.solutions.archImageAlt')}
          loading="lazy"
        />
        <div className="tw2-how-flow tw2-arch-steps">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="tw2-how-step">
              <p className="tw2-how-name">{t(`v2.solutions.arch${n}Title`)}</p>
              <p className="tw2-about-desc">{t(`v2.solutions.arch${n}Desc`)}</p>
            </div>
          ))}
        </div>
        <h3 className="tw2-diag-result-title">{t('v2.solutions.coreLabel')}</h3>
        <div className="tw2-diag-tags">
          {Array.isArray(coreItems) &&
            coreItems.map((item) => <span key={item} className="tw2-tag">{item}</span>)}
        </div>
      </section>

      {/* 블록 4 — 사업화 방향 (3단계) */}
      <section className="tw2-section">
        <h2 className="tw2-h2">{t('v2.solutions.roadmapHeading')}</h2>
        <p className="tw2-sub">{t('v2.solutions.roadmapSub')}</p>
        <div className="tw2-how-flow">
          {[1, 2, 3].map((n) => (
            <div key={n} className="tw2-how-step">
              <p className="tw2-how-name">{t(`v2.solutions.road${n}Title`)}</p>
              <p className="tw2-about-desc">{t(`v2.solutions.road${n}Desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 블록 5 — 도입 효과 (정성 — 임의 수치 금지) */}
      <section className="tw2-section">
        <h2 className="tw2-h2">{t('v2.solutions.effectHeading')}</h2>
        <ul className="tw2-proof-list">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="tw2-proof-item">
              <p className="tw2-proof-item-title">
                <span className="tw2-badge tw2-badge-flagship">{t(`v2.solutions.effect${n}Label`)}</span>
                {t(`v2.solutions.effect${n}Desc`)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* 블록 6 — CTA */}
      <section className="tw2-section tw2-final">
        <h2 className="tw2-h2">{t('v2.solutions.ctaTitle')}</h2>
        <p className="tw2-sub">{t('v2.solutions.ctaBody')}</p>
        <Link className="tw2-btn tw2-btn-primary" to={contactPath}>
          {t('v2.solutions.ctaButton')}
        </Link>
      </section>
    </div>
  );
}

export default SolutionsOverviewV2;

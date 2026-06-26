import React from 'react';
import { BaseLayout } from '../../components/Layout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import useTranslation from '../../hooks/useTranslation';
import company from '../../assets/header_image/company.jpg';
import './OrganizationNew.css';

// 이미지 import
import teamwork from '../../assets/solutions/org/teamwork.jpg';
import techTeam from '../../assets/solutions/org/tech-team.jpg';
import manufacturing from '../../assets/solutions/org/manufacturing.jpg';
import sales from '../../assets/solutions/org/sales.jpg';
import factory from '../../assets/solutions/org/factory.jpg';
import research from '../../assets/solutions/org/research.jpg';
import consulting from '../../assets/solutions/org/consulting.jpg';
import outsource from '../../assets/solutions/org/outsource.jpg';
import telecom from '../../assets/solutions/org/telecom.jpg';

export default function Organization() {
  const { t } = useTranslation();
  return (
    <div className="page-container about-page">
      <ProductHeader image={company} alt="organization" />
      <BaseLayout breadcrumbs={[t('about.breadcrumbs.0'), t('about.orgBreadcrumb')]} title={t('about.orgBreadcrumb')}>
        <div className="org-page">
          {/* 히어로 */}
          <section className="org-hero">
            <div className="org-hero-badge">AI Agent-Driven Organization</div>
            <h1 className="org-hero-title">
              {t('aboutPage.org.hero.titleLine1')}<br />{t('aboutPage.org.hero.titleLine2')}
            </h1>
            <p className="org-hero-desc">
              {t('aboutPage.org.hero.desc')}
            </p>
          </section>

          {/* 조직 구조 차트 */}
          <section className="org-section">
            <div className="org-section-header">
              <span className="org-section-label">Organization Chart</span>
              <h2 className="org-section-title">{t('aboutPage.org.chartTitle')}</h2>
            </div>

            {/* CEO */}
            <div className="org-chart">
              <div className="org-chart-ceo">
                <div className="org-chart-ceo-inner">
                  <div className="org-chart-ceo-icon">
                    <svg viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3>{t('aboutPage.org.ceoTitle')}</h3>
                  <p>CEO</p>
                </div>
              </div>

              {/* 연결선 */}
              <div className="org-chart-connector" />

              {/* 부서 카드 그리드 */}
              <div className="org-chart-departments">
                <DeptCard
                  image={sales}
                  title={t('aboutPage.org.departments.0.title')}
                  subtitle="Technical Sales"
                  items={t('aboutPage.org.departments.0.items')}
                />
                <DeptCard
                  image={techTeam}
                  title={t('aboutPage.org.departments.1.title')}
                  subtitle="Engineering"
                  items={t('aboutPage.org.departments.1.items')}
                />
                <DeptCard
                  image={factory}
                  title={t('aboutPage.org.departments.2.title')}
                  subtitle="Manufacturing"
                  items={t('aboutPage.org.departments.2.items')}
                />
                <DeptCard
                  image={outsource}
                  title={t('aboutPage.org.departments.3.title')}
                  subtitle="Outsourcing Mgmt"
                  items={t('aboutPage.org.departments.3.items')}
                />
                <DeptCard
                  image={research}
                  title={t('aboutPage.org.departments.4.title')}
                  subtitle="R&D Center"
                  items={t('aboutPage.org.departments.4.items')}
                />
                <DeptCard
                  image={consulting}
                  title={t('aboutPage.org.departments.5.title')}
                  subtitle="Expert Advisory"
                  items={t('aboutPage.org.departments.5.items')}
                />
                <DeptCard
                  image={telecom}
                  title={t('aboutPage.org.departments.6.title')}
                  subtitle="ICT Construction"
                  items={t('aboutPage.org.departments.6.items')}
                />
              </div>
            </div>
          </section>

          {/* AI 에이전트 활용 */}
          <section className="org-section">
            <div className="org-section-header">
              <span className="org-section-label">AI-Powered Workflow</span>
              <h2 className="org-section-title">{t('aboutPage.org.ai.title')}</h2>
            </div>
            <div className="org-ai-grid">
              <div className="org-ai-card">
                <div className="org-ai-card-icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 24l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4>{t('aboutPage.org.ai.cards.0.title')}</h4>
                <p>{t('aboutPage.org.ai.cards.0.desc')}</p>
              </div>
              <div className="org-ai-card">
                <div className="org-ai-card-icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2"/>
                    <path d="M24 12v12l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4>{t('aboutPage.org.ai.cards.1.title')}</h4>
                <p>{t('aboutPage.org.ai.cards.1.desc')}</p>
              </div>
              <div className="org-ai-card">
                <div className="org-ai-card-icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <path d="M8 36l8-10 6 6 8-12 10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="6" y="6" width="36" height="36" rx="2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h4>{t('aboutPage.org.ai.cards.2.title')}</h4>
                <p>{t('aboutPage.org.ai.cards.2.desc')}</p>
              </div>
              <div className="org-ai-card">
                <div className="org-ai-card-icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <path d="M12 36V24h6v12M20 36V18h6v18M28 36V12h6v24M36 36V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4>{t('aboutPage.org.ai.cards.3.title')}</h4>
                <p>{t('aboutPage.org.ai.cards.3.desc')}</p>
              </div>
            </div>
          </section>
        </div>
      </BaseLayout>
    </div>
  );
}

// 부서 카드 컴포넌트
function DeptCard({ image, title, subtitle, items }) {
  return (
    <div className="org-dept-card">
      <div className="org-dept-card-img">
        <img src={image} alt={title} />
        <div className="org-dept-card-overlay">
          <span className="org-dept-card-subtitle">{subtitle}</span>
          <h3 className="org-dept-card-title">{title}</h3>
        </div>
      </div>
      <ul className="org-dept-card-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

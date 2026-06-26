import React from 'react';
import './sitemap.css';
import Card from '../../components/Common/Card';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import useTranslation from '../../hooks/useTranslation';
import company from "../../assets/header_image/company.jpg";

export default function Sitemap() {
  const { t, currentLang } = useTranslation();
  const groups = t('ui1.sitemap.groups');

  return (
    <div className="main-content">
        <ProductHeader image={company} alt="company" />
    <div className="sitemap-root">

      <div className="sitemap-columns">
      <div className="sitemap-header">
      <Breadcrumbs breadcrumbs={[t('sitemap.breadcrumbs.0'), t('sitemap.breadcrumbs.1')]} />
        <h1>{t('sitemap.title')}</h1>
      </div>
        {groups.map((group, colIdx) => (
          <div className="sitemap-column" key={colIdx}>
            {/* 그룹 헤더 카드 */}
            <Card title={group.title} className="sitemap-group-header" />

            {/* 각 항목을 개별 카드로 렌더링 */}
            {group.items.map((it, idx) => (
              <Card
                key={idx}
                className="sitemap-item-card"
                onClick={() => {
                  if (!it.path) return;
                  if (it.path.includes('#')) {
                    const [base, hash] = it.path.split('#');
                    if (window.location.pathname !== base) {
                      window.location.href = base + (it.path.includes('http') ? '' : '');
                    }
                    setTimeout(() => {
                      window.location.hash = hash;
                      const el = document.getElementById(hash);
                      if (el) {
                        const headerOffset = 100;
                        const elementPosition = el.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      }
                    }, 250);
                  } else {
                    // use client-side navigation when possible
                    try {
                      window.history.pushState({}, '', it.path);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    } catch (e) {
                      window.location.href = it.path;
                    }
                  }
                }}
              >
                <div className="sitemap-item-text">{it.label || it}</div>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
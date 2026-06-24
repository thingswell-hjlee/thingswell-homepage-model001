import React from 'react';
import './sitemap.css';
import Card from '../../components/Common/Card';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import useTranslation from '../../hooks/useTranslation';
import company from "../../assets/header_image/company.jpg";

export default function Sitemap() {
  const { t, currentLang } = useTranslation();
  const groups = [
    {
      title: '회사',
      items: [
        { label: '회사소개', path: '/about#greeting' },
        { label: '연혁', path: '/about#history' },
        { label: '면허인증특허', path: '/about#certificate' },
        { label: '오시는 길', path: '/about#location' },
        { label: '게시판', path: '/customer-service/announcement' },
      ],
    },
    {
      title: '사업분야',
      items: [
        { label: '산업안전 솔루션', path: '/solutions/overview' },
        { label: '노인장애인안전 솔루션', path: '/solutions/chemical' },
        { label: '통합제어 솔루션', path: '/solutions/manufacturing' },
      ],
    },
    {
      title: '연구개발',
      items: [
        { label: '멀티모달 상황인지', path: '/rnd/multimodal-awareness' },
        { label: '온디바이스 AI', path: '/rnd/on-device-ai' },
        { label: 'RAG 기반 LLM', path: '/rnd/rag-llm' },
        { label: '위험상황 조기감지', path: '/rnd/embedded-system' },
        { label: '인지장애 보조', path: '/rnd/smart-assistive-technology' },
        { label: 'AI 공기질 관리', path: '/rnd/air-quality-management' },
      ],
    },
    {
      title: '제품',
      items: [
        { label: '스마트안전', path: '/products/safety' },
        { label: '관제시스템', path: '/products/monitoring' },
        { label: '통합제어', path: '/products/control/list' },
      ],
    },
    {
      title: '고객사례',
      items: [
        { label: '산업안전자동화', path: '/cases/smart-safety' },
        { label: '스마트통합제어', path: '/cases/integrated-control' },
        { label: '정보통신', path: '/cases/information-communication' },
      ],
    },
  ];

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
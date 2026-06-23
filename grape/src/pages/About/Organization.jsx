import React from 'react';
import { BaseLayout } from '../../components/Layout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
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
  return (
    <div className="page-container about-page">
      <ProductHeader image={company} alt="organization" />
      <BaseLayout breadcrumbs={["Home", "조직도"]} title="조직도">
        <div className="org-page">
          {/* 히어로 */}
          <section className="org-hero">
            <div className="org-hero-badge">AI Agent-Driven Organization</div>
            <h1 className="org-hero-title">
              AI 에이전트를 활용한<br />효율적인 조직 운영
            </h1>
            <p className="org-hero-desc">
              싱스웰은 AI 에이전트 기반의 스마트 워크플로우로 소규모 인력으로도
              대규모 프로젝트를 수행할 수 있는 효율적 조직 구조를 운영합니다.
              각 팀은 AI 도구를 활용하여 개발, 영업, 제조, 연구 전 영역에서
              생산성을 극대화합니다.
            </p>
          </section>

          {/* 조직 구조 차트 */}
          <section className="org-section">
            <div className="org-section-header">
              <span className="org-section-label">Organization Chart</span>
              <h2 className="org-section-title">조직 구조</h2>
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
                  <h3>대표이사</h3>
                  <p>CEO</p>
                </div>
              </div>

              {/* 연결선 */}
              <div className="org-chart-connector" />

              {/* 부서 카드 그리드 */}
              <div className="org-chart-departments">
                <DeptCard
                  image={sales}
                  title="기술영업팀"
                  subtitle="Technical Sales"
                  items={["고객 요구사항 분석", "기술 제안서 작성", "프로젝트 수주 관리", "파트너십 구축"]}
                />
                <DeptCard
                  image={techTeam}
                  title="기술팀"
                  subtitle="Engineering"
                  items={["AI 소프트웨어 개발", "시스템 설계 및 구현", "하드웨어 펌웨어 개발", "QA 테스트 및 검증"]}
                />
                <DeptCard
                  image={factory}
                  title="제조팀"
                  subtitle="Manufacturing"
                  items={["PCB/SMT 제품 생산", "품질 관리 및 검수", "자재 수급 관리", "생산 공정 최적화"]}
                />
                <DeptCard
                  image={outsource}
                  title="외주관리팀"
                  subtitle="Outsourcing Mgmt"
                  items={["협력사 관리 및 평가", "외주 개발 품질 관리", "납기 일정 조율", "비용 효율화"]}
                />
                <DeptCard
                  image={research}
                  title="기업부설연구소"
                  subtitle="R&D Center"
                  items={["AI/ML 핵심 알고리즘 연구", "특허 및 논문 출원", "신기술 PoC 개발", "정부과제 수행"]}
                />
                <DeptCard
                  image={consulting}
                  title="전문위원 그룹"
                  subtitle="Expert Advisory"
                  items={["기술 자문 및 컨설팅", "사업 전략 수립 지원", "품질 인증 자문", "법률/특허 자문"]}
                />
                <DeptCard
                  image={telecom}
                  title="정보통신공사팀"
                  subtitle="ICT Construction"
                  items={["CCTV/네트워크 설치", "통신 인프라 구축", "시스템 통합 시공", "유지보수 운영"]}
                />
              </div>
            </div>
          </section>

          {/* AI 에이전트 활용 */}
          <section className="org-section">
            <div className="org-section-header">
              <span className="org-section-label">AI-Powered Workflow</span>
              <h2 className="org-section-title">AI 에이전트 활용 영역</h2>
            </div>
            <div className="org-ai-grid">
              <div className="org-ai-card">
                <div className="org-ai-card-icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 24l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4>코드 생성 및 리뷰</h4>
                <p>AI 코딩 어시스턴트를 활용한 빠른 개발과 자동 코드 리뷰로 품질 확보</p>
              </div>
              <div className="org-ai-card">
                <div className="org-ai-card-icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2"/>
                    <path d="M24 12v12l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4>프로젝트 관리 자동화</h4>
                <p>일정, 리소스, 리스크를 AI가 분석하여 최적의 프로젝트 운영 지원</p>
              </div>
              <div className="org-ai-card">
                <div className="org-ai-card-icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <path d="M8 36l8-10 6 6 8-12 10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="6" y="6" width="36" height="36" rx="2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h4>데이터 분석 및 리포트</h4>
                <p>영업, 생산, 품질 데이터를 AI가 분석하여 인사이트 도출 및 자동 보고서 생성</p>
              </div>
              <div className="org-ai-card">
                <div className="org-ai-card-icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <path d="M12 36V24h6v12M20 36V18h6v18M28 36V12h6v24M36 36V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4>고객 대응 자동화</h4>
                <p>AI 챗봇과 자동 응대 시스템으로 고객 문의 즉시 처리 및 기술 지원</p>
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

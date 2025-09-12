import React from 'react';
import { BaseLayout } from '../../components/Layout';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import company from '../../assets/header_image/company.jpg';
import './Organization.css';

export default function Organization() {
  return (
    <div className="page-container about-page">
      <ProductHeader image={company} alt="organization" />
      <BaseLayout breadcrumbs={["Home", "조직도"]} title="조직도">
        
      </BaseLayout>
      <div className="organization-section">
          <div className="organization-container">
            <div className="organization-chart">
              {/* 최상위 CEO */}
              <div className="org-level ceo-level">
                <div className="org-box ceo-box">
                  <div className="org-title">CEO</div>
                  <div className="org-subtitle">대표이사</div>
                </div>
              </div>
                            
              {/* 연결선 */}
              <div className="connector-line vertical"></div>
              

              {/* 모든 부서를 한 줄로 */}
              <div className="org-level departments-level">
                <div className="org-box department-box">
                  <div className="org-title">사업전략팀</div>
                  <div className="org-subtitle">Business Strategy</div>
                </div>
                <div className="org-box department-box">
                  <div className="org-title">솔루션기술팀</div>
                  <div className="org-subtitle">Solution Technology</div>
                </div>
                <div className="org-box department-box">
                  <div className="org-title">제품기술팀</div>
                  <div className="org-subtitle">Product Technology</div>
                </div>
                <div className="org-box department-box">
                  <div className="org-title">정보통신기술팀</div>
                  <div className="org-subtitle">ICT Technology</div>
                </div>
                <div className="org-box department-box">
                  <div className="org-title">안전정보통신쇼핑몰</div>
                  <div className="org-subtitle">Safety ICT Mall</div>
                </div>
                <div className="org-box department-box">
                  <div className="org-title">제조공장</div>
                  <div className="org-subtitle">Manufacturing</div>
                </div>
                <div className="org-box department-box">
                  <div className="org-title">AI 반도체 부설연구소</div>
                  <div className="org-subtitle">AI Semiconductor Lab</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import BaseLayout from '../../components/Layout/BaseLayout';
import company from '../../assets/header_image/company.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import construction from '../../assets/construction.jpg';
import logo from '../../assets/logo.png';
import ceo from '../../assets/about/ceo.png';
import './About.css';

const CompanyIntro = () => {
  return (
    <div className="page-container about-page">
      <ProductHeader image={company} alt="company" />
      <BaseLayout breadcrumbs={["Home", "About", "회사소개"]} title="회사소개">
        <div className="solutions-section">
          <div id="greeting" className="about-section-responsive">
            <div className="about-section-value-container-responsive">
              <div className="ceo-container-responsive">
                <div className="ceo-content-responsive">
                  <div className="about-section-title-image-description-responsive">
                    <div className="about-section-title-responsive">
                      <img className="ceo-logo-responsive" src={logo} alt="logo" />
                      <h1>"AI로 지키는 안전, 기술로 여는 미래"</h1>
                    </div>
                    <div className="about-intro-responsive">
                      <p>
                        싱스웰은 풍부한 연구개발 실적과 제품화 경험을 바탕으로, 산업안전과 생활안전의
                        혁신을 선도하는 온디바이스 AI 공간 컴퓨팅 기업으로 성장하고 있습니다.
                        저희가 추구하는 것은 단순한 기술이 아니라, 극한 환경에서도 사람의 생명을 지키고
                        신뢰를 드리는 안전 솔루션입니다.
                        앞으로도 끊임없는 연구와 도전을 통해 고객과 사회가 필요로 하는 가치 있는 혁신을
                        실현해 나가겠습니다.
                      </p>
                      <p className="thank-you-text-responsive">감사합니다.</p>
                    </div>
                  </div>
                  <div className="ceo-info-section-responsive">
                    <div 
                      className="about-section-title-image-responsive"
                      style={{ backgroundImage: `url(${ceo})` }}
                    ></div>
                    <div className="ceo-info-section-content-responsive">
                      <h1>이  학  준</h1>
                      <h2>대표이사</h2>
                      <p>경북대학교 전자공학 석사</p>
                      <p>전 LG전자 중앙연구소 주임연구원</p>
                      <p>KAIST 테크노경영대학원 KVM 과정 수료</p>
                    </div>
                    <div className="ceo-info-section-content-responsive">
                      <p>GOOD Design 조달청장상 수상</p>
                      <p>터치스크린 통합 컨트롤러 (자사브랜드, 프랑스수출)</p>
                      <p>고성능 GPU 기반 비디오 프린프 메인보드 개발 (LG전자)</p>
                      <p>그래픽 카드 개발 (LG전자)</p>
                      <p>DSP 활용 머신비전 장비 개발 (현대전자)</p>
                    </div>
                    <div className="ceo-info-section-content-responsive">
                      <p>ARM 기반 웹비디오폰 메인보드 개발 (삼성전자)</p>
                      <p>ARM 디지털 앨범 (삼성전자)</p>
                      <p>월패드 (현대통신)</p>
                      <p>월패드, 모바일패드 (서울통신)</p>
                      <p>네트웍 컴퓨터 (LG전자, 한솔, 현대)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="core-value-section-responsive">
                <div className="about-section-title-responsive">
                  <p className="about-section-title-subtitle-responsive">Mission </p>
                  <h1 className="about-section-content-title-responsive">미션</h1>
                </div>
                <div className="mission-vision-container-responsive">
                  <div className="mission-card-responsive">
                    <img
                      src={manufacturing}
                      alt="Manufacturing"
                      className="mission-background-responsive"
                    />
                    <div className="mission-overlay-responsive"></div>
                    <div className="mission-content-responsive">
                      <p className="mission-description-responsive">
                        AI 기술을 활용하여 모든 사람들이 안전하고 편리한 환경에서 생활할 수 있도록 혁신적인 솔루션을 제공합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="core-value-section-responsive">
                <div className="about-section-title-responsive">
                  <p className="about-section-title-subtitle-responsive">Vision</p>
                  <h1 className="about-section-content-title-responsive">비전</h1>
                </div>
                <div className="mission-vision-container-responsive">
                  <div className="vision-card-responsive">
                    <img
                      src={construction}
                      alt="Construction"
                      className="vision-background-responsive"
                    />
                    <div className="vision-overlay-responsive"></div>
                    <div className="vision-content-responsive">
                      <p className="vision-description-responsive">
                        멀티모달 상황 인지 기술의 선두주자로서, 안전과 자동화 분야에서 글로벌 리더가 되겠습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="core-value-section-responsive">
                <div className="about-section-title-responsive">
                  <p className="about-section-title-subtitle-responsive">Core Value</p>
                  <h1 className="about-section-content-title-responsive">핵심가치</h1>
                </div>
                <div className="core-value-list-responsive">
                  <ul>
                    <li>
                      <div className="core-value-title-container">도전 (Innovation)</div>
                      <div className="core-value-content">미래지향적 R&D 투자와 핵심기술 내재화를 통한 경쟁력 확보</div>
                    </li>
                    <li>
                      <div className="core-value-title-container">전문성 (Expertise)</div>
                      <div className="core-value-content">AI, 임베디드SW, 정보통신공사 등 원스톱 역량 기반의 솔루션 제공</div>
                    </li>
                    <li>
                      <div className="core-value-title-container">사회적 책임 (Social Impact)</div>
                      <div className="core-value-content">노인·장애인·산업현장 등 안전·복지 향상에 기여하여 공공의 이익 창출</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default CompanyIntro;



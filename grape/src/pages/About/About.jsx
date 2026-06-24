import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useTranslation from "../../hooks/useTranslation";
import "./About.css";
import manufacturing from "../../assets/manufacturing.jpg";
import construction from "../../assets/construction.jpg";
import logo from "../../assets/logo.png";
import ProductHeader from '../../components/ProductPage/ProductHeader';
import company from "../../assets/header_image/company.jpg";
import ContactInfo from "../../components/ContactInfo";
import ceo from "../../assets/about/ceo.png";
import CertificateSection from "../../components/CertificateSection";
import BaseLayout from "../../components/Layout/BaseLayout";

const About = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // URL 해시에 따라 해당 섹션으로 스크롤
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.substring(1); // # 제거

      const scrollToElement = () => {
        let element = document.querySelector(`#${hash}`);
        if (!element) {
          element = document.querySelector(`[name="${hash}"]`);
        }
        if (!element) {
          element = document.querySelector(`.${hash}`);
        }

        if (element) {
          const headerOffset = 120;
          const elementRect = element.getBoundingClientRect();
          const elementTop = elementRect.top + window.pageYOffset;
          const scrollTop = elementTop - headerOffset;

          console.log("About page scrolling to:", hash, "position:", scrollTop);

          window.scrollTo({
            top: scrollTop,
            behavior: "smooth",
          });
        } else {
          const hashElement = document.getElementById(hash);
          if (hashElement) {
            hashElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      };

      // 여러 번 시도하여 확실히 실행되도록 함
      scrollToElement();
      setTimeout(scrollToElement, 50);
      setTimeout(scrollToElement, 200);
      setTimeout(scrollToElement, 500);
    }
  }, [location.hash]);
  
  return (
    <div className="page-container about-page">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <ProductHeader image={company} alt="company" />

            <BaseLayout 
              breadcrumbs={[t('about.breadcrumbs.0'), "About"]}
              title={t('about.title')}
            >
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
                            <strong>도전 (Innovation)</strong>미래지향적 R&D 투자와 핵심기술 내재화를 통한 경쟁력 확보
                          </li>
                          <li>
                            <strong>전문성 (Expertise)</strong>AI, 임베디드SW, 정보통신공사 등 원스톱 역량 기반의 솔루션 제공
                          </li>
                          <li>
                            <strong>사회적 책임 (Social Impact)</strong>노인·장애인·산업현장 등 안전·복지 향상에 기여하여 공공의 이익 창출
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="history" className="about-section">
                  <div className="about-section-title-image-container">
                    <div className="about-section-title">
                      <p className="about-section-title-subtitle">
                        Company History
                      </p>
                      <h1 className="about-section-content-title">연혁</h1>
                    </div>
                    <div className="timeline-container">
                      <div className="timeline">
                        <div className="timeline-item">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <div className="timeline-date">2025</div>
                            <div className="timeline-title">
                              산업안전 솔루션 출시
                            </div>
                            <div className="timeline-description">
                              <ul>
                                <li>
                                  2025. 서울시 중구 20개소 버스 쉼터 원격관리
                                  시스템 공급
                                </li>
                                <li>
                                  2025. 서울시 강남구 20개소 버스 쉼터 원격관리
                                  시스템 공급
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <div className="timeline-date">2024</div>
                            <div className="timeline-title">
                              AI 기반 솔루션 및 플랫폼 출시
                            </div>
                            <div className="timeline-description">
                              <ul>
                                <li>
                                  2024. 2 서울시 중구 20개소 버스 쉼터 원격관리
                                  시스템 공급
                                </li>
                                <li>
                                  2024. 3 서울시 강남구 20개소 버스 쉼터 원격관리
                                  시스템 공급
                                </li>
                                <li>
                                  2024. 5 신 사옥의 다목적 대형 강의 디밍 조명
                                  통합제어, 영상 음향 설비 자동화 솔루션 공급 -
                                  이트너스
                                </li>
                                <li>
                                  2024. 6 AI SoC 기반의 인지장애 고령인·장애인
                                  멀티모달 홈 케어 제품 및 서비스 개발 -
                                  보건복지부 협약
                                </li>
                                <li>
                                  2024. 7 서울시 중구 40개 IP 카메라의 AI 안전
                                  피플 카운팅 및 쓰러짐 감지 시스템 공급
                                </li>
                                <li>
                                  2024. 8 고려대학교 생명과학대학 서관 PBL 강의실
                                  2개실 통합제어시스템 구축
                                </li>
                                <li>
                                  2024. 11 가천대학교 가천관 12층 교무회의실
                                  통합제어시스템 구축
                                </li>
                                <li>
                                  2024. 11 안전, 웰빙, 자동화를 제공하는 AI 기반
                                  공간 통합관리 시스템 HumanSense AI Platform 출시
                                  <br />
                                  <span
                                    style={{
                                      fontSize: "0.95em",
                                      color: "var(--color-text-secondary)",
                                    }}
                                  >
                                    (노인과 장애인, 근로자의 안전, 치유, 생산성
                                    향상이라는 핵심 가치를 제공하며, 다양한 분야에
                                    적용 가능한 솔루션)
                                  </span>
                                </li>
                                <li>
                                  2024. 12 R&D 기업신용평가 B+ (Kora Rating &
                                  Data)
                                </li>
                                <li>
                                  2024. 12 비접촉식 응급상황 모니터링 알람 및
                                  정신건강 테라피 시스템 연구 개발과제 완료
                                  (우수판정)
                                </li>
                                <li>
                                  2024. 12 동안구 공영주차장 및 안심귀갓길 CCTV
                                  설치 준공 완료
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <div className="timeline-date">2023</div>
                            <div className="timeline-title">
                              디지털/스마트 시스템 구축 및 사업 확대
                            </div>
                            <div className="timeline-description">
                              <ul>
                                <li>
                                  2023. 1 디지털 VR 가상현실/디지털 트윈룸 시스템
                                  납품 계약
                                </li>
                                <li>
                                  2023. 1 TI Fluid System 디지털 VR 룸 구축 -
                                  글로벌 영국 자동차 부품 공급사
                                </li>
                                <li>
                                  2023. 2 부산송도 힐스테이트 이진베이시티 Wyndhan
                                  Grand Busan 호텔 2층 연회장 구축
                                </li>
                                <li>
                                  2023. 3 국가정보자원관리원 공주센터
                                  화자추적시스템
                                </li>
                                <li>
                                  2023. 4 경상국립대학교 4,200t급 LNG 어업실습선
                                  새바다호 강의실 통합제어시스템 구축
                                </li>
                                <li>2023. 7 정보통신 공사 면허 취득</li>
                                <li>
                                  2023. 8 용인시청 4층 회의실
                                  리프트(모니터/마이크) 원격제어시스템 구축
                                </li>
                                <li>
                                  2023. 10 자운대 OO학교 국군종합의무훈련센터
                                  2개실 통합제어시스템 구축
                                </li>
                                <li>
                                  2023. 11 안동시민회관 대동관 낙동홀
                                  통합제어시스템 구축
                                </li>
                                <li>
                                  2023. 12 국방조사본부 OO센터 상황분석시스템
                                  통합제어시스템 구축
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <div className="timeline-date">2022</div>
                            <div className="timeline-title">
                              특허 등록 및 다양한 시스템 개발
                            </div>
                            <div className="timeline-description">
                              <ul>
                                <li>
                                  2022. 6 머신러닝, 감정인식 감성공간 특허 등록
                                  2건
                                </li>
                                <li>
                                  2022. 6 비접촉식 응급상황 모니터링 알람 및
                                  정신건강 테라피 시스템 개발 - 중기부
                                </li>
                                <li>
                                  2022. 8 고령인, 장애인 보조기기 사용성평가실
                                  통합제어시스템 구축 - 국민건강보험공단
                                </li>
                                <li>
                                  2022. 9 이동형 비디오 카메라를 이용한 영상 전송
                                  및 저장 장치 시스템 개발 납품 - 국민건강보험공단
                                </li>
                                <li>
                                  2022. 10 비접촉식 레이더 SoC 반도체 기반의
                                  바이탈사인과 공기질 정보를 이용한 안전 힐링
                                  시스템 개발
                                </li>
                                <li>
                                  2022. 12 5성급 힐튼 호텔 연회장 및 컨퍼런스룸
                                  12개실 통합제어 시스템 납품 및 구축
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <div className="timeline-date">2021</div>
                            <div className="timeline-title">
                              솔루션 사업부 신설 및 제품 출시
                            </div>
                            <div className="timeline-description">
                              <ul>
                                <li>2021. 1 솔루션 사업부 신설</li>
                                <li>
                                  2021. 6 mmWave Radar Vital signs 데이터 처리
                                  모듈 납품 및 교육 - 숭실대학교
                                </li>
                                <li>
                                  2021. 10 업무용, 휴식용 스마트 쉘터 제품 시제품
                                  출시
                                </li>
                                <li>
                                  2021. 11 인공지능 감성인식 스마트 공간 솔루션
                                  출시
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <div className="timeline-date">2020</div>
                            <div className="timeline-title">
                              벤처기업 등록 및 제품화
                            </div>
                            <div className="timeline-description">
                              <ul>
                                <li>2020. 7 벤처기업 등록</li>
                                <li>
                                  2020. 8 스마트 공기질 및 상황 감지 스케줄 관리
                                  솔루션 제품화
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <div className="timeline-date">2019</div>
                            <div className="timeline-title">
                              사업 확장 및 연구소 설립
                            </div>
                            <div className="timeline-description">
                              <ul>
                                <li>2019. 4 공장등록</li>
                                <li>
                                  2019. 6 방송 음향 설비 통합제어 시스템 기반의
                                  자동화 솔루션 개발
                                </li>
                                <li>2019. 8 기업부설연구소 설립</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <div className="timeline-date">2018</div>
                            <div className="timeline-title">회사 설립</div>
                            <div className="timeline-description">
                              <ul>
                                <li>2018. 1 (주)싱스웰 설립</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CertificateSection />
                <div id="location" className="about-section">
                  <div className="about-section-title-image-container">
                    <div className="about-section-title">
                      <p className="about-section-title-subtitle">
                        Location & Contact
                      </p>
                      <h1 className="about-section-content-title">오시는 길</h1>
                    </div>
                    <div className="location-container">
                      <div className="map-container">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.532835223222!2d126.96427059698114!3d37.40087886162995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b5e3a312a3d07%3A0x8362eaabc267ff81!2z6riI6rCV7Y6c7YWM66as7JuASVTtg4Dsm4w!5e0!3m2!1sko!2skr!4v1752822417888!5m2!1sko!2skr" width="100%" height="300" style={{ border: 0, width: '100%' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                      </div>
                    </div>
                  </div>
                </div>
                <ContactInfo />
              </div>
            </BaseLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


import React from 'react';
import SolutionCard from '../../components/SolutionCard.jsx';
import './About.css';
import ceo from '../../assets/ceo.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import construction from '../../assets/construction.jpg';
import OpenStreetMap from '../../components/OpenStreetMap.jsx';

const About = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
          <div className="solutions-section">
              <SolutionCard subtitle="About" title="회사소개" showButton={false} link="/solutions/detail" className="custom-solution-left" variant="hero" reverse={false} />
            </div>
            <div className="about-section">
                <div className="about-section-title-image-container">
                    <div className="about-section-title">
                        <p className="about-section-title-subtitle">CEO's Greeting</p>
                        <h1 className="about-section-content-title">인사말</h1>
                    </div>
                    <div className="about-section-content-container">
                        <div className="about-section-title-image">
                            <img src={ceo} alt="ceo" />
                        </div>
                        <div className="about-section-title-image-description">
                            <p>(주)싱스웰(Thingswell Co., Ltd.)은  AI 에이전트를 활용한 멀티모달 상황 인지를 기반으로, 근로자와 노인, 장애인을 위한 안전·자동화 플랫폼 솔루션에 특화된 기업입니다. 다양한 센서(음향·영상·동작 등)와 무선 통신, 빅데이터 분석 기술을 결합하여 실시간으로 주변 환경을 모니터링하고 이상 상태를 조기에 감지함으로써, 사고를 예방하고 긴급 상황에서 즉각적인 대응이 가능하도록 지원합니다.</p>
                            <h2>(주) 싱스웰  대표이사</h2>
                            <h3>이 학 준</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-section">
                <div className="about-section-title-image-container">
                    <div className="about-section-title">
                        <p className="about-section-title-subtitle">Mission and Vision</p>
                        <h1 className="about-section-content-title">미션 및 비전</h1>
                    </div>
                    <div className="mission-vision-container">
                        <div className="mission-card">
                            <img src={manufacturing} alt="Manufacturing" className="mission-background" />
                            <div className="mission-overlay">
                            </div>
                            <div className="mission-content">
                                <h3 className="mission-title">미션</h3>
                                <p className="mission-description">
                                    AI 기술을 활용하여 모든 사람들이 안전하고 편리한 환경에서 생활할 수 있도록 혁신적인 솔루션을 제공합니다.
                                </p>
                            </div>
                        </div>
                        <div className="vision-card">
                            <img src={construction} alt="Construction" className="vision-background" />
                            <div className="vision-overlay">
                            </div>
                            <div className="vision-content">
                                <h3 className="vision-title">비전</h3>
                                <p className="vision-description">
                                    멀티모달 상황 인지 기술의 선두주자로서, 안전과 자동화 분야에서 글로벌 리더가 되겠습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-section">
                <div className="about-section-title-image-container">
                    <div className="about-section-title">
                        <p className="about-section-title-subtitle">Company History</p>
                        <h1 className="about-section-content-title">연혁</h1>
                    </div>
                    <div className="timeline-container">
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <div className="timeline-date">2018</div>
                                    <div className="timeline-title">회사 설립</div>
                                    <div className="timeline-description">
                                        <ul>
                                            <li>2018. 1  (주)싱스웰 설립</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <div className="timeline-date">2019</div>
                                    <div className="timeline-title">사업 확장 및 연구소 설립</div>
                                    <div className="timeline-description">
                                        <ul>
                                            <li>2019. 4  공장등록</li>
                                            <li>2019. 6  방송 음향 설비 통합제어 시스템 기반의 자동화 솔루션 개발</li>
                                            <li>2019. 8  기업부설연구소 설립</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <div className="timeline-date">2020</div>
                                    <div className="timeline-title">벤처기업 등록 및 제품화</div>
                                    <div className="timeline-description">
                                        <ul>
                                            <li>2020. 7  벤처기업 등록</li>
                                            <li>2020. 8  스마트 공기질 및 상황 감지 스케줄 관리 솔루션 제품화</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <div className="timeline-date">2021</div>
                                    <div className="timeline-title">솔루션 사업부 신설 및 제품 출시</div>
                                    <div className="timeline-description">
                                        <ul>
                                            <li>2021. 1  솔루션 사업부 신설</li>
                                            <li>2021. 6  mmWave Radar Vital signs 데이터 처리 모듈 납품 및 교육 - 숭실대학교</li>
                                            <li>2021. 10 업무용, 휴식용 스마트 쉘터 제품 시제품 출시</li>
                                            <li>2021. 11 인공지능 감성인식 스마트 공간 솔루션 출시</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <div className="timeline-date">2022</div>
                                    <div className="timeline-title">특허 등록 및 다양한 시스템 개발</div>
                                    <div className="timeline-description">
                                        <ul>
                                            <li>2022. 6  머신러닝, 감정인식 감성공간 특허 등록 2건</li>
                                            <li>2022. 6  비접촉식 응급상황 모니터링 알람 및 정신건강 테라피 시스템 개발 - 중기부</li>
                                            <li>2022. 8  고령인, 장애인 보조기기 사용성평가실 통합제어시스템 구축 - 국민건강보험공단</li>
                                            <li>2022. 9  이동형 비디오 카메라를 이용한 영상 전송 및 저장 장치 시스템 개발 납품 - 국민건강보험공단</li>
                                            <li>2022. 10 비접촉식 레이더 SoC 반도체 기반의 바이탈사인과 공기질 정보를 이용한 안전 힐링 시스템 개발</li>
                                            <li>2022. 12 5성급 힐튼 호텔 연회장 및 컨퍼런스룸 12개실 통합제어 시스템 납품 및 구축</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <div className="timeline-date">2023</div>
                                    <div className="timeline-title">디지털/스마트 시스템 구축 및 사업 확대</div>
                                    <div className="timeline-description">
                                        <ul>
                                            <li>2023. 1  디지털 VR 가상현실/디지털 트윈룸 시스템 납품 계약</li>
                                            <li>2023. 1  TI Fluid System 디지털 VR 룸 구축 - 글로벌 영국 자동차 부품 공급사</li>
                                            <li>2023. 2  부산송도 힐스테이트 이진베이시티 Wyndhan Grand Busan 호텔 2층 연회장 구축</li>
                                            <li>2023. 3  국가정보자원관리원 공주센터 화자추적시스템</li>
                                            <li>2023. 4  경상국립대학교 4,200t급 LNG 어업실습선 새바다호 강의실 통합제어시스템 구축</li>
                                            <li>2023. 7  정보통신 공사 면허 취득</li>
                                            <li>2023. 8  용인시청 4층 회의실 리프트(모니터/마이크) 원격제어시스템 구축</li>
                                            <li>2023. 10 자운대 OO학교 국군종합의무훈련센터 2개실 통합제어시스템 구축</li>
                                            <li>2023. 11 안동시민회관 대동관 낙동홀 통합제어시스템 구축</li>
                                            <li>2023. 12 국방조사본부 OO센터 상황분석시스템 통합제어시스템 구축</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <div className="timeline-date">2024</div>
                                    <div className="timeline-title">AI 기반 솔루션 및 플랫폼 출시</div>
                                    <div className="timeline-description">
                                        <ul>
                                            <li>2024. 2  서울시 중구 20개소 버스 쉼터 원격관리 시스템 공급</li>
                                            <li>2024. 3  서울시 강남구 20개소 버스 쉼터 원격관리 시스템 공급</li>
                                            <li>2024. 5  신 사옥의 다목적 대형 강의 디밍 조명 통합제어, 영상 음향 설비 자동화 솔루션 공급 - 이트너스</li>
                                            <li>2024. 6  AI SoC 기반의 인지장애 고령인·장애인 멀티모달 홈 케어 제품 및 서비스 개발 - 보건복지부 협약</li>
                                            <li>2024. 7  서울시 중구 40개 IP 카메라의 AI 안전 피플 카운팅 및 쓰러짐 감지 시스템 공급</li>
                                            <li>2024. 8  고려대학교 생명과학대학 서관 PBL 강의실 2개실 통합제어시스템 구축</li>
                                            <li>2024. 11 가천대학교 가천관 12층 교무회의실 통합제어시스템 구축</li>
                                            <li>2024. 11 안전, 웰빙, 자동화를 제공하는 AI 기반 공간 통합관리 시스템 HumanSense AI Platform 출시<br />
                                                <span style={{fontSize: "0.95em", color: "var(--color-text-secondary)"}}>
                                                    (노인과 장애인, 근로자의 안전, 치유, 생산성 향상이라는 핵심 가치를 제공하며, 다양한 분야에 적용 가능한 솔루션)
                                                </span>
                                            </li>
                                            <li>2024. 12 R&D 기업신용평가 B+ (Kora Rating & Data)</li>
                                            <li>2024. 12 비접촉식 응급상황 모니터링 알람 및 정신건강 테라피 시스템 연구 개발과제 완료 (우수판정)</li>
                                            <li>2024. 12 동안구 공영주차장 및 안심귀갓길 CCTV 설치 준공 완료</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-section">
                <div className="about-section-title-image-container">
                    <div className="about-section-title">
                        <p className="about-section-title-subtitle">Location & Contact</p>
                        <h1 className="about-section-content-title">오시는 길</h1>
                    </div>
                    <div className="location-container">
                        <div className="map-container">
                            <OpenStreetMap 
                                address="경기 안양시 동안구 학의로 2825 금강펜타리움 IT타워 A동 1302호"
                                companyName="(주)싱스웰"
                            /> 
                        </div>
                        <div className="location-info">
                            <div className="location-card">
                                <h3 className="location-title">주소</h3>
                                <p className="location-text">
                                경기 안양시 동안구 학의로 2825<br />
                                금강펜타리움 IT타워 A동 1302호
                                </p>
                            </div>
                            <div className="location-card">
                                <h3 className="location-title">연락처</h3>
                                <p className="location-text">
                                    전화: 031-689-5959<br />
                                    팩스: 031-689-5959<br />
                                    이메일: well@thingswell.co.kr
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;  
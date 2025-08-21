import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import './Soulution.css';
import ProductInfo from '../../components/ProductPage/ProductInfo';
import FeatureDescription from '../../components/FeatureDescription';
import ai from '../../assets/rnd_main/AI.png';

const ON_DEVICE_AI_CARDS = [
  {
    image: ai,
    subtitle: "현장 사고 예방의 신속한 보디가드",
    description: [
      "첨단 기술이 안전을 책임지는 시대, 산업 현장의 패러다임을 바꿀 '온디바이스 AI'가 등장했습니다. 이 기술은 마치 현장 작업자의 든든한 보디가드처럼, 위험을 즉각적으로 감지하고 사고를 미연에 방지합니다.",
      "온디바이스 AI의 가장 큰 매력은 바로 '신속함'입니다. 기존의 클라우드 기반 AI는 데이터를 서버로 보낸 후 분석하는 과정을 거치기에 필연적으로 지연이 발생했지만, 온디바이스 AI는 장비 자체에서 모든 것을 처리합니다. 추락, 충돌 등 순간적인 사고가 발생하는 현장에서 수 밀리초(ms) 단위의 빠른 판단은 생명을 살리는 결정적 차이를 만듭니다.",
      "또한, 이 기술은 다양한 환경에 완벽하게 적응합니다. RGB 카메라의 시각적 정보에 ToF(거리 측정)와 레이더(움직임 감지) 센서 데이터를 융합하여 어두운 환경이나 통신이 두절된 지하, 터널에서도 빈틈없이 위험을 탐지합니다. 작업자가 쓰러지거나 금지 구역에 진입하는 순간, 음성이나 시각적 경고를 즉시 전달해 위험을 알립니다.",
      "온디바이스 AI는 단순한 기술을 넘어, 안전을 최우선으로 하는 산업 현장의 새로운 기준을 제시하고 있습니다. 이제 기술의 힘으로 더 안전하고 효율적인 작업 환경을 구축할 수 있습니다."
    ],
  }
];

const OnDeviceAI = () => {
  return (
    <div className="gs-page">
      <ProductHeader />
      <div className="product-page-content">
          <div className="container">
            <ProductInfo productName="온디바이스 AI" productTitle="온디바이스 AI" breadcrumbs={["Home", "연구개발", "온디바이스 AI"]} />
          </div>

          {/* FeatureDescription 카드 섹션 */}
          <div className="container">
            <div className="feature-cards-section">
              {ON_DEVICE_AI_CARDS.map((card, index) => (
                <FeatureDescription
                  key={index}
                  image={card.image}
                  title={card.title}
                  subtitle={card.subtitle}
                  description={card.description}
                  link={card.link}
                />
              ))}
            </div>
          </div>
        <div className="gs-container">

        <section className="gs-section">
          <h3><span className="num">1</span> 개요</h3>
          <p className="gs-text">
            당사는 산업안전 분야에 특화된 온디바이스 AI(On-Device Artificial Intelligence) 기술을 개발하여,
            통신이 불안정하거나 제한된 환경에서도 실시간으로 위험을 감지하고 즉각적으로 대응할 수 있는 솔루션을 제공합니다.
            현장에서 센서 데이터와 AI 알고리즘을 직접 처리함으로써 지연 없는 판단, 개인정보 보호, 저전력 운영을 동시에 실현합니다.
          </p>
        </section>

        <section className="gs-section">
          <h3><span className="num">2</span> 기술 구성 및 특징</h3>
          <div className="gs-table-wrapper">
            <table className="gs-table">
              <thead>
                <tr>
                  <th className="col-type">구성 요소</th>
                  <th>설명</th>
                  <th>주요 기능</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-type">온디바이스 AI 추론</td>
                  <td>NVIDIA Jetson Orin Nano, Rockchip, ARM 기반 고성능 엣지 하드웨어</td>
                  <td>카메라/레이더/ToF 등 센서 데이터의 AI 모델 실시간 처리</td>
                </tr>
                <tr>
                  <td className="col-type">멀티모달 센서 통합</td>
                  <td>RGB 카메라, ToF(Time of Flight), 레이더, IMU, 가스 센서 등</td>
                  <td>복합 센서 융합으로 정확하고 신뢰성 높은 위험 상황 판단</td>
                </tr>
                <tr>
                  <td className="col-type">로컬 알림 및 제어</td>
                  <td>음성 안내, 고휘도 LED 경고, 무선 송신기/릴레이 제어</td>
                  <td>외부 통신망 없이도 현장에서 즉시 경고 및 제어 신호 전달</td>
                </tr>
                <tr>
                  <td className="col-type">모듈화 설계</td>
                  <td>모바일 캠, 마운트 캠, 스마트 센서 등 다양한 모듈 폼팩터</td>
                  <td>현장 조건에 맞춘 유연한 설치와 기능 확장</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="gs-section">
          <h3><span className="num">3</span> 주요 기능 및 적용 시나리오</h3>
          <ul className="gs-list">
            <li>
              <strong>실시간 객체·행동 인식</strong> — 쓰러짐, 금지 구역 진입, 구조 신호(손 흔들기) 등 다양한 행동을 실시간 감지합니다.
              경량화된 모델(YOLOv11, MediaPipe, Pose Estimation 등)로 온디바이스 환경에서 효율 동작.
            </li>
            <li>
              <strong>비정상 상황 탐지 및 알림</strong> — 레이더·ToF로 비가시 영역 움직임을 인식하고 비정상 상황을 탐지, 음성/시각 경고로 즉시 알림.
            </li>
            <li>
              <strong>스마트 PPE 연동 및 데이터 로깅</strong> — BLE/MQTT로 모바일 센서(온습도, 가스, 위치 등) 연동, 이상 감지 시 자동 보고·알림 및 로그 축적.
            </li>
            <li>
              <strong>네트워크 불가 환경 대응</strong> — 통신 인프라가 취약한 현장에서도 완전 독립적으로 동작하여 안정적 운영 보장.
            </li>
          </ul>
        </section>

        <section className="gs-section">
          <h3><span className="num">4</span> 기술적 차별성</h3>
          <div className="gs-table-wrapper">
            <table className="gs-table">
              <thead>
                <tr>
                  <th className="col-type">항목</th>
                  <th>자사 온디바이스 AI</th>
                  <th>기존 클라우드 AI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-type">처리 위치</td>
                  <td>장치 내 실시간 연산</td>
                  <td>외부 클라우드 서버 의존</td>
                </tr>
                <tr>
                  <td className="col-type">통신 의존성</td>
                  <td>낮음 (오프라인 동작 가능)</td>
                  <td>높음 (실시간 통신 필수)</td>
                </tr>
                <tr>
                  <td className="col-type">개인정보 보호</td>
                  <td>영상/음성 데이터의 외부 전송 최소화</td>
                  <td>전송 과정에서 개인정보 유출 가능성</td>
                </tr>
                <tr>
                  <td className="col-type">지연 시간</td>
                  <td>수 ms 단위의 즉각 응답</td>
                  <td>네트워크 상태에 따라 수 초 이상 지연</td>
                </tr>
                <tr>
                  <td className="col-type">설치 유연성</td>
                  <td>무전원/저전력 설계로 설치 용이</td>
                  <td>전력·통신 인프라 구축 필요</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="gs-section">
          <h3><span className="num">5</span> 적용 가능 산업 환경</h3>
          <ul className="gs-list">
            <li>건설 현장: 고소 작업 위험 행동 감지, 비가시 구역 접근 감시</li>
            <li>제조 공장: 설비·중장비 위험 구역 접근 감지 및 이상 행동 모니터링</li>
            <li>터널/지하 작업장: 통신 차단 구간에서 독립적 위험 탐지·경고</li>
            <li>물류센터/창고: 지게차-작업자 충돌 위험 감지, 접근 제한 구역 모니터링</li>
            <li>지자체/공공시설: 화재·침수 등 긴급 상황 감지</li>
          </ul>
        </section>

        <section className="gs-section">
          <h3><span className="num">6</span> 서비스 제공 항목</h3>
          <ul className="gs-list">
            <li>온디바이스 AI 기반 POC 제품 및 시스템 개발</li>
            <li>현장 맞춤형 센서 조합 설계 및 최적화</li>
            <li>Jetson Orin, Rockchip 기반 AI 모델 최적화 서비스</li>
            <li>산업안전 AI 성능 시험 및 KOLAS 대응 지원</li>
            <li>Edge-to-Cloud 연동 및 관리자용 대시보드 구축</li>
          </ul>
        </section>
      </div>
      </div>
    </div>
  );
};

export default OnDeviceAI;



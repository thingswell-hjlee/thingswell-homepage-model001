import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import rndHeader from '../../assets/header_image/rnd.jpg';
import './Rnd.css';
import multimodal from '../../assets/rnd_main/multimodal.png';
import { BaseLayout } from '../../components/Layout';
import useTranslation from '../../hooks/useTranslation';
// Breadcrumbs는 BaseLayout이 렌더링하므로 여기서는 배열만 전달합니다.

const MULTIMODAL_CARDS = [
  {
    image: multimodal,
    subtitle: "산업 현장의 든든한 안전 지킴이",
    description: [
      "'멀티모달 상황인지 기술'은 산업 현장의 안전을 한 차원 높여줄 혁신적인 시스템입니다. 이 기술은 마치 사람의 눈과 귀처럼 RGB 카메라, ToF(거리 측정) 센서, UWB(초광대역) 레이더 센서 등 다양한 정보를 종합적으로 인지하고 융합합니다.",
      "기존 카메라만으로는 어려웠던 조도 변화, 먼지, 가려짐 같은 환경에서도 빛의 영향을 받지 않고 정확하게 감지할 수 있어 강력한 적응성을 자랑합니다.",
      "이 기술의 핵심은 '온디바이스 AI'에 있습니다. 현장에서 실시간으로 작업자의 쓰러짐이나 추락 같은 이상 행동을 즉시 감지하고, 중장비의 위험 접근을 정밀하게 파악해 충돌 사고를 예방합니다. 특히 레이더를 활용해 눈에 보이지 않는 사각지대까지 감지하여 안전 사각지대를 최소화하는 데 큰 역할을 합니다.",
      "위험 상황 발생 시 작업자에게 음성, 화면, 모바일 앱 등으로 즉시 경고 알림을 전달하며, 스마트 PPE(개인 보호 장비)와 연동하여 유해가스나 온도 변화까지 모니터링해 작업자들을 더욱 안전하게 보호합니다. 단일 센서의 한계를 넘어선 멀티모달 융합 기술은 산업 현장의 안전을 한 차원 끌어올릴 것으로 기대됩니다."
    ],
  }
];

const MultimodalAwareness = () => {
  const { t } = useTranslation();
  return (
    <BaseLayout
      header={() => <ProductHeader image={rndHeader} />}
      breadcrumbs={[t('rnd.breadcrumbs.0'), t('rnd.breadcrumbs.1'), t('rnd.multimodal.breadcrumb')]}
      title={t('rnd.multimodal.title')}
      subtitle={t('rnd.multimodal.subtitle')}
    >
      <div className="product-page-content">
        {/* RND 전용 FeatureDescription 카드 섹션 */}
        <div className="container">
          <div className="rnd-feature-cards-section">
            {MULTIMODAL_CARDS.map((card, index) => (
              <div key={index} className="rnd-feature-description-container">
                <div className="rnd-feature-description-image-section">
                  <img src={card.image} alt="feature" className="rnd-feature-description-image" />
                </div>
                <div className="rnd-feature-description-text-section">
                  {card.subtitle && (
                    <h2 className="rnd-feature-description-subtitle">{card.subtitle}</h2>
                  )}
                  <div className="rnd-feature-description-list">
                    {card.description.map((item, idx) => (
                      <p key={idx} className="rnd-feature-description-list-item">{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gs-container">
          <section className="gs-section">
            <h3><span className="num">1</span> 개요</h3>
            <p className="gs-text">
              당사는 산업 현장의 안전을 실시간으로 확보하기 위해 RGB 카메라, Time-of-Flight(ToF) 센서, UWB Radar 센서를 융합한 멀티모달 상황인지 기술을 개발 및 상용화하고 있습니다.
              이 기술은 기존 단일 센서 기반 감지의 한계를 극복하여, 조도 변화, 차폐, 분진 등 다양한 환경에서도 정확한 위험 인지 및 대응을 가능하게 합니다.
            </p>
          </section>

          <section className="gs-section">
            <h3><span className="num">2</span> 핵심 기술 구성</h3>
            <div className="gs-table-wrapper">
              <table className="gs-table">
                <thead>
                  <tr>
                    <th className="col-type">기술 구성요소</th>
                    <th>주요 기능</th>
                    <th>활용 목적</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="col-type">RGB 카메라</td>
                    <td>객체 탐지 (YOLOv11), 행동 인식 (MediaPipe 등)</td>
                    <td>작업자 인식, 행위 감시</td>
                  </tr>
                  <tr>
                    <td className="col-type">ToF(Time-of-Flight) 센서</td>
                    <td>거리/깊이 측정, 영역 내 접근 감지</td>
                    <td>거리 기반 접근 감지, 위험 거리 탐지</td>
                  </tr>
                  <tr>
                    <td className="col-type">UWB Radar(초광대역)</td>
                    <td>움직임 감지, 방향/속도 추정</td>
                    <td>차폐 환경의 비가시 영역 감지</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="gs-section">
            <h3><span className="num">3</span> 적용 가능한 주요 서비스</h3>
            <ul className="gs-list">
              <li>
                <strong>작업자 행동 감지 및 위험 경고 시스템</strong> — 쓰러짐/추락/과도한 움직임/이상 행동을 자동 감지해 사고를 예방하고,
                감지 즉시 음성·화면·모바일 앱 등 다양한 채널로 경고 알림을 제공합니다.
              </li>
              <li>
                <strong>차량 및 중장비 접근 위험 감지</strong> — Radar 기반으로 방향·접근 속도를 정확히 감지하고,
                작업자의 사각지대 접근 시 즉시 경고를 발생시켜 충돌 사고를 방지합니다.
              </li>
              <li>
                <strong>어두운 환경 및 차폐 구간 감시 강화</strong> — ToF·Radar 융합으로 카메라 한계를 극복하여,
                밀폐 공간/야간/터널 등 낮은 조도 환경에서도 정확한 위험 감지를 수행합니다.
              </li>
              <li>
                <strong>스마트 PPE 연동</strong> — BLE 기반 스마트 PPE와 연동하여 개인별 환경 변화를 모니터링하고,
                유해가스·온도 변화 등 이상 감지 시 즉시 알림을 전송합니다.
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
                    <th>자사 기술 (멀티모달 융합)</th>
                    <th>기존 기술 (단일 센서)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="col-type">조도 영향</td>
                    <td>낮음 (Radar/ToF 병용으로 빛에 무관)</td>
                    <td>높음 (RGB 단독 사용 시)</td>
                  </tr>
                  <tr>
                    <td className="col-type">감지 정확도</td>
                    <td>3개 센서 융합으로 상황별 최적화</td>
                    <td>단일 센서 성능에 따라 제한</td>
                  </tr>
                  <tr>
                    <td className="col-type">실시간성</td>
                    <td>온디바이스 AI (Jetson Orin 등) 기반</td>
                    <td>클라우드 의존 ↑, 지연 가능</td>
                  </tr>
                  <tr>
                    <td className="col-type">통신 불가 지역 대응</td>
                    <td>엣지 컴퓨팅 기반 독립 동작</td>
                    <td>통신 장애 시 기능 제한</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default MultimodalAwareness;



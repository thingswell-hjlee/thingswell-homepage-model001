import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import rndHeader from '../../assets/header_image/rnd.jpg';
import './Rnd.css';
import danger from '../../assets/rnd_main/danger.png';
import { BaseLayout } from '../../components/Layout';
import useTranslation from '../../hooks/useTranslation';
// Breadcrumbs는 BaseLayout이 렌더링하므로 여기서는 배열만 전달합니다.

const EMBEDDED_SYSTEM_CARDS = [
  {
    image: danger,
    subtitle: "의료 현장의 환자 안전 강화",
    description: [
      "병원과 요양 시설에 최적화된 이 솔루션은 '레이더와 카메라를 융합한 복합 센서 모듈'을 통해 환자의 상태를 실시간으로 정밀하게 분석합니다. 단순한 동작 감지를 넘어, 'AI 기반 추론 엔진'이 낙상, 이상 행동, 심지어 생체 신호 변화까지 스스로 감지하고 분류하여 의료진에게 즉시 알림을 전달합니다.",
      "가장 중요한 가치는 '환자의 프라이버시를 보호'하면서도 안전 관리가 가능하다는 점입니다. 비접촉식 레이더 기술은 환자의 신체 노출 없이도 위험을 감지하여 CCTV 설치가 부적절한 공간에서도 안심하고 사용할 수 있습니다.",
      "또한, 초소형, 저전력으로 설계된 'SW-SoC 기반 임베디드 시스템'은 통신망에 의존하지 않고 현장에서 즉각적인 분석 및 경고를 수행하므로, 응급 상황에 대한 신속한 대처를 가능하게 합니다. 이 기술은 의료진의 업무 부담을 줄여주는 동시에, 환자 안전 관리의 새로운 표준을 제시하며 의료 환경의 질을 높이는 데 기여할 것입니다."
    ],
    link: "/rnd/embedded-system"
  }
];

const Embeddedsystem = () => {
  const { t } = useTranslation();
  return (
    <BaseLayout
      header={() => <ProductHeader image={rndHeader} />}
      breadcrumbs={[t('rnd.breadcrumbs.0'), t('rnd.breadcrumbs.1'), t('rnd.embedded.breadcrumb')]}
      title={t('rnd.embedded.title')}
      subtitle={t('rnd.embedded.subtitle')}
    >
      <div className="product-page-content">
        {/* RND 전용 FeatureDescription 카드 섹션 */}
        <div className="container">
          <div className="rnd-feature-cards-section">
            {EMBEDDED_SYSTEM_CARDS.map((card, index) => (
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
            <h3><span className="num">1</span> 소개</h3>
            <p className="gs-text">
              당사가 보유한 핵심 기술 중 하나는 레이더 및 카메라를 활용한 위험 상황 조기 감지용 임베디드
              시스템입니다. 이 시스템은 환자의 안전을 보장하기 위해 병실 환경에 최적화된 맞춤형 솔루션을
              제공하며, 의료진의 효율적인 업무 환경을 지원합니다.
            </p>
          </section>

          <section className="gs-section">
            <h3><span className="num">2</span> 주요 기술</h3>
            
            <div className="gs-subsection">
              <h4>AI 기반 위험 상황 조기 감지 추론 엔진</h4>
              <ul className="gs-list">
                <li>
                  <strong>센서 융합 데이터 처리:</strong> 레이더와 카메라에서 수집된 데이터를 연동하여 환자의 상태를
                  정밀하게 분석합니다.
                </li>
                <li>
                  <strong>인공지능 알고리즘:</strong> 환자의 낙상, 이상 행동, 생체 신호 변화 등을 스스로 감지하고 분류하는
                  인공지능 알고리즘을 개발하여 보유하고 있습니다.
                </li>
              </ul>
            </div>

            <div className="gs-subsection">
              <h4>레이더 및 카메라 복합 센서 모듈</h4>
              <ul className="gs-list">
                <li>
                  <strong>3차원 데이터 수집:</strong> 다중 어레이 안테나를 가진 3차원 밀리미터 레이더 칩셋과 고감도
                  고해상도 카메라로 구성된 복합 센서 모듈 기술을 보유하고 있습니다.
                </li>
              </ul>
            </div>

            <div className="gs-subsection">
              <h4>SW-SoC 기반 임베디드 시스템</h4>
              <ul className="gs-list">
                <li>
                  <strong>저전력/초소형 설계:</strong> 저전력, 초소형 FPGA를 탑재한 멀티프로세서 및 신호 처리 기능이
                  통합된 임베디드 보드를 자체 설계했습니다.
                </li>
                <li>
                  <strong>AI 모델 구현:</strong> AI 모델을 SW-SoC 기반 FPGA에 효율적으로 구현하고, AI 양자화 및
                  컴파일러를 활용하는 기술을 보유하고 있습니다.
                </li>
              </ul>
            </div>
          </section>

          <section className="gs-section">
            <h3><span className="num">3</span> 기술의 가치</h3>
            <ul className="gs-list">
              <li>
                <strong>안전사고 예방:</strong> 낙상 등 심각한 안전사고를 조기에 감지하여 예방하는 효과적인 기술을
                제공합니다.
              </li>
              <li>
                <strong>개인정보 보호:</strong> 비접촉식 레이더 기술을 통해 환자의 프라이버시를 보호하면서도 사각지대
                없이 위험 상황을 감지할 수 있습니다.
              </li>
              <li>
                <strong>업무 효율성 증진:</strong> 자동 모니터링 및 알람 기능으로 의료진의 업무 부담을 줄이고, 응급
                상황에 대한 신속한 대처를 가능하게 합니다.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Embeddedsystem;



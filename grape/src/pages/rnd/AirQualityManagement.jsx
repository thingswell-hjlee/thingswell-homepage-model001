import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import rndHeader from '../../assets/header_image/rnd.jpg';
import './Rnd.css';
import FeatureDescription from '../../components/FeatureDescription';
import air from '../../assets/rnd_main/AI_air.png';
import { BaseLayout } from '../../components/Layout';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const AIR_QUALITY_CARDS = [
  {
    image: air,
    subtitle: "건강하고 쾌적한 생활 환경 조성",
    description: [
      "'AI 기반 공기질 관리 기술'은 머신러닝을 활용하여 실내외 공기질 데이터를 고도화하고, 쾌적한 환경을 능동적으로 제어하는 혁신적인 시스템입니다. 이 기술은 센서 오차 및 노후화 문제를 스스로 해결하여 데이터의 '신뢰성'을 확보하며, 공공 사업이나 정밀한 환경 분석에 활용될 수 있는 기반을 제공합니다.",
      "특히, 머신러닝 기반의 '비정상 감지' 기술은 센서 오염이나 노후화로 발생하는 오류를 자동으로 보정하여 항상 정확한 정보를 유지합니다. 또한, '예측 유지보수 기술'은 단말기 고장 가능성을 사전에 예측하여 불필요한 현장 방문 및 관리 비용을 절감합니다. '스마트 환경 제어 기술'은 공기청정기, 에어컨 등과 연동되어 미세먼지 급증 시 자동 가동하거나 이산화탄소 농도에 따라 환기 시스템을 최적으로 제어하는 등 능동적인 서비스를 제공합니다. 이 기술은 어린이집, 병원, 학교 등 환경에 민감한 시설부터 스마트 아파트, 복합쇼핑몰에 이르기까지 다양한 공간에 적용되어 사용자 맞춤형의 안전하고 건강한 생활 환경을 조성하는 데 기여하고 있습니다."
    ],
  }
];

const AirQualityManagement = () => {
  return (
    <BaseLayout
      header={() => <ProductHeader image={rndHeader} />}
      breadcrumbs={<Breadcrumbs breadcrumbs={["Home", "연구개발", "AI 기반 공기질 관리"]} />}
      title="AI 기반 공기질 관리"
      subtitle="머신러닝을 활용한 실내외 공기질 데이터 고도화 및 쾌적 환경 능동 제어 시스템"
    >
      <div className="product-page-content">
        {/* FeatureDescription 카드 섹션 */}
        <div className="container">
          <div className="feature-cards-section">
            {AIR_QUALITY_CARDS.map((card, index) => (
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
            <h3><span className="num">1</span> 기술 개념 및 확보 현황</h3>
            <p className="gs-text">
              본 기술은 <strong>머신러닝 기반의 비정상 감지(Anomaly Detection)</strong>와 예측 유지보수(Predictive
              Maintenance) 기술을 결합하여, 실내외 공기질 데이터를 고도화하고 쾌적한 환경을 능동적으로
              제어하는 혁신적인 단위 기술입니다. 2019년 창업성장기술개발사업 '선도형 창업과제'를 통해
              고신뢰성 실내외 공기질 관리 시스템 및 쾌적 환경 제어 서비스 개발을 위한 핵심 기술 경쟁력을
              확보하였습니다.
            </p>
            <p className="gs-text">
              이 핵심 기술은 센서 오차 및 노후화 문제를 스스로 해결하여 데이터의 신뢰성을 극대화하고,
              단말기 고장 가능성을 사전에 예측합니다. 또한, 환경 민감 계층을 위한 맞춤형 환경 제어를 통해
              안전하고 건강한 생활 공간을 조성하는 솔루션에 적용되는 것을 목표로 합니다.
            </p>
          </section>

          <section className="gs-section">
            <h3><span className="num">2</span> 핵심 기술의 특징 및 강점</h3>
            
            <div className="gs-subsection">
              <h4>데이터 신뢰성 확보: 머신러닝 기반 비정상 감지 기술</h4>
              <p className="gs-text">
                센서가 오염되거나 노후화되면서 발생하는 데이터의 오류를 머신러닝 모델이 자동으로 식별하고
                보정합니다. 이를 통해 항상 정확하고 신뢰성 있는 공기질 데이터를 제공하며, 공공 사업이나
                정밀한 환경 분석에 활용될 수 있습니다.
              </p>
            </div>

            <div className="gs-subsection">
              <h4>유지보수 효율성 극대화: 예측 유지보수 기술</h4>
              <p className="gs-text">
                공기질 데이터와 함께 단말기의 작동 정보를 분석하여, 센서의 성능 저하 및 고장 시점을 사전에
                예측합니다. 이는 단말기 팬 이상이나 필터 교체 시점 등을 미리 사용자에게 알림으로써,
                불필요한 현장 방문 및 관리 비용을 절감하는 효과를 제공하는 솔루션에 적용됩니다.
              </p>
            </div>

            <div className="gs-subsection">
              <h4>사용자 맞춤형 환경 제어: 스마트 환경 제어 기술</h4>
              <p className="gs-text">
                축적된 데이터와 환경 민감 계층의 특성을 고려하여, 그룹별·건물별로 최적의 쾌적 조건을
                도출하는 데 기여합니다. 공기청정기, 에어컨 등과 연동하여 미세먼지 급증 시 자동 가동하거나,
                이산화탄소 농도에 따라 환기 시스템을 최적으로 제어하는 등 능동적인 환경 제어 서비스를
                제공하는 솔루션의 핵심 구성 요소입니다.
              </p>
            </div>
          </section>

          <section className="gs-section">
            <h3><span className="num">3</span> 핵심 기술 개발 상세 및 시스템 논리 구조</h3>
            <p className="gs-text">
              본 핵심 기술은 아래와 같은 개발 프로세스를 거쳐 완성되었으며, 논리적인 데이터 처리 구조를
              통해 고도화된 기능을 구현했습니다.
            </p>
            
            <div className="gs-subsection">
              <h4>개발 상세 프로세스</h4>
              <ul className="gs-list">
                <li>
                  <strong>미세먼지 데이터 보정 기술 개발:</strong> 정상 및 비정상 미세먼지 센서 데이터 세트를 수집하고
                  분석하여 머신러닝 모델을 개발했습니다.
                </li>
                <li>
                  <strong>예측 유지보수 기술 개발:</strong> 머신러닝 기반의 이상 감지(Anomaly Detection) 기술을
                  활용하여 센서 및 단말기의 이상 징후를 예측하는 모델을 개발했습니다.
                </li>
                <li>
                  <strong>유니버셜 레거시 어댑터 개발:</strong> 기존에 설치된 다양한 환경 설비(공기청정기, 에어컨 등)를
                  본 시스템과 연동하기 위한 범용 어댑터를 개발하여 호환성을 확보했습니다.
                </li>
              </ul>
            </div>

            <div className="gs-subsection">
              <h4>AI 기반 공기질 관리 시스템 프로세스</h4>
              <ol className="gs-list">
                <li>
                  <strong>데이터 수집:</strong> 실내외 공기질 측정 단말기로부터 미세먼지, 이산화탄소, 온습도 등 실시간
                  데이터를 수집합니다.
                </li>
                <li>
                  <strong>데이터 처리 및 보정:</strong> 수집된 데이터는 머신러닝 기반 Anomaly Detection 알고리즘을
                  통해 비정상 데이터를 식별하고 보정합니다.
                </li>
                <li>
                  <strong>데이터 분석:</strong> 보정된 데이터를 기반으로 환경 민감 계층에 맞는 최적의 쾌적 조건을
                  도출하고, 단말기의 상태를 예측 유지보수 모델로 분석합니다.
                </li>
                <li>
                  <strong>자동 제어 및 알림:</strong> 분석 결과를 바탕으로 공기청정기, 에어컨 등과 연동된 환경 설비를
                  자동으로 제어하고, 유지보수 필요 시점을 사용자에게 알리는 솔루션의 동작 과정을
                  설명합니다.
                </li>
              </ol>
            </div>
          </section>

          <section className="gs-section">
            <h3><span className="num">4</span> 적용 대상 및 기대 효과</h3>
            <p className="gs-text">
              본 기술은 공기질 관리가 필수적인 다양한 공간에 성공적으로 적용되는 솔루션의 핵심
              기술입니다.
            </p>
            
            <div className="gs-subsection">
              <h4>주요 적용 대상</h4>
              <p className="gs-text">
                어린이집, 요양시설, 병원, 학교 등 환경 민감 시설, 스마트 아파트, 공장
                사무동, 교통량 많은 도심 건물, 복합쇼핑몰, 지자체 대기환경 정밀 관리 사업 등
              </p>
            </div>

            <div className="gs-subsection">
              <h4>주요 효과</h4>
              <ul className="gs-list">
                <li>
                  <strong>공간별 맞춤형 제어:</strong> 사용자 특성과 공간 환경을 고려하여 최상의 공기질을
                  자동으로 유지하는 데 기여합니다.
                </li>
                <li>
                  <strong>선제적 관리:</strong> 단말기 고장을 예측하고 유지보수 시점을 알려줌으로써 관리
                  효율성을 높이는 솔루션을 가능하게 합니다.
                </li>
                <li>
                  <strong>안정적인 환경 조성:</strong> 실외 공기질까지 연계 분석하여 외부 오염물질 유입에 대한
                  선제적 대응이 가능한 솔루션 구현에 핵심적인 역할을 합니다.
                </li>
              </ul>
            </div>
            
            <p className="gs-text">
              본 기술은 이러한 강점을 바탕으로 스마트 공기질 관리 및 케어 솔루션 시장에서 경쟁력을
              확보했습니다.
            </p>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default AirQualityManagement;

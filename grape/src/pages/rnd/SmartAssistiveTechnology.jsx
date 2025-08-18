import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import './Soulution.css';
import ProductInfo from '../../components/ProductPage/ProductInfo';

const SmartAssistiveTechnology = () => {
  return (
    <div className="gs-page">
      <ProductHeader />
      <div className="product-page-content">
          <div className="container">
            <ProductInfo productName="인지장애 노인 및 장애인을 위한 스마트 보조 기술" productTitle="인지장애 노인 및 장애인을 위한 스마트 보조 기술" breadcrumbs={["Home", "솔루션", "인지장애 노인 및 장애인을 위한 스마트 보조 기술"]} />
          </div>
        <div className="gs-container">

        <section className="gs-section">
          <h3><span className="num">1</span> 기술 개요</h3>
          <p className="gs-text">
            당사는 인지장애가 있는 노인 및 장애인의 일상생활 편익과 안전을 위한 상황/행동 인지 홈케어
            보조기기 및 서비스 기술을 개발했습니다. 이 기술은 AI 기반의 멀티모달 센싱을 통해 개인의
            프라이버시를 보호하면서도 빈틈없는 안전 관리를 가능하게 합니다. 특히, CCTV 설치가 어려운
            침실이나 화장실 등 사각지대의 위험 상황을 효과적으로 감지하고 대처할 수 있도록
            설계되었습니다.
          </p>
        </section>

        <section className="gs-section">
          <h3><span className="num">2</span> 기술의 필요성 및 중요성</h3>
          <p className="gs-text">
            최근 경도인지장애 환자가 급증하고 있지만, 이들을 위한 기존 돌봄 방식은 여러 한계를 가지고
            있습니다. 3교대 근무 인원 부족, 돌발 상황에 대한 즉각적 대처의 어려움, 그리고 CCTV로 인한
            사생활 침해 문제 등이 대표적입니다. 당사의 기술은 이러한 문제들을 해결하여 인지장애를 가진
            사용자들이 안전하게 생활하고, 보호자와 관리자의 부담을 덜어주는 데 기여합니다.
          </p>
        </section>

        <section className="gs-section">
          <h3><span className="num">3</span> 주요 기술 구성</h3>
          <p className="gs-text">
            당사의 AI 멀티모달 홈케어 솔루션은 <strong>AI 멀티모달 홈케어 스테이션(엣지 서버)</strong>을 중심으로
            구축됩니다.
          </p>
          
          <div className="gs-subsection">
            <h4>홈케어 스테이션 PoC</h4>
            <ul className="gs-list">
              <li>
                <strong>PoC A타입:</strong> 벽걸이 또는 스탠드형으로 공간 활용도를 높인 컨셉 시제품입니다.
              </li>
              <li>
                <strong>PoC B타입:</strong> 스탠드형으로 다양한 공간에 유연하게 배치할 수 있는 컨셉 시제품입니다.
              </li>
            </ul>
            <p className="gs-text">
              이 스테이션은 인지장애를 가진 사용자의 행동 및 상황 데이터를 수집하고 분석하는 엣지 서버
              역할을 수행하며, 다음과 같은 기술을 통해 구동됩니다.
            </p>
          </div>

          <div className="gs-subsection">
            <h4>핵심 기술 요소</h4>
            <ul className="gs-list">
              <li>
                <strong>상황/행동 인지 AI:</strong> 멀티모달 데이터를 통합 분석하여 사용자의 행동과 상황을 정확하게
                인지하고, 낙상, 배회 등 위험 상황을 실시간으로 감지합니다.
              </li>
              <li>
                <strong>개인 맞춤형 패턴 학습:</strong> 사용자의 일상 패턴을 학습하여 평소와 다른 이상 행동을 감지하고,
                질병 특성으로 인한 문제들을 예측합니다.
              </li>
            </ul>
          </div>
        </section>

        <section className="gs-section">
          <h3><span className="num">4</span> 기대 효과</h3>
          <ul className="gs-list">
            <li>
              <strong>안전 증진:</strong> CCTV 사각지대에서도 24시간 안전 관리를 제공하여 낙상 및 기타 위험 상황을
              조기에 예방합니다.
            </li>
            <li>
              <strong>프라이버시 보호:</strong> 비접촉식 기술을 활용해 개인의 사생활을 침해하지 않으면서도 효과적인
              모니터링이 가능합니다.
            </li>
            <li>
              <strong>업무 효율성 증대:</strong> 돌발 상황에 대한 즉각적인 알림과 자동 기록 기능을 통해 관리 인력의
              업무 부담을 줄이고 효율성을 높입니다.
            </li>
            <li>
              <strong>맞춤형 케어 제공:</strong> 사용자의 행동 패턴과 건강 상태를 분석해 맞춤형 돌봄 계획 수립을 위한
              기초 데이터를 제공합니다.
            </li>
          </ul>
        </section>
      </div>
      </div>
    </div>
  );
};

export default SmartAssistiveTechnology;

import React from 'react';
import SolutionDetailPage from './SolutionDetailPage';
import fire from '../../assets/fire.jpg';
import Collision from '../../assets/collision.jpg';
import server from '../../assets/server.jpg';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import ProductInfo from '../../components/ProductPage/ProductInfo';
import rnd from '../../assets/header_image/rnd.jpg';

const BREADCRUMBS = ["Home", "연구개발", "통합제어 솔루션"];

const SOLUTION_DATA = {
  title: "통합제어 솔루션",
  description:
    "AI 기반 통합제어 솔루션은 다양한 산업 장비와 시스템을 하나의 플랫폼에서 통합 관리하고 제어하는 혁신적인 기술입니다. IoT 센서, PLC, SCADA 시스템 등 다양한 제어 장치의 데이터를 수집하고, AI 알고리즘을 통해 최적화된 제어 로직을 실시간으로 생성합니다. 이를 통해 생산성 향상, 에너지 효율성 증대, 안전성 강화를 동시에 달성하는 스마트 팩토리 솔루션을 제공합니다.",
};

const WORKER_SAFETY_CARDS = [
  {
    image: Collision,
    imageAlt: "AI 기반 공기질 관리 기술",
    title: "AI 기반 공기질 관리 기술",
    link: "/rnd/air-quality-management",
    desc:"다양한 IoT 센서와 제어 장치의 데이터를 통합 수집하고 표준화하는 기술을 연구합니다",
    desc2:"실시간 데이터 수집 및 전처리 시스템을 개발하여 제어 시스템에 최적화된 데이터를 제공합니다"
  },

];

const BLOCKS = [
  {
    type: 'applicationCards',
    data: WORKER_SAFETY_CARDS,
    props: { boxName: '핵심 기술' },
  },
];

const IntegratedControlSolution = () => {
  return (
    <>
      <ProductHeader image={rnd} alt="연구개발" />
      <div className="product-page-content">
        <div className="container">
          <ProductInfo
            productName={SOLUTION_DATA.title}
            productTitle={SOLUTION_DATA.title}
              description={SOLUTION_DATA.description}
            breadcrumbs={BREADCRUMBS}
          />
           <SolutionDetailPage
        solutionVariant="default"
        blocks={BLOCKS}
        />

        
        </div>
      </div>
     
    </>
  );
};

export default IntegratedControlSolution; 
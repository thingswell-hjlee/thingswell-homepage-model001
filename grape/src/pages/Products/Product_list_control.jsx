import React from 'react';
import welding from '../../assets/welding.jpg';
import grinding from '../../assets/grinding.jpg';
import construction from '../../assets/construction.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import fire from '../../assets/fire.jpg';
import dangerous from '../../assets/dangerous.jpg';
import falldown from '../../assets/falldown.jpg';
import collision from '../../assets/collision.jpg';
import collapse from '../../assets/collapse.jpg';
import ProductList from './ProductList';
import controlHeaderImage from '../../assets/header_image/product.jpg';

const products = [
  { name: 'XCN-3000', title: '어드밴스드 통합제어기 - 산업용 통합 제어 시스템', img: welding, link: '/products/safety/1', category: '통합제어' },
  { name: 'XCN-2000', title: '스마트 제어 시스템 - 중소형 공장용 제어 시스템', img: grinding, link: '/product-list/2', category: '통합제어' },
  { name: 'XCN-1000', title: '기본 제어 모듈 - 소형 장비용 제어 모듈', img: construction, link: '/product-list/3', category: '센서' },
  { name: 'AIB-TS2-08', title: 'AI 브릿지 제어 모듈 - 영상 분석 통합 제어', img: manufacturing, link: '/product-list/4', category: '센서' },
  { name: 'Safety-XCN-500', title: '안전 제어 시스템 - 화재 감지 및 예방 제어', img: fire, link: '/product-list/5', category: '안전장비' },
  { name: 'Safety-XCN-400', title: '위험 감지 제어기 - 위험 상황 감지 및 대응', img: dangerous, link: '/product-list/6', category: '안전장비' },
  { name: 'Safety-XCN-300', title: '낙하 감지 제어기 - 낙하 사고 감지 및 알림', img: falldown, link: '/product-list/7', category: '안전장비' },
  { name: 'Monitor-XCN-200', title: '충돌 감지 모니터링 시스템 - 충돌 사고 감지 및 분석', img: collision, link: '/product-list/8', category: '모니터링' },
  { name: 'Monitor-XCN-100', title: '붕괴 감지 모니터링 시스템 - 구조물 안전 모니터링', img: collapse, link: '/product-list/9', category: '모니터링' },
  { name: 'Safety-XCN-200', title: '종합 안전 제어 시스템 - 다중 위험 요소 통합 제어', img: collision, link: '/product-list/10', category: '안전장비' },
];

export default function ProductListControlPage() {
  return (
    <ProductList
      products={products}
      title="통합제어"
      subtitle="산업용 통합 제어 시스템 제품들을 확인하세요"
      breadcrumbs={["Home", "Products", "통합제어"]}
      headerImage={controlHeaderImage}
    />
  );
}

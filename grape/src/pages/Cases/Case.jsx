import React from 'react';
import welding from '../../assets/welding.jpg';
import ProductList from '../Products/ProductList';
import main from '../../assets/case_bus_seoul/main_4.jpg';

const products = [
  { name: '스마트 버스쉼터 원격관리시스템', title: '서울시 중구·강남구 버스 쉼터(그린스마트쉼터) 40개소 구축', img: main, link: '/case_bus_seoul', category: '고정형 인체감지 AI 카메라' },
];

export default function ProductListControlPage() {
  return (
    <ProductList
      products={products}
      title="스마트안전장비 실적"
      subtitle="스마트안전장비 실적을 확인하세요"
      breadcrumbs={["Home", "실적", "스마트안전장비"]}
    />
  );
}

import React from 'react';
import welding from '../../assets/welding.jpg';
import grinding from '../../assets/grinding.jpg';
import construction from '../../assets/construction.jpg';
import ProductList from './ProductList';
import main1 from '../../assets/product_safety/main.jpg';
import main2 from '../../assets/main_3.png';
import main3 from '../../assets/product_twedg_04/main.png';

const products = [
  { name: 'TWMOB-01', title: '2륜 카트 이동식 태양광 80w 무선CCTV 30배 줌 PTZ 5백만 화소 IP CCTV 세트', desc: '카트 이동식 태양광 80w 30배 줌 5백만 화소 초 고화질 PTZ 카메라 세트는 비 포장 공사 현장에서도 이동이 용이하며, LTE 라우터를 설치하여 PC 또는 모바일로 원격 관제 합니다.', img: main1, link: '/products/twmob-01', category: '이동형 인체감지 AI 카메라' },
  { name: 'TWMOB-02', title: '태양광40w 패널 20AH, WIFI PTZ 2백만 화소 IP CCTV 세트', desc: '태양광 40W 패널을 사용하므로 전기 및 인터넷이 필요치 않으며, 25A 배터리를 충전하여 PTZ 및 LTE 라우터를 작동하는 IP CCTV 입니다.', img: main2, link: '/product-list/2', category: '고정형 인체감지 AI 카메라' },
  { name: 'TWEDG-04', title: 'On-Device Analytics 서버', desc: 'AI video analytics, LTE 8-CH(Extensible 16-CH mode)', img: main3, link: '/products/twedg-04', category: '네트워크장비' },
];

export default function ProductListSafetyPage() {
  return (
    <ProductList
      products={products}
      title="스마트안전장비"
      subtitle="스마트 안전장비 제품들을 확인하세요"
      breadcrumbs={["Home", "Products", "Safety"]}
      longVertical
    />
  );
}

import React from 'react';
import ProductPage from '../../components/ProductPage/ProductPage';
import '../Products/Product_safety.css';

// product_safety 폴더의 이미지들을 불러옵니다
import mainImg from '../../assets/case_bus_seoul/main_4.jpg';
import main2Img from '../../assets/case_bus_seoul/main_2.jpg';
import main3Img from '../../assets/case_bus_seoul/main_3.jpg';
import main4Img from '../../assets/case_bus_seoul/main.jpg';

const Case_Bus_Seoul = () => {
  const product = {
    name: "서울시 버스 안전장비 설치",
    title: "서울시 버스 안전장비 설치 사업",
    overview: "서울시 전역의 버스에 스마트 안전장비를 설치하여 승객과 운전자의 안전을 보장하는 사업입니다. 실시간 모니터링 시스템과 자동 긴급 상황 감지 기능을 통해 교통사고를 사전에 예방하고, 발생 시 즉시 대응할 수 있는 체계를 구축했습니다.",
    bottom_box_title: "서울시 버스 안전장비 설치 성과",
    images: [mainImg, main2Img, main3Img, main4Img]
  };

  return (
    <div>
      <ProductPage product={product} />
    </div>
  );
};

export default Case_Bus_Seoul;
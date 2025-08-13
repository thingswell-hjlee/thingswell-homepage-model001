import React from 'react';
import ProductPage from '../../components/ProductPage/ProductPage';
import '../Products/Product_safety.css';

// product_safety 폴더의 이미지들을 불러옵니다
import mainImg from '../../assets/case_bus_seoul/main_4.jpg';
import main2Img from '../../assets/case_bus_seoul/main_2.jpg';
import main3Img from '../../assets/case_bus_seoul/main_3.jpg';
import main4Img from '../../assets/case_bus_seoul/main.jpg';

const Case_Bus_Seoul = () => {
  // AI 브릿지 제품 데이터 정의
  const productData = {
    name: "TWMOB-01",
    title: "TWMOB-01",
    // description: "XCN-3000",
    breadcrumbs: ["Home", "Products", "스마트 안전장비"],
    images: [mainImg, main2Img, main3Img, main4Img],
    // 스펙 탭 미디어 그리드용 개별 이미지 지정 (좌측 1, 우측 상/하)

    overview_title: "서울시 중구·강남구 버스 쉼터(그린스마트쉼터) 40개소 구축",
    overview: "조명, 온열벤치, LED 디스플레이, 자동문, 공기질 측정, 냉난방 자동제어,  CCTV 등 원격 제어 및 모니터링 시스템 개발 및 구축, 관제센터 구축 / 연동온디바이스 AI 기술 접목으로 상황별 안전·편의 기능 강화",
    bottom_box_title: "조명, 온열벤치, LED 디스플레이, 자동문, 공기질 측정, 냉난방 자동제어,  CCTV 등 원격 제어 및 모니터링 시스템 개발 및 구축, 관제센터 구축 / 연동온디바이스 AI 기술 접목으로 상황별 안전·편의 기능 강화",
    bottom_box_photo_caption: '현장 설치 예시',
    bottom_box_photo_captions: ['스마트 무선 CCTV', 'PTZ 구성도'],

    // 이 페이지에서는 탭 2개만 노출
    maxVisibleTabs: 2,

    // features: [
    //   { description: "움직임 감지 시 알림을 전송하여 즉각 대응이 가능합니다.", image: sub8Img },
    //   {  description: "양방향 오디오로 현장과 실시간 소통을 지원합니다.", image: main4Img },
    //   {  description: "PC/모바일 등 다양한 플랫폼에서 관제가 가능합니다.", image: sub3Img },
    //   { description: "장거리 피사체를 선명하게 포착하는 30배 광학 줌.", image: sub5Img },
    //   { description: "고해상도 영상으로 디테일을 정확히 확인.", image: sub9Img },
    //   { description: "모바일 앱 등록으로 간편한 원격 관제.", image: sub4Img }
    // ],
    // // 새로운 통합 포맷: specs_media (배열 또는 객체)
    // specs_media: [
    //   { image: sub6Img, title: '보안 카메라 사양' },
    //   { image: sub7Img, title: '카메라 일체형 무선방송 이륜 카트' },
    //   { image: sub10Img, title: '무전기 무선방송 스피커' },
    // ],
    // certifications: [
    //   {
    //     name: "CE 인증",
    //     description: "유럽 안전 표준 인증",
    //     image: sub12Img
    //   },
    //   {
    //     name: "FCC 인증",
    //     description: "미국 연방 통신 위원회 인증",
    //     image: sub11Img
    //   },
    // ],
    // downloads: [
    //   {
    //     title: "카탈로그",
    //     description: "AIB-TS2-08 제품 카탈로그",
    //     size: "2.1MB"
    //   },
    //   {
    //     title: "데이터시트",
    //     description: "상세 기술 사양 및 데이터시트",
    //     size: "1.5MB"
    //   },
    //   {
    //     title: "사용자 매뉴얼",
    //     description: "설치 및 사용 가이드",
    //     size: "3.8MB"
    //   }
    // ],
    // videos: [
    //   {
    //     title: "제품 소개 영상",
    //     description: "AIB-TS2-08의 주요 기능과 특징을 소개합니다",
    //     thumbnail: "/placeholder-video.png"
    //   }
    // ]
  };

  

  return (
    <div className="product-detail-page">
      <ProductPage productData={productData} />
      
      {/* <ProductCardGroup 
        products={productGroupData}
        title="AI 브릿지 제품 라인업"
        subtitle="다양한 AI 영상 분석 디바이스를 확인해보세요"
      /> */}
    </div>
  );
};

export default Case_Bus_Seoul;
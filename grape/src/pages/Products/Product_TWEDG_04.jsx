import React from 'react';
import ProductPage from '../../components/ProductPage/ProductPage';
import './Product_safety.css';

// 공용 이미지 사용 (임시 에셋)
import serverImg from '../../assets/server.jpg';
import manufacturingImg from '../../assets/manufacturing.jpg';
import constructionImg from '../../assets/construction.jpg';

// 인증 섹션에 사용할 아이콘/이미지 (기존 safety 에셋 재사용)
import mainImg from '../../assets/product_twedg_04/main.png';
import main2Img from '../../assets/product_twedg_04/main_2.png';
import main3Img from '../../assets/product_twedg_04/main_3.png';
import main4Img from '../../assets/product_twedg_04/main_4.png';
import sub1Img from '../../assets/product_twedg_04/sub_1.png';
import sub2Img from '../../assets/product_twedg_04/sub_2.png';

// 인증 이미지 (CE, FCC)
import certCeImg from '../../assets/product_safety/sub_12.png';
import certFccImg from '../../assets/product_safety/sub_11.png';

const Product_TWEDG_04 = () => {
  const productData = {
    name: 'TWEDG-04',
    title: 'TWEDG-04',
    breadcrumbs: ['Home', 'Products', '네트워크장비'],
    images: [mainImg, main2Img, main3Img, main4Img],

    overview_title: 'On-Device Analytics 서버',
    overview:
      'AI video analytics,\nLTE 8-CH(Extensible 16-CH mode)',
    // 개요 하단 이미지 갤러리
    overview_media: [
      { image: sub2Img, title: '' },
    ],

    // bottom_box_title: 'Edge AI 기반 영상 분석 서버',
    // bottom_box_description:
    //   'TWEDG-04는 카메라로부터 입력되는 영상 스트림을 온디바이스에서 전처리/추론하여 지연을 최소화하고, 네트워크 비용을 절감합니다. 산업/건설/제조 현장에 최적화되어 있으며 관리 서버와의 연동을 통해 채널 확장과 원격 유지보수를 손쉽게 수행할 수 있습니다.',
    // bottom_box_photo: serverImg,
    // bottom_box_photos: [manufacturingImg, constructionImg],
    // bottom_box_photo_caption: 'Edge AI 운영 환경 예시',
    // bottom_box_photo_captions: ['제조 라인 연동', '현장 설치 사례'],

    // 주요기능: 제공된 이미지의 항목을 그대로 반영
    features: [
      { title: 'Easy to configure and intuitive AI video analytics applications' },
      { title: 'Easy AI system construction with existing CCTV cameras' },
      { title: 'Multi-level AI-based false alarm reduction' },
      { title: 'High-performance pose estimation technology' },
      { title: 'Accurate event detection through scene understanding' },
      { title: 'Multiple AI apps can be run on each video channel' },
      { title: 'Easy integration into other systems' },
      { title: 'Web based configuration' },
      { title: 'Enhanced security options' },
      { title: 'Combining rules with other events' },
      { title: 'Supports up to 16 channels maximum' },
      { title: 'LTE support' },
      { title: 'NDAA Compliant' },
    ],
    // 이 페이지는 주요기능을 텍스트만 표시
    features_text_only: true,

    specs_media: [
      { image: sub1Img, title: '제품 스펙시트' },
    ],

    certifications: [
      { name: 'CE 인증', image: certCeImg },
      { name: 'FCC 인증', image: certFccImg },
    ],

    downloads: [
      { title: '카탈로그', description: 'TWEDG-04 제품 카탈로그', size: '1.8MB' },
      { title: '데이터시트', description: '상세 기술 사양 및 데이터시트', size: '1.1MB' },
      { title: '설치 가이드', description: '설치 및 운영 가이드', size: '2.9MB' },
    ],

    videos: [
      {
        title: '제품 소개 영상',
        description: 'TWEDG-04의 주요 기능과 적용 사례',
        thumbnail: '/placeholder-video.png',
      },
    ],
  };

  return (
    <div className="product-detail-page">
      <ProductPage productData={productData} />
    </div>
  );
};

export default Product_TWEDG_04;



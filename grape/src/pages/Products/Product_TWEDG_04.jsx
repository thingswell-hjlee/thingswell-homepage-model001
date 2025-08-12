import React from 'react';
import ProductPage from '../../components/ProductPage/ProductPage';
import './Product_safety.css';

// 공용 이미지 사용 (임시 에셋)
import serverImg from '../../assets/server.jpg';
import manufacturingImg from '../../assets/manufacturing.jpg';
import constructionImg from '../../assets/construction.jpg';

// 인증 섹션에 사용할 아이콘/이미지 (기존 safety 에셋 재사용)
import certCeImg from '../../assets/product_safety/sub_12.png';
import certFccImg from '../../assets/product_safety/sub_11.png';

const Product_TWEDG_04 = () => {
  const productData = {
    name: 'TWEDG-04',
    title: 'TWEDG-04',
    description: 'On-Device Analytics 서버 — AI video analytics, LTE 8-CH (Extensible 16-CH mode)',
    breadcrumbs: ['Home', 'Products', '네트워크장비'],
    images: [serverImg, manufacturingImg, constructionImg],

    overview_title: 'On-Device Analytics 서버',
    overview:
      '현장(edge)에서 바로 영상 분석이 가능한 온디바이스 분석 서버입니다. LTE 8-CH 기본(확장 시 16-CH), AI 영상 분석 파이프라인, 원격 관리 및 모니터링을 지원합니다.',

    bottom_box_title: 'Edge AI 기반 영상 분석 서버',
    bottom_box_description:
      'TWEDG-04는 카메라로부터 입력되는 영상 스트림을 온디바이스에서 전처리/추론하여 지연을 최소화하고, 네트워크 비용을 절감합니다. 산업/건설/제조 현장에 최적화되어 있으며 관리 서버와의 연동을 통해 채널 확장과 원격 유지보수를 손쉽게 수행할 수 있습니다.',
    bottom_box_photo: serverImg,
    bottom_box_photos: [manufacturingImg, constructionImg],
    bottom_box_photo_caption: 'Edge AI 운영 환경 예시',
    bottom_box_photo_captions: ['제조 라인 연동', '현장 설치 사례'],

    features: [
      { title: '온디바이스 AI 추론', description: '클라우드 의존도 최소화, 지연 감소 및 안정성 향상', image: serverImg },
      { title: 'LTE 8-CH (확장 16-CH)', description: '여러 카메라 채널을 안정적으로 수용', image: manufacturingImg },
      { title: '원격 관리/모니터링', description: '상태 진단, 업데이트, 채널 관리 기능 제공', image: constructionImg },
      { title: '산업 현장 최적화', description: '열/먼지/진동 환경에서도 안정 운영', image: serverImg },
    ],

    specs_media: [
      { image: serverImg, title: '서버 섀시 및 I/O' },
      { image: manufacturingImg, title: '채널 확장 구성 예시' },
      { image: constructionImg, title: '현장 연동 다이어그램' },
    ],

    certifications: [
      { name: 'CE 인증', description: '유럽 안전 표준 인증', image: certCeImg },
      { name: 'FCC 인증', description: '미국 연방 통신 위원회 인증', image: certFccImg },
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



import React from 'react';
import ProductPage from '../../components/ProductPage/ProductPage';
import useTranslation from '../../hooks/useTranslation';
import welding from '../../assets/welding.jpg';
import welding2 from '../../assets/fire.jpg';
import './ProductsCommon.css';

const Product_control = () => {
  const { t } = useTranslation();
  // AI 브릿지 제품 데이터 정의
  const productData = {
    name: "AIB-TS2-08",
    title: "AIB-TS2-08",
    description: "XCN-3000",
    breadcrumbs: ["Home", "Products", "System Control"],
    images: [welding, welding2],
    overview: t('productsPage.controlDetail.overview'),
    keyFeatures: t('productsPage.controlDetail.keyFeatures'),
    features: [
      {
        icon: "📹",
        title: t('productsPage.controlDetail.features.0.title'),
        description: t('productsPage.controlDetail.features.0.description')
      },
      {
        icon: "🔗",
        title: t('productsPage.controlDetail.features.1.title'),
        description: t('productsPage.controlDetail.features.1.description')
      },
      {
        icon: "🎬",
        title: t('productsPage.controlDetail.features.2.title'),
        description: t('productsPage.controlDetail.features.2.description')
      },
      {
        icon: "🔊",
        title: t('productsPage.controlDetail.features.3.title'),
        description: t('productsPage.controlDetail.features.3.description')
      }
    ],
    specifications: [
      { label: t('productsPage.controlDetail.specifications.0.label'), value: "4K @ 60 fps (2M @ 240 fps)" },
      { label: t('productsPage.controlDetail.specifications.1.label'), value: "RTSP, RTSP over HTTP/S, Onvif" },
      { label: t('productsPage.controlDetail.specifications.2.label'), value: "H.265 / H.264" },
      { label: t('productsPage.controlDetail.specifications.3.label'), value: "RTSP over TCP/UDP, RTSP over Websocket, RTSP over HTTP/S" },
      { label: t('productsPage.controlDetail.specifications.4.label'), value: "1 x Audio Line-In (3.5mm audio phone jack)" },
      { label: t('productsPage.controlDetail.specifications.5.label'), value: "1 x Audio Line-Out (3.5mm audio phone jack)" }
    ],
    certifications: [
      {
        name: t('productsPage.controlDetail.certifications.0.name'),
        description: t('productsPage.controlDetail.certifications.0.description'),
        image: "/placeholder-cert.png"
      },
      {
        name: t('productsPage.controlDetail.certifications.1.name'),
        description: t('productsPage.controlDetail.certifications.1.description'),
        image: "/placeholder-cert.png"
      },
      {
        name: "ISO 9001",
        description: t('productsPage.controlDetail.certifications.2.description'),
        image: "/placeholder-cert.png"
      }
    ],
    downloads: [
      {
        title: t('productsPage.controlDetail.downloads.0.title'),
        description: t('productsPage.controlDetail.downloads.0.description'),
        size: "2.1MB"
      },
      {
        title: t('productsPage.controlDetail.downloads.1.title'),
        description: t('productsPage.controlDetail.downloads.1.description'),
        size: "1.5MB"
      },
      {
        title: t('productsPage.controlDetail.downloads.2.title'),
        description: t('productsPage.controlDetail.downloads.2.description'),
        size: "3.8MB"
      }
    ],
    videos: [
      {
        title: t('productsPage.controlDetail.videos.0.title'),
        description: t('productsPage.controlDetail.videos.0.description'),
        thumbnail: "/placeholder-video.png"
      }
    ]
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

export default Product_control;
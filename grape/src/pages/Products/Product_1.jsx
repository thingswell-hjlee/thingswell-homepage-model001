import React from 'react';
import ProductPage from '../../components/ProductPage/ProductPage';
import welding from '../../assets/welding.jpg';
import welding2 from '../../assets/fire.jpg';
import './Product_1.css';

const Product_1 = () => {
  // AI 브릿지 제품 데이터 정의
  const productData = {
    name: "AIB-TS2-08",
    title: "AIB-TS2-08",
    description: "XCN-3000",
    breadcrumbs: ["Home", "Products", "System Control"],
    images: [welding, welding2],
    overview: "산업 자동화 및 스마트 시스템 통합을 위한 다목적 인터페이스 제어 모듈로, 다양한 환경에서 안정적인 연결성과 정밀한 제어를 제공하며, 효율적인 관리와 운영을 가능하게 합니다",
    keyFeatures: [
      "4K @ 60 fps 최대 입력해상도",
      "8채널(16채널 확장모드지원)",
      "RTSP, RTSP over HTTP/S, Onvif 지원",
      "H.265 / H.264 코덱 지원"
    ],
    features: [
      {
        icon: "📹",
        title: "고해상도 영상 처리",
        description: "4K @ 60 fps (2M @ 240 fps) 최대 입력해상도를 지원하여 고품질 영상 분석이 가능합니다"
      },
      {
        icon: "🔗",
        title: "다양한 프로토콜 지원",
        description: "RTSP, RTSP over HTTP/S, Onvif 등 다양한 영상 입력 프로토콜을 지원합니다"
      },
      {
        icon: "🎬",
        title: "고효율 코덱",
        description: "H.265 / H.264 코덱을 지원하여 대역폭 효율적인 영상 전송이 가능합니다"
      },
      {
        icon: "🔊",
        title: "오디오 지원",
        description: "오디오 입력/출력 단자를 제공하여 음성 분석 및 알림 기능을 지원합니다"
      }
    ],
    specifications: [
      { label: "최대 입력해상도", value: "4K @ 60 fps (2M @ 240 fps)" },
      { label: "영상입력 프로토콜", value: "RTSP, RTSP over HTTP/S, Onvif" },
      { label: "영상코덱 지원", value: "H.265 / H.264" },
      { label: "영상출력 방법", value: "RTSP over TCP/UDP, RTSP over Websocket, RTSP over HTTP/S" },
      { label: "오디오 입력", value: "1 x Audio Line-In (3.5mm audio phone jack)" },
      { label: "오디오 출력", value: "1 x Audio Line-Out (3.5mm audio phone jack)" }
    ],
    certifications: [
      {
        name: "CE 인증",
        description: "유럽 안전 표준 인증",
        image: "/placeholder-cert.png"
      },
      {
        name: "FCC 인증",
        description: "미국 연방 통신 위원회 인증",
        image: "/placeholder-cert.png"
      },
      {
        name: "ISO 9001",
        description: "품질 관리 시스템 인증",
        image: "/placeholder-cert.png"
      }
    ],
    downloads: [
      {
        title: "카탈로그",
        description: "AIB-TS2-08 제품 카탈로그",
        size: "2.1MB"
      },
      {
        title: "데이터시트",
        description: "상세 기술 사양 및 데이터시트",
        size: "1.5MB"
      },
      {
        title: "사용자 매뉴얼",
        description: "설치 및 사용 가이드",
        size: "3.8MB"
      }
    ],
    videos: [
      {
        title: "제품 소개 영상",
        description: "AIB-TS2-08의 주요 기능과 특징을 소개합니다",
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

export default Product_1;
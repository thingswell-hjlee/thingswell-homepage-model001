import React from 'react';
import ProductPage from '../../components/ProductPage/ProductPage';
import ProductCardGroup from '../../components/ProductPage/ProductCardGroup';
import welding from '../../assets/welding.jpg';
import './Product_1.css';

const Product_1 = () => {
  // AI 브릿지 제품 데이터 정의
  const productData = {
    name: "AIB-TS2-08",
    title: "AI 브릿지",
    description: "엣지 AI 영상 분석, 8채널(16채널 확장모드지원) - 고성능 AI 영상 분석 디바이스로 실시간 영상 처리 및 분석을 제공합니다.",
    breadcrumbs: ["Home", "Products", "AI Bridge"],
    images: [welding],
    overview: "AIB-TS2-08은 엣지 AI 영상 분석을 위한 고성능 디바이스로, 8채널(16채널 확장모드지원) 영상 입력을 처리할 수 있습니다.",
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
        description: "4K @ 60 fps (2M @ 240 fps) 최대 입력해상도를 지원하여 고품질 영상 분석이 가능합니다."
      },
      {
        icon: "🔗",
        title: "다양한 프로토콜 지원",
        description: "RTSP, RTSP over HTTP/S, Onvif 등 다양한 영상 입력 프로토콜을 지원합니다."
      },
      {
        icon: "🎬",
        title: "고효율 코덱",
        description: "H.265 / H.264 코덱을 지원하여 대역폭 효율적인 영상 전송이 가능합니다."
      },
      {
        icon: "🔊",
        title: "오디오 지원",
        description: "오디오 입력/출력 단자를 제공하여 음성 분석 및 알림 기능을 지원합니다."
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
        description: "AIB-TS2-08의 주요 기능과 특징을 소개합니다.",
        thumbnail: "/placeholder-video.png"
      },
      {
        title: "설치 및 설정 가이드",
        description: "단계별 설치 및 설정 방법을 보여줍니다.",
        thumbnail: "/placeholder-video.png"
      },
      {
        title: "AI 영상 분석 데모",
        description: "실제 AI 영상 분석 기능의 데모를 제공합니다.",
        thumbnail: "/placeholder-video.png"
      }
    ]
  };

  // AI 브릿지 제품 그룹 데이터
  const productGroupData = [
    {
      name: "AIB-TS2-08",
      subtitle: "AI 브릿지",
      shortDescription: "8채널 AI 영상 분석 디바이스",
      icon: "📹",
      description: "엣지 AI 영상 분석, 8채널(16채널 확장모드지원) - 고성능 AI 영상 분석 디바이스입니다.",
      features: [
        "4K @ 60 fps 최대 입력해상도",
        "8채널(16채널 확장모드지원)",
        "RTSP, RTSP over HTTP/S, Onvif 지원",
        "H.265 / H.264 코덱 지원"
      ],
      specs: [
        { label: "최대 입력해상도", value: "4K @ 60 fps" },
        { label: "채널 수", value: "8채널(16채널 확장)" },
        { label: "코덱", value: "H.265 / H.264" }
      ],
      actions: [
        {
          label: "자세히 보기",
          type: "primary",
          icon: "👁️",
          onClick: () => console.log("AIB-TS2-08 상세보기")
        },
        {
          label: "견적 문의",
          type: "secondary",
          icon: "💬",
          onClick: () => console.log("AIB-TS2-08 견적 문의")
        }
      ]
    },
    {
      name: "AIB-TS2-16",
      subtitle: "AI 브릿지 확장형",
      shortDescription: "16채널 AI 영상 분석 디바이스",
      icon: "🎥",
      description: "16채널 AI 영상 분석을 위한 확장형 디바이스로, 대규모 영상 모니터링 시스템에 최적화되어 있습니다.",
      features: [
        "16채널 동시 처리",
        "고성능 AI 엔진",
        "확장 가능한 아키텍처",
        "실시간 분석 지원"
      ],
      specs: [
        { label: "채널 수", value: "16채널" },
        { label: "AI 성능", value: "고성능 엔진" },
        { label: "확장성", value: "확장 가능" }
      ],
      actions: [
        {
          label: "자세히 보기",
          type: "primary",
          icon: "👁️",
          onClick: () => console.log("AIB-TS2-16 상세보기")
        },
        {
          label: "견적 문의",
          type: "secondary",
          icon: "💬",
          onClick: () => console.log("AIB-TS2-16 견적 문의")
        }
      ]
    },
    {
      name: "AIB-TS2-04",
      subtitle: "AI 브릿지 소형",
      shortDescription: "4채널 AI 영상 분석 디바이스",
      icon: "📷",
      description: "소규모 설치에 최적화된 4채널 AI 영상 분석 디바이스입니다.",
      features: [
        "4채널 처리",
        "컴팩트한 디자인",
        "저전력 소비",
        "간단한 설치"
      ],
      specs: [
        { label: "채널 수", value: "4채널" },
        { label: "크기", value: "컴팩트" },
        { label: "전력", value: "저전력" }
      ],
      actions: [
        {
          label: "자세히 보기",
          type: "primary",
          icon: "👁️",
          onClick: () => console.log("AIB-TS2-04 상세보기")
        },
        {
          label: "견적 문의",
          type: "secondary",
          icon: "💬",
          onClick: () => console.log("AIB-TS2-04 견적 문의")
        }
      ]
    }
  ];

  return (
    <div className="product-detail-page">
      <ProductPage productData={productData} />
      
      <ProductCardGroup 
        products={productGroupData}
        title="AI 브릿지 제품 라인업"
        subtitle="다양한 AI 영상 분석 디바이스를 확인해보세요"
      />
    </div>
  );
};

export default Product_1;
import React from 'react';
import ProductPage from '../../components/ProductPage/ProductPage';
import ProductCardGroup from '../../components/ProductPage/ProductCardGroup';
import './ProductDetail.css';

const ProductDetail = () => {
  // 제품 데이터 정의
  const productData = {
    name: "XCN-3000",
    title: "어드밴스드 통합제어기",
    description: "산업 자동화 및 스마트 시스템 통합을 위한 다목적 인터페이스 제어 모듈로, 다양한 환경에서 안정적인 연결성과 정밀한 제어를 제공하며, 효율적인 관리와 운영을 가능하게 합니다.",
    breadcrumbs: ["Home", "Products", "Control system"],
    images: [],
    overview: "XCN-3000은 산업용 통합 제어 시스템으로, 다양한 센서와 장비를 연결하여 실시간 모니터링 및 제어를 제공합니다.",
    keyFeatures: [
      "고성능 멀티코어 프로세서",
      "실시간 데이터 처리",
      "다양한 통신 프로토콜 지원",
      "확장 가능한 모듈식 구조"
    ],
    features: [
      {
        icon: "🔧",
        title: "통합 제어 시스템",
        description: "다양한 장비와 시스템을 통합하여 효율적으로 제어할 수 있습니다."
      },
      {
        icon: "📊",
        title: "실시간 모니터링",
        description: "실시간으로 시스템 상태를 모니터링하고 분석합니다."
      },
      {
        icon: "🛡️",
        title: "보안 기능",
        description: "강력한 보안 기능으로 시스템을 안전하게 보호합니다."
      },
      {
        icon: "⚡",
        title: "고성능 처리",
        description: "고성능 프로세서로 빠른 응답 속도를 제공합니다."
      }
    ],
    specifications: [
      { label: "프로세서", value: "Intel Core i7" },
      { label: "메모리", value: "16GB DDR4" },
      { label: "저장공간", value: "512GB SSD" },
      { label: "네트워크", value: "Gigabit Ethernet" },
      { label: "전원", value: "100-240V AC" },
      { label: "작동온도", value: "-10°C ~ 50°C" }
    ],
    certifications: [
      {
        name: "ISO 9001",
        description: "품질 관리 시스템 인증",
        image: "/placeholder-cert.png"
      },
      {
        name: "CE 인증",
        description: "유럽 안전 표준 인증",
        image: "/placeholder-cert.png"
      },
      {
        name: "FCC 인증",
        description: "미국 연방 통신 위원회 인증",
        image: "/placeholder-cert.png"
      }
    ],
    downloads: [
      {
        title: "제품 매뉴얼",
        description: "XCN-3000 사용자 매뉴얼",
        size: "2.5MB"
      },
      {
        title: "기술 사양서",
        description: "상세 기술 사양 및 데이터시트",
        size: "1.8MB"
      },
      {
        title: "설치 가이드",
        description: "설치 및 설정 가이드",
        size: "3.2MB"
      }
    ],
    videos: [
      {
        title: "제품 소개 영상",
        description: "XCN-3000의 주요 기능과 특징을 소개합니다.",
        thumbnail: "/placeholder-video.png"
      },
      {
        title: "설치 및 설정 가이드",
        description: "단계별 설치 및 설정 방법을 보여줍니다.",
        thumbnail: "/placeholder-video.png"
      },
      {
        title: "사용법 데모",
        description: "실제 사용 사례와 데모를 제공합니다.",
        thumbnail: "/placeholder-video.png"
      }
    ]
  };

  // 제품 그룹 데이터
  const productGroupData = [
    {
      name: "XCN-3000",
      subtitle: "어드밴스드 통합제어기",
      shortDescription: "산업용 통합 제어 시스템",
      icon: "🔧",
      description: "산업 자동화 및 스마트 시스템 통합을 위한 다목적 인터페이스 제어 모듈입니다.",
      features: [
        "고성능 멀티코어 프로세서",
        "실시간 데이터 처리",
        "다양한 통신 프로토콜 지원",
        "확장 가능한 모듈식 구조"
      ],
      specs: [
        { label: "프로세서", value: "Intel Core i7" },
        { label: "메모리", value: "16GB DDR4" },
        { label: "저장공간", value: "512GB SSD" }
      ],
      actions: [
        {
          label: "자세히 보기",
          type: "primary",
          icon: "👁️",
          onClick: () => console.log("XCN-3000 상세보기")
        },
        {
          label: "견적 문의",
          type: "secondary",
          icon: "💬",
          onClick: () => console.log("XCN-3000 견적 문의")
        }
      ]
    },
    {
      name: "XCN-2000",
      subtitle: "스마트 제어 시스템",
      shortDescription: "중소형 공장용 제어 시스템",
      icon: "⚡",
      description: "중소형 공장과 제조 시설에 최적화된 스마트 제어 시스템입니다.",
      features: [
        "직관적인 사용자 인터페이스",
        "원격 모니터링 기능",
        "에너지 효율성 최적화",
        "빠른 설치 및 설정"
      ],
      specs: [
        { label: "프로세서", value: "Intel Core i5" },
        { label: "메모리", value: "8GB DDR4" },
        { label: "저장공간", value: "256GB SSD" }
      ],
      actions: [
        {
          label: "자세히 보기",
          type: "primary",
          icon: "👁️",
          onClick: () => console.log("XCN-2000 상세보기")
        },
        {
          label: "견적 문의",
          type: "secondary",
          icon: "💬",
          onClick: () => console.log("XCN-2000 견적 문의")
        }
      ]
    },
    {
      name: "XCN-1000",
      subtitle: "기본 제어 모듈",
      shortDescription: "소형 장비용 제어 모듈",
      icon: "📦",
      description: "소형 장비와 단일 시스템을 위한 기본 제어 모듈입니다.",
      features: [
        "컴팩트한 디자인",
        "저전력 소비",
        "간단한 설정",
        "경제적인 가격"
      ],
      specs: [
        { label: "프로세서", value: "ARM Cortex-A7" },
        { label: "메모리", value: "2GB DDR3" },
        { label: "저장공간", value: "32GB eMMC" }
      ],
      actions: [
        {
          label: "자세히 보기",
          type: "primary",
          icon: "👁️",
          onClick: () => console.log("XCN-1000 상세보기")
        },
        {
          label: "견적 문의",
          type: "secondary",
          icon: "💬",
          onClick: () => console.log("XCN-1000 견적 문의")
        }
      ]
    }
  ];

  return (
    <div className="product-detail-page">
      <ProductPage productData={productData} />
      
      <ProductCardGroup 
        products={productGroupData}
        title="제품 라인업"
        subtitle="다양한 제품을 확인해보세요"
      />
    </div>
  );
};

export default ProductDetail;

import React, { useState, useEffect } from 'react';
import ProductPage from '../../components/ProductPage/ProductPage';
import './Product_safety.css';
import { supabase } from '../../lib/supabase';
import { uploadImage, validateImageFile } from '../../utils/imageUpload';

// product_safety 폴더의 이미지들을 불러옵니다
import mainImg from '../../assets/product_safety/main.jpg';
import main2Img from '../../assets/product_safety/main_2.jpg';
import main3Img from '../../assets/product_safety/main_3.jpg';
import main4Img from '../../assets/product_safety/main_4.jpg';
import sub1Img from '../../assets/product_safety/sub_1.png';
import sub2Img from '../../assets/product_safety/sub_2.png';
import sub3Img from '../../assets/product_safety/sub_3.png';
import sub4Img from '../../assets/product_safety/sub_4.png';
import sub5Img from '../../assets/product_safety/sub_5.png';
import sub6Img from '../../assets/product_safety/sub_6.png';
import sub7Img from '../../assets/product_safety/sub_7.png';
import sub8Img from '../../assets/product_safety/sub_8.png';
import sub9Img from '../../assets/product_safety/sub_9.png';
import sub10Img from '../../assets/product_safety/sub_10.png';
import sub11Img from '../../assets/product_safety/sub_11.png';
import sub12Img from '../../assets/product_safety/sub_12.png';

const Product_safety_1 = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [productData, setProductData] = useState({
    name: "TWMOB-01",
    title: "TWMOB-01",
    // description: "XCN-3000",
    breadcrumbs: ["Home", "Products", "스마트 안전장비"],
    images: [mainImg, main2Img, main3Img, main4Img],
    // 스펙 탭 미디어 그리드용 개별 이미지 지정 (좌측 1, 우측 상/하)

    overview_title: "2륜 카트 이동식 태양광 80w 무선CCTV 30배 줌 PTZ 5백만 화소 IP CCTV 세트",
    overview: "카트 이동식 태양광 80w 30배 줌 5백만 화소 초 고화질 PTZ 카메라 세트는 비 포장 공사 현장에서도 이동이 용이하며, LTE 라우터를 설치하여 PC 또는 모바일로 원격 관제를 수행합니다",
    bottom_box_title: "이동식 무선 감시장치 특허 제품이며, 2륜카트식 80w 60AH 태양광 무선 이동식 30배 줌 5백만 화소 출력으로, 삼성엔지니어링, 현대건설, 장성군청, 고창군청, 여수시, 포스코ENC, 부산 항만 등 토목공사 현장과 한화 현장 등에 사용되고 있는 장비입니다. 기기 등록된 모바일은 물론, NVR 모니터를 통하여 설치된 모든 30줌 PTZ를 한 화면으로 스마트통합관제하실 수 있습니다. 조달청 등록 및 디자인 특허를 보유하고 있으며, 실내 공사 등 태양광 패널을 설치하기 어려운 곳에는 DC12V/65A 리튬배터리 뱅크를 선택하시면 됩니다.",
    bottom_box_photo: mainImg,
    bottom_box_photos: [sub1Img, sub2Img],
    bottom_box_photo_caption: '현장 설치 예시',
    bottom_box_photo_captions: ['스마트 무선 CCTV', 'PTZ 구성도'],

    features: [
      { description: "움직임 감지 시 알림을 전송하여 즉각 대응이 가능합니다.", image: sub8Img },
      {  description: "양방향 오디오로 현장과 실시간 소통을 지원합니다.", image: main4Img },
      {  description: "PC/모바일 등 다양한 플랫폼에서 관제가 가능합니다.", image: sub3Img },
      { description: "장거리 피사체를 선명하게 포착하는 30배 광학 줌.", image: sub5Img },
      { description: "고해상도 영상으로 디테일을 정확히 확인.", image: sub9Img },
      { description: "모바일 앱 등록으로 간편한 원격 관제.", image: sub4Img }
    ],
    // 새로운 통합 포맷: specs_media (배열 또는 객체)
    specs_media: [
      { image: sub6Img, title: '보안 카메라 사양' },
      { image: sub7Img, title: '카메라 일체형 무선방송 이륜 카트' },
      { image: sub10Img, title: '무전기 무선방송 스피커' },
    ],
    certifications: [
      {
        name: "CE 인증",
        description: "유럽 안전 표준 인증",
        image: sub12Img
      },
      {
        name: "FCC 인증",
        description: "미국 연방 통신 위원회 인증",
        image: sub11Img
      },
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
  });

  const [submitting, setSubmitting] = useState(false);

  // 데이터 변경 핸들러
  const handleDataChange = (field, value) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 편집 모드 토글
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // 저장 함수
  const handleSave = async () => {
    setSubmitting(true);
    try {
      // 여기에 Supabase 저장 로직 추가 (필요시)
      console.log('저장된 데이터:', productData);
      alert('저장되었습니다!');
      setIsEditMode(false);
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  // 편집 취소
  const handleCancel = () => {
    setIsEditMode(false);
    // 원본 데이터로 복원 (필요시)
  };

  return (
    <div className="product-detail-page">
      {/* 편집 모드 전환 버튼 */}
      <div style={{ 
        position: 'fixed', 
        top: '20px', 
        right: '20px', 
        zIndex: 1000,
        display: 'flex',
        gap: '10px'
      }}>
        <button
          onClick={toggleEditMode}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            background: isEditMode ? '#dc3545' : '#007bff',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          {isEditMode ? '편집 종료' : '편집 모드'}
        </button>
        
        {isEditMode && (
          <>
            <button
              onClick={handleSave}
              disabled={submitting}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                background: submitting ? '#6c757d' : '#28a745',
                color: 'white',
                cursor: submitting ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              {submitting ? '저장 중...' : '저장'}
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: '10px 20px',
                border: '1px solid #6c757d',
                borderRadius: '5px',
                background: 'white',
                color: '#6c757d',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              취소
            </button>
          </>
        )}
      </div>

      {/* 편집 모드 안내 */}
      {isEditMode && (
        <div style={{
          background: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '5px',
          padding: '15px',
          margin: '20px',
          color: '#155724',
          fontSize: '14px'
        }}>
          <strong>편집 모드:</strong> 텍스트 영역을 클릭하여 직접 편집할 수 있습니다. 
          Enter 키로 저장, Escape 키로 취소할 수 있습니다.
        </div>
      )}

      <ProductPage 
        productData={productData} 
        isEditMode={isEditMode}
        onDataChange={handleDataChange}
      />
      
      {/* <ProductCardGroup 
        products={productGroupData}
        title="AI 브릿지 제품 라인업"
        subtitle="다양한 AI 영상 분석 디바이스를 확인해보세요"
      /> */}
    </div>
  );
};

export default Product_safety_1;
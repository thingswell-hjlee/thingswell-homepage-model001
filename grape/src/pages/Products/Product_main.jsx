
import React, { useState, useEffect, useRef } from 'react';
import './Product_main.css';
import welding from '../../assets/welding.jpg';
import SolutionCard from '../../components/SolutionCard';
import Kategorie from '../../components/Kategorie';

const Product_main = () => {

  // 각 섹션별 ref 생성
  const solutionRef = useRef(null);
  const kategorieRef = useRef(null);
  
  // 각 정부지원사업별 데이터 정의
  const solutionDataArray = [
    {
      subtitle: "Product  ",
      title: "제품",
      description: "보안, 그 이상의 선구자, 스마트한 의사 결정 지원과 상업적 성장 제공",
    },
  ];
  
  // 제품 카테고리 데이터
  const productItems = [
    {
      image: welding,
      imageAlt: "스마트안전장비",
      label: "스마트안전장비",
      title: "스마트안전장비",
      link: "/products/safety"
    },
    {
      image: welding,
      imageAlt: "관제시스템",
      label: "관제시스템",
      title: "관제시스템",
      link: "/products/monitoring"
    },
    {
      image: welding,
      imageAlt: "통합제어",
      label: "통합제어",
      title: "통합제어",
      link: "/products/control/list"
    },
  ];
    
  
  const [selectedIdx] = useState(0); // 기본값을 0으로 설정

  // 현재 선택된 인덱스에 따른 solutionData
  const currentSolutionData = solutionDataArray[selectedIdx];

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="solutions-section">
              <SolutionCard ref={solutionRef} {...currentSolutionData} showButton={false} variant="hero" />
              <Kategorie ref={kategorieRef} title="제품" items={productItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_main; 
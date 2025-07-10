
import React, { useState, useEffect, useRef } from 'react';
import './Product_main.css';
import welding from '../../assets/welding.jpg';
import SolutionCard from '../../components/SolutionCard';

const Product_main = () => {

  // 각 섹션별 ref 생성
  const solutionRef = useRef(null);
  
  // 각 정부지원사업별 데이터 정의
  const solutionDataArray = [
    {
      subtitle: "Product  ",
      title: "제품",
      description: "산업변화와 기술발전에 따른 다양한 산업재해를 예방하기 위해 재정 및 기술여건이 취약한 중소사업장에 스마트 안전장비 도입 시 보조금을 지원하는 사업입니다. AI, IoT, 빅데이터, 영상 분석 등 다양한 IT 기술이 융합되어, 실시간 위험 감지와 신속한 대응이 가능합니다.",
      image: welding,
      imageAlt: "스마트 안전장비지원사업",
      link: "/government-support-detail"
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
              <SolutionCard ref={solutionRef} {...currentSolutionData} showButton={true} />


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_main; 
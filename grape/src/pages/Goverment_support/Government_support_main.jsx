import React, { useState, useEffect, useRef } from 'react';
import './Government_support_main.css';
import welding from '../../assets/welding.jpg';
import construction from '../../assets/construction.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import grinding from '../../assets/grinding.jpg';
import SolutionCard from '../../components/SolutionCard';
import SelectCardList from '../../components/SelectCardList';
const Government_support_main = () => {

  // 각 섹션별 ref 생성
  const solutionRef = useRef(null);
  
  // 각 정부지원사업별 데이터 정의
  const solutionDataArray = [
    {
      subtitle: "Government Support Project 1",
      title: "정부지원사업 1",
      description: "첫 번째 정부지원사업에 대한 상세한 설명입니다. 이 사업은 기술‧재정적 능력이 취약한 산재보험가입 50인 미만 사업장을 대상으로 합니다.",
      image: welding,
      imageAlt: "정부지원사업 1",
      link: "/government-support-1"
    },
    {
      subtitle: "Government Support Project 2", 
      title: "정부지원사업 2",
      description: "두 번째 정부지원사업에 대한 상세한 설명입니다. 업종별 평균 매출액이 '소기업 규모 기준' 이하인 사업장을 대상으로 합니다.",
      image: construction,
      imageAlt: "정부지원사업 2",
      link: "/government-support-2"
    },
    {
      subtitle: "Government Support Project 3",
      title: "정부지원사업 3", 
      description: "세 번째 정부지원사업에 대한 상세한 설명입니다. 공사금액 50억원 미만 건설현장을 대상으로 합니다.",
      image: manufacturing,
      imageAlt: "정부지원사업 3",
      link: "/government-support-3"
    },
    {
      subtitle: "Government Support Project 4",
      title: "정부지원사업 4",
      description: "네 번째 정부지원사업에 대한 상세한 설명입니다. 산업단지를 대상으로 유해·위험요인 개선을 위한 보조지원을 제공합니다.",
      image: grinding,
      imageAlt: "정부지원사업 4",
      link: "/government-support-4"
    }
  ];

  const selectCardData = [
    "정부지원사업 1",
    "정부지원사업 2", 
    "정부지원사업 3",
    "정부지원사업 4",
  ];

  const [selectedIdx, setSelectedIdx] = useState(0); // 기본값을 0으로 설정

  // 현재 선택된 인덱스에 따른 solutionData
  const currentSolutionData = solutionDataArray[selectedIdx];

  return (
    <div className="page-container">
      
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="solutions-section">
              <SelectCardList 
                options={selectCardData}
                selectedOption={selectedIdx !== null ? selectCardData[selectedIdx] : null}
                onOptionSelect={(option) => {
                  const index = selectCardData.indexOf(option);
                  setSelectedIdx(index);
                }}
              />
              <SolutionCard ref={solutionRef} {...currentSolutionData} showButton={true} />


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Government_support_main; 
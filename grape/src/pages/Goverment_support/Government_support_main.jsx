/**
 * Government_support_main 컴포넌트
 * 
 * 정부지원사업 메인 페이지를 렌더링하는 컴포넌트입니다.
 * 여러 정부지원사업을 선택할 수 있는 카드 리스트와 선택된 사업의 상세 정보를 표시합니다.
 * SelectCardList를 통해 정부지원사업을 선택하고, SolutionCard로 선택된 사업의 정보를 보여줍니다.
 * 
 * 주요 기능:
 * - 4개의 정부지원사업 중 선택 가능
 * - 선택된 사업의 상세 정보 표시
 * - 각 사업별 이미지, 제목, 설명 포함
 * - "자세히 보기" 버튼으로 상세 페이지 이동
 * 
 * 포함된 정부지원사업:
 * - 스마트 안전장비지원사업: AI, IoT, 빅데이터, 영상 분석을 활용한 실시간 위험 감지 시스템
 * - AI 제조업 지원사업: 인공지능 기술을 활용한 스마트 제조업 육성
 * - 친환경 에너지 지원사업: 친환경 에너지 기술 도입을 통한 탄소중립 실현
 * - 디지털 전환 지원사업: 중소기업의 디지털 전환을 지원하여 경쟁력 강화
 * 
 * 사용법:
 * <Government_support_main />
 */
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
      subtitle: "Smart Safety Equipment Support",
      title: "스마트 안전장비지원사업",
      description: "산업변화와 기술발전에 따른 다양한 산업재해를 예방하기 위해 재정 및 기술여건이 취약한 중소사업장에 스마트 안전장비 도입 시 보조금을 지원하는 사업입니다. AI, IoT, 빅데이터, 영상 분석 등 다양한 IT 기술이 융합되어, 실시간 위험 감지와 신속한 대응이 가능합니다.",
      image: welding,
      imageAlt: "스마트 안전장비지원사업",
      link: "/government-support-detail"
    },
    {
      subtitle: "AI Manufacturing Support", 
      title: "AI 제조업 지원사업",
      description: "인공지능 기술을 활용한 스마트 제조업 육성을 위한 지원사업입니다. AI 기술 도입을 희망하는 제조업 중소기업을 대상으로 최대 4,000만원까지 지원하여 스마트팩토리 구축을 돕습니다.",
      image: manufacturing,
      imageAlt: "AI 제조업 지원사업",
      link: "/ai-manufacturing-support"
    },
    {
      subtitle: "Green Energy Support",
      title: "친환경 에너지 지원사업", 
      description: "친환경 에너지 기술 도입을 통한 탄소중립 실현과 에너지 효율성 향상을 지원하는 사업입니다. 에너지 사용량이 연간 500TOE 이상인 기업을 대상으로 최대 7,000만원까지 지원합니다.",
      image: construction,
      imageAlt: "친환경 에너지 지원사업",
      link: "/green-energy-support"
    },
    {
      subtitle: "Digital Transformation Support",
      title: "디지털 전환 지원사업",
      description: "중소기업의 디지털 전환을 지원하여 경쟁력을 강화하고 생산성을 향상시키는 사업입니다. 상시근로자 수 300명 미만 기업을 대상으로 최대 3,000만원까지 지원하여 디지털 전환을 돕습니다.",
      image: grinding,
      imageAlt: "디지털 전환 지원사업",
      link: "/digital-transformation-support"
    }
  ];

  const selectCardData = [
    "스마트 안전장비지원사업",
    "AI 제조업 지원사업", 
    "친환경 에너지 지원사업",
    "디지털 전환 지원사업",
  ];

  const [selectedIdx, setSelectedIdx] = useState(0); // 기본값을 0으로 설정

  // 현재 선택된 인덱스에 따른 solutionData
  const currentSolutionData = solutionDataArray[selectedIdx];

  return (
    <div className="page-container">
      
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="solutions-section menu-spacing">
              <SelectCardList 
                options={selectCardData}
                selectedOption={selectedIdx !== null ? selectCardData[selectedIdx] : null}
                onOptionSelect={(option) => {
                  const index = selectCardData.indexOf(option);
                  setSelectedIdx(index);
                }}
              />
              <SolutionCard ref={solutionRef} {...currentSolutionData} showButton={true} buttonText="자세히 보기" variant="solution-main" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Government_support_main; 
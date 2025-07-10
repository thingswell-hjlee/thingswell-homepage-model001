/**
 * Government_support_main 컴포넌트
 * 
 * 정부지원사업 메인 페이지를 렌더링하는 컴포넌트입니다.
 * 여러 정부지원사업을 선택할 수 있는 카드 리스트와 선택된 사업의 상세 정보를 표시합니다.
 * SelectCardList를 통해 사업을 선택하고, SolutionCard로 선택된 사업의 정보를 보여줍니다.
 * 
 * 주요 기능:
 * - 여러 정부지원사업 중 선택 가능
 * - 선택된 사업의 상세 정보 표시
 * - 각 사업별 이미지, 제목, 설명 포함
 * - "자세히 보기" 버튼으로 상세 페이지 이동
 * 
 * 사용법:
 * <Government_support_main />
 */
import React, { useState, useEffect, useRef } from 'react';
import './Government_support_main.css';
import SolutionCard from '../../components/SolutionCard';
import SelectCardList from '../../components/SelectCardList';
import { 
  smartSafetyEquipmentData, 
  digitalTransformationData, 
  greenEnergyData, 
  aiManufacturingData 
} from '../../data/governmentSupportData';

const Government_support_main = () => {

  // 각 섹션별 ref 생성
  const solutionRef = useRef(null);
  
  // 정부지원사업 데이터 배열
  const supportProjects = [
    {
      id: "smart-safety-equipment",
      title: smartSafetyEquipmentData.solutionData.title,
      subtitle: smartSafetyEquipmentData.solutionData.subtitle,
      description: smartSafetyEquipmentData.solutionData.description,
      image: smartSafetyEquipmentData.solutionData.image,
      imageAlt: smartSafetyEquipmentData.solutionData.imageAlt,
      link: "/government-support/smart-safety-equipment"
    },
    {
      id: "digital-transformation",
      title: digitalTransformationData.solutionData.title,
      subtitle: digitalTransformationData.solutionData.subtitle,
      description: digitalTransformationData.solutionData.description,
      image: digitalTransformationData.solutionData.image,
      imageAlt: digitalTransformationData.solutionData.imageAlt,
      link: "/government-support/digital-transformation"
    },
    {
      id: "green-energy",
      title: greenEnergyData.solutionData.title,
      subtitle: greenEnergyData.solutionData.subtitle,
      description: greenEnergyData.solutionData.description,
      image: greenEnergyData.solutionData.image,
      imageAlt: greenEnergyData.solutionData.imageAlt,
      link: "/government-support/green-energy"
    },
    {
      id: "ai-manufacturing",
      title: aiManufacturingData.solutionData.title,
      subtitle: aiManufacturingData.solutionData.subtitle,
      description: aiManufacturingData.solutionData.description,
      image: aiManufacturingData.solutionData.image,
      imageAlt: aiManufacturingData.solutionData.imageAlt,
      link: "/government-support/ai-manufacturing"
    }
  ];

  const selectCardData = supportProjects.map(project => project.title);

  const [selectedIdx, setSelectedIdx] = useState(0); // 기본값을 0으로 설정

  // 현재 선택된 인덱스에 따른 solutionData
  const currentSolutionData = supportProjects[selectedIdx];

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
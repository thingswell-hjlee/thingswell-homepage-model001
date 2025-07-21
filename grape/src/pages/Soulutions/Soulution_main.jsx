/**
 * Soulution_main 컴포넌트
 * 
 * 솔루션 메인 페이지를 렌더링하는 컴포넌트입니다.
 * 여러 솔루션을 선택할 수 있는 카드 리스트와 선택된 솔루션의 상세 정보를 표시합니다.
 * SelectCardList를 통해 솔루션을 선택하고, SolutionCard로 선택된 솔루션의 정보를 보여줍니다.
 * 
 * 주요 기능:
 * - 4개의 솔루션 중 선택 가능
 * - 선택된 솔루션의 상세 정보 표시
 * - 각 솔루션별 이미지, 제목, 설명 포함
 * - "자세히 보기" 버튼으로 상세 페이지 이동
 * 
 * 포함된 솔루션:
 * - 산업안전 솔루션: AI, IoT, 빅데이터, 영상 분석을 활용한 실시간 위험 감지 시스템
 * - 솔루션 2: 업종별 평균 매출액이 '소기업 규모 기준' 이하인 사업장 대상
 * - 솔루션 3: 공사금액 50억원 미만 건설현장 대상
 * - 솔루션 4: 산업단지를 대상으로 유해·위험요인 개선을 위한 보조지원
 * 
 * 사용법:
 * <Soulution_main />
 */
import React, { useState, useEffect, useRef } from 'react';
import './Soulution_main.css';
import welding from '../../assets/welding.jpg';
import construction from '../../assets/construction.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import grinding from '../../assets/grinding.jpg';
import SolutionCard from '../../components/SolutionCard';
import SelectCardList from '../../components/SelectCardList';

const Soulution_main = () => {

  // 각 섹션별 ref 생성
  const solutionRef = useRef(null);
  
  // 각 솔루션별 데이터 정의
  const solutionDataArray = [
    {
      subtitle: "Industrial safety solutions",
      title: "제조 안전 솔루션",
      description: "RAG 기반의 대규모 비전 모델(LVM), 대규모 언어 모델(LLM), 실시간 센싱 시스템의 멀티모달 데이터를 통합한 작업자 안전 솔루션",
      image: welding,
      imageAlt: "제조 안전 솔루션",
      link: "/solution"
    },
    {
      subtitle: "Construction safety solutions", 
      title: "건설 안전 솔루션",
      description: "건설 현장의 특수한 환경과 위험 요소를 고려한 전문 안전 솔루션",
      image: construction,
      imageAlt: "건설 안전 솔루션",
      link: "/construction-solution"
    },
    {
      subtitle: "Manufacturing safety solutions",
      title: "노인 장애인 안전 솔루션", 
      description: "인지장애가 있는 장애인, 노인의 생활 안전 솔루션",
      image: manufacturing,
      imageAlt: "노인 장애인 안전 솔루션",
      link: "/manufacturing-solution"
    },
    {
      subtitle: "Chemical industry safety solutions",
      title: "전기차 화재 안전 솔루션",
      description: "실시간 온도 모니터링을 통한 화재 감지 솔루션",
      image: grinding,
      imageAlt: "전기차 화재 안전 솔루션",
      link: "/chemical-solution"
    }
  ];

  const selectCardData = [
    "제조 안전 솔루션",
    "건설 안전 솔루션", 
    "노인 장애인 안전 솔루션",
    "전기차 화재 안전 솔루션",
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

export default Soulution_main; 
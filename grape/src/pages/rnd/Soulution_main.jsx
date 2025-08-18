/**
 * Soulution_main 컴포넌트
 * 
 * 솔루션 메인 페이지를 렌더링하는 컴포넌트입니다.
 * 여러 솔루션을 선택할 수 있는 카드 리스트와 선택된 솔루션의 상세 정보를 표시합니다.
 * SelectCardList를 통해 솔루션을 선택하고, CaseGrid로 선택된 솔루션의 정보를 보여줍니다.
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
import CaseGrid from '../../components/CaseGrid';
import SelectCardList from '../../components/SelectCardList';

const Soulution_main = () => {

  // 각 섹션별 ref 생성
  const solutionRef = useRef(null);
  
  // 각 솔루션별 데이터 정의 (CaseGrid 형식에 맞게 조정)
  const solutionDataArray = [
    {
      id: 1,
      category: "솔루션",
      company: "싱스웰",
      title: "산업 안전 솔루션",
      description: "AI 기반 멀티모달 산업안전 솔루션으로 작업자 안전을 극대화하는 혁신적인 기술을 연구합니다",
      image: welding,
      industry: "제조 안전 솔루션",
      link: "/rnd/industrial-safety",
      btnText: "자세히 보기"
    },
    {
      id: 2,
      category: "솔루션",
      company: "싱스웰",
      title: "통합제어 솔루션",
      description: "다양한 산업 장비와 시스템을 하나의 플랫폼에서 통합 관리하고 제어하는 혁신적인 기술",
      image: construction,
      industry: "건설 안전 솔루션",
      link: "/rnd/integrated-control",
      btnText: "자세히 보기"
    },
    {
      id: 3,
      category: "솔루션",
      company: "싱스웰",
      title: "노인 장애인 안전 솔루션", 
      description: "AI 기반 노인 및 장애인 안전 솔루션으로 독립적인 생활을 지원하는 혁신적인 기술",
      image: manufacturing,
      industry: "노인 장애인 안전 솔루션",
      link: "/rnd/elderly-disabled",
      btnText: "자세히 보기"
    },
    {
      id: 4,
      category: "솔루션",
      company: "싱스웰",
      title: "AI 융합 기술",
      description: "RAG-LLM, 온디바이스 AI, 멀티모달 센서 등 다양한 AI 기술을 융합한 혁신적인 솔루션",
      image: grinding,
      industry: "전기차 화재 안전 솔루션",
      link: "/rnd/industrial-safety",
      btnText: "자세히 보기"
    }
  ];

  const selectCardData = [
    "산업 안전 솔루션",
    "통합제어 솔루션", 
    "노인 장애인 안전 솔루션",
    "AI 융합 기술",
  ];

  const [selectedIdx, setSelectedIdx] = useState(0); // 기본값을 0으로 설정

  // 현재 선택된 인덱스에 따른 solutionData (CaseGrid는 배열 형태로 전달)
  const currentSolutionData = [solutionDataArray[selectedIdx]];

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
              <CaseGrid ref={solutionRef} cases={currentSolutionData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Soulution_main; 
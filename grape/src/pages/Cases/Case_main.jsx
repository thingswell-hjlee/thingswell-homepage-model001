/**
 * Case_main 컴포넌트
 * 
 * 사례 메인 페이지를 렌더링하는 컴포넌트입니다.
 * 여러 사례를 선택할 수 있는 카드 리스트와 선택된 사례의 상세 정보를 표시합니다.
 * SelectCardList를 통해 사례를 선택하고, CaseGrid로 선택된 사례의 정보를 보여줍니다.
 * 
 * 주요 기능:
 * - 4개의 사례 중 선택 가능
 * - 선택된 사례의 상세 정보 표시
 * - 각 사례별 이미지, 제목, 설명 포함
 * - "사례 연구 보기" 버튼으로 상세 페이지 이동
 * 
 * 포함된 사례:
 * - Coats 과속 사고 50% 감소 사례
 * - 기타 제조업 사례들
 * 
 * 사용법:
 * <Case_main />
 */
import React, { useState, useEffect, useRef } from 'react';
import './Case_main.css';
import welding from '../../assets/welding.jpg';
import construction from '../../assets/construction.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import grinding from '../../assets/grinding.jpg';
import CaseGrid from '../../components/CaseGrid';
import SelectCardList from '../../components/SelectCardList';

const Case_main = () => {

  // 각 섹션별 ref 생성
  const solutionRef = useRef(null);
  
  // 각 사례별 데이터 정의 (CaseGrid 형식에 맞게 조정)
  const caseDataArray = [
    {
      id: 1,
      category: "제조업",
      company: "서울시",
      title: "서울시 중구 40개 IP 카메라의 AI 안전 피플 카운팅 및 쓰러짐 감지 시스템 공급",
      description: "서울시 중구 40개 IP 카메라의 AI 안전 피플 카운팅 및 쓰러짐 감지 시스템 공급",
      image: manufacturing,
      industry: "보행자 안전",
      link: "/case",
      btnText: "사례 연구 보기"
    },
    {
      id: 2,
      category: "제조업",
      company: "Coats",
      title: "Coats 과속 사고 50% 감소 사례",
      description: "AI 기반 과속 감지 시스템을 도입하여 작업장 내 과속 사고를 50% 감소시킨 성공 사례입니다.",
      image: welding,
      industry: "과속 감지",
      link: "/case-2",
      btnText: "사례 연구 보기"
    },
    {
      id: 3,
      category: "건설업",
      company: "건설현장 A",
      title: "건설현장 안전관리 시스템 도입 사례",
      description: "건설현장에 AI 안전관리 시스템을 도입하여 안전사고를 크게 줄인 사례입니다.",
      image: construction,
      industry: "건설 안전",
      link: "/case-3",
      btnText: "사례 연구 보기"
    },
    {
      id: 4,
      category: "제조업",
      company: "제조업체 B",
      title: "제조업체 안전관리 솔루션 도입 사례",
      description: "제조업체에 종합적인 안전관리 솔루션을 도입하여 작업환경을 개선한 사례입니다.",
      image: grinding,
      industry: "제조 안전",
      link: "/case-4",
      btnText: "사례 연구 보기"
    }
  ];

  const selectCardData = [
    "서울시 AI 안전 시스템",
    "Coats 과속 감지 시스템", 
    "건설현장 안전관리",
    "제조업체 안전관리",
  ];

  const [selectedIdx, setSelectedIdx] = useState(0); // 기본값을 0으로 설정

  // 현재 선택된 인덱스에 따른 caseData (CaseGrid는 배열 형태로 전달)
  const currentCaseData = [caseDataArray[selectedIdx]];

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
              <CaseGrid ref={solutionRef} cases={currentCaseData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Case_main; 
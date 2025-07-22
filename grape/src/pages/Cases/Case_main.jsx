/**
 * Case_main 컴포넌트
 * 
 * 사례 메인 페이지를 렌더링하는 컴포넌트입니다.
 * 여러 사례를 카드 형태로 보여주며, 각 사례의 상세 정보를 표시합니다.
 * 
 * 주요 기능:
 * - 여러 사례를 카드 리스트로 표시
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
import { Link } from 'react-router-dom';
import SolutionCard from '../../components/SolutionCard';
import CaseGrid from '../../components/CaseGrid';

const Case_main = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const cases = [
    {
      id: 1,
      category: "제조업",
      company: "서울시",
      title: "서울시 중구 40개 IP 카메라의 AI 안전 피플 카운팅 및 쓰러짐 감지 시스템 공급",
      description: "서울시 중구 40개 IP 카메라의 AI 안전 피플 카운팅 및 쓰러짐 감지 시스템 공급",
      image: manufacturing,
      link: "/case",
      industry: "보행자 안전",
      btnText: "사례 연구 보기"
    },
    
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="solutions-section menu-spacing">
              <SolutionCard
                subtitle="Cases"
                title="도입사례"
                description="싱스웰 안전 솔루션 도입 사례를 확인하세요"
                showButton={false}
                link="/cases"
                className="custom-solution-left"
                variant="hero"
                reverse={false}
              />
              
              <CaseGrid cases={cases} btnText="사례 연구 보기" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Case_main; 
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
      category: "스마트안전장비",
      company: "싱스웰",
      title: "스마트안전장비 실적",
      description: "스마트안전장비 관련 실적들을 확인하실 수 있습니다.",
      image: manufacturing,
      link: "/cases/smart-safety",
      industry: "스마트안전장비",
      btnText: "실적 보기"
    },
    {
      id: 2,
      category: "AI",
      company: "싱스웰",
      title: "AI 실적",
      description: "AI 관련 실적들을 확인하실 수 있습니다.",
      image: construction,
      link: "/cases/ai",
      industry: "AI",
      btnText: "실적 보기"
    },
    {
      id: 3,
      category: "통합제어",
      company: "싱스웰",
      title: "통합제어 실적",
      description: "통합제어 관련 실적들을 확인하실 수 있습니다.",
      image: welding,
      link: "/cases/integrated-control",
      industry: "통합제어",
      btnText: "실적 보기"
    },
    {
      id: 4,
      category: "정보통신",
      company: "싱스웰",
      title: "정보통신 실적",
      description: "정보통신 관련 실적들을 확인하실 수 있습니다.",
      image: grinding,
      link: "/cases/information-communication",
      industry: "정보통신",
      btnText: "실적 보기"
    }
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="solutions-section">
              <SolutionCard
                subtitle="Cases"
                title="실적"
                description="싱스웰의 다양한 실적들을 확인하세요"
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
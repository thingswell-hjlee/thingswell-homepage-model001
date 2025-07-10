/**
 * ApplicationCardsSection 컴포넌트
 * 
 * 애플리케이션 카드들을 그리드 형태로 표시하는 섹션 컴포넌트입니다.
 * 여러 개의 ApplicationCard를 반응형 레이아웃으로 배치합니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {Array} props.applicationCardsData - 카드 데이터 배열
 * @param {React.Ref} ref - forwardRef를 통해 전달되는 ref
 * 
 * 사용법:
 * <ApplicationCardsSection 
 *   applicationCardsData={[
 *     { title: "카드 제목", description: "설명", image: "이미지경로" },
 *     ...
 *   ]} 
 * />
 */
import React, { forwardRef } from 'react';
import ApplicationCard from './ApplicationCard';
import './ApplicationCardsSection.css';

const ApplicationCardsSection = forwardRef((props, ref) => {
  const { applicationCardsData, boxName } = props;
  return (
    <div ref={ref} className="application-card application-section-responsive">
      <div className="cards-container">
      <div className="application-card-section-title">{boxName}</div>
        <div className="application-cards no-line responsive-cards">
          {applicationCardsData.map((card, index) => (
            <ApplicationCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default ApplicationCardsSection; 
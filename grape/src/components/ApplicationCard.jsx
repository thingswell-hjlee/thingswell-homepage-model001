/**
 * ApplicationCard 컴포넌트
 * 
 * 개별 애플리케이션 카드를 렌더링하는 컴포넌트입니다.
 * 이미지, 라벨, 제목을 포함한 카드 형태의 UI 요소입니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.image - 카드 이미지 경로
 * @param {string} props.imageAlt - 이미지 대체 텍스트
 * @param {string} props.label - 카드 라벨 텍스트
 * @param {string} props.title - 카드 제목 텍스트
 * 
 * 사용법:
 * <ApplicationCard 
 *   image="/path/to/image.jpg"
 *   imageAlt="이미지 설명"
 *   label="카테고리"
 *   title="카드 제목"
 * />
 */
import React from 'react';
import './ApplicationCard.css';

const ApplicationCard = ({ image, imageAlt, label, title }) => {
  return (
    <div className="application-card">
      <img src={image} alt={imageAlt} />
        <div className="application-card-label">{label}</div>
        <div className="application-card-title">{title}</div>
    </div>
  );
};

export default ApplicationCard; 
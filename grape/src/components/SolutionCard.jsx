/**
 * SolutionCard 컴포넌트
 * 
 * 솔루션 정보를 카드 형태로 표시하는 컴포넌트입니다.
 * 제목, 부제목, 설명, 이미지를 포함하며, 선택적으로 버튼을 표시할 수 있습니다.
 * forwardRef를 사용하여 외부에서 ref를 전달받을 수 있습니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.subtitle - 카드 부제목
 * @param {string} props.title - 카드 제목
 * @param {string} props.description - 카드 설명
 * @param {string} props.image - 카드 이미지 경로
 * @param {string} props.imageAlt - 이미지 대체 텍스트
 * @param {boolean} props.showButton - 버튼 표시 여부 (기본값: false)
 * @param {string} props.link - 버튼 클릭 시 이동할 링크
 * @param {string} props.className - 추가 CSS 클래스명
 * @param {string} props.variant - 카드 스타일 변형 (full-height, compact, hero 등)
 * @param {boolean} props.reverse - 좌우반전 여부 (기본값: false)
 * @param {React.Ref} ref - forwardRef를 통해 전달되는 ref
 * 
 * 사용법:
 * <SolutionCard 
 *   subtitle="솔루션 카테고리"
 *   title="솔루션 제목"
 *   description="솔루션에 대한 상세한 설명입니다."
 *   image="/path/to/image.jpg"
 *   imageAlt="솔루션 이미지"
 *   showButton={true}
 *   link="/solutions/detail"
 *   className="custom-solution-card"
 *   variant="full-height"
 *   reverse={true}
 * />
 */
import React, { forwardRef } from 'react';
import './SolutionCard.css';

const SolutionCard = forwardRef((props, ref) => {
  const { 
    subtitle, 
    title, 
    description, 
    image, 
    imageAlt, 
    showButton = false, 
    link,
    className = '',
    variant = 'default',
    buttonText = '',
    reverse = false
  } = props;

  // 기본 클래스와 추가 클래스, 변형 클래스, 반전 클래스를 조합
  const cardClassName = `solution-card solution-card-${variant} ${reverse ? 'solution-card-reverse' : ''} ${className}`.trim();

  return (
    <div ref={ref} className={cardClassName}>
      <div className="solution-card-inner">
        <div className="solution-card-header">
        </div>
        <div className="solution-card-text">
          <div className="solution-card-subtitle">{subtitle}</div>
          <div className="solution-card-title">{title}</div>
          <div className="solution-card-desc">{description}</div>
          {showButton && (
            <div className="solution-card-button">
              <button className="solution-card-button-text" onClick={() => window.location.href = link}>{buttonText}</button>
            </div>
          )}
        </div>
        {image && (
          <div className="solution-card-image">
            <img src={image} alt={imageAlt} />
          </div>
        )}

      </div>
    </div>
  );
});

export default SolutionCard; 
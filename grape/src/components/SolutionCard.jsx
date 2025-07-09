import React, { forwardRef } from 'react';
import './SolutionCard.css';

const SolutionCard = forwardRef((props, ref) => {
  const { subtitle, title, description, image, imageAlt, showButton = false, link } = props;
  return (
    <div ref={ref} className="solution-card">
      <div className="solution-card-inner">
        <div className="solution-card-header">
        </div>
        <div className="solution-card-text">
          <div className="solution-card-subtitle">{subtitle}</div>
          <div className="solution-card-title">{title}</div>
          <div className="solution-card-desc">{description}</div>
          {showButton && (
            <div className="solution-card-button">
              <button className="solution-card-button-text" onClick={() => window.location.href = link}>자세히 보기</button>
            </div>
          )}
        </div>
        <div className="solution-card-image">
          <img src={image} alt={imageAlt} />
        </div>

      </div>
    </div>
  );
});

export default SolutionCard; 
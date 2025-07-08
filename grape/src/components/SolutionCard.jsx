import React from 'react';

const SolutionCard = ({ subtitle, title, description, image, imageAlt }) => {
  return (
    <div className="solution-card">
      <div className="solution-card-inner">
        <div className="solution-card-text">
          <div className="solution-card-subtitle">{subtitle}</div>
          <div className="solution-card-title">{title}</div>
          <div className="solution-card-desc">
            {description}
          </div>
        </div>
        <div className="solution-card-image">
          <img src={image} alt={imageAlt} />
        </div>
      </div>
    </div>
  );
};

export default SolutionCard; 
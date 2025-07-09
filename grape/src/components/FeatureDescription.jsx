import React, { forwardRef } from "react";
import "./FeatureDescription.css";

const FeatureDescription = forwardRef(({ image, youtubeUrl, title, description, reverse = false }, ref) => {
  // 유튜브 URL에서 비디오 ID 추출하는 함수
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = youtubeUrl ? getYoutubeVideoId(youtubeUrl) : null;

  return (
    <div ref={ref} className={`feature-description-container ${reverse ? 'reverse' : ''}`}>
      <div className="feature-description-image-section">
        {youtubeUrl && videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="feature-description-video"
          />
        ) : (
          <img src={image} alt="feature" className="feature-description-image" />
        )}
      </div>
      <div className="feature-description-text-section">
        <h2 className="feature-description-title">{title}</h2>
        <p className="feature-description-desc">{description}</p>
      </div>
    </div>
  );
});

FeatureDescription.displayName = 'FeatureDescription';

export default FeatureDescription; 
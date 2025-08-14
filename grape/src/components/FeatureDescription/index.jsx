/**
 * FeatureDescription 컴포넌트
 * 
 * 기능 설명을 이미지/비디오와 텍스트로 표시하는 컴포넌트입니다.
 * 이미지 또는 YouTube 비디오와 함께 제목, 설명을 포함하며,
 * reverse 속성으로 레이아웃 방향을 변경할 수 있습니다.
 * forwardRef를 사용하여 외부에서 ref를 전달받을 수 있습니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.image - 이미지 경로 (youtubeUrl이 없을 때 사용)
 * @param {string} props.youtubeUrl - YouTube 비디오 URL (선택사항)
 * @param {string} props.title - 기능 제목
 * @param {string | string[]} props.description - 기능 설명 (문자열 또는 문자열 배열)
 * @param {boolean} props.reverse - 레이아웃 방향 (true: 이미지/비디오가 오른쪽, 기본값: false)
 * @param {React.Ref} ref - forwardRef를 통해 전달되는 ref
 * @param {string} props.subtitle - 기능 부제목
 * 
 * 사용법:
 * <FeatureDescription 
 *   image="/path/to/image.jpg"
 *   youtubeUrl="https://www.youtube.com/watch?v=VIDEO_ID"
 *   title="기능 제목"
 *   description="기능에 대한 상세한 설명입니다."
 *   reverse={false}
 * />
 * 
 * 주요 기능:
 * - 이미지 또는 YouTube 비디오 표시
 * - YouTube URL에서 자동으로 비디오 ID 추출
 * - reverse 속성으로 레이아웃 방향 변경
 * - 반응형 디자인 지원
 */
import React, { forwardRef } from "react";
import "./FeatureDescription.css";

const FeatureDescription = forwardRef(({ image, youtubeUrl, title, description, reverse = false, subtitle }, ref) => {
  // 유튜브 URL에서 비디오 ID 추출하는 함수
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = youtubeUrl ? getYoutubeVideoId(youtubeUrl) : null;

  const hasSubtitle = Boolean(subtitle && `${subtitle}`.trim());
  const hasTitle = Boolean(title && `${title}`.trim());
  const hasDescription = Array.isArray(description)
    ? description.length > 0
    : Boolean(description && `${description}`.trim());
  const hasText = hasSubtitle || hasTitle || hasDescription;
  if (!hasText) return null;

  return (
    <div ref={ref} className={`feature-description-container ${reverse ? 'reverse' : ''}`}>
      {(videoId || image) && (
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
            image && <img src={image} alt="feature" className="feature-description-image" />
          )}
        </div>
      )}
      <div className="feature-description-text-section">
        {hasSubtitle && <div className="solution-card-subtitle">{subtitle}</div>}
        {hasTitle && <h2 className="feature-description-title">{title}</h2>}
        {hasDescription && (
          Array.isArray(description) ? (
            <ul className="feature-description-list">
              {description.map((item, idx) => (
                <li key={idx} className="feature-description-list-item">{item}</li>
              ))}
            </ul>
          ) : (
            <p className="feature-description-desc">{description}</p>
          )
        )}
      </div>
    </div>
  );
});

FeatureDescription.displayName = 'FeatureDescription';

export default FeatureDescription; 
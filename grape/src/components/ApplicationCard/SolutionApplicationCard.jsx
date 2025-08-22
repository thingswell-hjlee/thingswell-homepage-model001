import React from 'react';
import { Link } from 'react-router-dom';
import './SolutionApplicationCard.css';

const SolutionApplicationCard = ({ image, imageAlt, label, title, link, desc, desc2 }) => {
  const descriptions = Array.isArray(desc)
    ? desc.filter(Boolean)
    : [desc, desc2].filter(Boolean);

  const titleRef = React.useRef(null);
  const [isTextLong, setIsTextLong] = React.useState(false);

  React.useEffect(() => {
    if (titleRef.current) {
      const el = titleRef.current;
      // 텍스트가 두 줄 이상이거나 가로로 넘치는지 판단
      const isOverflow = el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
      setIsTextLong(isOverflow);
    }
  }, [title]);

  const TitleNode = (
    <div
      ref={titleRef}
      className={`solution-application-card-title ${isTextLong ? 'long-text' : ''}`}
      title={title}
    >
      <span>{isTextLong ? `${title} • ${title} • ${title}` : title}</span>
    </div>
  );

  return (
    <div className="solution-application-card">
      {link ? (
        <Link to={link}>
          {TitleNode}
          {image && (
            <div className="solution-application-card-image-container">
              <img src={image} alt={imageAlt} />
            </div>
          )}
          <div className="solution-application-card-label">{label}</div>
          {descriptions.map((text, index) => (
            <div key={index} className="solution-application-card-desc">{text}</div>
          ))}
        </Link>
      ) : (
        <>
          {TitleNode}
          {image && (
            <div className="solution-application-card-image-container">
              <img src={image} alt={imageAlt} />
            </div>
          )}
          <div className="solution-application-card-label">{label}</div>
          {descriptions.map((text, index) => (
            <div key={index} className="solution-application-card-desc">{text}</div>
          ))}
        </>
      )}
    </div>
  );
};

export default SolutionApplicationCard;



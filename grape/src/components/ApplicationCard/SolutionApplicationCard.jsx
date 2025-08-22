import React from 'react';
import { Link } from 'react-router-dom';
import './SolutionApplicationCard.css';

const SolutionApplicationCard = ({ image, imageAlt, label, title, link, desc, desc2 }) => {
  const descriptions = Array.isArray(desc)
    ? desc.filter(Boolean)
    : [desc, desc2].filter(Boolean);

  return (
    <div className="solution-application-card">
      {link ? (
        <Link to={link}>
          <div className="solution-application-card-title">{title}</div>
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
          <div className="solution-application-card-title">{title}</div>
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



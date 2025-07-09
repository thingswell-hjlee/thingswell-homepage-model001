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
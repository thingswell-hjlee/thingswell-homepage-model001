import React from 'react';
import './Card.css';

export default function Card({ title, children, className = '', ...props }) {
  return (
    <div className={`gw-card ${className}`.trim()} {...props}>
      {title && <div className="gw-card-title">{title}</div>}
      <div className="gw-card-body">{children}</div>
    </div>
  );
}



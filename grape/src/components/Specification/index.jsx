import React, { forwardRef } from 'react';
import './Specification.css';
import { Link } from 'react-router-dom';

const Specification = forwardRef((props, ref) => {
  const { title, subtitle, specifications } = props;
  
  return (
    <div ref={ref} className="specification-card">
      <div className="specification-flex">
        <div className="specification-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="specification-content">
          <div className="specification-grid">
            {specifications.map((spec, index) => (
              <a href={spec.link} target="_blank" rel="noopener noreferrer">  
              <div key={index} className="specification-item">
                <div className="specification-item-content">
                  <div className="specification-label">{spec.label}</div>
                  {spec.description && (
                    <div className="specification-description">{spec.description}</div>
                  )}
                  <div className="specification-value">{spec.value}</div>

                </div>
              </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Specification;

import React from 'react';
import './BaseLayout.css';

const BaseLayout = ({ 
  children, 
  header: Header,
  breadcrumbs,
  title,
  subtitle,
  className = ""
}) => {
  return (
    <div className={`base-layout ${className}`}>
      {Header && (
        <div className="header-wrapper">
          <Header />
        </div>
      )}
      
      <div className="base-layout-content">
        <div className="container">
          {breadcrumbs && (
            <div className="breadcrumbs-section">
              {breadcrumbs}
            </div>
          )}
          
          {(title || subtitle) && (
            <div className="page-header-section">
              {title && <h1 className="page-title">{title}</h1>}
              {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </div>
          )}
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;

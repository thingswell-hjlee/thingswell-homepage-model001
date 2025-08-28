import React from 'react';
import './Breadcrumbs.css';

const Breadcrumbs = ({ breadcrumbs = [] }) => {
  // breadcrumbs가 배열이 아닌 경우 빈 배열로 처리
  const breadcrumbsArray = Array.isArray(breadcrumbs) ? breadcrumbs : [];
  
  return (
    <div className="breadcrumbs">
      {breadcrumbsArray.map((crumb, index) => (
        <React.Fragment key={index}>
          <span className="breadcrumb-item">{crumb}</span>
          {index < breadcrumbsArray.length - 1 && (
            <span className="breadcrumb-separator"> &gt; </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;

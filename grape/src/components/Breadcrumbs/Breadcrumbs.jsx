import React from 'react';
import './Breadcrumbs.css';

const Breadcrumbs = ({ breadcrumbs = [] }) => {
  return (
    <div className="breadcrumbs">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <span className="breadcrumb-item">{crumb}</span>
          {index < breadcrumbs.length - 1 && (
            <span className="breadcrumb-separator"> &gt; </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;

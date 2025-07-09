import React, { useState } from 'react';
import './SelectCard.css';

const SelectCard = ({ 
  title, 
  subtitle, 
  filters, 
  onFilterChange, 
  multiSelect = false,
  defaultSelected = []
}) => {
  const [selectedFilters, setSelectedFilters] = useState(defaultSelected);

  const handleFilterClick = (filterValue) => {
    let newSelectedFilters;
    
    if (multiSelect) {
      // 다중 선택 모드
      if (selectedFilters.includes(filterValue)) {
        newSelectedFilters = selectedFilters.filter(filter => filter !== filterValue);
      } else {
        newSelectedFilters = [...selectedFilters, filterValue];
      }
    } else {
      // 단일 선택 모드
      newSelectedFilters = selectedFilters.includes(filterValue) ? [] : [filterValue];
    }
    
    setSelectedFilters(newSelectedFilters);
    
    if (onFilterChange) {
      onFilterChange(newSelectedFilters);
    }
  };

  return (
    <div className="select-card">
      <div className="select-card-header">
        {title && <h3 className="select-card-title">{title}</h3>}
        {subtitle && <p className="select-card-subtitle">{subtitle}</p>}
      </div>
      
      <div className="select-card-content">
        <div className="filter-buttons">
          {filters.map((filter, index) => (
            <button
              key={index}
              className={`filter-button ${
                selectedFilters.includes(filter.value) ? 'active' : ''
              }`}
              onClick={() => handleFilterClick(filter.value)}
            >
              {filter.icon && <span className="filter-icon">{filter.icon}</span>}
              <span className="filter-label">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {selectedFilters.length > 0 && (
        <div className="selected-filters">
          <span className="selected-label">선택된 필터:</span>
          <div className="selected-tags">
            {selectedFilters.map((filterValue, index) => {
              const filter = filters.find(f => f.value === filterValue);
              return (
                <span key={index} className="selected-tag">
                  {filter ? filter.label : filterValue}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectCard;

import React from 'react';
import './SelectCardList.css';

const SelectCardList = ({ options, selectedOption, onOptionSelect }) => {
  return (
    <div className="select-card-container">
      <div className="select-card-list">
        {options.map((option, index) => (
          <button
            key={index}
            className={`select-button${selectedOption === option ? ' selected' : ''}`}
            onClick={() => onOptionSelect(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectCardList; 
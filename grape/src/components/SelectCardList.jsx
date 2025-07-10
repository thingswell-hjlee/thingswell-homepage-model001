/**
 * SelectCardList 컴포넌트
 * 
 * 선택 가능한 옵션들을 버튼 형태로 표시하는 컴포넌트입니다.
 * 현재 선택된 옵션을 시각적으로 구분하여 표시하며, 클릭 시 선택 상태가 변경됩니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {Array} props.options - 선택 가능한 옵션 배열
 * @param {string} props.selectedOption - 현재 선택된 옵션
 * @param {Function} props.onOptionSelect - 옵션 선택 시 호출되는 콜백 함수
 * 
 * 사용법:
 * <SelectCardList 
 *   options={["옵션1", "옵션2", "옵션3"]}
 *   selectedOption="옵션1"
 *   onOptionSelect={(option) => {
 *     console.log('선택된 옵션:', option);
 *     setSelectedOption(option);
 *   }}
 * />
 * 
 * 주요 기능:
 * - 선택된 옵션 시각적 구분
 * - 클릭 시 선택 상태 변경
 * - 반응형 버튼 레이아웃
 */
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
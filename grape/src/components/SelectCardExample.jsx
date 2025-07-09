import React, { useState } from 'react';
import SelectCard from './SelectCard';

const SelectCardExample = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  // 카테고리 필터 예시
  const categoryFilters = [
    { value: 'manufacturing', label: '제조업', icon: '🏭' },
    { value: 'technology', label: '기술', icon: '💻' },
    { value: 'healthcare', label: '의료', icon: '🏥' },
    { value: 'education', label: '교육', icon: '📚' },
    { value: 'finance', label: '금융', icon: '💰' },
    { value: 'retail', label: '소매', icon: '🛍️' }
  ];

  // 지역 필터 예시
  const regionFilters = [
    { value: 'seoul', label: '서울' },
    { value: 'busan', label: '부산' },
    { value: 'incheon', label: '인천' },
    { value: 'daegu', label: '대구' },
    { value: 'daejeon', label: '대전' },
    { value: 'gwangju', label: '광주' },
    { value: 'suwon', label: '수원' },
    { value: 'ulsan', label: '울산' }
  ];

  // 상태 필터 예시 (단일 선택)
  const statusFilters = [
    { value: 'active', label: '활성', icon: '✅' },
    { value: 'pending', label: '대기중', icon: '⏳' },
    { value: 'completed', label: '완료', icon: '🎉' },
    { value: 'cancelled', label: '취소', icon: '❌' }
  ];

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected);
    console.log('선택된 카테고리:', selected);
  };

  const handleRegionChange = (selected) => {
    setSelectedRegions(selected);
    console.log('선택된 지역:', selected);
  };

  const handleStatusChange = (selected) => {
    setSelectedStatus(selected);
    console.log('선택된 상태:', selected);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ 
        fontFamily: 'PyeojinGothic', 
        fontWeight: '600', 
        color: '#333',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        필터 카드 컴포넌트 예시
      </h2>

      {/* 다중 선택 필터 카드 */}
      <SelectCard
        title="카테고리 필터"
        subtitle="원하는 카테고리를 여러 개 선택할 수 있습니다"
        filters={categoryFilters}
        onFilterChange={handleCategoryChange}
        multiSelect={true}
        defaultSelected={['manufacturing']}
      />

      {/* 지역 필터 카드 */}
      <SelectCard
        title="지역 필터"
        subtitle="지원받고 싶은 지역을 선택하세요"
        filters={regionFilters}
        onFilterChange={handleRegionChange}
        multiSelect={true}
      />

      {/* 단일 선택 필터 카드 */}
      <SelectCard
        title="상태 필터"
        subtitle="하나의 상태만 선택할 수 있습니다"
        filters={statusFilters}
        onFilterChange={handleStatusChange}
        multiSelect={false}
      />

      {/* 선택된 필터 결과 표시 */}
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ 
          fontFamily: 'PyeojinGothic', 
          fontWeight: '600', 
          color: '#333',
          marginBottom: '15px'
        }}>
          선택된 필터 결과
        </h3>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>카테고리:</strong> {selectedCategories.length > 0 ? selectedCategories.join(', ') : '선택 없음'}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>지역:</strong> {selectedRegions.length > 0 ? selectedRegions.join(', ') : '선택 없음'}
        </div>
        
        <div>
          <strong>상태:</strong> {selectedStatus.length > 0 ? selectedStatus.join(', ') : '선택 없음'}
        </div>
      </div>
    </div>
  );
};

export default SelectCardExample; 
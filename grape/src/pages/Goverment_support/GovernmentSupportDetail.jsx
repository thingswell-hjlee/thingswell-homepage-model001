import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GovernmentSupportPage from '../../components/GovernmentSupportPage';
import { governmentSupportData } from '../../data/governmentSupportData';

const GovernmentSupportDetail = () => {
  const { supportId } = useParams();
  const navigate = useNavigate();
  
  // 지원사업 ID가 없거나 유효하지 않은 경우 목록으로 리다이렉트
  if (!supportId || !governmentSupportData[supportId]) {
    navigate('/government-support');
    return null;
  }
  
  return <GovernmentSupportPage supportId={supportId} />;
};

export default GovernmentSupportDetail; 
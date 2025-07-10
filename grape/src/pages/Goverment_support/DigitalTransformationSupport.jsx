import React from 'react';
import GovernmentSupportPageLayout from '../../components/GovernmentSupportPageLayout';
import { digitalTransformationData } from '../../data/governmentSupportData';

const DigitalTransformationSupport = () => {
  return (
    <GovernmentSupportPageLayout {...digitalTransformationData} />
  );
};

export default DigitalTransformationSupport; 
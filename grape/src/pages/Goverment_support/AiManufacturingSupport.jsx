import React from 'react';
import GovernmentSupportPageLayout from '../../components/GovernmentSupportPageLayout';
import { aiManufacturingData } from '../../data/governmentSupportData';

const AiManufacturingSupport = () => {
  return (
    <GovernmentSupportPageLayout {...aiManufacturingData} />
  );
};

export default AiManufacturingSupport; 
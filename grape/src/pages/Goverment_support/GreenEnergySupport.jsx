import React from 'react';
import GovernmentSupportPageLayout from '../../components/GovernmentSupportPageLayout';
import { greenEnergyData } from '../../data/governmentSupportData';

const GreenEnergySupport = () => {
  return (
    <GovernmentSupportPageLayout {...greenEnergyData} />
  );
};

export default GreenEnergySupport; 
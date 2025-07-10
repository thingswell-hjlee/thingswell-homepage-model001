import React from 'react';
import GovernmentSupportPageLayout from '../../components/GovernmentSupportPageLayout';
import { smartSafetyEquipmentData } from '../../data/governmentSupportData';

const Government_support = () => {

  return (
    <GovernmentSupportPageLayout {...smartSafetyEquipmentData} />
  );
};

export default Government_support; 
import React from 'react';
import SolutionPageLayout from '../../components/SolutionPageLayout';
import { industrialSafetyData } from '../../data/solutionData';

const Soulution = () => {

  return (
    <SolutionPageLayout {...industrialSafetyData} />
  );
};

export default Soulution; 
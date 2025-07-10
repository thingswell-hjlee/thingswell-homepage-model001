import React from 'react';
import SolutionPageLayout from '../../components/SolutionPageLayout';
import { manufacturingSafetyData } from '../../data/solutionData';

const ManufacturingSolution = () => {
  return (
    <SolutionPageLayout {...manufacturingSafetyData} />
  );
};

export default ManufacturingSolution; 
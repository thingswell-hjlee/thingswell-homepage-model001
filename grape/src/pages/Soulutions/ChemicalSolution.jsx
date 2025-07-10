import React from 'react';
import SolutionPageLayout from '../../components/SolutionPageLayout';
import { chemicalSafetyData } from '../../data/solutionData';

const ChemicalSolution = () => {
  return (
    <SolutionPageLayout {...chemicalSafetyData} />
  );
};

export default ChemicalSolution; 
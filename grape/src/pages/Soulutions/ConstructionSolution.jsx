import React from 'react';
import SolutionPageLayout from '../../components/SolutionPageLayout';
import { constructionSafetyData } from '../../data/solutionData';

const ConstructionSolution = () => {
  return (
    <SolutionPageLayout {...constructionSafetyData} />
  );
};

export default ConstructionSolution; 
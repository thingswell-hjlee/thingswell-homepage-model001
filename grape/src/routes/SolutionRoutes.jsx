import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Soulution_main from '../pages/Soulutions/Soulution_main';
import Soulution from '../pages/Soulutions/Soulution';
import ChemicalSolution from '../pages/Soulutions/ChemicalSolution';
import ManufacturingSolution from '../pages/Soulutions/ManufacturingSolution';
import ConstructionSolution from '../pages/Soulutions/ConstructionSolution';

const SolutionRoutes = () => {
  return (
    <Routes>
      {/* 솔루션 메인 페이지 */}
      <Route path="/solutions" element={<Soulution_main />} />
      
      {/* 솔루션 상세 페이지 */}
      <Route path="/solution" element={<Soulution />} />
      
      {/* 솔루션 상세 페이지들 */}
      <Route path="/chemical-solution" element={<ChemicalSolution />} />
      <Route path="/manufacturing-solution" element={<ManufacturingSolution />} />
      <Route path="/construction-solution" element={<ConstructionSolution />} />
    </Routes>
  );
};

export default SolutionRoutes; 
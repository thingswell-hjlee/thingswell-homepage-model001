import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Government_support_main from '../pages/Goverment_support/Government_support_main';
import GovernmentSupportDetail from '../pages/Goverment_support/GovernmentSupportDetail';
import AiManufacturingSupport from '../pages/Goverment_support/AiManufacturingSupport';
import GreenEnergySupport from '../pages/Goverment_support/GreenEnergySupport';
import DigitalTransformationSupport from '../pages/Goverment_support/DigitalTransformationSupport';

const GovernmentSupportRoutes = () => {
  return (
    <Routes>
      {/* 정부지원사업 목록 페이지 */}
      <Route path="/government-support" element={<Government_support_main />} />
      
      {/* 정부지원사업 상세 페이지 */}
      <Route path="/government-support/:supportId" element={<GovernmentSupportDetail />} />
      
      {/* 정부지원사업 상세 페이지들 */}
      <Route path="/ai-manufacturing-support" element={<AiManufacturingSupport />} />
      <Route path="/green-energy-support" element={<GreenEnergySupport />} />
      <Route path="/digital-transformation-support" element={<DigitalTransformationSupport />} />
    </Routes>
  );
};

export default GovernmentSupportRoutes; 
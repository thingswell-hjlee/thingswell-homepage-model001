/**
 * App 컴포넌트
 *
 * 애플리케이션의 메인 컴포넌트입니다.
 * React Router를 사용하여 페이지 라우팅을 관리하며, 모든 페이지에서 공통으로 사용되는
 * Menu와 Footer 컴포넌트를 포함합니다.
 *
 * 주요 기능:
 * - React Router를 통한 페이지 라우팅
 * - 반응형 디자인 지원 (모바일/데스크톱)
 * - 모든 페이지에서 공통 메뉴와 푸터 표시
 * - 다국어 지원 (/ko, /en URL 구조)
 */
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";

import Home from "./pages/Home/Home.jsx";
import SafegaiPlatform from "./pages/SafegaiPlatform/SafegaiPlatform.jsx";
import Government_support from "./pages/Government_support/Government_support.jsx";
import Soulution from "./pages/Solutions/Soulution.jsx";
import ChemicalSolution from "./pages/Solutions/ChemicalSolution.jsx";
import ManufacturingSolution from "./pages/Solutions/ManufacturingSolution.jsx";
import MultimodalAwareness from "./pages/rnd/MultimodalAwareness.jsx";
import RAGLLMTech from "./pages/rnd/RAGLLMTech.jsx";
import OnDeviceAI from "./pages/rnd/OnDeviceAI.jsx";
import Embeddedsystem from "./pages/rnd/Embeddedsystem.jsx";
import SmartAssistiveTechnology from "./pages/rnd/SmartAssistiveTechnology.jsx";
import AirQualityManagement from "./pages/rnd/AirQualityManagement.jsx";
import Product_list_control from "./pages/Products/Product_list_control.jsx";
import Product_control from "./pages/Products/Product_control.jsx";
import Product_list_safety from "./pages/Products/Product_list_safety.jsx";
import Product_detail_safety from "./pages/Products/Product_detail_safety.jsx";
import Product_list_monitoring from "./pages/Products/Product_list_monitoring.jsx";
import Announcement from "./pages/Customer_Service/Announcement.jsx";
import Case from "./pages/Cases/Case.jsx";
import CaseSmartSafety from "./pages/Cases/Case_SmartSafety.jsx";
import CaseIntegratedControl from "./pages/Cases/Case_IntegratedControl.jsx";
import CaseInformationCommunication from "./pages/Cases/Case_InformationCommunication.jsx";
import About from "./pages/About/About.jsx";
import CompanyIntro from "./pages/About/CompanyIntro.jsx";
import History from "./pages/About/History.jsx";
import Organization from "./pages/About/Organization.jsx";
import Licenses from "./pages/About/Licenses.jsx";
import Directions from "./pages/About/Directions.jsx";
import Login from "./pages/Login/Login.jsx";
import ForgotPassword from "./pages/Login/ForgotPassword.jsx";
import OGSettings from "./pages/Admin/OGSettings.jsx";
import ChangePassword from "./pages/Admin/ChangePassword.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Profile from "./pages/Admin/Profile.jsx";
import Case_detail from "./pages/Cases/Case_detail.jsx";
import Sitemap from "./pages/Sitemap/sitemap.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import HTTPSRedirect from "./components/HTTPSRedirect";
import ScrollToTop from "./components/ScrollToTop";

/**
 * LanguageRedirect component
 * Redirects bare paths (without /ko or /en prefix) to the stored language preference.
 */
function LanguageRedirect() {
  const location = useLocation();
  const storedLang = localStorage.getItem('lang') || 'ko';
  const targetPath = `/${storedLang}${location.pathname}${location.search}${location.hash}`;
  return <Navigate to={targetPath} replace />;
}

/**
 * AppRoutes component - contains the actual page routes (used inside language prefix).
 */
function AppRoutes({ isMobile }) {
  return (
    <div className="app-container">
      <div className="menu-overlay-subpage">
        <Menu orientation={isMobile ? "vertical" : "horizontal"} theme="primary" />
      </div>
      <main className="main-content">
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/safegai-platform" element={<SafegaiPlatform />} />

            <Route path="/government-support" element={<Government_support />} />
            <Route path="/solutions/overview" element={<Soulution />} />
            <Route path="/solutions/chemical" element={<ChemicalSolution />} />
            <Route path="/solutions/manufacturing" element={<ManufacturingSolution />} />

            <Route path="/rnd/multimodal-awareness" element={<MultimodalAwareness />} />
            <Route path="/rnd/rag-llm" element={<RAGLLMTech />} />
            <Route path="/rnd/on-device-ai" element={<OnDeviceAI />} />
            <Route path="/rnd/embedded-system" element={<Embeddedsystem />} />
            <Route path="/rnd/smart-assistive-technology" element={<SmartAssistiveTechnology />} />
            <Route path="/rnd/air-quality-management" element={<AirQualityManagement />} />

            <Route path="/products/control" element={<Product_control />} />
            <Route path="/products/control/list" element={<Product_list_control />} />
            <Route path="/products/safety" element={<Product_list_safety />} />
            <Route path="/products/safety/:id" element={<Product_detail_safety />} />
            <Route path="/products/monitoring" element={<Product_list_monitoring />} />

            <Route path="/customer-service/announcement" element={<Announcement />} />

            <Route path="/cases" element={<Case />} />
            <Route path="/cases/smart-safety" element={<CaseSmartSafety />} />
            <Route path="/cases/integrated-control" element={<CaseIntegratedControl />} />
            <Route path="/cases/information-communication" element={<CaseInformationCommunication />} />
            <Route path="/cases/detail/:id" element={<Case_detail />} />

            <Route path="/about" element={<About />} />
            <Route path="/about/organization" element={<Organization />} />
            <Route path="/about/company" element={<CompanyIntro />} />
            <Route path="/about/history" element={<History />} />
            <Route path="/about/licenses" element={<Licenses />} />
            <Route path="/about/directions" element={<Directions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/og-settings" element={<ProtectedRoute requireAdmin><OGSettings /></ProtectedRoute>} />
            <Route path="/admin/change-password" element={<ProtectedRoute requireAdmin><ChangePassword /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/profile" element={<ProtectedRoute requireAdmin><Profile /></ProtectedRoute>} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </div>
  );
}

function AppWithLanguage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <>
      <SEOHead />
      <ScrollToTop />
      <AppRoutes isMobile={isMobile} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <HTTPSRedirect>
        <Routes>
          {/* Language-prefixed routes */}
          <Route path="/ko/*" element={
            <LanguageProvider>
              <AppWithLanguage />
            </LanguageProvider>
          } />
          <Route path="/en/*" element={
            <LanguageProvider>
              <AppWithLanguage />
            </LanguageProvider>
          } />
          {/* Redirect bare paths to language-prefixed path */}
          <Route path="*" element={<LanguageRedirect />} />
        </Routes>
      </HTTPSRedirect>
    </AuthProvider>
  );
}

export default App;

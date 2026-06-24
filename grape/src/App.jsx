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
import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import HTTPSRedirect from "./components/HTTPSRedirect";
import ScrollToTop from "./components/ScrollToTop";

// Route-based code splitting: 각 페이지를 lazy load하여 초기 번들 크기를 줄입니다.
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Government_support = lazy(() => import("./pages/Government_support/Government_support.jsx"));
const Soulution = lazy(() => import("./pages/Solutions/Soulution.jsx"));
const ChemicalSolution = lazy(() => import("./pages/Solutions/ChemicalSolution.jsx"));
const ManufacturingSolution = lazy(() => import("./pages/Solutions/ManufacturingSolution.jsx"));
const MultimodalAwareness = lazy(() => import("./pages/rnd/MultimodalAwareness.jsx"));
const RAGLLMTech = lazy(() => import("./pages/rnd/RAGLLMTech.jsx"));
const OnDeviceAI = lazy(() => import("./pages/rnd/OnDeviceAI.jsx"));
const Embeddedsystem = lazy(() => import("./pages/rnd/Embeddedsystem .jsx"));
const SmartAssistiveTechnology = lazy(() => import("./pages/rnd/SmartAssistiveTechnology.jsx"));
const AirQualityManagement = lazy(() => import("./pages/rnd/AirQualityManagement.jsx"));
const Product_list_control = lazy(() => import("./pages/Products/Product_list_control.jsx"));
const Product_control = lazy(() => import("./pages/Products/Product_control.jsx"));
const Product_list_safety = lazy(() => import("./pages/Products/Product_list_safety.jsx"));
const Product_detail_safety = lazy(() => import("./pages/Products/Product_detail_safety.jsx"));
const Product_list_monitoring = lazy(() => import("./pages/Products/Product_list_monitoring.jsx"));
const Announcement = lazy(() => import("./pages/Customer_Service/Announcement.jsx"));
const Case = lazy(() => import("./pages/Cases/Case.jsx"));
const CaseSmartSafety = lazy(() => import("./pages/Cases/Case_SmartSafety.jsx"));
const CaseIntegratedControl = lazy(() => import("./pages/Cases/Case_IntegratedControl.jsx"));
const CaseInformationCommunication = lazy(() => import("./pages/Cases/Case_InformationCommunication.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));
const CompanyIntro = lazy(() => import("./pages/About/CompanyIntro.jsx"));
const History = lazy(() => import("./pages/About/History.jsx"));
const Organization = lazy(() => import("./pages/About/Organization.jsx"));
const Licenses = lazy(() => import("./pages/About/Licenses.jsx"));
const Directions = lazy(() => import("./pages/About/Directions.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const ForgotPassword = lazy(() => import("./pages/Login/ForgotPassword.jsx"));
const OGSettings = lazy(() => import("./pages/Admin/OGSettings.jsx"));
const ChangePassword = lazy(() => import("./pages/Admin/ChangePassword.jsx"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard.jsx"));
const Profile = lazy(() => import("./pages/Admin/Profile.jsx"));
const Case_detail = lazy(() => import("./pages/Cases/Case_detail.jsx"));
const Sitemap = lazy(() => import("./pages/Sitemap/sitemap.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));

/**
 * PageLoadingFallback - lazy load 중 표시되는 최소한의 로딩 UI
 */
function PageLoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      opacity: 0.5,
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        border: '3px solid #e0e0e0',
        borderTop: '3px solid #333',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

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
          <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />

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
            <Route path="/admin/og-settings" element={<ProtectedRoute><OGSettings /></ProtectedRoute>} />
            <Route path="/admin/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
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

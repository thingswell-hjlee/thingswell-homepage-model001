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
 * - 홈페이지의 메인 이미지와 오버레이 텍스트
 *
 * 라우팅 구조:
 * - /: 홈페이지 (메인 이미지와 "더 알아보기" 버튼)
 * - /government-support: 정부지원사업 메인 페이지
 * - /government-support-detail: 정부지원사업 상세 페이지
 * - /ai-manufacturing-support: AI 제조 지원 페이지
 * - /green-energy-support: 그린에너지 지원 페이지
 * - /digital-transformation-support: 디지털 전환 지원 페이지
 * - /solutions: 솔루션 메인 페이지
 * - /solutions/overview: 솔루션 개요 페이지
 * - /solutions/multimodal-awareness: 멀티모달 인식 솔루션
 * - /solutions/rag-llm: RAG LLM 기술
 * - /solutions/on-device-ai: 온디바이스 AI
 * - /solutions/chemical: 화학 안전 솔루션
 * - /solutions/manufacturing: 제조 안전 솔루션
 * - /solutions/construction: 건설 안전 솔루션
 * - /products: 제품 메인 페이지
 * - /products/control: 제어 제품
 * - /products/safety: 안전 제품
 * - /customer-service: 고객서비스 메인
 * - /customer-service/announcement: 공지사항
 * - /customer-service/downloads: 자료실
 * - /customer-service/contact: 문의하기
 * - /application-field: 응용분야 메인
 * - /cases: 납품사례 메인
 * - /about: 회사소개
 * - /login: 로그인
 *
 * 사용법:
 * <App />
 *
 * 포함된 컴포넌트:
 * - Menu: 네비게이션 메뉴
 * - Footer: 웹사이트 푸터
 * - HomePage: 홈페이지 콘텐츠
 * - Government_support_main: 정부지원사업 메인 페이지
 * - Government_support: 정부지원사업 상세 페이지
 * - Soulution_main: 솔루션 메인 페이지
 * - 각 정부지원사업 상세 페이지들
 * - 각 솔루션 상세 페이지들
 */
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

import Home from "./pages/Home/Home.jsx";
import Government_support from "./pages/Government_support/Government_support.jsx";
import Soulution from "./pages/Solutions/Soulution.jsx";
import ChemicalSolution from "./pages/Solutions/ChemicalSolution.jsx";
import ManufacturingSolution from "./pages/Solutions/ManufacturingSolution.jsx";
import MultimodalAwareness from "./pages/rnd/MultimodalAwareness.jsx";
import RAGLLMTech from "./pages/rnd/RAGLLMTech.jsx";
import OnDeviceAI from "./pages/rnd/OnDeviceAI.jsx";
import Embeddedsystem from "./pages/rnd/Embeddedsystem .jsx";
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
import ProtectedRoute from "./components/ProtectedRoute";
import HTTPSRedirect from "./components/HTTPSRedirect";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

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
    <AuthProvider>
      <HTTPSRedirect>
        <ScrollToTop />
        <div className="app-container">
              <div className="menu-overlay-subpage">
                <Menu orientation={isMobile ? "vertical" : "horizontal"} theme="primary" />
              </div>
              <main className="main-content">
                <div className="page-content">
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
                    <Route path="/admin/og-settings" element={<OGSettings />} />
                    <Route path="/admin/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
                    <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/admin/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/sitemap" element={<Sitemap />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <Footer />
              </main>
            </div>
        </HTTPSRedirect>
      </AuthProvider>
  );
}

export default App;

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
 * - /solution: 솔루션 상세 페이지
 * - /chemical-solution: 화학 안전 솔루션 페이지
 * - /manufacturing-solution: 제조 안전 솔루션 페이지
 * - /construction-solution: 건설 안전 솔루션 페이지
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
import "./components/Layout/BaseLayout.css";
import Footer from "./components/Footer";
import CardRotator from "./components/CardRotator";
import Government_support_main from "./pages/Goverment_support/Government_support_main.jsx";
import Government_support from "./pages/Goverment_support/Government_support.jsx";
import AiManufacturingSupport from "./pages/Goverment_support/AiManufacturingSupport.jsx";
import GreenEnergySupport from "./pages/Goverment_support/GreenEnergySupport.jsx";
import DigitalTransformationSupport from "./pages/Goverment_support/DigitalTransformationSupport.jsx";
import Soulution_main from "./pages/Soulutions/Soulution_main.jsx";
import Soulution from "./pages/Soulutions/Soulution.jsx";
import ChemicalSolution from "./pages/Soulutions/ChemicalSolution.jsx";
import ManufacturingSolution from "./pages/Soulutions/ManufacturingSolution.jsx";
import ConstructionSolution from "./pages/Soulutions/ConstructionSolution.jsx";
import ForwardThreatDetection from "./pages/Soulutions/ForwardThreatDetection.jsx";
import MultimodalAwareness from "./pages/Soulutions/MultimodalAwareness.jsx";
import RAGLLMTech from "./pages/Soulutions/RAGLLMTech.jsx";
import OnDeviceAI from "./pages/Soulutions/OnDeviceAI.jsx";
import Product_main from "./pages/Products/Product_main.jsx";
import Product_list_control from "./pages/Products/Product_list_control.jsx";
import Product_control from "./pages/Products/Product_control.jsx";
import Product_safety_1 from "./pages/Products/Product_TWEDG_01.jsx";
import Product_list_safety from "./pages/Products/Product_list_safety.jsx";
import Product_TWEDG_04 from "./pages/Products/Product_TWEDG_04.jsx";
import logo from "./assets/main_image.jpg";
import manufacturing from "./assets/manufacturing.jpg";
import construction from "./assets/construction.jpg";
import fire from "./assets/fire.jpg";
import welding from "./assets/welding.jpg";
import grinding from "./assets/grinding.jpg";
import Announcement from "./pages/Customer_Service/Announcement.jsx";
import Customer_service from "./pages/Customer_Service/Customer_service.jsx";
import Downloads from "./pages/Customer_Service/Downloads.jsx";
import Contact from "./pages/Customer_Service/Contact.jsx";
import Application_filed_main from "./pages/Application_field/Application_filed_main.jsx";
import Application_filed from "./pages/Application_field/Application_filed.jsx";
import Application_filed_2 from "./pages/Application_field/Application_filed_2.jsx";
import Application_filed_3 from "./pages/Application_field/Application_filed_3.jsx";
import Application_filed_4 from "./pages/Application_field/Application_filed_4.jsx";
import Case_main from "./pages/Cases/Case_main.jsx";
import Case from "./pages/Cases/Case.jsx";
import Case_2 from "./pages/Cases/Case_2.jsx";
import Case_3 from "./pages/Cases/Case_3.jsx";
import Case_4 from "./pages/Cases/Case_4.jsx";
import About from "./pages/About/About.jsx";
import Login from "./pages/Login/Login.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Case_Bus_Seoul from "./pages/Cases/Case_Bus_Seoul.jsx";

function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const cards = [
    {
      eyebrow: "THE NEW STANDARD IN WORKPLACE SAFETY",
      title: "Industrial safety",
      description:
        "24/7 detection and resolution of potential SIFs—scores risk in real time, recommends action, and prevents life-altering injuries before they happen.",
      ctaText: "Learn more",
      ctaHref: "/contact",
      caption: "Advanced AI Detection",
      backgroundImage: logo,
    },
    {
      eyebrow: "AI-POWERED MANUFACTURING SAFETY",
      title: "Smart Manufacturing",
      description:
        "Advanced AI technology monitors manufacturing processes in real-time, detecting potential hazards and ensuring worker safety across all production lines.",
      ctaText: "Learn more",
      ctaHref: "/contact",
      caption: "Real-time Monitoring",
      backgroundImage: manufacturing,
    },
    {
      eyebrow: "CONSTRUCTION SITE PROTECTION",
      title: "Construction Safety",
      description:
        "Comprehensive safety monitoring for construction sites, preventing accidents through intelligent detection and real-time alerts for hazardous conditions.",
      ctaText: "Learn more",
      ctaHref: "/contact",
      caption: "Site Protection",
      backgroundImage: construction,
    },
    {
      eyebrow: "FIRE PREVENTION & DETECTION",
      title: "Fire Safety",
      description:
        "Early fire detection and prevention systems that monitor industrial environments, providing instant alerts and automated safety responses.",
      ctaText: "Learn more",
      ctaHref: "/contact",
      caption: "Prevention System",
      backgroundImage: fire,
    },
    {
      eyebrow: "WELDING OPERATION SAFETY",
      title: "Welding Protection",
      description:
        "Specialized safety monitoring for welding operations, ensuring proper protective equipment usage and safe work practices.",
      ctaText: "Learn more",
      ctaHref: "/contact",
      caption: "Operation Safety",
      backgroundImage: welding,
    },
    {
      eyebrow: "GRINDING & MACHINING SAFETY",
      title: "Machining Safety",
      description:
        "Real-time monitoring of grinding and machining operations, detecting unsafe conditions and ensuring proper safety protocols.",
      ctaText: "Learn more",
      ctaHref: "/contact",
      caption: "Protocol Management",
      backgroundImage: grinding,
    },
  ];

  const handleCardChange = (index) => {
    if (index !== currentCardIndex) {
      setIsTransitioning(true);
      // 이미지 페이드 아웃 후 새 이미지로 변경
      setTimeout(() => {
        setCurrentCardIndex(index);
      }, 525); // CardRotator 전환의 절반 지점
      // 전체 전환 완료 후 상태 리셋
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1050); // 전체 전환 시간과 맞춤
    }
  };

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
    <div className="content">
      <div className="content-container">
        <img 
          src={cards[currentCardIndex].backgroundImage} 
          alt="메인 이미지" 
          className={`main-image ${isTransitioning ? 'transitioning' : 'transitioned'}`}
        />
        {/* 이미지 위에 오는 모든 요소들 */}
        <div className="overlay-container home-overlay">
          <div className="main-center-wrapper home-hero">
            <div className="content-text hero-content-text">
              <CardRotator 
                cards={cards} 
                onCardChange={handleCardChange}
                currentIndex={currentCardIndex}
              />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

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
      <div className="app-container base-layout">
        {/* 메뉴는 모든 페이지에서 유지 */}
        <div className="menu-overlay-subpage">
          <Menu
            orientation={isMobile ? "vertical" : "horizontal"}
            theme="primary"
          />
        </div>

        {/* 메인 콘텐츠 영역 */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* 정부지원사업 라우팅 */}
            <Route
              path="/government-support"
              element={<Government_support_main />}
            />

            {/* 정부지원사업 상세 페이지들 */}
            <Route
              path="/government-support-detail"
              element={<Government_support />}
            />
            <Route
              path="/ai-manufacturing-support"
              element={<AiManufacturingSupport />}
            />
            <Route
              path="/green-energy-support"
              element={<GreenEnergySupport />}
            />
            <Route
              path="/digital-transformation-support"
              element={<DigitalTransformationSupport />}
            />

            {/* 솔루션 라우팅 */}
            <Route path="/solutions" element={<Soulution_main />} />
            <Route path="/solution" element={<Soulution />} />
            <Route path="/solution/forward-threat-detection" element={<ForwardThreatDetection />} />
            <Route path="/solution/service-architecture" element={<MultimodalAwareness />} />
            {/* 삭제된 아키텍처 상세 페이지 라우트 제거 */}
            <Route path="/solution/multimodal-awareness" element={<MultimodalAwareness />} />
            <Route path="/solution/rag-llm" element={<RAGLLMTech />} />
            <Route path="/solution/on-device-ai" element={<OnDeviceAI />} />

            {/* 솔루션 상세 페이지들 */}
            <Route path="/chemical-solution" element={<ChemicalSolution />} />
            <Route
              path="/manufacturing-solution"
              element={<ManufacturingSolution />}
            />
            <Route
              path="/construction-solution"
              element={<ConstructionSolution />}
            />

            {/* 제품 라우팅 */}
            <Route path="/products" element={<Product_main />} />
            <Route path="/product-list/control" element={<Product_list_control />} />
            <Route path="/products/control" element={<Product_control />} />
            <Route path="/products/twmob-01" element={<Product_safety_1/>} />
            <Route path="/product-list/safety" element={<Product_list_safety />} />
            <Route path="/products/twedg-04" element={<Product_TWEDG_04 />} />

            {/* 고객서비스 라우팅 */}
            <Route path="/customer-service" element={<Customer_service />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/contact" element={<Contact />} />

            {/* 응용분야 라우팅 */}
            <Route
              path="/application-field-main"
              element={<Application_filed_main />}
            />
            <Route path="/application-field" element={<Application_filed />} />
            <Route
              path="/application-field-2"
              element={<Application_filed_2 />}
            />
            <Route
              path="/application-field-3"
              element={<Application_filed_3 />}
            />
            <Route
              path="/application-field-4"
              element={<Application_filed_4 />}
            />

            {/* 납품사례 라우팅 */}
            <Route path="/cases" element={<Case_main />} />
            <Route path="/case" element={<Case />} />
            <Route path="/case-2" element={<Case_2 />} />
            <Route path="/case-3" element={<Case_3 />} />
            <Route path="/case-4" element={<Case_4 />} />
            <Route path="/case_bus_seoul" element={<Case_Bus_Seoul />} />

            {/* 회사소개 라우팅 */}
            <Route path="/about" element={<About />} />

            {/* 로그인 라우팅 */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        {/* Footer는 모든 페이지에서 공통으로 사용 */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

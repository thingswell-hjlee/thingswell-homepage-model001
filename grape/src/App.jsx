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
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import "./components/Layout/BaseLayout.css";
import Footer from "./components/Footer";
import CardRotator from "./components/CardRotator";
import Government_support_main from "./pages/Government_support/Government_support_main.jsx";
import Government_support from "./pages/Government_support/Government_support.jsx";
import AiManufacturingSupport from "./pages/Government_support/AiManufacturingSupport.jsx";
import GreenEnergySupport from "./pages/Government_support/GreenEnergySupport.jsx";
import DigitalTransformationSupport from "./pages/Government_support/DigitalTransformationSupport.jsx";
import Soulution from "./pages/Solutions/Soulution.jsx";
import Soulution_main from "./pages/Solutions/Soulution_main.jsx";
import ChemicalSolution from "./pages/Solutions/ChemicalSolution.jsx";
import ManufacturingSolution from "./pages/Solutions/ManufacturingSolution.jsx";
import ConstructionSolution from "./pages/Solutions/ConstructionSolution.jsx";
import MultimodalAwareness from "./pages/rnd/MultimodalAwareness.jsx";
import RAGLLMTech from "./pages/rnd/RAGLLMTech.jsx";
import OnDeviceAI from "./pages/rnd/OnDeviceAI.jsx";
import ElderlyDisabledSolution from "./pages/rnd/rnd_elderlydisabled.jsx";
import IndustrialSafetySolution from "./pages/rnd/rnd_industrialsafety.jsx";
import IntegratedControlSolution from "./pages/rnd/rnd_Integratedcontrol.jsx";
import Embeddedsystem from "./pages/rnd/Embeddedsystem .jsx";
import SmartAssistiveTechnology from "./pages/rnd/SmartAssistiveTechnology.jsx";
import AirQualityManagement from "./pages/rnd/AirQualityManagement.jsx";
import SolutionDetailPage from "./pages/rnd/SolutionDetailPage.jsx";
import Product_list_control from "./pages/Products/Product_list_control.jsx";
import Product_control from "./pages/Products/Product_control.jsx";
import Product_safety_1 from "./pages/Products/Product_TWEDG_01.jsx";
import Product_list_safety from "./pages/Products/Product_list_safety.jsx";
import Product_list_monitoring from "./pages/Products/Product_list_monitoring.jsx";
import Product_TWEDG_04 from "./pages/Products/Product_TWEDG_04.jsx";
import logo from "./assets/main_image.jpg";
import manufacturing from "./assets/manufacturing.jpg";
import construction from "./assets/construction.jpg";
import fire from "./assets/fire.jpg";
import welding from "./assets/welding.jpg";
import grinding from "./assets/grinding.jpg";
import noticeBg from "./assets/1.png";
import Announcement from "./pages/Customer_Service/Announcement.jsx";
import Customer_service from "./pages/Customer_Service/Customer_service.jsx";
import Downloads from "./pages/Customer_Service/Downloads.jsx";
import Contact from "./pages/Customer_Service/Contact.jsx";
import Case from "./pages/Cases/Case.jsx";
import CaseSmartSafety from "./pages/Cases/Case_SmartSafety.jsx";
import CaseAI from "./pages/Cases/Case_AI.jsx";
import CaseIntegratedControl from "./pages/Cases/Case_IntegratedControl.jsx";
import CaseInformationCommunication from "./pages/Cases/Case_InformationCommunication.jsx";
import About from "./pages/About/About.jsx";
import Login from "./pages/Login/Login.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { supabase } from "./lib/supabase";


function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);
  const navigate = useNavigate();
  
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

  // 최신 공지사항 1건 가져오기
  useEffect(() => {
    const fetchLatestAnnouncement = async () => {
      try {
        const { data, error } = await supabase
          .from('Board_Announcement')
          .select('id, title, created_at')
          .order('id', { ascending: false })
          .limit(1);

        if (error) {
          console.error('최신 공지 조회 오류:', error);
          return;
        }
        if (data && data.length > 0) {
          setLatestAnnouncement(data[0]);
        }
      } catch (err) {
        console.error('최신 공지 조회 예외:', err);
      }
    };
    fetchLatestAnnouncement();
  }, []);

  const handleAnnouncementClick = () => {
    if (latestAnnouncement && latestAnnouncement.id) {
      navigate(`/customer-service/announcement?id=${encodeURIComponent(latestAnnouncement.id)}&t=Board_Announcement`);
    } else {
      navigate('/customer-service/announcement');
    }
  };

  return (
      <div className="content-container">
        {/* 상단 히어로: 배경 + 오버레이 */}
        <img 
          src={cards[currentCardIndex].backgroundImage} 
          alt="메인 이미지" 
          className={`main-image ${isTransitioning ? 'transitioning' : 'transitioned'}`}
        />
        <div className="home-overlay">
          <div className="home-content-wrapper">
            <div className="card-rotator-section">
              <CardRotator 
                cards={cards} 
                onCardChange={handleCardChange}
                currentIndex={currentCardIndex}
              />
            </div>
             {/* 오버레이 아래 일반 흐름 영역: 히어로 카드들 */}
        <section className="hero-content-section">
          <div className="hero-content-card">
            <a
              className="hero-content-card-title"
              href="/products/twmob-01/"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer", fontWeight: "bold" }}
            >
              TWMOB-01 2륜 카트 이동식 태양광 80W 무선CCTV 30배 줌 PTZ 5백만 화소 IP CCTV 세트
            </a>
          </div>

          <div className="hero-content-card" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.35)), url(${noticeBg})` }}>
            <ul className="hero-content-card-list">
              <h1 className="hero-content-card-title" onClick={handleAnnouncementClick} style={{ cursor: 'pointer' }}>
                {latestAnnouncement?.title || '등록된 공지사항이 없습니다.'}
              </h1>
            </ul>
          </div>

          <div className="hero-content-card">
            <h1 className="hero-content-card-title">정부지원사업 상담</h1>
            <button className="hero-content-card-button" onClick={() => window.location.href = '/contact'}>상담하기</button>
          </div>
        </section>
      </div>
    </div>
        
        {/* Footer를 사진 위에 오버레이로 배치 */}
        <div className="home-footer-overlay">
          <Footer />
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
      <div className="app-container">
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
            <Route path="/solutions/overview" element={<Soulution />} />
            <Route path="/solutions/chemical" element={<ChemicalSolution />} />
            <Route path="/solutions/manufacturing" element={<ManufacturingSolution />} />
            <Route path="/solutions/construction" element={<ConstructionSolution />} />

            {/* 연구개발 라우팅 */}
            <Route path="/rnd" element={<SolutionDetailPage />} />
            <Route path="/rnd/elderly-disabled" element={<ElderlyDisabledSolution />} />
            <Route path="/rnd/industrial-safety" element={<IndustrialSafetySolution />} />
            <Route path="/rnd/integrated-control" element={<IntegratedControlSolution />} />
            <Route path="/rnd/multimodal-awareness" element={<MultimodalAwareness />} />
            <Route path="/rnd/rag-llm" element={<RAGLLMTech />} />
            <Route path="/rnd/on-device-ai" element={<OnDeviceAI />} />
            <Route path="/rnd/embedded-system" element={<Embeddedsystem />} />
            <Route path="/rnd/smart-assistive-technology" element={<SmartAssistiveTechnology />} />
            <Route path="/rnd/air-quality-management" element={<AirQualityManagement />} />
            {/* 제품 라우팅 */}
            <Route path="/products/control" element={<Product_control />} />
            <Route path="/products/control/list" element={<Product_list_control />} />
            <Route path="/products/safety" element={<Product_list_safety />} />
            <Route path="/products/monitoring" element={<Product_list_monitoring />} />
            <Route path="/products/twmob-01" element={<Product_safety_1/>} />
            <Route path="/products/twedg-04" element={<Product_TWEDG_04 />} />

            {/* 고객서비스 라우팅 */}
            <Route path="/customer-service" element={<Customer_service />} />
            <Route path="/customer-service/announcement" element={<Announcement />} />
            <Route path="/customer-service/downloads" element={<Downloads />} />
            <Route path="/customer-service/contact" element={<Contact />} />

            {/* 응용분야 라우팅 */}
            {/* <Route path="/application-field" element={<Application_filed_main />} />
            <Route path="/application-field/overview" element={<Application_filed />} />
            <Route path="/application-field/field-1" element={<Application_filed_2 />} />
            <Route path="/application-field/field-2" element={<Application_filed_3 />} />
            <Route path="/application-field/field-3" element={<Application_filed_4 />} /> */}

            {/* 납품사례 라우팅 */}
            <Route path="/cases" element={<Case />} />
<Route path="/cases/smart-safety" element={<CaseSmartSafety />} />
<Route path="/cases/ai" element={<CaseAI />} />
<Route path="/cases/integrated-control" element={<CaseIntegratedControl />} />
<Route path="/cases/information-communication" element={<CaseInformationCommunication />} />

            {/* 회사소개 라우팅 */} 
            <Route path="/about" element={<About />} />

            {/* 로그인 라우팅 */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </main> 

        {/* Footer - 홈페이지가 아닐 때만 표시 */}
        {location.pathname !== "/" && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;

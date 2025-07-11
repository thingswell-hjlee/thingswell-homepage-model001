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
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import './App.css'
import Menu from './components/Menu.jsx'
import Footer from './components/Footer.jsx'
import Government_support_main from './pages/Goverment_support/Government_support_main.jsx'
import Government_support from './pages/Goverment_support/Government_support.jsx'
import AiManufacturingSupport from './pages/Goverment_support/AiManufacturingSupport.jsx'
import GreenEnergySupport from './pages/Goverment_support/GreenEnergySupport.jsx'
import DigitalTransformationSupport from './pages/Goverment_support/DigitalTransformationSupport.jsx'
import Soulution_main from './pages/Soulutions/Soulution_main.jsx'
import Soulution from './pages/Soulutions/Soulution.jsx'
import ChemicalSolution from './pages/Soulutions/ChemicalSolution.jsx'
import ManufacturingSolution from './pages/Soulutions/ManufacturingSolution.jsx'
import ConstructionSolution from './pages/Soulutions/ConstructionSolution.jsx'
import Product_main from './pages/Products/Product_main.jsx'
import Product_1 from './pages/Products/Product_1.jsx'
import Product_list from './pages/Products/Product_list.jsx'
import logo from './assets/main_image.jpg';
import Announcement from './pages/Customer_Service/Announcement.jsx'
import Customer_service from './pages/Customer_Service/Customer_service.jsx'
import Downloads from './pages/Customer_Service/Downloads.jsx'
import Contact from './pages/Customer_Service/Contact.jsx'

function HomePage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <div className="content">
      <div className="content-container">
        <img src={logo} alt="메인 이미지" className="main-image" />
        {/* 이미지 위에 오는 모든 요소들 */}
        <div className="overlay-container">
          <div className="content-text">
            <h1>Artificial</h1>
            <h1>Intelligence</h1>
          </div>
          <div className="button">
          <Link to="/solutions">
            <button className="button-text">
            <p>더 알아보기</p>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <div className="app-container">
      {/* 메뉴는 모든 페이지에서 유지 */}
      <div className="menu-overlay-subpage">
        <Menu orientation={isMobile ? "vertical" : "horizontal"} theme="primary" />
      </div>
      
      {/* 메인 콘텐츠 영역 */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* 정부지원사업 라우팅 */}
          <Route path="/government-support" element={<Government_support_main />} />
          
          
          {/* 정부지원사업 상세 페이지들 */}
          <Route path="/government-support-detail" element={<Government_support />} />
          <Route path="/ai-manufacturing-support" element={<AiManufacturingSupport />} />
          <Route path="/green-energy-support" element={<GreenEnergySupport />} />
          <Route path="/digital-transformation-support" element={<DigitalTransformationSupport />} />
          
          {/* 솔루션 라우팅 */}
          <Route path="/solutions" element={<Soulution_main />} />
          <Route path="/solution" element={<Soulution />} />
          
          {/* 솔루션 상세 페이지들 */}
          <Route path="/chemical-solution" element={<ChemicalSolution />} />
          <Route path="/manufacturing-solution" element={<ManufacturingSolution />} />
          <Route path="/construction-solution" element={<ConstructionSolution />} />

          {/* 제품 라우팅 */}
          <Route path="/products" element={<Product_main />} />
          <Route path="/product-list" element={<Product_list />} />
          <Route path="/product/1" element={<Product_1 />} />

          {/* 고객서비스 라우팅 */}
          <Route path="/customer-service" element={<Customer_service />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
      {/* 푸터는 모든 페이지에서 유지 */}
      <Footer />
    </div>
  )
}

export default App

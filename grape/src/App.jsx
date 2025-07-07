import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Menu from './Menu.jsx'
import Footer from './Footer.jsx'
import Government_support from './pages/Government_support.jsx'
import logo from './assets/main_image.jpg';

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
            <button className="button-text">
              <p>더 알아보기</p>
            </button>
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
          <Route path="/government" element={<Government_support />} />
        </Routes>
      </main>
      
      {/* 푸터는 모든 페이지에서 유지 */}
      <Footer />
    </div>
  )
}

export default App

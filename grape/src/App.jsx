import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './Menu.jsx'
import logo from './assets/main_image.jpg';

function App() {
  const [count, setCount] = useState(0)
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
    <>
      <div className="content">
        <div className="content-container">
          <img src={logo} alt="메인 이미지" className="main-image" />
          {/* 이미지 위에 오는 모든 요소들 */}
          <div className="overlay-container">
            <div className="menu-overlay">
              <Menu orientation={isMobile ? "vertical" : "horizontal"} theme="primary" />
            </div>
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
    </> 
  )
}

export default App

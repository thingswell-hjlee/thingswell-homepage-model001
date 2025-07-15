import React, { useRef } from 'react';
import SolutionCard from '../../components/SolutionCard';   
import Specification from '../../components/Specification';
import FormCard from '../../components/FormCard';
import { Link } from 'react-router-dom';
import welding from '../../assets/welding.jpg';

const Product_1 = () => {
  // 데이터 직접 정의
  const solutionData = {
    subtitle: "AI 브릿지",
    title: "AIB-TS2-08",
    image: welding,
    imageAlt: "엣지 AI 영상 분석 디바이스",
    description: "엣지 AI 영상 분석, 8채널(16채널 확장모드지원)",
  };

  
  const solutionRef = useRef(null);

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="solutions-section menu-spacing">
              <SolutionCard ref={solutionRef} {...solutionData} showButton={true} variant="compact" />
              <Specification 
                title="제품 스펙" 
                subtitle="상세 사양 정보" 
                specifications={[
                  { label: "최대 입력해상도", value: "4K @ 60 fps (2M @ 240 fps)", description: "최대 입력 해상도" },
                  { label: "영삽입력 프로토콜", value: "RTSP, RTSP over HTTP/S, Onvif", description: "영상 입력 프로토콜" },
                  { label: "영상코덱 지원", value: "H.265 / H.264", description: "지원 영상 코덱" },
                  { label: "영상출력 방법", value: "RTSP over TCP/UDP, RTSP over Websocket, RTSP over HTTP/S", description: "영상 출력 방식" },
                  { label: "오디오 입력", value: "1 x Audio Line-In (3.5mm audio phone jack)", description: "오디오 입력 단자" },
                  { label: "오디오 출력", value: "1 x Audio Line-Out (3.5mm audio phone jack)", description: "오디오 출력 단자" },
                ]} 
              />
              <Specification 
                title="다운로드" 
                subtitle="상세 사양 정보" 
                specifications={[
                  { label: "카탈로그", value: "다운로드", description: "v200/2025.07.10",link: "" },
                  { label: "데이터시트", value: "다운로드", description: "v200/2025.07.10",link: "" },
                ]} 
              />
              <FormCard 
                title="문의하기" 
                subtitle="궁금한 점이 있으시면 언제든 문의해주세요" 
                onSubmit={(formData) => {
                  console.log('폼 데이터:', formData);
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_1;
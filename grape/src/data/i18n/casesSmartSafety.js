/**
 * Cases Smart Safety page i18n data
 * Usage: import { getCasesSmartSafetyData } from './casesSmartSafety';
 *        const data = getCasesSmartSafetyData(currentLang);
 */

const data = {
  ko: {
    hero: {
      badge: "Industrial Safety Automation",
      title: "AI 안전 시스템,\n현장에서 검증하다",

      desc: "서울시 버스쉼터 AI 상황인지 시스템, 온디바이스 AI 카메라, 관제센터 구축, 비접촉 레이더 바이탈 센싱, AI 인체감지 등 다양한 산업안전 프로젝트를 성공적으로 수행한 실적입니다.",
    },
    stats: [
      { number: "8+", label: "납품 프로젝트" },
      { number: "60+", label: "설치 거점" },
      { number: "AI", label: "핵심 기술" },
      { number: "24/7", label: "실시간 관제" },
    ],
    sections: {
      cases: { label: "Delivery Cases", title: "납품 실적" },
      capabilities: { label: "Core Capabilities", title: "핵심 기술 역량" },
    },
    capabilities: [
      { badge: "AI 영상분석", badgeClass: "edge", desc: "온디바이스 AI 기반 피플카운팅, 쓰러짐 감지, 폭력행위 감지, 인체감지 등 실시간 영상 분석 기술" },
      { badge: "비접촉 센싱", badgeClass: "comm", desc: "mmWave Radar 기반 비접촉 바이탈사인 측정, 호흡·심박수 모니터링, 재실 감지 기술" },
      { badge: "원격 관제", badgeClass: "cloud", desc: "다중 거점 통합 관제센터, 원격 설비 제어, 실시간 모니터링, 이벤트 기반 자동 알림 시스템" },
      { badge: "IoT 통합제어", badgeClass: "ctrl", desc: "조명, 냉난방, 공기질, 자동문, LED 등 설비 통합 제어 및 환경 자동화 시스템" },
    ],

    cases: [
      { id: 571, title: "서울 버스 스마트쉼터 AI 상황인지 시스템", orderer: "서울시 중구, 강남구", date: "2025", type: "AI 상황인지 시스템", desc: ["서울시 중구형 버스 그린스마트쉼터 20개소", "서울시 강남구형 버스 스마트쉼터 20개소", "원격관리 시스템 구축", "AI 상황인지 시스템 (피플카운터, 쓰러짐 감지, 폭력행위 감지)"] },
      { id: 402, title: "서울 중구 40개소 IP 카메라 AI 시스템", orderer: "서울 중구청", date: "2024", type: "온디바이스AI", desc: ["AI 피플카운팅 및 쓰러짐 감지 시스템 공급", "온디바이스 AI 기술 접목으로 상황별 안전·편의 기능 강화", "조명, 온열벤치, LED 디스플레이, 자동문, 공기질 측정, 냉난방 자동제어", "CCTV 등 원격 제어 및 모니터링 시스템 개발 및 구축, 관제센터 구축/연동"] },
      { id: 392, title: "서울 강남구 버스쉼터 관제센터", orderer: "서울 강남구청", date: "2024", type: "AI 관제센터", desc: ["그린스마트쉼터 관제센터 구축", "쓰러짐감지 기능 AI 적용 20채널", "실시간 영상 모니터링 및 이벤트 관리", "원격 설비 제어 및 상태 모니터링"] },
      { id: 401, title: "AI SoC 기반 인지장애 홈케어 개발", orderer: "보건복지부", date: "2024", type: "AI", desc: ["AI SoC 기반 인지장애 홈케어 시스템 개발", "경량화 AI 모델 탑재 전용 하드웨어", "실시간 생체신호 모니터링 및 이상 감지", "보호자 알림 및 원격 모니터링 플랫폼"] },
      { id: 390, title: "서울 중구 버스쉼터 원격관리", orderer: "서울 중구청", date: "2024", type: "원격관리시스템", desc: ["그린스마트쉼터 20개소 원격관리시스템 구축", "조명, 냉난방, 공기질 원격 모니터링", "자동제어 스케줄링 및 이상 알림", "통합 대시보드를 통한 실시간 관제"] },
      { id: 424, title: "숭실대학교 mmWave Radar", orderer: "숭실대학교", date: "2022", type: "레이더 센서", desc: ["생체정보 수집 레이더 반도체 응용 시제품 제작", "mmWave 레이더 기반 비접촉 바이탈 센싱", "호흡, 심박수 실시간 비접촉 측정", "산학협력 R&D 프로젝트 수행"] },
      { id: 418, title: "비접촉식 레이더 기반 안전힐링 시스템", orderer: "R&D", date: "2022", type: "안전힐링", desc: ["바이탈사인+공기질 기반 안전힐링 시스템 개발", "비접촉 레이더로 생체신호 실시간 모니터링", "공기질 센서 연동 환경 분석", "이상징후 자동 감지 및 알림"] },
      { id: 429, title: "국민건강보험공단 실증센터", orderer: "국민건강보험공단", date: "2022", type: "AI인체감지", desc: ["AI 인체감지 시스템 실증 테스트", "국민건강보험공단 실증센터 구축", "낙상 감지 및 이상행동 모니터링", "실증 데이터 기반 알고리즘 고도화"] },
    ],
  },

  en: {
    hero: {
      badge: "Industrial Safety Automation",
      title: "AI Safety Systems,\nProven in the Field",
      desc: "Successful delivery of diverse industrial safety projects including Seoul bus shelter AI situational awareness systems, on-device AI cameras, control center deployment, contactless radar vital sensing, and AI human detection.",
    },
    stats: [
      { number: "8+", label: "Projects Delivered" },
      { number: "60+", label: "Installation Sites" },
      { number: "AI", label: "Core Technology" },
      { number: "24/7", label: "Real-time Monitoring" },
    ],
    sections: {
      cases: { label: "Delivery Cases", title: "Project References" },
      capabilities: { label: "Core Capabilities", title: "Core Technology Capabilities" },
    },
    capabilities: [
      { badge: "AI Video Analytics", badgeClass: "edge", desc: "On-device AI-based people counting, fall detection, violence detection, and human detection with real-time video analysis" },
      { badge: "Contactless Sensing", badgeClass: "comm", desc: "mmWave Radar-based contactless vital sign measurement, respiration and heart rate monitoring, occupancy detection" },
      { badge: "Remote Monitoring", badgeClass: "cloud", desc: "Multi-site integrated control center, remote facility control, real-time monitoring, event-based automatic alert system" },
      { badge: "IoT Integration", badgeClass: "ctrl", desc: "Integrated control of lighting, HVAC, air quality, automatic doors, LED displays with environmental automation" },
    ],

    cases: [
      { id: 571, title: "Seoul Bus Smart Shelter AI Situational Awareness System", orderer: "Seoul Jung-gu & Gangnam-gu", date: "2025", type: "AI Awareness", desc: ["20 Seoul Jung-gu Green Smart Bus Shelters", "20 Seoul Gangnam-gu Smart Bus Shelters", "Remote management system deployment", "AI situational awareness (people counter, fall detection, violence detection)"] },
      { id: 402, title: "Seoul Jung-gu 40-site IP Camera AI System", orderer: "Seoul Jung-gu District", date: "2024", type: "On-device AI", desc: ["AI people counting and fall detection system supply", "On-device AI technology for situational safety and convenience", "Lighting, heated bench, LED display, automatic door, air quality, HVAC auto-control", "Remote control/monitoring system and control center deployment"] },
      { id: 392, title: "Seoul Gangnam-gu Bus Shelter Control Center", orderer: "Seoul Gangnam-gu District", date: "2024", type: "AI Control Center", desc: ["Green Smart Shelter control center deployment", "AI fall detection applied to 20 channels", "Real-time video monitoring and event management", "Remote facility control and status monitoring"] },
      { id: 401, title: "AI SoC-based Cognitive Disability Home Care", orderer: "Ministry of Health and Welfare", date: "2024", type: "AI", desc: ["AI SoC-based cognitive disability home care system development", "Lightweight AI model-embedded dedicated hardware", "Real-time vital sign monitoring and anomaly detection", "Guardian notification and remote monitoring platform"] },
      { id: 390, title: "Seoul Jung-gu Bus Shelter Remote Management", orderer: "Seoul Jung-gu District", date: "2024", type: "Remote Management", desc: ["20-site Green Smart Shelter remote management system", "Lighting, HVAC, air quality remote monitoring", "Auto-control scheduling and anomaly alerts", "Real-time monitoring via integrated dashboard"] },
      { id: 424, title: "Soongsil University mmWave Radar", orderer: "Soongsil University", date: "2022", type: "Radar Sensor", desc: ["Bio-information radar semiconductor prototype development", "mmWave radar-based contactless vital sensing", "Real-time contactless respiration and heart rate measurement", "Industry-academia R&D collaboration"] },
      { id: 418, title: "Contactless Radar-based Safety Healing System", orderer: "R&D", date: "2022", type: "Safety Healing", desc: ["Vital sign + air quality based safety healing system development", "Contactless radar real-time bio-signal monitoring", "Air quality sensor-linked environmental analysis", "Automatic anomaly detection and alert"] },
      { id: 429, title: "National Health Insurance Service Verification Center", orderer: "National Health Insurance Service", date: "2022", type: "AI Human Detection", desc: ["AI human detection system verification test", "National Health Insurance Service verification center setup", "Fall detection and abnormal behavior monitoring", "Algorithm enhancement based on verification data"] },
    ],
  },
};

export const getCasesSmartSafetyData = (lang) => data[lang] || data.ko;

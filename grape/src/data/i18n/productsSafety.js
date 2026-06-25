/**
 * Products Safety page i18n data
 * Usage: import { getProductsSafetyData } from './productsSafety';
 *        const data = getProductsSafetyData(currentLang);
 */

const data = {
  ko: {
    hero: {
      badge: "Smart Safety Products",
      title: "AI가 지키는 안전,\n현장을 바꾸다",
      desc: "AI 카메라, 스마트밴드, 환경센서, 화재감지 시스템을 통합한 차세대 산업안전 솔루션입니다. Edge AI 기반 실시간 위험 감지와 자동 알람으로 작업자의 생명과 안전을 보호합니다. 네트워크 장애 시에도 현장에서 독립적으로 동작하여 어떤 상황에서도 안전을 보장합니다.",
    },
    sections: {
      productLineup: { label: "Product Lineup", title: "핵심 제품" },
      applicationAreas: { label: "Application Areas", title: "적용 분야" },
      pipeline: { label: "Technology Pipeline", title: "동작 흐름" },
      architecture: { label: "System Architecture", title: "시스템 구성" },
    },
    products: [
      {
        title: "AI 안전 카메라",
        subtitle: "AI Safety Camera",
        desc: "딥러닝 기반 영상 분석으로 작업자 낙상, 쓰러짐, 장시간 미움직임을 실시간 감지합니다. NVIDIA DeepStream 기반 멀티채널 동시 분석으로 8대 카메라를 단일 서버에서 처리합니다.",
      },
      {
        title: "스마트 안전밴드",
        subtitle: "Smart Safety Band",
        desc: "작업자 생체신호(심박수, 체온)와 위치를 실시간 모니터링합니다. 낙상 감지 가속도 센서, SOS 긴급호출, 위험구역 접근 경고 기능을 제공합니다.",
      },
      {
        title: "환경 안전센서",
        subtitle: "Environmental Safety Sensor",
        desc: "온도, 습도, 가스 농도, 분진 농도를 실시간 측정하여 작업환경 위험도를 판단합니다. LoRa/WiFi 무선 통신으로 배선 없이 설치가 가능합니다.",
      },
      {
        title: "화재감지 시스템",
        subtitle: "Fire Detection System",
        desc: "열감지, 연기감지, 불꽃감지를 다중으로 적용하여 화재를 조기에 감지합니다. 접점 연동으로 기존 소방 설비와 즉시 연동되며 자동 경보를 발생시킵니다.",
      },
    ],
    domains: [
      {
        title: "제조 현장",
        subtitle: "Manufacturing Site",
        items: [
          "프레스, CNC 등 위험 기계 접근 감지",
          "작업자 보호구 착용 여부 AI 판별",
          "유해가스 누출 조기 경보 시스템",
          "협착, 끼임 위험구역 실시간 모니터링",
          "야간/교대 근무 시 안전 감시 강화",
        ],
      },
      {
        title: "건설 현장",
        subtitle: "Construction Site",
        items: [
          "고소작업 추락 방지 실시간 감시",
          "중장비 접근 경고 및 충돌 방지",
          "안전모·안전대 착용 AI 자동 감지",
          "밀폐공간 가스 농도 실시간 모니터링",
          "작업자 위치 추적 및 인원 관리",
        ],
      },
      {
        title: "복지시설",
        subtitle: "Welfare Facility",
        items: [
          "장애인 작업장 낙상·쓰러짐 감지",
          "작업자별 건강상태 실시간 모니터링",
          "비상 상황 자동 감지 및 알림",
          "접근성 고려 다중 알람 출력(시각/청각/진동)",
          "보호자·관리자 모바일 즉시 알림",
        ],
      },
    ],
    pipeline: [
      {
        step: "01",
        title: "데이터 수집",
        subtitle: "Data Collection",
        items: [
          "IP 카메라 8채널 RTSP 실시간 스트림",
          "스마트밴드 8개 생체·위치 데이터",
          "환경센서 온도·습도·가스 측정값",
          "화재감지 접점 상태 신호",
          "시간 동기화 기반 통합 수집",
        ],
      },
      {
        step: "02",
        title: "Edge AI 분석",
        subtitle: "Edge AI Analysis",
        items: [
          "NVIDIA TensorRT 기반 고속 추론",
          "낙상·쓰러짐·미움직임 실시간 판별",
          "멀티모달 센서 융합 상황 분석",
          "적응형 롤링버퍼 이벤트 전후 보존",
          "오프라인 동작 보장 (네트워크 장애 대응)",
        ],
      },
      {
        step: "03",
        title: "알람 및 대응",
        subtitle: "Alert & Response",
        items: [
          "위험 등급별 차등 알람 발생",
          "접점연동 경광등·사이렌 자동 제어",
          "관리자 모바일·대시보드 즉시 알림",
          "이벤트 영상 자동 저장 및 NVR 연동",
          "대응 매뉴얼 자동 안내",
        ],
      },
      {
        step: "04",
        title: "클라우드 연동",
        subtitle: "Cloud Integration",
        items: [
          "AWS 클라우드 이벤트 메타데이터 전송",
          "AI 모델 버전 관리 및 원격 배포",
          "운영 리포트 자동 생성",
          "다중 시설 통합 원격 관제",
          "데이터 기반 안전 개선 분석",
        ],
      },
    ],
    architecture: [
      { badge: "EDGE", badgeClass: "edge", desc: "AI 카메라 8대, 스마트밴드 8개, 환경센서 2개, 화재감지 접점, NVR 2TB 저장, Edge AI 서버 실시간 추론" },
      { badge: "NETWORK", badgeClass: "comm", desc: "LoRa/WiFi/이더넷 복합 통신, 오프라인 독립 동작, 네트워크 복구 시 자동 재전송" },
      { badge: "CLOUD", badgeClass: "cloud", desc: "AWS 이벤트 저장, AI 모델 버전 관리, 원격 배포, 운영 리포트 자동화" },
      { badge: "CONTROL", badgeClass: "ctrl", desc: "접점연동 알람장치, 경광등·사이렌 자동 제어, 관리자 대시보드, 모바일 알림" },
    ],
  },
  en: {
    hero: {
      badge: "Smart Safety Products",
      title: "AI-Powered Safety,\nTransforming the Field",
      desc: "A next-generation industrial safety solution integrating AI cameras, smart bands, environmental sensors, and fire detection systems. Protects workers' lives with Edge AI-based real-time risk detection and automatic alarms. Operates independently on-site even during network failures to ensure safety under any circumstances.",
    },
    sections: {
      productLineup: { label: "Product Lineup", title: "Core Products" },
      applicationAreas: { label: "Application Areas", title: "Applications" },
      pipeline: { label: "Technology Pipeline", title: "How It Works" },
      architecture: { label: "System Architecture", title: "System Architecture" },
    },
    products: [
      {
        title: "AI Safety Camera",
        subtitle: "AI Safety Camera",
        desc: "Detects worker falls, collapses, and prolonged inactivity in real-time using deep learning-based video analytics. Processes 8 cameras on a single server with NVIDIA DeepStream multi-channel analysis.",
      },
      {
        title: "Smart Safety Band",
        subtitle: "Smart Safety Band",
        desc: "Monitors worker vital signs (heart rate, body temperature) and location in real-time. Features fall detection accelerometer, SOS emergency call, and hazardous zone proximity alerts.",
      },
      {
        title: "Environmental Safety Sensor",
        subtitle: "Environmental Safety Sensor",
        desc: "Measures temperature, humidity, gas concentration, and dust levels in real-time to assess workplace risk. Wireless LoRa/WiFi connectivity enables installation without wiring.",
      },
      {
        title: "Fire Detection System",
        subtitle: "Fire Detection System",
        desc: "Detects fires early through multi-layered heat, smoke, and flame detection. Integrates with existing fire suppression equipment via contact relays for automatic alarm activation.",
      },
    ],
    domains: [
      {
        title: "Manufacturing Site",
        subtitle: "Manufacturing Site",
        items: [
          "Hazardous machinery proximity detection (press, CNC)",
          "AI-based PPE compliance verification",
          "Toxic gas leak early warning system",
          "Real-time pinch/crush zone monitoring",
          "Enhanced safety surveillance during night/shift work",
        ],
      },
      {
        title: "Construction Site",
        subtitle: "Construction Site",
        items: [
          "Real-time fall prevention for elevated work",
          "Heavy equipment proximity alert and collision prevention",
          "AI auto-detection of hard hat and harness wear",
          "Real-time gas monitoring in confined spaces",
          "Worker location tracking and headcount management",
        ],
      },
      {
        title: "Welfare Facility",
        subtitle: "Welfare Facility",
        items: [
          "Fall and collapse detection in disability workshops",
          "Real-time individual health monitoring",
          "Automatic emergency detection and alerts",
          "Multi-modal alarms (visual/auditory/vibration) for accessibility",
          "Instant mobile notifications to guardians and managers",
        ],
      },
    ],
    pipeline: [
      {
        step: "01",
        title: "Data Collection",
        subtitle: "Data Collection",
        items: [
          "8-channel IP camera RTSP live streams",
          "8 smart band biometric and location data",
          "Environmental sensor readings (temp/humidity/gas)",
          "Fire detection contact status signals",
          "Time-synchronized integrated collection",
        ],
      },
      {
        step: "02",
        title: "Edge AI Analysis",
        subtitle: "Edge AI Analysis",
        items: [
          "High-speed inference with NVIDIA TensorRT",
          "Real-time detection of falls, collapses, inactivity",
          "Multimodal sensor fusion situational analysis",
          "Adaptive rolling buffer for event context preservation",
          "Guaranteed offline operation (network failure resilience)",
        ],
      },
      {
        step: "03",
        title: "Alert & Response",
        subtitle: "Alert & Response",
        items: [
          "Differentiated alarms by risk level",
          "Automatic warning light and siren activation via relay",
          "Instant notifications to admin mobile and dashboard",
          "Automatic event video recording with NVR integration",
          "Automated response protocol guidance",
        ],
      },
      {
        step: "04",
        title: "Cloud Integration",
        subtitle: "Cloud Integration",
        items: [
          "Event metadata transmission to AWS Cloud",
          "AI model version management and remote deployment",
          "Automated operational report generation",
          "Multi-site integrated remote monitoring",
          "Data-driven safety improvement analytics",
        ],
      },
    ],
    architecture: [
      { badge: "EDGE", badgeClass: "edge", desc: "8 AI cameras, 8 smart bands, 2 environmental sensors, fire detection contacts, 2TB NVR storage, Edge AI server real-time inference" },
      { badge: "NETWORK", badgeClass: "comm", desc: "LoRa/WiFi/Ethernet hybrid communication, offline independent operation, automatic resync on network recovery" },
      { badge: "CLOUD", badgeClass: "cloud", desc: "AWS event storage, AI model version management, remote deployment, automated operational reports" },
      { badge: "CONTROL", badgeClass: "ctrl", desc: "Contact-relay alarm devices, automatic warning light/siren control, admin dashboard, mobile notifications" },
    ],
  },
};

export const getProductsSafetyData = (lang) => data[lang] || data.ko;

/**
 * R&D On-Device AI page i18n data
 * Usage: import { getRndOnDeviceAiData } from './rndOnDeviceAi';
 *        const data = getRndOnDeviceAiData(currentLang);
 */

const data = {
  ko: {
    card: {
      subtitle: "현장 사고 예방의 신속한 보디가드",
      description: [
        "첨단 기술이 안전을 책임지는 시대, 산업 현장의 패러다임을 바꿀 '온디바이스 AI'가 등장했습니다. 이 기술은 마치 현장 작업자의 든든한 보디가드처럼, 위험을 즉각적으로 감지하고 사고를 미연에 방지합니다.",
        "온디바이스 AI의 가장 큰 매력은 바로 '신속함'입니다. 기존의 클라우드 기반 AI는 데이터를 서버로 보낸 후 분석하는 과정을 거치기에 필연적으로 지연이 발생했지만, 온디바이스 AI는 장비 자체에서 모든 것을 처리합니다. 추락, 충돌 등 순간적인 사고가 발생하는 현장에서 수 밀리초(ms) 단위의 빠른 판단은 생명을 살리는 결정적 차이를 만듭니다.",
        "또한, 이 기술은 다양한 환경에 완벽하게 적응합니다. RGB 카메라의 시각적 정보에 ToF(거리 측정)와 레이더(움직임 감지) 센서 데이터를 융합하여 어두운 환경이나 통신이 두절된 지하, 터널에서도 빈틈없이 위험을 탐지합니다. 작업자가 쓰러지거나 금지 구역에 진입하는 순간, 음성이나 시각적 경고를 즉시 전달해 위험을 알립니다.",
        "온디바이스 AI는 단순한 기술을 넘어, 안전을 최우선으로 하는 산업 현장의 새로운 기준을 제시하고 있습니다. 이제 기술의 힘으로 더 안전하고 효율적인 작업 환경을 구축할 수 있습니다.",
      ],
    },
    sections: {
      overview: "개요",
      techFeatures: "기술 구성 및 특징",
      scenarios: "주요 기능 및 적용 시나리오",
      differentiation: "기술적 차별성",
      industries: "적용 가능 산업 환경",
      services: "서비스 제공 항목",
    },
    overview:
      "당사는 산업안전 분야에 특화된 온디바이스 AI(On-Device Artificial Intelligence) 기술을 개발하여, 통신이 불안정하거나 제한된 환경에서도 실시간으로 위험을 감지하고 즉각적으로 대응할 수 있는 솔루션을 제공합니다. 현장에서 센서 데이터와 AI 알고리즘을 직접 처리함으로써 지연 없는 판단, 개인정보 보호, 저전력 운영을 동시에 실현합니다.",
    techTable: {
      headers: ["구성 요소", "설명", "주요 기능"],
      rows: [
        [
          "온디바이스 AI 추론",
          "NVIDIA Jetson Orin Nano, Rockchip, ARM 기반 고성능 엣지 하드웨어",
          "카메라/레이더/ToF 등 센서 데이터의 AI 모델 실시간 처리",
        ],
        [
          "멀티모달 센서 통합",
          "RGB 카메라, ToF(Time of Flight), 레이더, IMU, 가스 센서 등",
          "복합 센서 융합으로 정확하고 신뢰성 높은 위험 상황 판단",
        ],
        [
          "로컬 알림 및 제어",
          "음성 안내, 고휘도 LED 경고, 무선 송신기/릴레이 제어",
          "외부 통신망 없이도 현장에서 즉시 경고 및 제어 신호 전달",
        ],
        [
          "모듈화 설계",
          "모바일 캠, 마운트 캠, 스마트 센서 등 다양한 모듈 폼팩터",
          "현장 조건에 맞춘 유연한 설치와 기능 확장",
        ],
      ],
    },
    scenarios: [
      {
        title: "실시간 객체·행동 인식",
        desc: "쓰러짐, 금지 구역 진입, 구조 신호(손 흔들기) 등 다양한 행동을 실시간 감지합니다. 경량화된 모델(YOLOv11, MediaPipe, Pose Estimation 등)로 온디바이스 환경에서 효율 동작.",
      },
      {
        title: "비정상 상황 탐지 및 알림",
        desc: "레이더·ToF로 비가시 영역 움직임을 인식하고 비정상 상황을 탐지, 음성/시각 경고로 즉시 알림.",
      },
      {
        title: "스마트 PPE 연동 및 데이터 로깅",
        desc: "BLE/MQTT로 모바일 센서(온습도, 가스, 위치 등) 연동, 이상 감지 시 자동 보고·알림 및 로그 축적.",
      },
      {
        title: "네트워크 불가 환경 대응",
        desc: "통신 인프라가 취약한 현장에서도 완전 독립적으로 동작하여 안정적 운영 보장.",
      },
    ],
    diffTable: {
      headers: ["항목", "자사 온디바이스 AI", "기존 클라우드 AI"],
      rows: [
        ["처리 위치", "장치 내 실시간 연산", "외부 클라우드 서버 의존"],
        ["통신 의존성", "낮음 (오프라인 동작 가능)", "높음 (실시간 통신 필수)"],
        ["개인정보 보호", "영상/음성 데이터의 외부 전송 최소화", "전송 과정에서 개인정보 유출 가능성"],
        ["지연 시간", "수 ms 단위의 즉각 응답", "네트워크 상태에 따라 수 초 이상 지연"],
        ["설치 유연성", "무전원/저전력 설계로 설치 용이", "전력·통신 인프라 구축 필요"],
      ],
    },
    industries: [
      "건설 현장: 고소 작업 위험 행동 감지, 비가시 구역 접근 감시",
      "제조 공장: 설비·중장비 위험 구역 접근 감지 및 이상 행동 모니터링",
      "터널/지하 작업장: 통신 차단 구간에서 독립적 위험 탐지·경고",
      "물류센터/창고: 지게차-작업자 충돌 위험 감지, 접근 제한 구역 모니터링",
      "지자체/공공시설: 화재·침수 등 긴급 상황 감지",
    ],
    serviceItems: [
      "온디바이스 AI 기반 POC 제품 및 시스템 개발",
      "현장 맞춤형 센서 조합 설계 및 최적화",
      "Jetson Orin, Rockchip 기반 AI 모델 최적화 서비스",
      "산업안전 AI 성능 시험 및 KOLAS 대응 지원",
      "Edge-to-Cloud 연동 및 관리자용 대시보드 구축",
    ],
  },
  en: {
    card: {
      subtitle: "A Rapid Bodyguard for On-Site Accident Prevention",
      description: [
        "In an era where advanced technology is responsible for safety, On-Device AI has arrived to transform the paradigm of industrial sites. Like a reliable bodyguard for field workers, it instantly detects hazards and prevents accidents before they occur.",
        "The greatest advantage of On-Device AI is speed. Conventional cloud-based AI inevitably introduces latency as it sends data to servers for analysis, but On-Device AI processes everything directly on the device. At sites where instantaneous accidents like falls and collisions occur, millisecond-level decision-making creates the critical difference that saves lives.",
        "Furthermore, this technology adapts perfectly to diverse environments. By fusing visual information from RGB cameras with ToF (distance measurement) and radar (motion detection) sensor data, it detects hazards seamlessly even in dark environments or underground areas and tunnels with no connectivity. The moment a worker collapses or enters a restricted zone, it immediately delivers voice or visual warnings.",
        "On-Device AI goes beyond mere technology to establish a new standard for safety-first industrial sites. The power of technology now enables building safer and more efficient work environments.",
      ],
    },
    sections: {
      overview: "Overview",
      techFeatures: "Technology Components & Features",
      scenarios: "Key Features & Application Scenarios",
      differentiation: "Technical Differentiation",
      industries: "Applicable Industrial Environments",
      services: "Service Offerings",
    },
    overview:
      "We have developed On-Device AI (Artificial Intelligence) technology specialized for industrial safety, providing solutions that detect hazards in real time and respond immediately even in environments with unstable or limited connectivity. By processing sensor data and AI algorithms directly on-site, we simultaneously achieve zero-latency decision-making, privacy protection, and low-power operation.",
    techTable: {
      headers: ["Component", "Description", "Key Functions"],
      rows: [
        [
          "On-Device AI Inference",
          "High-performance edge hardware based on NVIDIA Jetson Orin Nano, Rockchip, ARM",
          "Real-time AI model processing of camera/radar/ToF sensor data",
        ],
        [
          "Multimodal Sensor Integration",
          "RGB camera, ToF (Time of Flight), radar, IMU, gas sensors, etc.",
          "Accurate and reliable hazard assessment through multi-sensor fusion",
        ],
        [
          "Local Alert & Control",
          "Voice guidance, high-intensity LED warnings, wireless transmitter/relay control",
          "Immediate on-site warning and control signal delivery without external network",
        ],
        [
          "Modular Design",
          "Various module form factors including mobile cam, mount cam, smart sensors",
          "Flexible installation and feature expansion tailored to site conditions",
        ],
      ],
    },
    scenarios: [
      {
        title: "Real-time Object & Behavior Recognition",
        desc: "Detects various behaviors in real time including falls, restricted zone entry, and rescue signals (hand waving). Operates efficiently on-device using lightweight models (YOLOv11, MediaPipe, Pose Estimation, etc.).",
      },
      {
        title: "Anomaly Detection & Alert",
        desc: "Recognizes movement in non-line-of-sight areas via radar and ToF, detects anomalies, and immediately notifies via voice/visual warnings.",
      },
      {
        title: "Smart PPE Integration & Data Logging",
        desc: "Integrates mobile sensors (temperature/humidity, gas, location, etc.) via BLE/MQTT, with automatic reporting, alerts, and log accumulation upon anomaly detection.",
      },
      {
        title: "No-Network Environment Response",
        desc: "Operates fully independently even at sites with weak communication infrastructure, ensuring stable operation.",
      },
    ],
    diffTable: {
      headers: ["Category", "Our On-Device AI", "Conventional Cloud AI"],
      rows: [
        ["Processing Location", "Real-time computation on device", "Dependent on external cloud servers"],
        ["Connectivity Dependency", "Low (offline operation capable)", "High (real-time connectivity required)"],
        ["Privacy Protection", "Minimized external transmission of video/audio data", "Potential privacy exposure during transmission"],
        ["Latency", "Immediate response in milliseconds", "Multi-second delays depending on network conditions"],
        ["Installation Flexibility", "Easy installation with zero/low-power design", "Requires power and connectivity infrastructure"],
      ],
    },
    industries: [
      "Construction sites: Hazardous behavior detection for elevated work, non-line-of-sight area surveillance",
      "Manufacturing plants: Equipment/heavy machinery hazard zone proximity detection and abnormal behavior monitoring",
      "Tunnels / underground workplaces: Independent hazard detection and warning in communication-blocked areas",
      "Logistics centers / warehouses: Forklift-worker collision risk detection, restricted area monitoring",
      "Municipal / public facilities: Emergency situation detection including fire and flooding",
    ],
    serviceItems: [
      "On-Device AI-based POC product and system development",
      "Custom sensor combination design and optimization for field conditions",
      "AI model optimization services for Jetson Orin and Rockchip platforms",
      "Industrial safety AI performance testing and KOLAS compliance support",
      "Edge-to-Cloud integration and administrator dashboard development",
    ],
  },
};

export const getRndOnDeviceAiData = (lang) => data[lang] || data.ko;

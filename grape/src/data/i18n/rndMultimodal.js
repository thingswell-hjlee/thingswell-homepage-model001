/**
 * R&D Multimodal Awareness page i18n data
 * Usage: import { getRndMultimodalData } from './rndMultimodal';
 *        const data = getRndMultimodalData(currentLang);
 */

const data = {
  ko: {
    card: {
      subtitle: "산업 현장의 든든한 안전 지킴이",
      description: [
        "'멀티모달 상황인지 기술'은 산업 현장의 안전을 한 차원 높여줄 혁신적인 시스템입니다. 이 기술은 마치 사람의 눈과 귀처럼 RGB 카메라, ToF(거리 측정) 센서, UWB(초광대역) 레이더 센서 등 다양한 정보를 종합적으로 인지하고 융합합니다.",
        "기존 카메라만으로는 어려웠던 조도 변화, 먼지, 가려짐 같은 환경에서도 빛의 영향을 받지 않고 정확하게 감지할 수 있어 강력한 적응성을 자랑합니다.",
        "이 기술의 핵심은 '온디바이스 AI'에 있습니다. 현장에서 실시간으로 작업자의 쓰러짐이나 추락 같은 이상 행동을 즉시 감지하고, 중장비의 위험 접근을 정밀하게 파악해 충돌 사고를 예방합니다. 특히 레이더를 활용해 눈에 보이지 않는 사각지대까지 감지하여 안전 사각지대를 최소화하는 데 큰 역할을 합니다.",
        "위험 상황 발생 시 작업자에게 음성, 화면, 모바일 앱 등으로 즉시 경고 알림을 전달하며, 스마트 PPE(개인 보호 장비)와 연동하여 유해가스나 온도 변화까지 모니터링해 작업자들을 더욱 안전하게 보호합니다. 단일 센서의 한계를 넘어선 멀티모달 융합 기술은 산업 현장의 안전을 한 차원 끌어올릴 것으로 기대됩니다.",
      ],
    },
    sections: {
      overview: "개요",
      techComponents: "핵심 기술 구성",
      services: "적용 가능한 주요 서비스",
      differentiation: "기술적 차별성",
    },
    overview:
      "당사는 산업 현장의 안전을 실시간으로 확보하기 위해 RGB 카메라, Time-of-Flight(ToF) 센서, UWB Radar 센서를 융합한 멀티모달 상황인지 기술을 개발 및 상용화하고 있습니다. 이 기술은 기존 단일 센서 기반 감지의 한계를 극복하여, 조도 변화, 차폐, 분진 등 다양한 환경에서도 정확한 위험 인지 및 대응을 가능하게 합니다.",
    techTable: {
      headers: ["기술 구성요소", "주요 기능", "활용 목적"],
      rows: [
        ["RGB 카메라", "객체 탐지 (YOLOv11), 행동 인식 (MediaPipe 등)", "작업자 인식, 행위 감시"],
        ["ToF(Time-of-Flight) 센서", "거리/깊이 측정, 영역 내 접근 감지", "거리 기반 접근 감지, 위험 거리 탐지"],
        ["UWB Radar(초광대역)", "움직임 감지, 방향/속도 추정", "차폐 환경의 비가시 영역 감지"],
      ],
    },
    services: [
      {
        title: "작업자 행동 감지 및 위험 경고 시스템",
        desc: "쓰러짐/추락/과도한 움직임/이상 행동을 자동 감지해 사고를 예방하고, 감지 즉시 음성·화면·모바일 앱 등 다양한 채널로 경고 알림을 제공합니다.",
      },
      {
        title: "차량 및 중장비 접근 위험 감지",
        desc: "Radar 기반으로 방향·접근 속도를 정확히 감지하고, 작업자의 사각지대 접근 시 즉시 경고를 발생시켜 충돌 사고를 방지합니다.",
      },
      {
        title: "어두운 환경 및 차폐 구간 감시 강화",
        desc: "ToF·Radar 융합으로 카메라 한계를 극복하여, 밀폐 공간/야간/터널 등 낮은 조도 환경에서도 정확한 위험 감지를 수행합니다.",
      },
      {
        title: "스마트 PPE 연동",
        desc: "BLE 기반 스마트 PPE와 연동하여 개인별 환경 변화를 모니터링하고, 유해가스·온도 변화 등 이상 감지 시 즉시 알림을 전송합니다.",
      },
    ],
    diffTable: {
      headers: ["항목", "자사 기술 (멀티모달 융합)", "기존 기술 (단일 센서)"],
      rows: [
        ["조도 영향", "낮음 (Radar/ToF 병용으로 빛에 무관)", "높음 (RGB 단독 사용 시)"],
        ["감지 정확도", "3개 센서 융합으로 상황별 최적화", "단일 센서 성능에 따라 제한"],
        ["실시간성", "온디바이스 AI (Jetson Orin 등) 기반", "클라우드 의존 ↑, 지연 가능"],
        ["통신 불가 지역 대응", "엣지 컴퓨팅 기반 독립 동작", "통신 장애 시 기능 제한"],
      ],
    },
  },
  en: {
    card: {
      subtitle: "A Reliable Safety Guardian for Industrial Sites",
      description: [
        "Multimodal situational awareness technology is an innovative system that elevates industrial site safety to the next level. Like human eyes and ears, it comprehensively perceives and fuses information from RGB cameras, ToF (time-of-flight) sensors, UWB (ultra-wideband) radar sensors, and more.",
        "It delivers powerful adaptability by accurately detecting situations even in challenging environments such as lighting changes, dust, and occlusion—conditions where conventional cameras alone fall short—without being affected by light.",
        "The core of this technology lies in on-device AI. It instantly detects abnormal behaviors such as worker falls or collapses in real-time on-site, precisely identifies dangerous approaches by heavy equipment to prevent collision accidents. Radar is especially effective at detecting invisible blind spots, playing a major role in minimizing safety blind spots.",
        "When a hazardous situation occurs, immediate warning notifications are delivered to workers via voice, display, and mobile apps. Integration with smart PPE (personal protective equipment) enables monitoring of toxic gases and temperature changes, providing enhanced worker protection. Multimodal fusion technology that overcomes the limitations of single sensors is expected to elevate industrial site safety to the next level.",
      ],
    },
    sections: {
      overview: "Overview",
      techComponents: "Core Technology Components",
      services: "Key Applicable Services",
      differentiation: "Technical Differentiation",
    },
    overview:
      "We are developing and commercializing multimodal situational awareness technology that fuses RGB cameras, Time-of-Flight (ToF) sensors, and UWB Radar sensors to secure real-time safety at industrial sites. This technology overcomes the limitations of conventional single-sensor detection, enabling accurate risk recognition and response even in diverse environments including lighting changes, shielding, and dust.",
    techTable: {
      headers: ["Technology Component", "Key Functions", "Application Purpose"],
      rows: [
        ["RGB Camera", "Object detection (YOLOv11), behavior recognition (MediaPipe, etc.)", "Worker identification, behavior monitoring"],
        ["ToF (Time-of-Flight) Sensor", "Distance/depth measurement, proximity detection within zones", "Distance-based proximity detection, hazard distance sensing"],
        ["UWB Radar (Ultra-Wideband)", "Motion detection, direction/speed estimation", "Non-line-of-sight detection in shielded environments"],
      ],
    },
    services: [
      {
        title: "Worker Behavior Detection & Hazard Warning System",
        desc: "Automatically detects falls, collapses, excessive movement, and abnormal behavior to prevent accidents, providing immediate warning notifications via voice, display, and mobile app channels.",
      },
      {
        title: "Vehicle & Heavy Equipment Proximity Hazard Detection",
        desc: "Accurately detects direction and approach speed via radar, instantly triggering warnings when workers approach blind spots to prevent collision accidents.",
      },
      {
        title: "Enhanced Surveillance in Dark & Shielded Areas",
        desc: "Overcomes camera limitations through ToF and Radar fusion, performing accurate hazard detection even in low-light environments such as confined spaces, nighttime, and tunnels.",
      },
      {
        title: "Smart PPE Integration",
        desc: "Integrates with BLE-based smart PPE to monitor individual environmental changes, instantly sending notifications when anomalies such as toxic gas or temperature changes are detected.",
      },
    ],
    diffTable: {
      headers: ["Category", "Our Technology (Multimodal Fusion)", "Conventional Technology (Single Sensor)"],
      rows: [
        ["Lighting Impact", "Low (unaffected by light with Radar/ToF combination)", "High (when using RGB alone)"],
        ["Detection Accuracy", "Optimized per situation with 3-sensor fusion", "Limited by single sensor performance"],
        ["Real-time Processing", "On-device AI (Jetson Orin, etc.) based", "High cloud dependency, potential latency"],
        ["No-connectivity Areas", "Edge computing-based independent operation", "Limited functionality during communication failure"],
      ],
    },
  },
};

export const getRndMultimodalData = (lang) => data[lang] || data.ko;

/**
 * R&D RAG-based LLM Technology page i18n data
 * Usage: import { getRndRagLlmData } from './rndRagLlm';
 *        const data = getRndRagLlmData(currentLang);
 */

const data = {
  ko: {
    card: {
      subtitle: "현장의 지능형 안전 파트너",
      description: [
        "오늘날 산업 현장의 안전은 단순 감시를 넘어 '상황을 이해하고 판단하는 지능'이 요구됩니다.",
        "기존 안전 시스템은 정해진 규칙에 따라 경고만 제공했지만, 이제는 작업자의 질문을 이해하고 복잡한 상황에 대한 해결책을 제시하는 '대화형 안전 인지 시스템'이 필요합니다.",
        "이 혁신의 중심에는 RAG(Retrieve-Augment-Generate) 기반 LLM(대형 언어 모델) 기술이 있습니다. 이 기술은 방대한 지침서, 매뉴얼, 실시간 센서 데이터를 결합해 '왜(Why)'라는 질문에도 답할 수 있습니다.",
        "예를 들어, '기계가 이상한 소리를 내요'라는 작업자의 질문에 '모터 과열 가능성이 있으니 즉시 전원을 차단하세요'와 같이 신속하고 정확하게 대응할 수 있습니다.",
        "특히, 통신이 끊기는 지하 작업장이나 터널에서도 독립적으로 작동하는 온디바이스 추론 기능으로 안전의 사각지대를 해소합니다.",
        "RAG 기반 LLM은 단순 감시자가 아니라, 위험을 예측하고 소통하며 현장 지식을 실시간으로 제공하는 '지능형 안전 파트너'로 산업 안전의 새로운 패러다임을 제시합니다.",
      ],
    },
    sections: {
      overview: "개요",
      coreTech: "핵심 기술 구성",
      scenarios: "주요 기능 및 서비스 시나리오",
      differentiation: "기술적 차별성",
      applications: "기술 적용 분야",
      services: "서비스 가능 항목",
    },
    overview:
      "당사는 산업 현장의 복잡한 위험 상황을 실시간으로 이해하고 대응할 수 있도록, RAG(Retrieve-Augment-Generate) 기반 LLM(대형 언어 모델) 기술을 활용한 대화형 안전 인지 시스템을 제공합니다. 이 솔루션은 상황 인지, 문맥 분석, 지식 검색을 결합하여 지능적인 경고, 보고, 대응 안내를 가능하게 하는 차세대 산업안전 솔루션입니다.",
    techTable: {
      headers: ["구성 요소", "설명", "주요 기능"],
      rows: [
        [
          "LLM (Large Language Model)",
          "GPT, phi, Llama 계열의 사내 최적화 모델",
          "작업자 질의응답 및 위험 상황에 대한 자연어 설명",
        ],
        [
          "RAG (Retrieve-Augment-Generate)",
          "온디바이스 벡터 데이터베이스와 문서 검색 기술 기반의 응답 생성",
          "현장 지침을 기반으로 한 설명 자동화 및 정확한 정보 제공",
        ],
        [
          "온디바이스 추론",
          "NVIDIA Jetson Orin 등 저전력 엣지 장비에서 작동",
          "통신이 어려운 환경에서도 독립적으로 LLM 추론 수행",
        ],
      ],
    },
    scenarios: [
      {
        title: "위험 상황 실시간 해석 및 안내",
        desc: '예: "기계가 이상한 소리를 내요" 입력 시, 문맥 분석을 통해 "모터 과열 가능성이 있습니다. 즉시 전원을 차단하고 관리자를 호출해 주세요."와 같은 지침 제공',
      },
      {
        title: "현장 맞춤형 음성 안내 시스템",
        desc: '레이더/ToF 감지 이벤트와 연동하여 "위험 구역에 접근 중입니다. 왼쪽으로 이동하세요." 등 상황맞춤 음성 경고 실시간 생성',
      },
      {
        title: "매뉴얼 기반 응급처치 안내",
        desc: '"사람이 쓰러졌어요"와 같은 긴급 상황에서 지침 매뉴얼을 검색해 단계별 응급조치 안내',
      },
      {
        title: "상황보고 자동화",
        desc: '"위험물 누출 발생" 보고를 기반으로, 사전 템플릿에 맞춘 위험 보고서를 자동 생성하여 절차 간소화',
      },
    ],
    diffTable: {
      headers: ["항목", "자사 기술 (RAG + LLM)", "기존 기술"],
      rows: [
        ["질의 대응", "문맥을 이해하고 지식 기반으로 설명 제공", "고정 응답 중심으로 유연성 부족"],
        ["현장 지식 반영", "내장 지침서/작업 매뉴얼을 RAG로 활용", "시스템 외부 지식 의존"],
        ["통신 의존성", "로컬 추론 가능 → 통신 제약 극복", "클라우드 기반으로 통신 필수"],
        ["사용자 인터페이스", "음성/텍스트 기반의 대화형 상호작용", "버튼 위주의 제한적 인터페이스"],
      ],
    },
    applications: [
      "건설 현장: 위험 행동 Q&A, 도급 근로자 안전교육 지원",
      "제조 공장: 설비 이상 징후 설명, 작업 매뉴얼 질의 대응",
      "야간 무인 작업장: 위험 탐지 후 상황 해석 및 대응 유도",
      "공공 시설/지하 공간: 긴급 상황 시 음성 대화로 대응 유도",
    ],
    serviceItems: [
      "RAG + LLM 통합 대화형 시스템 커스터마이징",
      "현장 안전 매뉴얼 기반 벡터 데이터베이스 구축",
      "Jetson Orin 등 온디바이스에 최적화된 모델 제공",
      "음성 입출력 UI 및 다국어 대응 시스템 개발",
      "실증 현장 시나리오 제작 및 POC(개념 증명) 테스트 지원",
    ],
  },
  en: {
    card: {
      subtitle: "An Intelligent Safety Partner for the Field",
      description: [
        "Industrial site safety today demands intelligence that goes beyond simple surveillance to understand and assess situations.",
        "While conventional safety systems only provided rule-based alerts, what is needed now is a conversational safety awareness system that understands worker queries and presents solutions to complex situations.",
        "At the core of this innovation is RAG (Retrieve-Augment-Generate) based LLM (Large Language Model) technology. This technology combines extensive guidebooks, manuals, and real-time sensor data to answer even 'why' questions.",
        "For example, when a worker asks 'The machine is making a strange noise,' the system can respond quickly and accurately with guidance like 'There may be motor overheating. Please shut off the power immediately.'",
        "Notably, the on-device inference capability operates independently even in underground workplaces or tunnels with no connectivity, eliminating safety blind spots.",
        "The RAG-based LLM is not merely a monitor but an intelligent safety partner that predicts risks, communicates, and delivers field knowledge in real time, defining a new paradigm in industrial safety.",
      ],
    },
    sections: {
      overview: "Overview",
      coreTech: "Core Technology Components",
      scenarios: "Key Features & Service Scenarios",
      differentiation: "Technical Differentiation",
      applications: "Application Domains",
      services: "Available Services",
    },
    overview:
      "We provide a conversational safety awareness system powered by RAG (Retrieve-Augment-Generate) based LLM (Large Language Model) technology, enabling real-time understanding of and response to complex hazardous situations at industrial sites. This next-generation industrial safety solution combines situational awareness, context analysis, and knowledge retrieval to deliver intelligent alerts, reporting, and response guidance.",
    techTable: {
      headers: ["Component", "Description", "Key Functions"],
      rows: [
        [
          "LLM (Large Language Model)",
          "In-house optimized models from GPT, Phi, and Llama families",
          "Worker Q&A and natural language explanations for hazardous situations",
        ],
        [
          "RAG (Retrieve-Augment-Generate)",
          "Response generation based on on-device vector database and document retrieval",
          "Automated explanations and accurate information delivery based on field guidelines",
        ],
        [
          "On-Device Inference",
          "Runs on low-power edge hardware such as NVIDIA Jetson Orin",
          "Independent LLM inference even in connectivity-limited environments",
        ],
      ],
    },
    scenarios: [
      {
        title: "Real-time Hazard Interpretation & Guidance",
        desc: "Example: When a worker inputs 'The machine is making a strange noise,' contextual analysis provides guidance such as 'Motor overheating is possible. Shut off the power immediately and call a supervisor.'",
      },
      {
        title: "Context-Aware Voice Guidance System",
        desc: "Generates real-time situational voice warnings linked to radar/ToF detection events, such as 'You are approaching a hazardous zone. Move to the left.'",
      },
      {
        title: "Manual-Based Emergency Response Guidance",
        desc: "In emergencies like 'A person has collapsed,' retrieves procedure manuals to deliver step-by-step first aid instructions.",
      },
      {
        title: "Automated Incident Reporting",
        desc: "Automatically generates hazard reports based on pre-defined templates from inputs like 'Hazardous material leak detected,' streamlining procedures.",
      },
    ],
    diffTable: {
      headers: ["Category", "Our Technology (RAG + LLM)", "Conventional Technology"],
      rows: [
        ["Query Response", "Provides context-aware, knowledge-based explanations", "Fixed responses with limited flexibility"],
        ["Field Knowledge", "Leverages embedded guidelines/manuals via RAG", "Dependent on external system knowledge"],
        ["Connectivity Dependency", "Local inference capable, overcomes connectivity constraints", "Cloud-based, connectivity required"],
        ["User Interface", "Conversational interaction via voice/text", "Limited button-based interface"],
      ],
    },
    applications: [
      "Construction sites: Hazard behavior Q&A, subcontractor safety training support",
      "Manufacturing plants: Equipment anomaly explanation, work manual query response",
      "Unmanned nighttime workplaces: Post-detection situation interpretation and response guidance",
      "Public facilities / underground spaces: Voice-guided emergency response",
    ],
    serviceItems: [
      "RAG + LLM integrated conversational system customization",
      "Vector database construction based on field safety manuals",
      "On-device optimized model delivery for Jetson Orin and similar platforms",
      "Voice I/O UI and multilingual response system development",
      "Field scenario creation and POC (Proof of Concept) testing support",
    ],
  },
};

export const getRndRagLlmData = (lang) => data[lang] || data.ko;

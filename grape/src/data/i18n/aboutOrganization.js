/**
 * About Organization page i18n data
 * Usage: import { getAboutOrganizationData } from './aboutOrganization';
 *        const data = getAboutOrganizationData(currentLang);
 */

const data = {
  ko: {
    hero: {
      badge: "AI Agent-Driven Organization",
      title: "AI 에이전트를 활용한\n효율적인 조직 운영",
      desc: "싱스웰은 AI 에이전트 기반의 스마트 워크플로우로 소규모 인력으로도 대규모 프로젝트를 수행할 수 있는 효율적 조직 구조를 운영합니다. 각 팀은 AI 도구를 활용하여 개발, 영업, 제조, 연구 전 영역에서 생산성을 극대화합니다.",
    },
    orgChart: {
      sectionLabel: "Organization Chart",
      sectionTitle: "조직 구조",
      ceo: "대표이사",
      ceoSub: "CEO",
    },
    departments: [
      {
        title: "기술영업팀",
        subtitle: "Technical Sales",
        items: ["고객 요구사항 분석", "기술 제안서 작성", "프로젝트 수주 관리", "파트너십 구축"],
      },
      {
        title: "기술팀",
        subtitle: "Engineering",
        items: ["AI 소프트웨어 개발", "시스템 설계 및 구현", "하드웨어 펌웨어 개발", "QA 테스트 및 검증"],
      },
      {
        title: "제조팀",
        subtitle: "Manufacturing",
        items: ["PCB/SMT 제품 생산", "품질 관리 및 검수", "자재 수급 관리", "생산 공정 최적화"],
      },
      {
        title: "외주관리팀",
        subtitle: "Outsourcing Mgmt",
        items: ["협력사 관리 및 평가", "외주 개발 품질 관리", "납기 일정 조율", "비용 효율화"],
      },
      {
        title: "기업부설연구소",
        subtitle: "R&D Center",
        items: ["AI/ML 핵심 알고리즘 연구", "특허 및 논문 출원", "신기술 PoC 개발", "정부과제 수행"],
      },
      {
        title: "전문위원 그룹",
        subtitle: "Expert Advisory",
        items: ["기술 자문 및 컨설팅", "사업 전략 수립 지원", "품질 인증 자문", "법률/특허 자문"],
      },
      {
        title: "정보통신공사팀",
        subtitle: "ICT Construction",
        items: ["CCTV/네트워크 설치", "통신 인프라 구축", "시스템 통합 시공", "유지보수 운영"],
      },
    ],
    aiWorkflow: {
      sectionLabel: "AI-Powered Workflow",
      sectionTitle: "AI 에이전트 활용 영역",
      cards: [
        {
          title: "코드 생성 및 리뷰",
          desc: "AI 코딩 어시스턴트를 활용한 빠른 개발과 자동 코드 리뷰로 품질 확보",
        },
        {
          title: "프로젝트 관리 자동화",
          desc: "일정, 리소스, 리스크를 AI가 분석하여 최적의 프로젝트 운영 지원",
        },
        {
          title: "데이터 분석 및 리포트",
          desc: "영업, 생산, 품질 데이터를 AI가 분석하여 인사이트 도출 및 자동 보고서 생성",
        },
        {
          title: "고객 대응 자동화",
          desc: "AI 챗봇과 자동 응대 시스템으로 고객 문의 즉시 처리 및 기술 지원",
        },
      ],
    },
  },
  en: {
    hero: {
      badge: "AI Agent-Driven Organization",
      title: "Efficient Organization\nPowered by AI Agents",
      desc: "ThingsWell operates an efficient organizational structure that enables small teams to execute large-scale projects through AI agent-based smart workflows. Each team maximizes productivity across development, sales, manufacturing, and research using AI tools.",
    },
    orgChart: {
      sectionLabel: "Organization Chart",
      sectionTitle: "Organization Structure",
      ceo: "CEO",
      ceoSub: "Chief Executive Officer",
    },
    departments: [
      {
        title: "Technical Sales",
        subtitle: "Technical Sales",
        items: ["Customer requirements analysis", "Technical proposal preparation", "Project acquisition management", "Partnership development"],
      },
      {
        title: "Engineering",
        subtitle: "Engineering",
        items: ["AI software development", "System design & implementation", "Hardware firmware development", "QA testing & verification"],
      },
      {
        title: "Manufacturing",
        subtitle: "Manufacturing",
        items: ["PCB/SMT product manufacturing", "Quality control & inspection", "Material procurement management", "Production process optimization"],
      },
      {
        title: "Outsourcing Mgmt",
        subtitle: "Outsourcing Mgmt",
        items: ["Partner management & evaluation", "Outsourced development QC", "Delivery schedule coordination", "Cost optimization"],
      },
      {
        title: "R&D Center",
        subtitle: "R&D Center",
        items: ["Core AI/ML algorithm research", "Patent & paper filing", "New technology PoC development", "Government project execution"],
      },
      {
        title: "Expert Advisory",
        subtitle: "Expert Advisory",
        items: ["Technical consulting & advisory", "Business strategy support", "Quality certification advisory", "Legal & patent advisory"],
      },
      {
        title: "ICT Construction",
        subtitle: "ICT Construction",
        items: ["CCTV & network installation", "Telecom infrastructure development", "System integration construction", "Maintenance & operations"],
      },
    ],
    aiWorkflow: {
      sectionLabel: "AI-Powered Workflow",
      sectionTitle: "AI Agent Application Areas",
      cards: [
        {
          title: "Code Generation & Review",
          desc: "Fast development with AI coding assistants and automated code reviews for quality assurance",
        },
        {
          title: "Project Management Automation",
          desc: "AI-powered analysis of schedules, resources, and risks for optimal project operations",
        },
        {
          title: "Data Analysis & Reporting",
          desc: "AI-driven insight generation and automated report creation from sales, production, and quality data",
        },
        {
          title: "Customer Response Automation",
          desc: "Instant customer inquiry handling and technical support via AI chatbots and automated response systems",
        },
      ],
    },
  },
};

export const getAboutOrganizationData = (lang) => data[lang] || data.ko;

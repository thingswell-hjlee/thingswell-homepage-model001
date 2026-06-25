/**
 * Company Intro page i18n data
 * Usage: import { getCompanyIntroData } from './companyIntro';
 *        const data = getCompanyIntroData(currentLang);
 */

const data = {
  ko: {
    ceo: {
      slogan: '"AI로 지키는 안전, 기술로 여는 미래"',
      intro: "싱스웰은 풍부한 연구개발 실적과 제품화 경험을 바탕으로, 산업안전과 생활안전의 혁신을 선도하는 온디바이스 AI 공간 컴퓨팅 기업으로 성장하고 있습니다. 저희가 추구하는 것은 단순한 기술이 아니라, 극한 환경에서도 사람의 생명을 지키고 신뢰를 드리는 안전 솔루션입니다. 앞으로도 끊임없는 연구와 도전을 통해 고객과 사회가 필요로 하는 가치 있는 혁신을 실현해 나가겠습니다.",
      thankYou: "감사합니다.",
      name: "이  학  준",
      title: "대표이사",
    },
    mission: {
      label: "Mission",
      title: "미션",
      content:
        "AI 기술을 활용하여 모든 사람들이 안전하고 편리한 환경에서 생활할 수 있도록 혁신적인 솔루션을 제공합니다.",
    },
    vision: {
      label: "Vision",
      title: "비전",
      content:
        "멀티모달 상황 인지 기술의 선두주자로서, 안전과 자동화 분야에서 글로벌 리더가 되겠습니다.",
    },
    coreValues: {
      label: "Core Value",
      title: "핵심가치",
      items: [
        {
          title: "도전 (Innovation)",
          content: "미래지향적 R&D 투자와 핵심기술 내재화를 통한 경쟁력 확보",
        },
        {
          title: "전문성 (Expertise)",
          content: "AI, 임베디드SW, 정보통신공사 등 원스톱 역량 기반의 솔루션 제공",
        },
        {
          title: "사회적 책임 (Social Impact)",
          content: "노인·장애인·산업현장 등 안전·복지 향상에 기여하여 공공의 이익 창출",
        },
      ],
    },
  },
  en: {
    ceo: {
      slogan: '"Safety Secured by AI, Future Opened by Technology"',
      intro: "ThingsWell is growing as an on-device AI spatial computing company leading innovation in industrial and daily life safety, backed by extensive R&D achievements and product commercialization experience. What we pursue is not merely technology, but safety solutions that protect human lives and build trust even in extreme environments. We will continue to realize valuable innovation that customers and society need through relentless research and challenges.",
      thankYou: "Thank you.",
      name: "Hakjun Lee",
      title: "CEO",
    },
    mission: {
      label: "Mission",
      title: "Mission",
      content:
        "We provide innovative solutions using AI technology so that everyone can live in a safe and convenient environment.",
    },
    vision: {
      label: "Vision",
      title: "Vision",
      content:
        "As a leader in multimodal situational awareness technology, we aim to become a global leader in the fields of safety and automation.",
    },
    coreValues: {
      label: "Core Value",
      title: "Core Values",
      items: [
        {
          title: "Innovation",
          content: "Securing competitiveness through future-oriented R&D investment and core technology internalization",
        },
        {
          title: "Expertise",
          content: "Providing one-stop solutions based on capabilities in AI, embedded software, and ICT construction",
        },
        {
          title: "Social Impact",
          content: "Creating public benefit by contributing to safety and welfare improvements for the elderly, disabled, and industrial workers",
        },
      ],
    },
  },
};

export const getCompanyIntroData = (lang) => data[lang] || data.ko;

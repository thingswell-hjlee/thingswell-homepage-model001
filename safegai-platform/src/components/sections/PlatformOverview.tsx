import { motion } from 'framer-motion';
import { Link2, Users, Server } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import GlassCard from '../common/GlassCard';

const overviewCards = [
  {
    icon: Link2,
    title: '현장 데이터 연결',
    titleEn: 'Field Data Integration',
    description: 'AI CCTV, IoT 센서, 출입정보, 환경센서, 설비 데이터를 통합합니다.',
  },
  {
    icon: Users,
    title: '역할별 안전 화면 제공',
    titleEn: 'Role-Based Safety View',
    description: '현장 사용자와 관리자에게 필요한 정보를 구분하여 제공합니다.',
  },
  {
    icon: Server,
    title: '엣지·클라우드 기반 확장',
    titleEn: 'Edge-Cloud Scalability',
    description: 'NVIDIA Jetson 기반 엣지 게이트웨이와 AWS 클라우드 연동으로 현장 확장성을 제공합니다.',
  },
];

export default function PlatformOverview() {
  return (
    <SectionWrapper id="platform">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-cyan-400 text-sm font-medium mb-3 tracking-wider uppercase"
        >
          Platform Overview
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Safe Generative AI Platform<br />
          <span className="text-gray-400 text-xl md:text-2xl font-normal">for Physical Safety</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-3xl mx-auto leading-relaxed"
        >
          SafeGAI Platform은 단순한 CCTV 관제 시스템이 아닙니다. 현장의 사람, 장비, 공간, 센서, AI CCTV 데이터를 연결하여
          위험 이벤트를 감지하고, 사용자와 관리자에게 각각 필요한 안전 정보를 제공하는 피지컬 AI 스마트 안전 플랫폼입니다.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <GlassCard key={index} delay={index * 0.1}>
              <div className="p-3 bg-cyan-400/10 rounded-xl w-fit mb-4">
                <Icon className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{card.title}</h3>
              <p className="text-xs text-cyan-400/70 mb-3">{card.titleEn}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
            </GlassCard>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

import { motion } from 'framer-motion';
import { User, Shield } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';

export default function RoleIntro() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SectionWrapper dark>
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-cyan-400 text-sm font-medium mb-3 tracking-wider uppercase"
        >
          Role-Based Interface
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Role-Based Smart Safety Interface
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          SafeGAI Platform은 현장 사용자와 관리자의 역할을 구분하여 필요한 정보를 직관적으로 제공합니다.
          현장 사용자는 위험 알림과 조치 중심으로, 관리자는 통합 관제와 분석·설정 중심으로 플랫폼을 사용할 수 있습니다.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          onClick={() => scrollTo('#user')}
          className="cursor-pointer p-8 bg-navy-800/60 border border-cyan-400/20 rounded-2xl hover:border-cyan-400/40 transition-all group"
        >
          <div className="p-3 bg-cyan-400/10 rounded-xl w-fit mb-4 group-hover:bg-cyan-400/20 transition-colors">
            <User className="text-cyan-400" size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">사용자 화면</h3>
          <p className="text-sm text-cyan-400 mb-3">Field User Interface</p>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            현장 작업자, 안전요원, 시설 담당자가 위험 알림을 확인하고 빠르게 조치할 수 있는 모바일 중심 인터페이스
          </p>
          <div className="flex flex-wrap gap-2">
            {['안전 상태', '실시간 알림', '조치 요청', '안전 가이드'].map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400/80">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          onClick={() => scrollTo('#admin')}
          className="cursor-pointer p-8 bg-navy-800/60 border border-blue-400/20 rounded-2xl hover:border-blue-400/40 transition-all group"
        >
          <div className="p-3 bg-blue-400/10 rounded-xl w-fit mb-4 group-hover:bg-blue-400/20 transition-colors">
            <Shield className="text-blue-400" size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">관리자 화면</h3>
          <p className="text-sm text-blue-400 mb-3">Admin Control Center</p>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            본사 관리자, 관제센터 운영자가 통합 관제, 이벤트 분석, 룰 설정, 리포트를 관리하는 PC 중심 인터페이스
          </p>
          <div className="flex flex-wrap gap-2">
            {['통합 대시보드', '이벤트 관리', '룰 엔진', '리포트'].map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-400/80">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

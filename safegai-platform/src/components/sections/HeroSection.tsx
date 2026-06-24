import { motion } from 'framer-motion';
import { Shield, Cpu, Cloud, Bell, Activity } from 'lucide-react';

const floatingCards = [
  { icon: Shield, label: 'AI CCTV Event Detected', color: 'text-red-400', delay: 0 },
  { icon: Cpu, label: 'Edge Gateway Processing', color: 'text-cyan-400', delay: 0.2 },
  { icon: Activity, label: 'Safety Risk Level: High', color: 'text-yellow-400', delay: 0.4 },
  { icon: Cloud, label: 'AWS Cloud Sync', color: 'text-blue-400', delay: 0.6 },
  { icon: Bell, label: 'Operator Alert Sent', color: 'text-green-400', delay: 0.8 },
];

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 px-4 md:px-8 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
            <span className="text-xs font-medium text-cyan-400">Physical AI Smart Safety Platform</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            <span className="text-white">SafeGAI</span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Platform
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 font-medium mb-6">
            Physical AI Smart Safety Platform
          </p>

          <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-4">
            현장의 위험을 데이터로 연결하고,<br />
            엣지 AI와 생성형 AI로 안전 의사결정을 고도화합니다.
          </p>

          <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xl">
            SafeGAI는 공공안전, 건설안전, 산업안전 현장을 위한 피지컬 AI 기반 스마트 안전 플랫폼입니다.
            NVIDIA Jetson 기반 엣지 AI, RTX 기반 AI 분석·검증 환경, AWS 클라우드 연동 기술을 결합하여
            현장의 위험 이벤트를 감지·분석·대응하는 차세대 안전관리 체계를 제공합니다.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('#user')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
            >
              사용자 화면 보기
            </button>
            <button
              onClick={() => scrollTo('#admin')}
              className="px-6 py-3 bg-navy-700/80 border border-navy-600 text-gray-200 font-medium rounded-lg hover:border-cyan-400/50 hover:text-cyan-400 transition-all"
            >
              관리자 화면 보기
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="px-6 py-3 bg-transparent border border-gray-600 text-gray-400 font-medium rounded-lg hover:border-gray-400 hover:text-gray-200 transition-all"
            >
              플랫폼 상담 문의
            </button>
          </div>
        </motion.div>

        {/* Right: Floating Dashboard Cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="relative h-[400px] md:h-[480px] hidden md:block"
        >
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl" />
          </div>

          {/* Floating cards */}
          {floatingCards.map((card, index) => {
            const Icon = card.icon;
            const positions = [
              'top-4 left-8',
              'top-16 right-4',
              'top-1/2 -translate-y-1/2 left-4',
              'bottom-24 right-8',
              'bottom-8 left-16',
            ];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + card.delay, duration: 0.5 }}
                className={`absolute ${positions[index]}`}
              >
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.3,
                  }}
                  className="flex items-center gap-3 px-4 py-3 bg-navy-700/70 backdrop-blur-sm border border-navy-600/60 rounded-xl shadow-xl"
                >
                  <div className={`p-2 rounded-lg bg-navy-800/80 ${card.color}`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-gray-300 whitespace-nowrap">
                    {card.label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Center decorative element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 rounded-full border border-cyan-400/10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border border-blue-400/10"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

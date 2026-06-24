import { motion } from 'framer-motion';
import { Camera, Cpu, Cloud, Monitor, ArrowDown } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';

const layers = [
  {
    icon: Camera,
    title: 'Field Data Layer',
    subtitle: '현장 데이터 수집',
    items: ['AI CCTV', 'IoT Sensor', 'Access Control', 'Environment Sensor', 'Facility Data'],
    color: 'from-green-400 to-emerald-500',
    borderColor: 'border-green-400/30',
    bgColor: 'bg-green-400/5',
  },
  {
    icon: Cpu,
    title: 'Edge AI Layer',
    subtitle: '현장 AI 처리',
    items: ['SafeGAI Edge Gateway', 'NVIDIA Jetson', 'Local Event Processing', 'Rule Engine', 'Local Storage'],
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-400/30',
    bgColor: 'bg-cyan-400/5',
  },
  {
    icon: Cloud,
    title: 'Cloud & Intelligence Layer',
    subtitle: '클라우드 분석·연동',
    items: ['AWS Cloud', 'Event History', 'Analytics', 'Generative AI Report Support'],
    color: 'from-blue-400 to-indigo-500',
    borderColor: 'border-blue-400/30',
    bgColor: 'bg-blue-400/5',
  },
  {
    icon: Monitor,
    title: 'Role-Based Interface',
    subtitle: '역할 기반 인터페이스',
    items: ['User Interface', 'Admin Control Center', 'Safety Dashboard', 'Report'],
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-400/30',
    bgColor: 'bg-purple-400/5',
  },
];

export default function Architecture() {
  return (
    <SectionWrapper id="architecture">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-cyan-400 text-sm font-medium mb-3 tracking-wider uppercase"
        >
          System Architecture
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          Platform Architecture
        </motion.h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <div key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative p-6 rounded-2xl border ${layer.borderColor} ${layer.bgColor} backdrop-blur-sm`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${layer.color} bg-opacity-20`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{layer.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{layer.subtitle}</p>
                    <div className="flex flex-wrap gap-2">
                      {layer.items.map((item, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-navy-700/60 border border-navy-600/50 text-gray-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {index < layers.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.1 }}
                  className="flex justify-center py-2"
                >
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowDown size={20} className="text-gray-600" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

import { motion } from 'framer-motion';
import { Scan, Users, Cpu, Workflow, Cloud, BarChart3 } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import GlassCard from '../common/GlassCard';
import { CORE_FEATURES } from '../../data/constants';

const iconMap: Record<string, React.ElementType> = {
  Scan, Users, Cpu, Workflow, Cloud, BarChart3,
};

export default function CoreFeatures() {
  return (
    <SectionWrapper id="technology" dark>
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-cyan-400 text-sm font-medium mb-3 tracking-wider uppercase"
        >
          Core Features
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          핵심 기능
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CORE_FEATURES.map((feature, index) => {
          const Icon = iconMap[feature.icon] || Scan;
          return (
            <GlassCard key={index} delay={index * 0.1}>
              <div className="p-3 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-xl w-fit mb-4">
                <Icon className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-xs text-cyan-400/70 mb-3">{feature.titleEn}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </GlassCard>
          );
        })}
      </div>

      {/* Technology Foundation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 p-8 bg-navy-800/40 border border-navy-700/50 rounded-2xl"
      >
        <h3 className="text-xl font-bold text-white text-center mb-6">Technology Foundation</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'NVIDIA Jetson', sub: 'Edge AI Computing' },
            { label: 'NVIDIA RTX', sub: 'AI Training & Inference' },
            { label: 'AWS Cloud', sub: 'Scalable Infrastructure' },
            { label: 'DeepStream SDK', sub: 'Video Analytics' },
            { label: 'TensorRT', sub: 'Optimized Inference' },
            { label: 'IoT Sensors', sub: 'Environment Monitoring' },
            { label: 'Rule Engine', sub: 'Automated Response' },
            { label: 'Physical AI', sub: 'Real-world Safety' },
          ].map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center p-3 rounded-xl bg-navy-700/30 border border-navy-600/30 hover:border-cyan-400/30 transition-all"
            >
              <p className="text-sm font-medium text-gray-200">{tech.label}</p>
              <p className="text-xs text-gray-500 mt-1">{tech.sub}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

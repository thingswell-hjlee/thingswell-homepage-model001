import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({ children, className = '', hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={`bg-navy-700/50 backdrop-blur-sm border border-navy-600/50 rounded-xl p-6 transition-all duration-300 ${hover ? 'hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/5' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

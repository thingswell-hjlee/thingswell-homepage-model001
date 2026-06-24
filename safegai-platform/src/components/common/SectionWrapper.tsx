import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export default function SectionWrapper({ id, children, className = '', dark = false }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 px-4 md:px-8 ${dark ? 'bg-navy-900' : 'bg-navy-800/50'} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}

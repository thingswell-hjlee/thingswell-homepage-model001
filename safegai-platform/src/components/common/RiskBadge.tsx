interface RiskBadgeProps {
  level: 'high' | 'medium' | 'low';
  size?: 'sm' | 'md';
}

const labels = { high: '위험', medium: '주의', low: '정상' };
const colors = {
  high: 'bg-red-500/20 text-red-400 border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export default function RiskBadge({ level, size = 'sm' }: RiskBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${colors[level]} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${level === 'high' ? 'bg-red-400' : level === 'medium' ? 'bg-yellow-400' : 'bg-green-400'}`} />
      {labels[level]}
    </span>
  );
}

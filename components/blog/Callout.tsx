interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger';
  children: React.ReactNode;
  title?: string;
}

export default function Callout({ type = 'info', children, title }: CalloutProps) {
  const styles = {
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: 'ℹ️',
      titleColor: 'text-blue-400',
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      icon: '⚠️',
      titleColor: 'text-amber-400',
    },
    tip: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      icon: '💡',
      titleColor: 'text-green-400',
    },
    danger: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: '🚨',
      titleColor: 'text-red-400',
    },
  };

  const style = styles[type];

  return (
    <div className={`my-6 p-4 rounded-lg border ${style.bg} ${style.border}`}>
      {title && (
        <div className={`flex items-center gap-2 mb-2 font-semibold ${style.titleColor}`}>
          <span>{style.icon}</span>
          <span>{title}</span>
        </div>
      )}
      <div className="text-[#f0ece2]/80 leading-relaxed">{children}</div>
    </div>
  );
}

import { CheckCircle2, Download } from 'lucide-react';
import { useState } from 'react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export default function PwaInstallButton({
  label = 'Install App',
  showIcon = true,
  className = '',
  style,
}: {
  label?: string;
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { canInstall, install } = usePWAInstall();
  const [status, setStatus] = useState<'idle' | 'installed' | 'unsupported'>('idle');

  const handleClick = async () => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setStatus('installed');
      return;
    }
    if (canInstall) {
      await install();
      const stillStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (stillStandalone) setStatus('installed');
    } else {
      setStatus('unsupported');
    }
  };

  if (status === 'installed') {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-300 ${className}`}
        style={style}
      >
        <CheckCircle2 className="h-4 w-4" />
        App Already Installed
      </span>
    );
  }

  if (status === 'unsupported') {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full bg-ink-100 px-4 py-2 text-xs font-medium text-ink-600 dark:bg-ink-800 dark:text-ink-300 ${className}`}
        style={style}
      >
        Chrome menu &gt; Add to Home Screen &gt; Install
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white shadow-lg transition hover:-translate-y-0.5 ${className}`}
      style={{ backgroundColor: '#FF6A00', ...style }}
    >
      {showIcon && <Download className="h-4 w-4" />}
      {label}
    </button>
  );
}

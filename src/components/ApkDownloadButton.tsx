import { Smartphone } from 'lucide-react';
import { useState, type CSSProperties } from 'react';

const APK_PATH = '/downloads/price-finder-globally.apk';

export default function ApkDownloadButton({
  fullWidth = false,
  label = 'Download APK App',
  style,
  className = '',
}: {
  fullWidth?: boolean;
  label?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'coming-soon'>('idle');

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(APK_PATH, { method: 'HEAD' });
      if (res.ok && res.headers.get('Content-Type') !== 'text/plain') {
        const a = document.createElement('a');
        a.href = APK_PATH;
        a.download = 'price-finder-globally.apk';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        setStatus('coming-soon');
      }
    } catch {
      setStatus('coming-soon');
    }
  };

  if (status === 'coming-soon') {
    return (
      <div
        className={`${fullWidth ? 'w-full' : ''} rounded-xl bg-orange-50 px-5 py-3 text-center text-sm font-semibold text-orange-700 dark:bg-orange-950/40 dark:text-orange-300 ${className}`}
        style={style}
      >
        APK coming soon, please use Install App for now
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${fullWidth ? 'w-full' : ''} inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl ${className}`}
      style={{ backgroundColor: '#FF6A00', ...style }}
    >
      <Smartphone className="h-5 w-5" />
      {label}
    </button>
  );
}

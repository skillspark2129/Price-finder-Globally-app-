interface StoreBadgeProps {
  name: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES = {
  sm: 'h-6 w-6 text-[10px] rounded-md',
  md: 'h-9 w-9 text-xs rounded-lg',
  lg: 'h-12 w-12 text-sm rounded-xl',
} as const;

export function storeInitials(name: string): string {
  const words = name
    .replace(/\.pk$/i, '')
    .split(/[\s.-]+/)
    .filter(Boolean);
  if (words.length >= 2) return `${words[0][0]}${words[1][0]}`.toUpperCase();
  return words[0].slice(0, 2).toUpperCase();
}

export default function StoreBadge({ name, color, size = 'md' }: StoreBadgeProps) {
  return (
    <span
      aria-hidden="true"
      title={name}
      className={`inline-flex shrink-0 items-center justify-center font-bold tracking-tight text-white shadow-sm ${SIZE_CLASSES[size]}`}
      style={{ backgroundColor: color }}
    >
      {storeInitials(name)}
    </span>
  );
}

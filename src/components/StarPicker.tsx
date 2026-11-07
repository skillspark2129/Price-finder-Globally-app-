import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarPickerProps {
  value: number | null;
  disabled?: boolean;
  size?: number;
  onSelect: (stars: number) => void;
}

const STAR_VALUES = [1, 2, 3, 4, 5];

export default function StarPicker({ value, disabled = false, size = 28, onSelect }: StarPickerProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = !disabled && hovered !== null ? hovered : (value ?? 0);

  return (
    <div
      className="inline-flex items-center gap-1"
      role="group"
      aria-label="Rate this product from 1 to 5 stars"
      onMouseLeave={() => setHovered(null)}
    >
      {STAR_VALUES.map((star) => {
        const filled = star <= shown;
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            aria-label={`Rate ${star} ${star === 1 ? 'star' : 'stars'}`}
            onMouseEnter={() => setHovered(star)}
            onFocus={() => setHovered(star)}
            onBlur={() => setHovered(null)}
            onClick={() => onSelect(star)}
            className="rounded-md p-0.5 transition duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:cursor-default disabled:hover:scale-100"
          >
            <Star
              width={size}
              height={size}
              className={`transition duration-200 ${
                filled ? 'fill-amber-400 text-amber-400' : 'text-ink-300 dark:text-ink-600'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

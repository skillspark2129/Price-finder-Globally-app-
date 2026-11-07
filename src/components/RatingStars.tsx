import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export default function RatingStars({ rating, reviewCount, size = 14 }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star - 0.25;
          return (
            <Star
              key={star}
              width={size}
              height={size}
              className={filled ? 'fill-amber-400 text-amber-400' : 'text-ink-300 dark:text-ink-600'}
            />
          );
        })}
      </div>
      <span className="text-xs font-semibold text-ink-700 dark:text-ink-200">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-xs text-ink-500 dark:text-ink-400">({reviewCount.toLocaleString('en-PK')})</span>
      )}
    </div>
  );
}

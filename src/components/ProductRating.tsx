import { CheckCircle2 } from 'lucide-react';
import RatingStars from '@/components/RatingStars';
import StarPicker from '@/components/StarPicker';
import type { ProductRatingController } from '@/hooks/useProductRating';

interface ProductRatingProps {
  rating: ProductRatingController;
}

export default function ProductRating({ rating }: ProductRatingProps) {
  const { stats, myRating, error, rate } = rating;
  const hasRatings = stats !== null && stats.count > 0;

  return (
    <div className="space-y-3">
      {hasRatings ? (
        <RatingStars rating={stats.average} reviewCount={stats.count} size={16} />
      ) : (
        <p className="text-sm font-medium text-ink-500 dark:text-ink-400">No ratings yet. Be the first to rate.</p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <StarPicker value={myRating} disabled={myRating !== null} size={22} onSelect={(stars) => void rate(stars)} />
        {myRating !== null ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" /> Thanks, you rated {myRating} of 5
          </span>
        ) : (
          <span className="text-sm text-ink-500 dark:text-ink-400">Tap a star to rate</span>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

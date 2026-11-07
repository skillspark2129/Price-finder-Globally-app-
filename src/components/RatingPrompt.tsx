import { Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import StarPicker from '@/components/StarPicker';
import type { ProductRatingController } from '@/hooks/useProductRating';

const SHOW_AFTER_SCROLL_RATIO = 0.7;

interface RatingPromptProps {
  rating: ProductRatingController;
  enabled: boolean;
}

export default function RatingPrompt({ rating, enabled }: RatingPromptProps) {
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrolledEnough(scrollable > 0 && window.scrollY / scrollable >= SHOW_AFTER_SCROLL_RATIO);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visible = enabled && scrolledEnough && !dismissed && rating.myRating === null;
  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Rate this product"
      className="fixed bottom-20 left-4 right-4 z-30 mx-auto max-w-sm animate-fade-up rounded-2xl border border-ink-200 bg-white p-5 shadow-2xl md:bottom-6 md:left-auto md:right-6 dark:border-ink-700 dark:bg-ink-900"
    >
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Close rating card"
        className="absolute right-3 top-3 rounded-full p-1 text-ink-500 transition hover:bg-ink-100 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
      <p className="flex items-center gap-2 pr-6 text-base font-bold text-ink-900 dark:text-white">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Enjoying? Rate 5 Stars!
      </p>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Tap a star to share your rating.</p>
      <div className="mt-3">
        <StarPicker value={rating.myRating} size={26} onSelect={(stars) => void rating.rate(stars)} />
      </div>
      {rating.error && (
        <p role="alert" className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
          {rating.error}
        </p>
      )}
    </div>
  );
}

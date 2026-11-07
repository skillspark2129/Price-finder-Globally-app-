import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

interface WishlistToggleProps {
  productId: string;
  productTitle: string;
  variant?: 'icon' | 'button';
}

export default function WishlistToggle({ productId, productTitle, variant = 'icon' }: WishlistToggleProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const saved = isWishlisted(productId);
  const label = saved ? `Remove ${productTitle} from wishlist` : `Save ${productTitle} to wishlist`;

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={() => toggleWishlist(productId)}
        aria-pressed={saved}
        className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
          saved
            ? 'border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300'
            : 'border-ink-200 text-ink-700 hover:border-primary-300 hover:text-primary-600 dark:border-ink-600 dark:text-ink-200'
        }`}
      >
        <Heart className={`h-4 w-4 transition-transform duration-300 ${saved ? 'scale-110 fill-primary-500' : ''}`} />
        {saved ? 'Saved to wishlist' : 'Save to wishlist'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggleWishlist(productId)}
      aria-label={label}
      aria-pressed={saved}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-500 shadow-sm backdrop-blur transition hover:scale-110 hover:text-primary-500 active:scale-95 dark:bg-ink-900/80"
    >
      <Heart className={`h-[18px] w-[18px] transition-colors ${saved ? 'fill-primary-500 text-primary-500' : ''}`} />
    </button>
  );
}

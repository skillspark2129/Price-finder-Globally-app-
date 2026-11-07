import { Heart, Loader2, X } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductPriceLabel from '@/components/ProductPriceLabel';
import { useWishlist } from '@/context/WishlistContext';
import { useProductCatalog } from '@/hooks/useProductCatalog';

export default function WishlistDrawer() {
  const { isDrawerOpen } = useWishlist();
  if (!isDrawerOpen) return null;
  return <WishlistPanel />;
}

function WishlistPanel() {
  const { wishlistIds, toggleWishlist, closeWishlist } = useWishlist();
  const { products, status, reload } = useProductCatalog();
  const saved = products.filter((product) => wishlistIds.includes(product.id));

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeWishlist();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeWishlist]);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close wishlist"
        onClick={closeWishlist}
        className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm transition-opacity"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="wishlist-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-md animate-slide-in flex-col bg-white shadow-2xl dark:bg-ink-900"
      >
        <header className="flex items-center justify-between border-b border-ink-200 px-5 py-4 dark:border-ink-700">
          <h2 id="wishlist-title" className="flex items-center gap-2 text-lg font-bold">
            <Heart className="h-5 w-5 text-primary-500" />
            Your wishlist ({wishlistIds.length})
          </h2>
          <button
            type="button"
            onClick={closeWishlist}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition hover:bg-ink-100 dark:hover:bg-ink-800"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {status === 'loading' && (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-ink-500">
              <Loader2 className="h-5 w-5 animate-spin" /> Loading your saved products
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              We could not load your wishlist. Please check your connection.
              <button type="button" onClick={reload} className="mt-3 block font-semibold underline">
                Try again
              </button>
            </div>
          )}

          {status === 'ready' && saved.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 dark:bg-ink-800">
                <Heart className="h-8 w-8 text-primary-500" />
              </div>
              <p className="font-semibold">Your wishlist is empty</p>
              <p className="max-w-xs text-sm text-ink-500 dark:text-ink-400">
                Tap the heart on any product to save it here for later.
              </p>
            </div>
          )}

          {status === 'ready' && saved.length > 0 && (
            <ul className="space-y-3">
              {saved.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center gap-3 rounded-2xl border border-ink-200 p-3 dark:border-ink-700"
                >
                  <Link
                    to={`/product/${product.id}`}
                    onClick={closeWishlist}
                    className="flex min-w-0 flex-1 items-center gap-3"
                  >
                    <img
                      src={product.image_urls[0]}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-xl bg-white object-contain p-1"
                    />
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-semibold leading-snug">{product.title}</p>
                      <ProductPriceLabel product={product} />
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`Remove ${product.title} from wishlist`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}

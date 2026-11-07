import { ArrowRight, ImageOff, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductPriceLabel from '@/components/ProductPriceLabel';
import RatingStars from '@/components/RatingStars';
import StoreBadge from '@/components/StoreBadge';
import WishlistToggle from '@/components/WishlistToggle';
import type { ProductSummary } from '@/lib/types';

interface ProductCardProps {
  product: ProductSummary;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, title, image_urls, ratingStats, lowestOffer, storeCount } = product;
  const detailPath = `/product/${id}`;
  const imageUrl = image_urls[0];

  return (
    <article className="group card flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl dark:hover:border-primary-800">
      <div className="relative">
        <Link to={detailPath} className="block aspect-square overflow-hidden bg-white dark:bg-ink-900" aria-label={title}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-ink-300">
              <ImageOff className="h-10 w-10" />
            </span>
          )}
        </Link>
        <div className="absolute right-3 top-3">
          <WishlistToggle productId={id} productTitle={title} />
        </div>
        {lowestOffer && storeCount > 0 && (
          <span className="absolute bottom-3 left-3 rounded-full bg-ink-900/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
            Compare {storeCount} Stores
          </span>
        )}
        {lowestOffer && storeCount > 0 && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-green-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
            <Trophy className="h-3 w-3" /> Best Deal
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link
          to={detailPath}
          className="line-clamp-2 min-h-[2.625rem] text-sm font-semibold leading-snug transition hover:text-primary-600 dark:hover:text-primary-400"
        >
          {title}
        </Link>

        <div className="space-y-2">
          <ProductPriceLabel product={product} />
          {ratingStats && ratingStats.count > 0 ? (
            <RatingStars rating={ratingStats.average} reviewCount={ratingStats.count} size={12} />
          ) : (
            <p className="text-xs text-ink-500 dark:text-ink-400">No ratings yet</p>
          )}
          {lowestOffer && (
            <div className="flex items-center gap-2 text-xs text-ink-500 dark:text-ink-400">
              <StoreBadge name={lowestOffer.store.name} color={lowestOffer.store.brand_color} size="sm" />
              <span className="truncate">Lowest at {lowestOffer.store.name}</span>
            </div>
          )}
        </div>

        <Link to={detailPath} className="btn-primary mt-auto w-full !py-2.5">
          Compare Prices
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

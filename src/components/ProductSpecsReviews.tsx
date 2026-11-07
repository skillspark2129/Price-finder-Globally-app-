import { Star } from 'lucide-react';
import type { Product } from '@/lib/types';

interface ProductSpecsProps {
  product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  if (product.specs.length === 0 && !product.description) return null;
  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold">Specifications</h2>
      {product.description && (
        <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{product.description}</p>
      )}
      {product.specs.length > 0 && (
        <dl className="mt-5 divide-y divide-ink-200 overflow-hidden rounded-xl border border-ink-200 bg-white dark:divide-ink-700 dark:border-ink-700 dark:bg-ink-900">
          {product.specs.map((spec) => (
            <div key={spec.label} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm">
              <dt className="font-medium text-ink-500 dark:text-ink-400">{spec.label}</dt>
              <dd className="font-semibold">{spec.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Customer reviews</h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            {product.rating.toFixed(1)} out of 5 from {product.review_count.toLocaleString('en-PK')} ratings
          </p>
        </div>
        <span className="flex items-center gap-1 text-3xl font-bold">
          {product.rating.toFixed(1)}
          <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
        </span>
      </div>

      {product.sample_reviews.length === 0 ? (
        <p className="mt-6 text-sm text-ink-500 dark:text-ink-400">No written reviews yet.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {product.sample_reviews.map((review) => (
            <li key={`${review.name}-${review.date}`} className="rounded-xl border border-ink-200 bg-white p-4 dark:border-ink-700 dark:bg-ink-900">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{review.name}</p>
                <span className="text-xs text-ink-500 dark:text-ink-400">{review.date}</span>
              </div>
              <div className="mt-1.5 flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-ink-300'}`}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

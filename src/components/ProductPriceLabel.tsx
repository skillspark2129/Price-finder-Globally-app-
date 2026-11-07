import type { ProductSummary } from '@/lib/types';
import { discountPercent, formatPrice } from '@/lib/format';

interface ProductPriceLabelProps {
  product: ProductSummary;
  size?: 'sm' | 'lg';
}

export default function ProductPriceLabel({ product, size = 'sm' }: ProductPriceLabelProps) {
  const { lowestOffer, list_price: listPrice } = product;

  if (!lowestOffer) {
    return <p className="text-sm font-medium text-ink-500 dark:text-ink-400">Price coming soon</p>;
  }

  const discount = discountPercent(listPrice, lowestOffer.price);

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className={`font-bold text-ink-900 dark:text-white ${size === 'lg' ? 'text-3xl' : 'text-base'}`}>
        {formatPrice(lowestOffer.price)}
      </span>
      {discount > 0 && (
        <>
          <span className={`text-ink-400 line-through ${size === 'lg' ? 'text-base' : 'text-xs'}`}>
            {formatPrice(listPrice)}
          </span>
          <span className="rounded-md bg-primary-50 px-1.5 py-0.5 text-xs font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
            {discount}% OFF
          </span>
        </>
      )}
    </div>
  );
}

import { Trophy } from 'lucide-react';
import type { ReactNode } from 'react';
import RatingStars from '@/components/RatingStars';
import OfferBuyLink from '@/components/OfferBuyLink';
import { discountPercent, formatPrice } from '@/lib/format';
import type { Offer, Product, RatingStats } from '@/lib/types';

export interface CompareItem {
  product: Product;
  offers: Offer[];
  ratingStats: RatingStats | null;
}

interface CompareTableProps {
  items: CompareItem[];
}

interface RowDefinition {
  label: string;
  render: (item: CompareItem) => ReactNode;
}

function lowestOffer(offers: Offer[]): Offer | null {
  return offers.reduce<Offer | null>((lowest, offer) => (lowest === null || offer.price < lowest.price ? offer : lowest), null);
}

const ROWS: RowDefinition[] = [
  { label: 'Brand', render: ({ product }) => product.brand },
  { label: 'Category', render: ({ product }) => product.category },
  {
    label: 'Lowest price',
    render: ({ offers }) => {
      const best = lowestOffer(offers);
      return best ? (
        <span className="text-lg font-bold text-primary-600 dark:text-primary-400">{formatPrice(best.price)}</span>
      ) : (
        'Not listed yet'
      );
    },
  },
  {
    label: 'Best store',
    render: ({ offers }) => {
      const best = lowestOffer(offers);
      return best ? (
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <Trophy className="h-4 w-4 text-primary-500" /> {best.store.name}
        </span>
      ) : (
        '-'
      );
    },
  },
  {
    label: 'Stores compared',
    render: ({ offers }) => `${offers.length} ${offers.length === 1 ? 'store' : 'stores'}`,
  },
  {
    label: 'Discount from list price',
    render: ({ product, offers }) => {
      const best = lowestOffer(offers);
      const off = best ? discountPercent(product.list_price, best.price) : 0;
      return off > 0 ? `${off}% off` : '-';
    },
  },
  {
    label: 'Rating',
    render: ({ ratingStats }) =>
      ratingStats && ratingStats.count > 0 ? (
        <RatingStars rating={ratingStats.average} reviewCount={ratingStats.count} size={14} />
      ) : (
        'No ratings yet'
      ),
  },
];

export default function CompareTable({ items }: CompareTableProps) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <caption className="sr-only">Side by side comparison of selected products</caption>
          <thead>
            <tr className="bg-ink-100/70 dark:bg-ink-900/60">
              <th scope="col" className="w-40 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                Product
              </th>
              {items.map(({ product }) => (
                <th key={product.id} scope="col" className="min-w-[220px] px-5 py-4 align-top">
                  <div className="flex items-start gap-3">
                    {product.image_urls[0] && (
                      <img src={product.image_urls[0]} alt="" loading="lazy" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                    )}
                    <span className="text-base font-bold leading-snug text-ink-900 dark:text-white">{product.title}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-200 bg-white dark:divide-ink-700 dark:bg-ink-800">
            {ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                  {row.label}
                </th>
                {items.map((item) => (
                  <td key={item.product.id} className="px-5 py-4 text-ink-700 dark:text-ink-200">
                    {row.render(item)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                Buy
              </th>
              {items.map((item) => {
                const best = lowestOffer(item.offers);
                return (
                  <td key={item.product.id} className="px-5 py-4">
                    {best ? (
                      <OfferBuyLink offer={best} className="btn-primary !px-4 !py-2 text-xs">
                        View Price on {best.store.name}
                      </OfferBuyLink>
                    ) : (
                      <span className="text-ink-500 dark:text-ink-400">Unavailable</span>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

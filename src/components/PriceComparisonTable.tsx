import { Trophy } from 'lucide-react';
import StoreBadge from '@/components/StoreBadge';
import OfferBuyLink from '@/components/OfferBuyLink';
import { formatPrice } from '@/lib/format';
import type { Offer } from '@/lib/types';

interface PriceComparisonTableProps {
  offers: Offer[];
}

export default function PriceComparisonTable({ offers }: PriceComparisonTableProps) {
  const bestPrice = offers.length > 0 ? Math.min(...offers.map((offer) => offer.price)) : null;

  if (offers.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-ink-300 px-6 py-10 text-center text-sm text-ink-500 dark:border-ink-600 dark:text-ink-400">
        No store prices are available for this product yet.
      </p>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-ink-200 text-left text-sm dark:divide-ink-700">
          <thead className="bg-ink-100/70 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:bg-ink-900/60 dark:text-ink-400">
            <tr>
              <th scope="col" className="px-5 py-4">Store</th>
              <th scope="col" className="px-5 py-4">Price</th>
              <th scope="col" className="hidden px-5 py-4 md:table-cell">Delivery</th>
              <th scope="col" className="hidden px-5 py-4 sm:table-cell">Stock</th>
              <th scope="col" className="px-5 py-4 text-right">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-200 bg-white dark:divide-ink-700 dark:bg-ink-800">
            {offers.map((offer) => {
              const isBest = offer.price === bestPrice;
              return (
                <tr
                  key={offer.id}
                  className={`transition-colors hover:bg-primary-50/50 dark:hover:bg-ink-700/50 ${isBest ? 'bg-green-50/60 dark:bg-green-900/20' : ''}`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <StoreBadge name={offer.store.name} color={offer.store.brand_color} size="md" />
                      <span className="font-semibold">{offer.store.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col items-start gap-1">
                      <span className={`text-base font-bold ${isBest ? 'text-green-600 dark:text-green-400' : ''}`}>
                        {formatPrice(offer.price)}
                      </span>
                      {isBest && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500 px-2 py-0.5 text-[11px] font-bold text-white">
                          <Trophy className="h-3 w-3" /> Best Deal
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 text-ink-600 md:table-cell dark:text-ink-300">{offer.delivery_text}</td>
                  <td className="hidden px-5 py-4 sm:table-cell">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        offer.stock_status.toLowerCase().includes('limited')
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                      }`}
                    >
                      {offer.stock_status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <OfferBuyLink offer={offer} className="btn-primary !px-4 !py-2 text-xs">
                      Go to Store
                    </OfferBuyLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

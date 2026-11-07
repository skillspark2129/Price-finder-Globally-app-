import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProductGrid from '@/components/ProductGrid';
import { useCountdown } from '@/hooks/useCountdown';
import type { ProductSummary } from '@/lib/types';

const DEADLINE_KEY = 'pf_flash_deadline';
const WINDOW_MS = 24 * 60 * 60 * 1000;
const FLASH_ITEM_COUNT = 8;

function readFlashDeadline(): number {
  const stored = Number(localStorage.getItem(DEADLINE_KEY));
  if (Number.isFinite(stored) && stored > Date.now()) return stored;
  const next = Date.now() + WINDOW_MS;
  localStorage.setItem(DEADLINE_KEY, String(next));
  return next;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

interface FlashSaleProps {
  products: ProductSummary[];
  status: 'loading' | 'ready' | 'error';
  onRetry: () => void;
}

export default function FlashSale({ products, status, onRetry }: FlashSaleProps) {
  const [deadline, setDeadline] = useState<number>(readFlashDeadline);
  const { hours, minutes, seconds, expired } = useCountdown(deadline);

  useEffect(() => {
    if (!expired) return;
    const next = Date.now() + WINDOW_MS;
    localStorage.setItem(DEADLINE_KEY, String(next));
    setDeadline(next);
  }, [expired]);

  const cheapest = products
    .filter((product) => product.lowestOffer !== null)
    .sort((a, b) => (a.lowestOffer?.price ?? 0) - (b.lowestOffer?.price ?? 0))
    .slice(0, FLASH_ITEM_COUNT);

  return (
    <section id="flash-sale" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            <Zap className="h-4 w-4 fill-primary-500" /> Flash sale
          </p>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Lowest prices across Pakistan</h2>
        </div>
        <div className="flex items-center gap-3" role="timer" aria-label="Time left in flash sale">
          <span className="text-sm font-medium text-ink-500 dark:text-ink-400">Ends in</span>
          {[hours, minutes, seconds].map((unit, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="flex h-12 w-14 items-center justify-center rounded-xl bg-ink-900 font-display text-lg font-bold tabular-nums text-white dark:bg-primary-600">
                {pad(unit)}
              </span>
              {index < 2 && <span className="font-bold text-ink-400">:</span>}
            </div>
          ))}
        </div>
      </div>

      <ProductGrid
        products={cheapest}
        status={status}
        onRetry={onRetry}
        emptyMessage="No flash deals are live right now."
      />
    </section>
  );
}

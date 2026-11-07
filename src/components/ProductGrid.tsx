import { AlertTriangle, PackageSearch, RefreshCw } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import type { ProductSummary } from '@/lib/types';

type LoadStatus = 'loading' | 'ready' | 'error';

interface ProductGridProps {
  products: ProductSummary[];
  status: LoadStatus;
  onRetry: () => void;
  emptyMessage: string;
}

export default function ProductGrid({ products, status, onRetry, emptyMessage }: ProductGridProps) {
  if (status === 'loading') {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" aria-busy="true" aria-label="Loading products">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="card overflow-hidden">
            <div className="skeleton aspect-square rounded-none" />
            <div className="space-y-3 p-4">
              <div className="skeleton h-4 w-4/5" />
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-9 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center dark:border-red-900 dark:bg-red-950/40">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <div>
          <p className="font-semibold text-red-800 dark:text-red-200">We could not load products right now.</p>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">Please check your connection and try again.</p>
        </div>
        <button type="button" onClick={onRetry} className="btn-primary">
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink-300 px-6 py-14 text-center dark:border-ink-600">
        <PackageSearch className="h-10 w-10 text-ink-400" />
        <p className="font-semibold">{emptyMessage}</p>
        <p className="max-w-sm text-sm text-ink-500 dark:text-ink-400">
          We are adding new stores and products every week. Try another category or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {products.map((product, index) => (
        <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

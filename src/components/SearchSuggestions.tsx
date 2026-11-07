import { Search, TrendingUp, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { SearchSuggestion } from '@/lib/search';

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  recentSearches: string[];
  popularSearches: string[];
  query: string;
  onSelectProduct: (id: string) => void;
  onSelectRecent: (query: string) => void;
  onClearRecent: () => void;
  visible: boolean;
}

export default function SearchSuggestions({
  suggestions,
  recentSearches,
  popularSearches,
  query,
  onSelectProduct,
  onSelectRecent,
  onClearRecent,
  visible,
}: SearchSuggestionsProps) {
  if (!visible) return null;

  const hasQuery = query.trim().length > 0;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-2xl border border-ink-200 bg-white shadow-2xl dark:border-ink-700 dark:bg-ink-900">
      {hasQuery && suggestions.length > 0 && (
        <div className="p-2">
          <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-ink-400">Products</p>
          {suggestions.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelectProduct(s.id)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-primary-50 dark:hover:bg-primary-900/30"
            >
              {s.image && (
                <img src={s.image} alt="" className="h-10 w-10 shrink-0 rounded-lg bg-white object-contain" />
              )}
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-semibold text-ink-900 dark:text-ink-50">{s.title}</p>
                <p className="text-xs text-ink-500 dark:text-ink-400">{s.brand} · {s.category}</p>
              </div>
              <Search className="h-4 w-4 shrink-0 text-ink-400" />
            </button>
          ))}
        </div>
      )}

      {hasQuery && suggestions.length === 0 && (
        <div className="p-6 text-center">
          <p className="text-sm text-ink-500 dark:text-ink-400">No products found for "{query}"</p>
        </div>
      )}

      {!hasQuery && recentSearches.length > 0 && (
        <div className="p-2">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Recent Searches</p>
            <button
              type="button"
              onClick={onClearRecent}
              className="inline-flex items-center gap-1 text-xs font-semibold text-ink-400 hover:text-red-500"
            >
              <X className="h-3 w-3" /> Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2 px-3 pb-2">
            {recentSearches.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onSelectRecent(q)}
                className="rounded-full bg-ink-100 px-3 py-1.5 text-xs font-medium text-ink-700 transition hover:bg-primary-100 hover:text-primary-700 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-primary-900/40"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {!hasQuery && (
        <div className="p-2">
          <p className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-ink-400">
            <TrendingUp className="h-3.5 w-3.5" /> Popular Searches
          </p>
          <div className="flex flex-wrap gap-2 px-3 pb-3">
            {popularSearches.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onSelectRecent(q)}
                className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 transition hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-300"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

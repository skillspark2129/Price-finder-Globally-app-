import { Search, Store, TrendingDown, ShieldCheck } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { icon: Store, label: '11 global stores compared' },
  { icon: TrendingDown, label: 'Price history charts' },
  { icon: ShieldCheck, label: 'Free to use' },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : '/');
  };

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-ink-900 via-primary-800 to-primary-600 text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-primary-400/30 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-80 w-80 rounded-full bg-primary-300/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur">
            Compare prices across 11 global stores
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl">
            Price Finder Globally
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Save up to <span className="font-bold text-white">70%</span> by comparing prices across Daraz, Amazon,
            AliExpress, Temu, Shein, eBay and 5 more stores before you buy.
          </p>

          <form
            onSubmit={handleSubmit}
            role="search"
            className="mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl bg-white p-2 shadow-2xl shadow-black/20 sm:flex-row sm:items-center sm:rounded-full"
          >
            <label className="flex flex-1 items-center gap-3 px-4">
              <Search className="h-5 w-5 shrink-0 text-ink-400" aria-hidden="true" />
              <span className="sr-only">Search for a product</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for iPhone, laptop, earbuds..."
                className="w-full bg-transparent py-3 text-base text-ink-900 placeholder:text-ink-400 focus:outline-none"
              />
            </label>
            <button type="submit" className="btn-primary sm:!rounded-full">
              Compare Prices
            </button>
          </form>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {STATS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-white/90">
                <Icon className="h-4 w-4 text-primary-200" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

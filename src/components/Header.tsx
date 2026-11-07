import { Download, Heart, Mic, Moon, Search, Smartphone, Sun, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LOGO_URL } from '@/lib/constants';
import { useTheme } from '@/context/ThemeContext';
import { useWishlist } from '@/context/WishlistContext';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { fetchProductCatalog } from '@/lib/catalog';
import type { ProductSummary } from '@/lib/types';
import {
  getLiveSuggestions,
  getRecentSearches,
  getPopularSearches,
  addRecentSearch,
  clearRecentSearches,
  isVoiceSearchSupported,
  startVoiceSearch,
} from '@/lib/search';
import SearchSuggestions from '@/components/SearchSuggestions';

export default function Header() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const urlQuery = params.get('q') ?? '';
  const [query, setQuery] = useState(urlQuery);
  const { theme, toggleTheme } = useTheme();
  const { wishlistCount, openWishlist } = useWishlist();
  const { canInstall, install } = usePWAInstall();

  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => getRecentSearches());
  const [voiceActive, setVoiceActive] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const stopVoiceRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    let active = true;
    fetchProductCatalog()
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch(() => { /* silent */ });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const suggestions = useMemo(() => getLiveSuggestions(products, query), [products, query]);
  const popularSearches = useMemo(() => getPopularSearches(), []);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) addRecentSearch(trimmed);
    setRecentSearches(getRecentSearches());
    setShowSuggestions(false);
    navigate(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : '/');
  };

  const handleSelectProduct = (id: string) => {
    addRecentSearch(query.trim());
    setRecentSearches(getRecentSearches());
    setShowSuggestions(false);
    navigate(`/product/${id}`);
  };

  const handleSelectRecent = (q: string) => {
    setQuery(q);
    addRecentSearch(q);
    setRecentSearches(getRecentSearches());
    setShowSuggestions(false);
    navigate(`/?q=${encodeURIComponent(q)}`);
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const handleVoiceSearch = () => {
    if (!isVoiceSearchSupported()) return;
    setVoiceActive(true);
    stopVoiceRef.current = startVoiceSearch(
      (transcript) => {
        setVoiceActive(false);
        setQuery(transcript);
        addRecentSearch(transcript);
        setRecentSearches(getRecentSearches());
        navigate(`/?q=${encodeURIComponent(transcript)}`);
      },
      () => {
        setVoiceActive(false);
      },
    );
  };

  const stopVoice = () => {
    stopVoiceRef.current?.();
    setVoiceActive(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/90 backdrop-blur-md dark:border-ink-700 dark:bg-ink-900/90">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Price Finder Globally home">
          <img
            src={LOGO_URL}
            alt="Price Finder Globally PFG Logo - Compare Prices Worldwide"
            width={45}
            height={45}
            className="h-[45px] w-[45px] shrink-0 transition-transform duration-300 group-hover:-rotate-6"
          />
          <span className="hidden font-display text-lg font-bold leading-none sm:block">
            Price Finder <span className="text-primary-500">Globally</span>
          </span>
        </Link>

        <div ref={searchContainerRef} className="relative order-3 w-full md:order-none md:mx-auto md:w-auto md:max-w-xl md:flex-1">
          <form
            onSubmit={handleSearch}
            role="search"
            className="flex w-full items-center rounded-full border border-ink-200 bg-ink-50 pl-5 pr-1.5 transition focus-within:border-primary-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-100 dark:border-ink-700 dark:bg-ink-800 dark:focus-within:bg-ink-800 dark:focus-within:ring-primary-900/40"
          >
            <Search className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search phones, laptops, watches and more"
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none dark:text-ink-50"
            />
            {isVoiceSearchSupported() && (
              <button
                type="button"
                onClick={voiceActive ? stopVoice : handleVoiceSearch}
                aria-label={voiceActive ? 'Stop voice search' : 'Search by voice'}
                className="mr-1 flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-ink-700"
              >
                {voiceActive ? <X className="h-4 w-4 animate-pulse text-red-500" /> : <Mic className="h-4 w-4" />}
              </button>
            )}
            <button type="submit" className="btn-primary !rounded-full !px-4 !py-2 text-xs">
              Search
            </button>
          </form>

          <SearchSuggestions
            suggestions={suggestions}
            recentSearches={recentSearches}
            popularSearches={popularSearches}
            query={query}
            onSelectProduct={handleSelectProduct}
            onSelectRecent={handleSelectRecent}
            onClearRecent={handleClearRecent}
            visible={showSuggestions}
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {canInstall && (
            <button
              type="button"
              onClick={install}
              className="btn-primary !px-3 !py-2 text-xs sm:!px-4"
              aria-label="Install Price Finder Globally app"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          )}

          <a
            href="/downloads/price-finder-globally.apk"
            download
            className="flex h-10 items-center gap-1.5 rounded-full bg-ink-900 px-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-ink-800 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100"
            aria-label="Download APK"
          >
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">APK</span>
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={openWishlist}
            aria-label={`Open wishlist, ${wishlistCount} saved`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition hover:bg-primary-50 hover:text-primary-600 dark:text-ink-300 dark:hover:bg-ink-800"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-500 px-1 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

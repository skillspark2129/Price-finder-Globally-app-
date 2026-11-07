import { LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORY_ICONS as ICONS } from '@/lib/categoryIcons';
import { CATEGORIES } from '@/lib/constants';

interface CategoryBarProps {
  activeCategory: string;
}

export default function CategoryBar({ activeCategory }: CategoryBarProps) {
  const pillBase =
    'group flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md';

  return (
    <section id="categories" aria-label="Shop by category" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 pt-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
          <Link
            to="/"
            className={`${pillBase} ${
              activeCategory === 'All'
                ? 'border-primary-500 bg-primary-500 text-white'
                : 'border-ink-200 bg-white text-ink-700 hover:border-primary-300 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            All
          </Link>
          {CATEGORIES.map((category) => {
            const Icon = ICONS[category.icon];
            const isActive = activeCategory === category.name;
            return (
              <Link
                key={category.name}
                to={`/?category=${encodeURIComponent(category.name)}#categories`}
                aria-current={isActive ? 'page' : undefined}
                className={`${pillBase} ${
                  isActive
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : 'border-ink-200 bg-white text-ink-700 hover:border-primary-300 hover:text-primary-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200 dark:hover:text-primary-300'
                }`}
              >
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

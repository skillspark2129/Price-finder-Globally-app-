import { Headset, Heart, Home, LayoutGrid, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';

const itemBase =
  'flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-semibold text-ink-500 transition-colors dark:text-ink-400';

const itemClass = (isActive: boolean) =>
  `${itemBase} ${isActive ? '!text-primary-500' : ''}`;

export default function BottomNav() {
  const { wishlistCount } = useWishlist();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden dark:border-ink-700 dark:bg-ink-900/95"
    >
      <div className="flex">
        <NavLink to="/" end className={({ isActive }) => itemClass(isActive)}>
          <Home className="h-5 w-5" />
          Home
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => itemClass(isActive)}>
          <LayoutGrid className="h-5 w-5" />
          Categories
        </NavLink>
        <NavLink to="/deals" className={({ isActive }) => itemClass(isActive)}>
          <Zap className="h-5 w-5" />
          Deals
        </NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => `${itemClass(isActive)} relative`}>
          <Heart className="h-5 w-5" />
          Wishlist
          {wishlistCount > 0 && (
            <span className="absolute right-[26%] top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-500 px-1 text-[9px] font-bold text-white">
              {wishlistCount}
            </span>
          )}
        </NavLink>
        <NavLink to="/complain" className={({ isActive }) => itemClass(isActive)}>
          <Headset className="h-5 w-5" />
          Help
        </NavLink>
      </div>
    </nav>
  );
}

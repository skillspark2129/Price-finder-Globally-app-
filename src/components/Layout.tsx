import { Outlet } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import WishlistDrawer from '@/components/WishlistDrawer';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-ink-900 dark:bg-ink-900 dark:text-ink-50">
      <Header />
      <main className="flex-1 pb-24 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <WishlistDrawer />
    </div>
  );
}

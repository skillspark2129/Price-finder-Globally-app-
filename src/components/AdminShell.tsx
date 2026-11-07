import { BarChart3, Bot, Inbox, LayoutDashboard, LogOut, MessageSquare, Package, Settings, Store, type LucideIcon } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { usePendingComplaintCount } from '@/hooks/useComplaints';
import { LOGO_URL, APP_NAME } from '@/lib/constants';
import { endAdminSession } from '@/lib/adminAuth';
import ApkDownloadButton from '@/components/ApkDownloadButton';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  showPendingCount?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/messages', label: 'Messages', icon: Inbox, showPendingCount: true },
  { to: '/admin/complaints', label: 'Complains', icon: MessageSquare, showPendingCount: true },
  { to: '/admin/ai-logs', label: 'AI Logs', icon: Bot },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const pendingComplaints = usePendingComplaintCount();

  useEffect(() => {
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !robots;
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    const previous = robots.content;
    robots.content = 'noindex, nofollow';
    return () => {
      if (created) robots?.remove();
      else if (robots) robots.content = previous;
    };
  }, []);

  const handleSignOut = () => {
    endAdminSession();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-50">
      <header className="sticky top-0 z-40 border-b border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="" className="h-9 w-9 rounded-lg object-cover" />
            <div className="leading-tight">
              <p className="font-display text-sm font-bold">PFG Admin - {APP_NAME}</p>
              <p className="text-xs text-ink-500 dark:text-ink-400">Admin console</p>
            </div>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700"
          >
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">Go to App</span>
          </a>

          <div className="hidden sm:block">
            <ApkDownloadButton label="Download APK" style={{ borderRadius: '9999px', padding: '0.5rem 1rem', fontSize: '0.875rem' }} />
          </div>

          <nav aria-label="Admin navigation" className="flex items-center gap-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon, showPendingCount }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                      : 'text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-700'
                  }`
                }
              >
                <span className="relative flex">
                  <Icon className="h-4 w-4" />
                  {showPendingCount && pendingComplaints > 0 && (
                    <span
                      aria-label={`${pendingComplaints} pending`}
                      className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-500 px-1 text-[10px] font-bold leading-none text-white"
                    >
                      {pendingComplaints > 99 ? '99+' : pendingComplaints}
                    </span>
                  )}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
            <button
              type="button"
              onClick={handleSignOut}
              className="ml-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10">{children}</main>
    </div>
  );
}

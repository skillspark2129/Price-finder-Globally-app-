import { CheckCircle2, Flame, MessageCircle, Send } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { useTrendingAlerts, type TrendingAlert } from '@/hooks/useTrendingAlerts';
import { getAdminWhatsAppNumber } from '@/lib/adminSettings';
import { parseProductLink } from '@/lib/productLink';
import { buildWhatsAppChatUrl } from '@/lib/whatsapp';

export default function AdminTrendingAlerts() {
  const { alerts, status, reload, publishLink } = useTrendingAlerts();
  const [adminNumber, setAdminNumber] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [linkValue, setLinkValue] = useState('');
  const [linkError, setLinkError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getAdminWhatsAppNumber()
      .then((number) => {
        if (active) setAdminNumber(number);
      })
      .catch((error) => console.error('Admin WhatsApp number failed to load', error));
    return () => {
      active = false;
    };
  }, []);

  const pending = alerts.filter((alert) => alert.status === 'pending');
  const notifyText =
    pending.length > 0
      ? `Aaj ye products trending par hain:\n${pending
          .map((alert, index) => `${index + 1}. ${alert.name} (${alert.trend_score}%)`)
          .join('\n')}\nAffiliate links add karein.`
      : 'Aaj ke sab trending products ke affiliate links add ho chuke hain.';

  const openLinkForm = (alert: TrendingAlert) => {
    setOpenId(openId === alert.id ? null : alert.id);
    setLinkValue('');
    setLinkError(null);
  };

  const handlePublish = async (event: FormEvent<HTMLFormElement>, alert: TrendingAlert) => {
    event.preventDefault();
    const raw = linkValue.trim();
    if (!parseProductLink(raw)) {
      setLinkError('Paste a Daraz or PriceOye product link.');
      return;
    }
    setLinkError(null);
    setBusyId(alert.id);
    try {
      await publishLink(alert.id, raw);
      setOpenId(null);
      setLinkValue('');
    } catch (error) {
      console.error('Trending link failed to publish', error);
      setLinkError('The link could not be published. Please try again.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/30">
      <div className="flex flex-col gap-4 border-b border-primary-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-primary-800">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-ink-900 dark:text-ink-50">
            <Flame className="h-5 w-5 text-primary-600 dark:text-primary-300" aria-hidden="true" />
            Aaj Ye Products Trending Par Hain
          </h2>
          <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
            Add an affiliate link to each product and publish it to mark it done.
          </p>
        </div>

        {adminNumber ? (
          <a
            href={buildWhatsAppChatUrl(adminNumber, notifyText)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:bg-primary-600"
          >
            <Send className="h-4 w-4" aria-hidden="true" /> Send WhatsApp Notification to Admin
          </a>
        ) : (
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-ink-300 px-5 py-2.5 text-sm font-semibold text-ink-700 dark:bg-ink-700 dark:text-ink-300"
            >
              <Send className="h-4 w-4" aria-hidden="true" /> Send WhatsApp Notification to Admin
            </button>
            <p className="text-xs text-ink-600 dark:text-ink-300">Save the admin WhatsApp number above first.</p>
          </div>
        )}
      </div>

      {status === 'loading' && <p className="px-5 py-8 text-center text-sm text-ink-600 dark:text-ink-300">Loading trending products...</p>}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-3 px-5 py-8 text-center text-sm">
          <p className="text-red-700 dark:text-red-300">Trending products could not be loaded.</p>
          <button type="button" onClick={() => void reload()} className="font-semibold text-primary-700 underline dark:text-primary-300">
            Try again
          </button>
        </div>
      )}

      {status === 'ready' && alerts.length === 0 && (
        <p className="px-5 py-8 text-center text-sm text-ink-600 dark:text-ink-300">No trending products today.</p>
      )}

      {status === 'ready' && alerts.length > 0 && (
        <ul className="divide-y divide-primary-200 dark:divide-primary-800">
          {alerts.map((alert) => {
            const published = alert.status === 'published';
            const formOpen = openId === alert.id && !published;
            return (
              <li key={alert.id} className="bg-white/60 px-5 py-4 sm:px-6 dark:bg-ink-900/40">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-900 dark:text-ink-50">{alert.name}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary-700 dark:text-primary-300">
                      <Flame className="h-3.5 w-3.5" aria-hidden="true" /> {alert.trend_score}% trend score
                    </p>
                  </div>

                  {published ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Done
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {adminNumber && (
                        <a
                          href={buildWhatsAppChatUrl(
                            adminNumber,
                            `Trending product needs an affiliate link: ${alert.name} (${alert.trend_score}%)`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-950/40"
                        >
                          <MessageCircle className="h-4 w-4" aria-hidden="true" /> Notify on WhatsApp
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => openLinkForm(alert)}
                        aria-expanded={formOpen}
                        className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
                      >
                        Affiliate Link Add Karo
                      </button>
                    </div>
                  )}
                </div>

                {formOpen && (
                  <form onSubmit={(event) => void handlePublish(event, alert)} noValidate className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <label className="sr-only" htmlFor={`trending-link-${alert.id}`}>
                      Affiliate link for {alert.name}
                    </label>
                    <input
                      id={`trending-link-${alert.id}`}
                      type="url"
                      value={linkValue}
                      onChange={(event) => setLinkValue(event.target.value)}
                      placeholder="Paste Daraz or PriceOye link"
                      className="min-w-0 flex-1 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50"
                    />
                    <button
                      type="submit"
                      disabled={busyId === alert.id}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-700 disabled:opacity-60 dark:bg-primary-500 dark:hover:bg-primary-600"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      {busyId === alert.id ? 'Publishing...' : 'Publish'}
                    </button>
                    {linkError && (
                      <p role="alert" className="text-sm font-medium text-red-700 sm:basis-full dark:text-red-300">
                        {linkError}
                      </p>
                    )}
                  </form>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

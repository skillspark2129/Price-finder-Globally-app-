import { MessageCircle } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { getAdminWhatsAppNumber, saveAdminWhatsAppNumber } from '@/lib/adminSettings';
import { normalizeWhatsAppNumber } from '@/lib/whatsapp';

type Feedback = { tone: 'success' | 'error'; message: string } | null;

export default function AdminWhatsAppSettings() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    let active = true;
    getAdminWhatsAppNumber()
      .then((saved) => {
        if (active) setValue(saved ?? '');
      })
      .catch((error) => {
        console.error('Admin WhatsApp number failed to load', error);
        if (active) setFeedback({ tone: 'error', message: 'Your saved WhatsApp number could not be loaded.' });
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = normalizeWhatsAppNumber(value);
    if (!normalized) {
      setFeedback({ tone: 'error', message: 'Enter a valid WhatsApp number, for example 0320 1234567.' });
      return;
    }
    setBusy(true);
    setFeedback(null);
    try {
      await saveAdminWhatsAppNumber(normalized);
      setValue(normalized);
      setFeedback({ tone: 'success', message: 'Admin WhatsApp number saved.' });
    } catch (error) {
      console.error('Admin WhatsApp number failed to save', error);
      setFeedback({ tone: 'error', message: 'The number could not be saved. Please try again.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="card p-6">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <MessageCircle className="h-5 w-5 text-primary-500" /> WhatsApp Settings
      </h2>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
        Trending alerts and complain replies open WhatsApp chats with this number.
      </p>

      <form onSubmit={handleSave} noValidate className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="admin-whatsapp">
          Admin WhatsApp Number
        </label>
        <input
          id="admin-whatsapp"
          type="tel"
          inputMode="tel"
          value={value}
          disabled={loading}
          onChange={(event) => setValue(event.target.value)}
          placeholder={loading ? 'Loading...' : 'Admin WhatsApp Number, e.g. 0320 1234567'}
          className="min-w-0 flex-1 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50"
        />
        <button type="submit" disabled={busy || loading} className="btn-primary">
          {busy ? 'Saving...' : 'Save'}
        </button>
      </form>

      {feedback && (
        <p
          role="alert"
          className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
            feedback.tone === 'success'
              ? 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300'
              : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
          }`}
        >
          {feedback.message}
        </p>
      )}
    </section>
  );
}

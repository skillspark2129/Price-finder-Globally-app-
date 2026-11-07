import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { subscribeToNewsletter } from '@/lib/catalog';

type Status = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_PATTERN.test(trimmed)) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    try {
      const result = await subscribeToNewsletter(trimmed);
      setStatus(result === 'duplicate' ? 'duplicate' : 'success');
      if (result === 'subscribed') setEmail('');
    } catch (error) {
      console.error('Newsletter signup failed', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== 'idle' && status !== 'submitting') setStatus('idle');
          }}
          placeholder="Enter your email address"
          aria-label="Email address"
          className="w-full rounded-xl border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-ink-50 placeholder:text-ink-400 transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-900/40"
        />
        <button type="submit" disabled={status === 'submitting'} className="btn-primary shrink-0">
          {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}
          Subscribe
        </button>
      </div>
      <p aria-live="polite" className="mt-2 min-h-5 text-sm">
        {status === 'success' && (
          <span className="inline-flex items-center gap-1.5 text-green-400">
            <CheckCircle2 className="h-4 w-4" /> Thanks, you are subscribed to our deals.
          </span>
        )}
        {status === 'duplicate' && <span className="text-ink-300">This email is already subscribed.</span>}
        {status === 'error' && <span className="text-red-400">We could not subscribe you. Check the email and try again.</span>}
      </p>
    </form>
  );
}

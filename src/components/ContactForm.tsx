import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { submitComplaint } from '@/lib/contact';
import { normalizeWhatsAppNumber } from '@/lib/whatsapp';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const MAX_NAME = 100;
const MAX_MESSAGE = 2000;
const MAX_LINK = 500;

function isWebUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

const inputClass =
  'mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50 dark:focus:ring-primary-900/40';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [message, setMessage] = useState('');
  const [productLink, setProductLink] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setWhatsapp('');
    setMessage('');
    setProductLink('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const trimmedLink = productLink.trim();
    const normalizedNumber = normalizeWhatsAppNumber(whatsapp);

    if (!trimmedName || !trimmedMessage || !whatsapp.trim()) {
      setFormError('Please fill in your full name, WhatsApp number and message.');
      return;
    }
    if (!normalizedNumber) {
      setFormError('Enter a valid WhatsApp number, for example 0320 1234567.');
      return;
    }
    if (trimmedName.length > MAX_NAME || trimmedMessage.length > MAX_MESSAGE || trimmedLink.length > MAX_LINK) {
      setFormError('One of your fields is too long. Please shorten it and try again.');
      return;
    }
    if (trimmedLink && !isWebUrl(trimmedLink)) {
      setFormError('The product link must start with http:// or https://.');
      return;
    }

    setFormError(null);
    setSubmitState('submitting');
    try {
      await submitComplaint({
        name: trimmedName,
        whatsapp: normalizedNumber,
        message: trimmedMessage,
        productLink: trimmedLink || null,
      });
      resetForm();
      setSubmitState('success');
    } catch (error) {
      console.error('Complaint failed to submit', error);
      setSubmitState('error');
    }
  };

  if (submitState === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-950/40">
        <CheckCircle2 className="h-12 w-12 text-emerald-600" aria-hidden="true" />
        <h2 className="text-xl font-bold text-ink-900 dark:text-ink-50">Your complain received, we will contact you soon!</h2>
        <p className="max-w-md text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          Thank you for reaching out to Price Finder Globally.
        </p>
        <button
          type="button"
          onClick={() => setSubmitState('idle')}
          className="mt-2 rounded-full bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = submitState === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-semibold text-ink-800 dark:text-ink-100">
        Full Name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={MAX_NAME}
          autoComplete="name"
          placeholder="Your full name"
          className={inputClass}
        />
      </label>

      <label className="block text-sm font-semibold text-ink-800 dark:text-ink-100">
        WhatsApp Number
        <input
          type="tel"
          inputMode="tel"
          value={whatsapp}
          onChange={(event) => setWhatsapp(event.target.value)}
          autoComplete="tel"
          placeholder="0320 1234567"
          className={inputClass}
        />
      </label>

      <label className="block text-sm font-semibold text-ink-800 sm:col-span-2 dark:text-ink-100">
        Message / Complain
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          maxLength={MAX_MESSAGE}
          rows={5}
          placeholder="Tell us your question or complain"
          className={`${inputClass} resize-y`}
        />
        <span className="mt-1 block text-right text-xs font-normal text-ink-500 dark:text-ink-400">
          {message.length}/{MAX_MESSAGE}
        </span>
      </label>

      <label className="block text-sm font-semibold text-ink-800 sm:col-span-2 dark:text-ink-100">
        Product Link <span className="font-normal text-ink-500 dark:text-ink-400">(optional)</span>
        <input
          type="url"
          value={productLink}
          onChange={(event) => setProductLink(event.target.value)}
          maxLength={MAX_LINK}
          placeholder="https://www.daraz.pk/products/..."
          className={inputClass}
        />
      </label>

      {formError && (
        <p role="alert" className="text-sm font-medium text-red-600 sm:col-span-2 dark:text-red-400">
          {formError}
        </p>
      )}
      {submitState === 'error' && (
        <p role="alert" className="text-sm font-medium text-red-600 sm:col-span-2 dark:text-red-400">
          Your message could not be sent. Please check your connection and try again.
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:bg-primary-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}

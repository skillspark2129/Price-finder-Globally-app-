import { Download, Smartphone, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import PwaInstallButton from '@/components/PwaInstallButton';

export default function GetAppSection() {
  const [iosPrompt, setIosPrompt] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setInstalled(isStandalone);
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIosPrompt(isIOS && !isStandalone);
  }, []);

  if (installed) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6" aria-labelledby="get-app">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-orange-600 p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-8 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white/80">
              Take Price Finder Globally anywhere
            </p>
            <h2 id="get-app" className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Get the App
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-white/90">
              Install Price Finder Globally on your phone or tablet for instant price comparisons.
              Works offline, loads fast, and never clutters your home screen.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <PwaInstallButton
                label="Install PWA App"
                className="!rounded-2xl bg-white !text-primary-700 px-6 py-3.5 text-sm font-bold shadow-lg"
              />

              <a
                href="/downloads/price-finder-globally.apk"
                download
                className="inline-flex items-center gap-2.5 rounded-2xl bg-ink-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Smartphone className="h-5 w-5" />
                Download APK
              </a>

              {iosPrompt && (
                <div className="flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-3 text-sm font-medium text-white backdrop-blur">
                  <span className="text-lg">Tap</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
                    </svg>
                  </span>
                  <span>then "Add to Home Screen"</span>
                </div>
              )}
            </div>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 backdrop-blur">
                  <Download className="h-9 w-9 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">PWA</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 backdrop-blur">
                  <Smartphone className="h-9 w-9 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">APK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

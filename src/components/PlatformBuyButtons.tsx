import { ExternalLink } from 'lucide-react';
import type { AffiliatePlatform, ProductAffiliateLink } from '@/lib/affiliateLinks';

const PLATFORM_STYLES: Record<AffiliatePlatform, string> = {
  daraz: 'bg-orange-500 text-white',
  priceoye: 'bg-blue-500 text-white',
  amazon_us: 'bg-black text-white',
  amazon_uk: 'bg-black text-white',
  amazon_ae: 'bg-black text-white',
  aliexpress: 'bg-red-600 text-white',
  alibaba: 'bg-orange-600 text-white',
  noon: 'bg-yellow-400 text-black',
  shein: 'bg-black text-white',
  ebay: 'bg-blue-600 text-white',
  temu: 'bg-orange-500 text-white',
};

interface PlatformBuyButtonsProps {
  links: ProductAffiliateLink[];
  onBuyClick: () => void;
}

export default function PlatformBuyButtons({ links, onBuyClick }: PlatformBuyButtonsProps) {
  return (
    <div className="space-y-6">
      {links.length > 0 ? (
        <div className="flex flex-col gap-3">
          {links.map((link) => {
            const colorClass = PLATFORM_STYLES[link.platform];
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                onClick={onBuyClick}
                className={`group flex w-full items-center justify-between gap-3 rounded-xl px-5 py-4 text-sm font-bold shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110 ${colorClass}`}
              >
                <span>Buy on {link.label}</span>
                <ExternalLink className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            );
          })}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-ink-300 px-5 py-4 text-sm text-ink-500 dark:border-ink-600 dark:text-ink-400">
          Buying links for this product are not available yet.
        </p>
      )}

      <div className="rounded-2xl border border-ink-200 bg-ink-50 p-5 text-sm leading-relaxed text-ink-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200">
        <p>
          <span className="font-bold text-ink-900 dark:text-white">Affiliate Disclosure:</span> When you buy via our link, we
          earn small commission at no extra cost to you. You will be redirected to official store. We may earn commission.
        </p>
        <p className="mt-2">
          Questions?{' '}
          <a href="/contact" className="font-semibold text-primary-600 underline-offset-4 hover:underline dark:text-primary-400">
            Visit our contact page
          </a>
        </p>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { LOGO_URL, APP_NAME, CATEGORIES } from '@/lib/constants';
import NewsletterForm from '@/components/NewsletterForm';

const FOOTER_LINKS = [
  { to: '/terms', label: 'Terms' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact / Complain' },
];

const GUIDE_LINKS = [
  { to: '/compare', label: 'Compare products' },
  { to: '/deals', label: 'Today\'s deals' },
  { to: '/blog', label: 'Shopping guides' },
  { to: '/faq', label: 'FAQ' },
  { to: '/affiliate-disclosure', label: 'Affiliate disclosure' },
  { to: '/shipping-policy', label: 'Shipping policy' },
  { to: '/return-policy', label: 'Return policy' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <span className="font-display text-xl font-bold text-white">
                Price Finder <span className="text-primary-500">Globally</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed">
              Compare the lowest prices for the products you want across Daraz, Amazon, AliExpress, Alibaba, Noon,
              Shein, eBay, Temu and PriceOye, all in one place.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Get the best deals first</h3>
            <p className="mt-2 text-sm leading-relaxed">Subscribe to receive weekly price drops and flash sale alerts.</p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-ink-700 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-sm font-bold text-white">Shop by category</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {CATEGORIES.map((category) => (
                <li key={category.name}>
                  <Link to={`/?category=${encodeURIComponent(category.name)}`} className="transition hover:text-primary-400">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Guides and policies</h4>
            <ul className="mt-4 grid grid-cols-1 gap-y-2 text-sm">
              {GUIDE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition hover:text-primary-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">How it works</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Search for any product</li>
              <li>Compare prices across stores</li>
              <li>Open the store with the best deal</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{APP_NAME}</h4>
            <p className="mt-4 text-sm leading-relaxed">
              Prices shown are as last recorded and can change. Confirm the final price on the store's website before
              you buy.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink-700 pt-6 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {APP_NAME}
          </p>
          <nav aria-label="Legal and company" className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {FOOTER_LINKS.map((link, index) => (
              <span key={link.to} className="flex items-center gap-3">
                {index > 0 && <span aria-hidden="true" className="text-ink-600">|</span>}
                <Link to={link.to} className="font-medium transition hover:text-primary-400">
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

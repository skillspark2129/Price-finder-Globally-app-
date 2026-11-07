import { STORE_HEADING, STORES } from '@/lib/stores';

export default function StoreBar() {
  return (
    <section id="stores" className="scroll-mt-24 bg-ink-50 py-14 dark:bg-ink-800/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Stores we compare
          </p>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{STORE_HEADING}</h2>
        </div>

        <ul className="mx-auto grid max-w-3xl grid-cols-2 gap-3">
          {STORES.map((store) => (
            <li
              key={store.id}
              className="flex items-center gap-3 rounded-2xl border border-ink-200 bg-white px-3 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md dark:border-ink-700 dark:bg-ink-900"
            >
              <span
                aria-hidden="true"
                className={`inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg px-1 text-xs font-bold tracking-tight text-white shadow-sm ${store.color}`}
              >
                {store.short}
              </span>
              <span className="truncate text-sm font-semibold">
                {store.name}
                {store.flag && <span className="ml-1">{store.flag}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import type { ReactNode } from 'react';

interface ProsePageProps {
  eyebrow: string;
  title: string;
  updated?: string;
  children: ReactNode;
}

export default function ProsePage({ eyebrow, title, updated, children }: ProsePageProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
      <header className="mb-10 border-b border-ink-200 pb-8 dark:border-ink-700">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
        {updated && <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">Last updated: {updated}</p>}
      </header>
      <div className="space-y-5 text-[15px] leading-relaxed text-ink-700 dark:text-ink-300 [&_a]:font-semibold [&_a]:text-primary-600 [&_a]:underline-offset-4 hover:[&_a]:underline dark:[&_a]:text-primary-400 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink-900 dark:[&_h2]:text-white [&_li]:ml-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </article>
  );
}

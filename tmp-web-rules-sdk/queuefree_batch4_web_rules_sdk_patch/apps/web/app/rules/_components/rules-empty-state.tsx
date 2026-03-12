import Link from 'next/link';

interface RulesEmptyStateProps {
  title: string;
  description: string;
}

export function RulesEmptyState({ title, description }: RulesEmptyStateProps) {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Rules Center</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Return home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            Contact support
          </Link>
        </div>
      </div>
    </main>
  );
}

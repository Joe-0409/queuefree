'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface RulesErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RulesError({ error, reset }: RulesErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="rounded-3xl border border-red-200 bg-white p-10 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-500">Rules Center</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Unable to load the latest rules</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          The web page is already connected to the generated SDK, but the API did not return a successful response.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Try again
          </button>
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

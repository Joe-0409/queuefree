import Link from 'next/link';

import type { RuleListItem } from '../_lib/rules-api';
import { formatRuleUpdatedAt } from '../_lib/rules-format';
import { getRuleHref } from '../_lib/rules-links';

interface RulesListViewProps {
  rules: RuleListItem[];
}

export function RulesListView({ rules }: RulesListViewProps) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Rules Center</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">QueueFree rules and policy updates</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          These documents are loaded from the QueueFree API through the generated SDK. The page no longer depends on
          hard-coded copy.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rules.map((rule) => (
          <Link
            key={rule.slug}
            href={getRuleHref(rule.slug)}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">Version {rule.ruleVersion}</span>
              <span>Updated {formatRuleUpdatedAt(rule.updatedAt)}</span>
            </div>
            <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-950 group-hover:text-slate-700">
              {rule.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{rule.summary}</p>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-slate-900 group-hover:text-slate-700">
              Read this rule →
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}

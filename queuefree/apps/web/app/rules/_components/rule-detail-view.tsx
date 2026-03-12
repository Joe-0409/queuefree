import Link from 'next/link';

import type { RuleDetailResponse } from '../_lib/rules-api';
import { formatRuleUpdatedAt } from '../_lib/rules-format';
import { RulesEmptyState } from './rules-empty-state';

interface RuleDetailViewProps {
  rule: RuleDetailResponse;
}

export function RuleDetailView({ rule }: RuleDetailViewProps) {
  if (rule.sections.length === 0) {
    return (
      <RulesEmptyState
        title="Rule content is not available yet"
        description="This rule exists in the contract, but no sections have been published by the API yet."
      />
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12">
      <div>
        <Link href="/rules" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
          ← Back to rules center
        </Link>
        <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Rule Detail</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{rule.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">Version {rule.ruleVersion}</span>
          <span>Updated {formatRuleUpdatedAt(rule.updatedAt)}</span>
        </div>
      </div>

      <section className="flex flex-col gap-4">
        {rule.sections.map((section: string, index: number) => (
          <article key={`${rule.slug}-section-${index}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Section {index + 1}</div>
            <div className="whitespace-pre-line text-base leading-7 text-slate-700">{section}</div>
          </article>
        ))}
      </section>
    </main>
  );
}

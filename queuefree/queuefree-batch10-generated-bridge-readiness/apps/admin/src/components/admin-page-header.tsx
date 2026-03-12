import * as React from 'react';

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string[];
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  meta = []
}: AdminPageHeaderProps): React.ReactElement {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">{eyebrow}</div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h1>
        <p className="max-w-3xl text-sm text-slate-600">{description}</p>
      </div>
      {meta.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {meta.map((item) => (
            <span key={item} className="rounded-full border border-border bg-panel px-3 py-2 text-xs font-semibold text-slate-600">
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

import * as React from 'react';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: React.ReactNode;
};

export function PageHero({ eyebrow, title, description, aside }: PageHeroProps): React.ReactElement {
  return (
    <section className="grid gap-6 rounded-[2rem] border border-border bg-white p-8 shadow-panel lg:grid-cols-[minmax(0,1fr)_320px] lg:p-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">{description}</p>
      </div>
      {aside ? <div className="rounded-3xl bg-slate-950 p-6 text-slate-50">{aside}</div> : null}
    </section>
  );
}

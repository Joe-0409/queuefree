'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type QueryStatePanelProps = {
  title: string;
  description: string;
  mode: 'loading' | 'error';
  onRetry?: () => void;
};

export function QueryStatePanel({ title, description, mode, onRetry }: QueryStatePanelProps): React.ReactElement {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {mode === 'loading' ? 'Loading skeleton data' : 'Unable to load skeleton data'}
          </p>
          <h2 className="text-xl font-bold tracking-tight text-slate-950">{title}</h2>
          <p className="text-sm leading-6 text-slate-600">{description}</p>
        </div>
        {mode === 'loading' ? (
          <p className="rounded-2xl border border-border bg-panel-muted px-4 py-3 text-sm text-slate-600">
            Fetching demo-mode screen data through the admin repository layer.
          </p>
        ) : null}
        {mode === 'error' && onRetry ? <Button onClick={onRetry}>Retry demo query</Button> : null}
      </CardContent>
    </Card>
  );
}

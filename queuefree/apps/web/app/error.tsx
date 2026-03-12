'use client';

import { PageShell } from '@/components/page-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Error({ reset }: { error: Error; reset: () => void }): React.ReactElement {
  return (
    <PageShell>
      <Card className="border-danger/20 bg-danger-soft">
        <div className="space-y-4">
          <div className="text-lg font-semibold text-slate-950">Public page error</div>
          <p className="text-sm text-slate-700">
            This public page failed to render. Retry the route. If the failure persists after real API integration, check the generated client and the deployed content source.
          </p>
          <Button onClick={reset}>Retry</Button>
        </div>
      </Card>
    </PageShell>
  );
}

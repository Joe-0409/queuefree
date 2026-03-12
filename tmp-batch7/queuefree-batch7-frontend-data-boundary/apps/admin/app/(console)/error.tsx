'use client';

import { AdminShell } from '@/components/admin-shell';
import { PageShell } from '@/components/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ConsoleError({ reset }: { error: Error; reset: () => void }): React.ReactElement {
  return (
    <AdminShell>
      <PageShell>
        <Card className="border-danger/20 bg-danger-soft">
          <CardContent className="space-y-4 p-6">
            <div className="text-lg font-semibold text-slate-950">Console route error</div>
            <p className="text-sm text-slate-700">
              The current admin module failed to render. Retry the route. If real data is already wired in the future, verify registry updates and generated SDK output before debugging UI code.
            </p>
            <Button onClick={reset}>Retry</Button>
          </CardContent>
        </Card>
      </PageShell>
    </AdminShell>
  );
}

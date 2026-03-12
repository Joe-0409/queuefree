'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Error({ reset }: { error: Error; reset: () => void }): React.ReactElement {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
      <Card className="w-full max-w-xl border-danger/20 bg-danger-soft">
        <CardContent className="space-y-4 p-6">
          <div className="text-lg font-semibold text-slate-950">Admin page error</div>
          <p className="text-sm text-slate-700">
            This admin route failed to render. Retry the page. If it still fails after real Admin SDK integration, check the generated client and registry updates first.
          </p>
          <Button onClick={reset}>Retry</Button>
        </CardContent>
      </Card>
    </div>
  );
}

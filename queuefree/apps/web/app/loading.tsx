import { PageShell } from '@/components/page-shell';
import { Card } from '@/components/ui/card';

export default function Loading(): React.ReactElement {
  return (
    <PageShell>
      <Card>
        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-950">Loading public page</div>
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
        </div>
      </Card>
    </PageShell>
  );
}

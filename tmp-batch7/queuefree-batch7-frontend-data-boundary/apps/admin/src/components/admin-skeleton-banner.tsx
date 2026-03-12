import { Card, CardContent } from '@/components/ui/card';

export function AdminSkeletonBanner(): React.ReactElement {
  return (
    <Card className="border-brand/20 bg-brand-soft">
      <CardContent className="space-y-2 p-5">
        <div className="text-sm font-semibold text-slate-950">Admin Skeleton</div>
        <p className="text-sm text-slate-700">
          This batch is route-safe and registry-safe. Data, actions, and permissions are placeholders only. No real authentication, no real API,
          and no unregistered contract has been added here.
        </p>
      </CardContent>
    </Card>
  );
}

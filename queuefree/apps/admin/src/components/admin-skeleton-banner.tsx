import { getAdminReadAdapterStatusSummary } from '@/adapters/admin-read-adapter.resolve';
import { Card, CardContent } from '@/components/ui/card';

export function AdminSkeletonBanner(): React.ReactElement {
 const status = getAdminReadAdapterStatusSummary();

 return (
 <Card className="border-brand/20 bg-brand-soft">
 <CardContent className="space-y-3 p-5">
 <div className="text-sm font-semibold text-slate-950">Admin Skeleton</div>
 <p className="text-sm text-slate-700">
 Data source: <span className="font-semibold">{status.screenDataMode}</span> · api-client mode:{' '}
 <span className="font-semibold">{status.apiClientRuntimeMode}</span> · screen-model validation:{' '}
 <span className="font-semibold">active</span>
 </p>
 <p className="text-sm text-slate-700">
 This batch is route-safe and registry-safe. Data, actions, and permissions are placeholders only. No real authentication, no real API,
 and no unregistered contract has been added here.
 </p>
 <ul className="space-y-2 text-sm text-slate-700">
 {status.reasons.map((reason) => (
 <li key={reason} className="rounded-2xl border border-brand/20 bg-white/70 px-3 py-2">
 {reason}
 </li>
 ))}
 </ul>
 </CardContent>
 </Card>
 );
}

import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type MetricCardProps = {
  title: string;
  value: string;
  description: string;
  tone?: BadgeTone;
};

export function MetricCard({ title, value, description, tone = 'slate' }: MetricCardProps): React.ReactElement {
  return (
    <Card className={cn(tone === 'brand' && 'border-brand/20', tone === 'warning' && 'border-warning/20', tone === 'danger' && 'border-danger/20')}>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-slate-700">{title}</div>
          <Badge tone={tone}>{title}</Badge>
        </div>
        <div className="text-3xl font-bold tracking-tight text-slate-950">{value}</div>
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}

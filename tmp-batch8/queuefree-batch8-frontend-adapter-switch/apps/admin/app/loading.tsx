import { Card, CardContent } from '@/components/ui/card';

export default function Loading(): React.ReactElement {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
      <Card className="w-full max-w-xl">
        <CardContent className="space-y-3 p-6">
          <div className="text-sm font-semibold text-slate-950">Loading admin page</div>
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
        </CardContent>
      </Card>
    </div>
  );
}

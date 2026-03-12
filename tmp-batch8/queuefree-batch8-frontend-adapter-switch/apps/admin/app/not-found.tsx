import Link from 'next/link';
import { PageShell } from '@/components/page-shell';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFoundPage(): React.ReactElement {
  return (
    <PageShell width="narrow">
      <Card>
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            This Admin skeleton only exposes the frozen routes defined in PRD v1.2 and the registry baseline.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/">Back to dashboard</ButtonLink>
            <ButtonLink href="/login" variant="secondary">
              Open login
            </ButtonLink>
          </div>
          <p className="text-xs text-slate-500">
            Missing paths should be added only after registry-first registration.
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}

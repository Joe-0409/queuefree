import Link from 'next/link';
import { LAUNCH_MARKET, LAUNCH_RULE_VERSION, LAUNCH_WEBSITE } from '@queuefree/shared';
import { webTheme } from '@queuefree/ui-tokens';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { PageShell } from '@/components/page-shell';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const metadata = {
  title: 'Login'
};

export default function LoginPage(): React.ReactElement {
  return (
    <PageShell width="narrow">
      <div className="space-y-6" style={{ maxWidth: `calc(${webTheme.maxWidth.content} - 34rem)` }}>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">QueueFree Admin</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">Admin login skeleton</h1>
          <p className="max-w-2xl text-sm text-slate-600">
            This page is intentionally non-functional in batch 4. It exists to lock the route, screen layout, and compliance copy before
            real authentication is registered and wired.
          </p>
        </div>

        <AdminSkeletonBanner />

        <Card>
          <CardHeader>
            <CardTitle>Sign-in placeholder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Admin email or phone" placeholder="ops@queuefree.example" />
            <Input label="Password / OTP placeholder" placeholder="Not connected in this batch" />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/">Enter skeleton dashboard</ButtonLink>
              <ButtonLink href={`https://${LAUNCH_WEBSITE}/terms`} variant="secondary">
                View public terms
              </ButtonLink>
            </div>
            <p className="text-xs text-slate-500">
              Launch market is locked to {LAUNCH_MARKET}. Rule version is {LAUNCH_RULE_VERSION}. Real auth and RBAC must follow registry-first
              registration before API wiring.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why this page stays minimal for now</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>No real session, password, OTP, or SSO contract has been registered for Admin in this batch.</p>
            <p>Frontend will not invent authentication fields or response shapes outside `packages/api-client`.</p>
            <p>
              Public compliance pages stay on the main website. Open{' '}
              <Link className="font-semibold text-brand" href={`https://${LAUNCH_WEBSITE}/privacy`}>
                queuefree.com/privacy
              </Link>{' '}
              for the public privacy policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

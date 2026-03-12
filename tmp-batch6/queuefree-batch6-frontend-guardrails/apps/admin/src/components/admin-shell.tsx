import { webTheme } from '@queuefree/ui-tokens';
import { AdminSidebar } from '@/components/admin-sidebar';
import { AdminTopbar } from '@/components/admin-topbar';

export function AdminShell({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full" style={{ maxWidth: `calc(${webTheme.maxWidth.content} + 30rem)` }}>
        <AdminSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AdminTopbar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}

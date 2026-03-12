import { AdminShell } from '@/components/admin-shell';

export default function ConsoleLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return <AdminShell>{children}</AdminShell>;
}

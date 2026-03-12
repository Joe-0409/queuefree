import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Audit logs'
};

export default function AuditPage(): React.ReactElement {
  return <ModuleListPage kind="audit" />;
}

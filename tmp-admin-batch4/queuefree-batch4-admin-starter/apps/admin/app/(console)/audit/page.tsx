import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Audit'
};

export default function AuditPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('audit')} />;
}

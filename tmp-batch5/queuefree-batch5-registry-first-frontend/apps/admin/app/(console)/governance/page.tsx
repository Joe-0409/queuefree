import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Governance'
};

export default function GovernancePage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('governance')} />;
}

import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Risk'
};

export default function RiskPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('risk')} />;
}

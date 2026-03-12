import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Slots'
};

export default function SlotsPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('slots')} />;
}

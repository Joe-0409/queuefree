import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Tasks'
};

export default function TasksPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('tasks')} />;
}

import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Tasks'
};

export default function TasksPage(): React.ReactElement {
  return <ModuleListPage kind="tasks" />;
}

import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Queues'
};

export default function QueuesPage(): React.ReactElement {
  return <ModuleListPage kind="queues" />;
}

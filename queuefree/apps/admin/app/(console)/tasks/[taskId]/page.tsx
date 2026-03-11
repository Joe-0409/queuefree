import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Task detail'
};

export default function TaskDetailPage({ params }: { params: { taskId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('task', params.taskId)} />;
}

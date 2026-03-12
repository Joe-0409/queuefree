import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Task detail'
};

export default function TaskDetailPage({ params }: { params: { taskId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="task" id={params.taskId} />;
}

import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Queue detail'
};

export default function QueueDetailPage({ params }: { params: { entryId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="queue" id={params.entryId} />;
}

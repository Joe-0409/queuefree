import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Queue detail'
};

export default function QueueDetailPage({ params }: { params: { entryId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('queue', params.entryId)} />;
}

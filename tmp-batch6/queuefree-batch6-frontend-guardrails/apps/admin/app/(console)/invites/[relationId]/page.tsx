import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Invite detail'
};

export default function InviteDetailPage({ params }: { params: { relationId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('invite', params.relationId)} />;
}

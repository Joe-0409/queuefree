import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Invite detail'
};

export default function InviteDetailPage({ params }: { params: { relationId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="invite" id={params.relationId} />;
}

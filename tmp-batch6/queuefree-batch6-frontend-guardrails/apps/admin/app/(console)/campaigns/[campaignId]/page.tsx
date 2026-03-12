import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Campaign detail'
};

export default function CampaignDetailPage({ params }: { params: { campaignId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('campaign', params.campaignId)} />;
}

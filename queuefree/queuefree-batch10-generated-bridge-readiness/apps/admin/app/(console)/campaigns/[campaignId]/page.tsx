import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Campaign detail'
};

export default function CampaignDetailPage({ params }: { params: { campaignId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="campaign" id={params.campaignId} />;
}

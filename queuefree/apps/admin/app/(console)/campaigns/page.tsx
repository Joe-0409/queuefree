import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Campaigns'
};

export default function CampaignsPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('campaigns')} />;
}

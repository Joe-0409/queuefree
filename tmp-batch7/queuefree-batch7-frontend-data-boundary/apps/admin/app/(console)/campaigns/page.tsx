import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Campaigns'
};

export default function CampaignsPage(): React.ReactElement {
  return <ModuleListPage kind="campaigns" />;
}

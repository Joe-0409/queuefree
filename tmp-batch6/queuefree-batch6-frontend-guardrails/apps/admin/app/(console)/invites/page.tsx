import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Invites'
};

export default function InvitesPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('invites')} />;
}

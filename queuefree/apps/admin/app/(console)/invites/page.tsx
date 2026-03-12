import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Invites'
};

export default function InvitesPage(): React.ReactElement {
  return <ModuleListPage kind="invites" />;
}

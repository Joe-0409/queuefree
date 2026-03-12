import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Governance'
};

export default function GovernancePage(): React.ReactElement {
  return <ModuleListPage kind="governance" />;
}

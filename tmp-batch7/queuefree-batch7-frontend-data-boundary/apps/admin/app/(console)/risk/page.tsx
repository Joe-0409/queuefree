import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Risk cases'
};

export default function RiskPage(): React.ReactElement {
  return <ModuleListPage kind="risk" />;
}

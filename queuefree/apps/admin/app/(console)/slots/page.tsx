import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Slots'
};

export default function SlotsPage(): React.ReactElement {
  return <ModuleListPage kind="slots" />;
}

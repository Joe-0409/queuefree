import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Orders'
};

export default function OrdersPage(): React.ReactElement {
  return <ModuleListPage kind="orders" />;
}

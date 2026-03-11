import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Orders'
};

export default function OrdersPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('orders')} />;
}

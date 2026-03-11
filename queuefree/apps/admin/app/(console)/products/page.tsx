import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Products'
};

export default function ProductsPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('products')} />;
}

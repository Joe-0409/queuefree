import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Products'
};

export default function ProductsPage(): React.ReactElement {
  return <ModuleListPage kind="products" />;
}

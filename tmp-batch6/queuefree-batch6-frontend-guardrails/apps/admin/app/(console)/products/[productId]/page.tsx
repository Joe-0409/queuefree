import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Product detail'
};

export default function ProductDetailPage({ params }: { params: { productId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('product', params.productId)} />;
}

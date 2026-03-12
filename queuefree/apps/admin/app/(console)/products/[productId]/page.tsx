import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Product detail'
};

export default function ProductDetailPage({ params }: { params: { productId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="product" id={params.productId} />;
}

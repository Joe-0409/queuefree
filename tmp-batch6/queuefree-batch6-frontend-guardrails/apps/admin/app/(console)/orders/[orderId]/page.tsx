import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Order detail'
};

export default function OrderDetailPage({ params }: { params: { orderId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('order', params.orderId)} />;
}

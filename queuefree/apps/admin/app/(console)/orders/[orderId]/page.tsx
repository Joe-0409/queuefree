import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Order detail'
};

export default function OrderDetailPage({ params }: { params: { orderId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="order" id={params.orderId} />;
}

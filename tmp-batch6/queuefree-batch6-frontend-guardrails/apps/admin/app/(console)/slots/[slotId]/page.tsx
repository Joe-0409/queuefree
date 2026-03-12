import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Slot detail'
};

export default function SlotDetailPage({ params }: { params: { slotId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('slot', params.slotId)} />;
}

import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Slot detail'
};

export default function SlotDetailPage({ params }: { params: { slotId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="slot" id={params.slotId} />;
}

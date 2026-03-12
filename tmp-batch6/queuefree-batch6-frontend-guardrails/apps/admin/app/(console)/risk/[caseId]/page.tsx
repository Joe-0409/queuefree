import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Risk case detail'
};

export default function RiskDetailPage({ params }: { params: { caseId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('risk', params.caseId)} />;
}

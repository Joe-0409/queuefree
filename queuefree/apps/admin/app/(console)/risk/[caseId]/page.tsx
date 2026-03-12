import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Risk detail'
};

export default function RiskDetailPage({ params }: { params: { caseId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="risk" id={params.caseId} />;
}

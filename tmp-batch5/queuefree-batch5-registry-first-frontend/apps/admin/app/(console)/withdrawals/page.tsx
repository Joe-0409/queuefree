import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Withdrawals'
};

export default function WithdrawalsPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('withdrawals')} />;
}

import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Withdrawals'
};

export default function WithdrawalsPage(): React.ReactElement {
  return <ModuleListPage kind="withdrawals" />;
}

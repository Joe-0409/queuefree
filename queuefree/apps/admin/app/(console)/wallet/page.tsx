import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Wallet'
};

export default function WalletPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('wallet')} />;
}

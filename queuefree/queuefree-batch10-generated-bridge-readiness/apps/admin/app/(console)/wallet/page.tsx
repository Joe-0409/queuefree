import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Wallet'
};

export default function WalletPage(): React.ReactElement {
  return <ModuleListPage kind="wallet" />;
}

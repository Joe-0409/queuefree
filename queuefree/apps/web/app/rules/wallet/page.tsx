import { notFound } from 'next/navigation';

import { RuleDetailView } from '../_components/rule-detail-view';
import { getRuleBySlug } from '../_lib/rules-api';

export const dynamic = 'force-dynamic';

export default async function WalletRulesPage() {
  const rule = await getRuleBySlug('wallet');

  if (!rule) {
    notFound();
  }

  return <RuleDetailView rule={rule} />;
}

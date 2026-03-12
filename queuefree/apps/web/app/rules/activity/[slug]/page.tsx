import { notFound } from 'next/navigation';

import { RuleDetailView } from '../../_components/rule-detail-view';
import { getRuleBySlug } from '../../_lib/rules-api';

export const dynamic = 'force-dynamic';

interface ActivityRulePageProps {
  params: {
    slug: string;
  };
}

export default async function ActivityRulePage({ params }: ActivityRulePageProps) {
  const rule = await getRuleBySlug(params.slug);

  if (!rule) {
    notFound();
  }

  return <RuleDetailView rule={rule} />;
}

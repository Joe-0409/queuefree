import { RulesEmptyState } from './_components/rules-empty-state';
import { RulesListView } from './_components/rules-list-view';
import { listRules } from './_lib/rules-api';

export const dynamic = 'force-dynamic';

export default async function RulesPage() {
  const rules = await listRules();

  if (rules.length === 0) {
    return (
      <RulesEmptyState
        title="Rules are not published yet"
        description="The API contract is live and the page now reads through the generated SDK, but the backend has not published any rules documents yet."
      />
    );
  }

  return <RulesListView rules={rules} />;
}

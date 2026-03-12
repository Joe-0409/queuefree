import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { PrimaryButton } from "../../../src/components/primary-button";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useTasksScreenQuery } from "../../../src/queries/use-mobile-queries";

export default function TasksTabScreen() {
  const [claimedIds, setClaimedIds] = useState<string[]>([]);
  const tasksQuery = useTasksScreenQuery();
  const claimedSet = useMemo(() => new Set(claimedIds), [claimedIds]);

  return (
    <Screen
      title="Tasks"
      subtitle="Tasks can extend retention, grant fragments, or support wallet activation paths later."
    >
      <DemoBanner />

      {tasksQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing task center"
          description="Task cards now read from a query hook instead of direct page-level mock imports."
        />
      ) : null}

      {tasksQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Task center is unavailable"
          description="Retry the repository-backed task query."
          onRetry={() => {
            void tasksQuery.refetch();
          }}
        />
      ) : null}

      {tasksQuery.data ? (
        <SectionCard title="Task center" description="Rewards should remain traceable. Real task reads and claims must come from the generated client after backend registers the task contract.">
          <View style={{ gap: 12 }}>
            {tasksQuery.data.tasks.map((task) => {
              const alreadyClaimed = claimedSet.has(task.id);
              return (
                <SectionCard key={task.id} title={task.title} description={task.rewardLabel}>
                  <Text>Progress: {task.progressLabel}</Text>
                  <Text>Status: {alreadyClaimed ? "Already claimed in demo mode" : task.claimable ? "Ready to claim" : "Not ready yet"}</Text>
                  <PrimaryButton
                    label={alreadyClaimed ? "Claimed" : task.claimable ? "Claim demo reward" : "Not claimable yet"}
                    disabled={!task.claimable || alreadyClaimed}
                    onPress={() => setClaimedIds((current) => [...current, task.id])}
                  />
                </SectionCard>
              );
            })}
          </View>
        </SectionCard>
      ) : null}
    </Screen>
  );
}

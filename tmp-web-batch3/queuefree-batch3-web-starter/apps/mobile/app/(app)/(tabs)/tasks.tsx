import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { demoTasks } from "../../../src/lib/demo-data";

export default function TasksTabScreen() {
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  const claimedSet = useMemo(() => new Set(claimedIds), [claimedIds]);

  return (
    <Screen
      title="Tasks"
      subtitle="Tasks can extend retention, grant fragments, or support wallet activation paths later."
    >
      <DemoBanner />

      <SectionCard title="Task center" description="Rewards should remain traceable. The real backend later connects GET /v1/tasks and POST /v1/tasks/:taskId/claim.">
        <View style={{ gap: 12 }}>
          {demoTasks.map((task) => {
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
    </Screen>
  );
}

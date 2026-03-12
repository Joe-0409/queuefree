import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "../../../../src/components/screen";
import { SectionCard } from "../../../../src/components/section-card";

export default function ActivityRulesScreen() {
  const params = useLocalSearchParams<{ campaignId: string }>();
  const campaignId = params.campaignId || "campaign-summer-2026";

  return (
    <Screen
      title="Activity rules"
      subtitle="Campaign and activity copy should later come from backend-managed content, not permanent page-level hardcoding."
    >
      <SectionCard title="Campaign snapshot" description={`Campaign ID: ${campaignId}`}>
        <View style={{ gap: 8 }}>
          <Text>• Activity scope may be limited to specific products or windows.</Text>
          <Text>• Activity copy should stay consistent with rule center and web public rules.</Text>
          <Text>• Rewarded ads remain off for the first review build.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Implementation note" description="This page is a starter placeholder until rules content is delivered by backend and CMS-like config.">
        <Text>Real frontend later consumes generated rules content contracts after backend registers and exports the public rules API.</Text>
      </SectionCard>
    </Screen>
  );
}

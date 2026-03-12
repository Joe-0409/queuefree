import { router } from "expo-router";
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { NavRow } from "../../../src/components/nav-row";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useRulesCenterQuery } from "../../../src/queries/use-mobile-queries";

export default function RulesCenterScreen() {
  const rulesQuery = useRulesCenterQuery();

  return (
    <Screen
      title="Rules center"
      subtitle="Rules are part of the product surface, not a hidden appendix."
    >
      <DemoBanner />

      <SectionCard title="Legal and help" description="Keep rules, privacy, terms, support, and delete-account pages easy to reach.">
        <View style={{ gap: 10 }}>
          <NavRow label="Queue rules" description="How ranking, Top30, and settlement slots work" onPress={() => router.push("/(app)/rules/queue")} />
          <NavRow label="Wallet rules" description="Pending, available, frozen, and withdrawal flow" onPress={() => router.push("/(app)/rules/wallet")} />
          <NavRow label="Activity rules" description="Current campaign-level rule page" onPress={() => router.push("/(app)/rules/activity/demo-campaign")} />
          <NavRow label="Privacy policy" description="How QueueFree handles personal data" onPress={() => router.push("/(app)/privacy")} />
          <NavRow label="Terms of service" description="Service contract and user obligations" onPress={() => router.push("/(app)/terms")} />
          <NavRow label="Support" description="Appeal and contact entry" onPress={() => router.push("/(app)/support")} />
          <NavRow label="Delete account" description="Request + settlement + anonymization path" onPress={() => router.push("/(app)/delete-account")} />
        </View>
      </SectionCard>

      {rulesQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing FAQ snapshot"
          description="Rule highlights now flow through the repository-backed query layer."
        />
      ) : null}

      {rulesQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="FAQ snapshot is unavailable"
          description="Retry the rules-center query."
          onRetry={() => {
            void rulesQuery.refetch();
          }}
        />
      ) : null}

      {rulesQuery.data ? (
        <SectionCard title="FAQ snapshot">
          <View style={{ gap: 8 }}>
            {rulesQuery.data.faq.map((item) => (
              <NavRow key={item} label={item} />
            ))}
          </View>
        </SectionCard>
      ) : null}
    </Screen>
  );
}

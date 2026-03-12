import { router } from "expo-router";
import { View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { NavRow } from "../../../src/components/nav-row";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { demoRuleFaq } from "../../../src/lib/demo-data";

export default function RulesCenterScreen() {
  return (
    <Screen
      title="Rules center"
      subtitle="Rules must be reachable from all main flows. This is the hub page for queue, wallet, activity, legal, and support pages."
    >
      <DemoBanner />

      <SectionCard title="Open a rule page" description="These routes are fixed by the PRD and collaboration contract.">
        <View style={{ gap: 10 }}>
          <NavRow label="Queue rules" description="Rank, check-in, boost, freeze, and removal" onPress={() => router.push("/(app)/rules/queue")} />
          <NavRow label="Wallet rules" description="Pending, available, frozen, and withdrawals" onPress={() => router.push("/(app)/rules/wallet")} />
          <NavRow label="Activity rules" description="Campaign-specific rule detail" onPress={() => router.push({ pathname: "/(app)/rules/activity/[campaignId]", params: { campaignId: "campaign-summer-2026" } })} />
          <NavRow label="Privacy policy" description="In-app privacy page" onPress={() => router.push("/(app)/privacy")} />
          <NavRow label="Terms of service" description="In-app terms page" onPress={() => router.push("/(app)/terms")} />
          <NavRow label="Support" description="Customer service and appeal entry" onPress={() => router.push("/(app)/support")} />
          <NavRow label="Delete account" description="Request + settlement + anonymization path" onPress={() => router.push("/(app)/delete-account")} />
        </View>
      </SectionCard>

      <SectionCard title="FAQ snapshot">
        <View style={{ gap: 8 }}>
          {demoRuleFaq.map((item) => (
            <NavRow key={item} label={item} />
          ))}
        </View>
      </SectionCard>
    </Screen>
  );
}

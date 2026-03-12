import { router } from "expo-router";
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { NavRow } from "../../../src/components/nav-row";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { demoProfile } from "../../../src/lib/demo-data";

export default function MeTabScreen() {
  return (
    <Screen
      title="Me"
      subtitle="Keep profile, security, legal pages, support, and delete account entry easy to find."
    >
      <DemoBanner />

      <SectionCard title={demoProfile.displayName} description={demoProfile.phoneNumber}>
        <Text>{demoProfile.marketLabel}</Text>
        <Text>{demoProfile.timezoneLabel}</Text>
      </SectionCard>

      <SectionCard title="Account and support" description="These pages are mandatory for store review readiness.">
        <View style={{ gap: 10 }}>
          <NavRow label="Addresses" description="Manage shipping addresses" onPress={() => router.push("/(app)/me/addresses")} />
          <NavRow label="Security" description="Devices and session actions" onPress={() => router.push("/(app)/me/security")} />
          <NavRow label="Rules center" description="Queue, wallet, and activity rules" onPress={() => router.push("/(app)/rules")} />
          <NavRow label="Privacy policy" description="In-app privacy page" onPress={() => router.push("/(app)/privacy")} />
          <NavRow label="Terms of service" description="In-app terms page" onPress={() => router.push("/(app)/terms")} />
          <NavRow label="Support" description="Customer service and appeal" onPress={() => router.push("/(app)/support")} />
          <NavRow label="Delete account" description="Request + settlement + anonymization path" onPress={() => router.push("/(app)/delete-account")} />
        </View>
      </SectionCard>
    </Screen>
  );
}

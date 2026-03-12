import { router } from "expo-router";
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { NavRow } from "../../../src/components/nav-row";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useProfileScreenQuery } from "../../../src/queries/use-mobile-queries";

export default function MeTabScreen() {
  const profileQuery = useProfileScreenQuery();

  return (
    <Screen
      title="Me"
      subtitle="Keep profile, security, legal pages, support, and delete account entry easy to find."
    >
      <DemoBanner />

      {profileQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing account overview"
          description="Profile summary now reads from a screen query instead of a direct page import."
        />
      ) : null}

      {profileQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Account overview is unavailable"
          description="Retry the profile query."
          onRetry={() => {
            void profileQuery.refetch();
          }}
        />
      ) : null}

      {profileQuery.data ? (
        <>
          <SectionCard title={profileQuery.data.profile.displayName} description={profileQuery.data.profile.phoneNumber}>
            <Text>{profileQuery.data.profile.marketLabel}</Text>
            <Text>{profileQuery.data.profile.timezoneLabel}</Text>
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
        </>
      ) : null}
    </Screen>
  );
}

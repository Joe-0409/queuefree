import { router } from "expo-router";
import { Text, View } from "react-native";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useAuthStore } from "../../../src/store/auth-store";

const demoDevices = [
  "iPhone 15 Pro · Manila · Active now",
  "Chrome on MacBook · Makati · 2 hours ago"
];

export default function SecurityScreen() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Screen
      title="Security"
      subtitle="Session refresh and logout later connect to auth endpoints. Device visibility is useful for user trust and support."
    >
      <SectionCard title="Devices" description="The real backend later connects GET /v1/me/devices.">
        <View style={{ gap: 10 }}>
          {demoDevices.map((device) => (
            <NavRow key={device} label={device} />
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Session actions" description="Demo logout only clears local state.">
        <PrimaryButton
          label="Log out"
          variant="danger"
          onPress={() => {
            logout();
            router.replace("/(public)/welcome");
          }}
        />
        <Text>Session refresh later uses POST /v1/auth/refresh, and logout later uses POST /v1/auth/logout.</Text>
      </SectionCard>
    </Screen>
  );
}

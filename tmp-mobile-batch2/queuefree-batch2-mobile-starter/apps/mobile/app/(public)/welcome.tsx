import { router } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "../../src/components/screen";
import { SectionCard } from "../../src/components/section-card";
import { PrimaryButton } from "../../src/components/primary-button";
import { DemoBanner } from "../../src/components/demo-banner";

export default function WelcomeScreen() {
  return (
    <Screen
      title="QueueFree"
      subtitle="Buy real products, join the public queue, and follow transparent rules."
    >
      <DemoBanner />

      <SectionCard
        title="How it works"
        description="The MVP path is simple: browse products, pay for a real product, then your paid order may enter the public queue."
      >
        <Text>• No cart in MVP</Text>
        <Text>• One order equals one queue seat</Text>
        <Text>• Cashback may apply based on public queue rules</Text>
      </SectionCard>

      <SectionCard
        title="What stays transparent"
        description="Current effective rank, check-in status, next settlement slot, and wallet states are all visible in the app."
      >
        <Text>• Queue rank is current effective rank</Text>
        <Text>• Top30 is a protected zone</Text>
        <Text>• Cashback goes to pending first, then may become withdrawable later</Text>
      </SectionCard>

      <SectionCard
        title="Launch baseline"
        description="The first launch is fixed to PH / PHP / Asia/Manila / English."
      >
        <Text>• No country selector in MVP</Text>
        <Text>• No guaranteed income language</Text>
        <Text>• Rewarded ads stay off for the first review build</Text>
      </SectionCard>

      <View style={{ gap: 12 }}>
        <PrimaryButton label="Continue with phone" onPress={() => router.push("/(public)/auth/phone")} />
        <PrimaryButton
          label="Preview home directly"
          variant="secondary"
          onPress={() => router.push("/(app)/(tabs)/home")}
        />
      </View>
    </Screen>
  );
}

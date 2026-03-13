import { router } from "expo-router";
import { View } from "react-native";
import { Screen } from "../../src/components/screen";
import { DemoBanner } from "../../src/components/demo-banner";
import { MechanismStepStrip } from "../../src/components/mechanism-step-strip";
import { PromoHeroCard } from "../../src/components/promo-hero-card";
import { SectionCard } from "../../src/components/section-card";

export default function WelcomeScreen() {
  return (
    <Screen
      title="QueueFree"
      subtitle="Buy real products, join the public queue, and follow transparent rules."
    >
      <DemoBanner />

      <PromoHeroCard
        eyebrow="QueueFree · PH launch"
        title="A clearer way to understand the queue"
        description="The MVP path stays simple: buy a real product, your paid order may join the public queue, and fixed settlement slots stay visible."
        chips={[
          { label: "Market", value: "PH / PHP" },
          { label: "Language", value: "English" }
        ]}
        primaryCtaLabel="Continue with phone"
        onPrimaryPress={() => router.push("/(public)/auth/phone")}
        secondaryCtaLabel="Preview home"
        onSecondaryPress={() => router.push("/(app)/(tabs)/home")}
      />

      <SectionCard
        title="How it works"
        description="Absorb the mechanism first. The app uses explanatory and rules-first language only."
      >
        <MechanismStepStrip />
      </SectionCard>

      <SectionCard
        title="What stays transparent"
        description="The app keeps queue rank, settlement slot timing, wallet state, rules, and delete-account entry visible."
      >
        <View style={{ gap: 8 }}>
          <SectionCard variant="muted" title="Queue" description="Current effective rank, guard status, and next visible slot" />
          <SectionCard variant="muted" title="Wallet" description="Available, pending, and frozen balances remain distinct" />
          <SectionCard variant="muted" title="Rules" description="Queue, wallet, and activity rules stay reachable in-app" />
        </View>
      </SectionCard>
    </Screen>
  );
}

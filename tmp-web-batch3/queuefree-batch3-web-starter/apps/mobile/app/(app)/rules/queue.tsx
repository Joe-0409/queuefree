import { Text, View } from "react-native";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

export default function QueueRulesScreen() {
  const { config } = useRuntimeConfig();

  return (
    <Screen
      title="Queue rules"
      subtitle="This page explains the public queue without black-box language."
    >
      <SectionCard title="Core queue logic" description="These are locked MVP rules from the PRD.">
        <View style={{ gap: 8 }}>
          <Text>• There is no cart in MVP.</Text>
          <Text>• One order contains one product, but quantity can be greater than one.</Text>
          <Text>• One order equals one queue seat.</Text>
          <Text>• Quantity affects money, not the number of seats.</Text>
          <Text>• Queue rank shown in the app is the current effective rank.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Check-in and freeze" description="Queue guard is user-level, not order-level.">
        <Text>• One check-in keeps all active entries valid for {config.baseGuardHours} hours.</Text>
        <Text>• After expiry, entries can become frozen first.</Text>
        <Text>• Grace lasts {config.freezeGraceHours} hours by default fallback config.</Text>
      </SectionCard>

      <SectionCard title="Boost and protection zone" description="Boost is order-level and strictly limited.">
        <Text>• Each order can use boost up to {config.boostLimitPerEntry} times.</Text>
        <Text>• Top{config.protectZoneSize} is the protected zone.</Text>
        <Text>• Protected-zone entries cannot be crossed by boost.</Text>
        <Text>• Entries already inside the protected zone cannot use boost again.</Text>
      </SectionCard>

      <SectionCard title="Settlement slots" description="Winning is tied to fixed slots, not instant first-place conversion.">
        <Text>• The system uses fixed settlement slots.</Text>
        <Text>• Each slot settles only the current effective #1 eligible entry.</Text>
        <Text>• Frozen entries keep their sort score but do not participate in effective ranking.</Text>
      </SectionCard>
    </Screen>
  );
}

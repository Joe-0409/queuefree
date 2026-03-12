import { Text, View } from "react-native";
import { Screen } from "../../src/components/screen";
import { SectionCard } from "../../src/components/section-card";

export default function TermsScreen() {
  return (
    <Screen
      title="Terms of service"
      subtitle="This page is the in-app terms entry for store review readiness."
    >
      <SectionCard title="Terms outline" description="Replace this starter copy with legal-reviewed terms before release.">
        <View style={{ gap: 8 }}>
          <Text>• User eligibility and account rules.</Text>
          <Text>• Order, payment, refund, queue, and wallet behavior.</Text>
          <Text>• Suspension, review, and support escalation handling.</Text>
          <Text>• Account deletion process and legal exceptions.</Text>
          <Text>• Contact method and governing terms notice.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Important note" description="This starter page is structural only, not final legal text.">
        <Text>Before store submission, replace this with your final terms content and keep the web version aligned at /terms.</Text>
      </SectionCard>
    </Screen>
  );
}

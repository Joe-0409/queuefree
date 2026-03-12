import { Text, View } from "react-native";
import { Screen } from "../../src/components/screen";
import { SectionCard } from "../../src/components/section-card";

export default function PrivacyScreen() {
  return (
    <Screen
      title="Privacy policy"
      subtitle="The public web page and the in-app page must both exist for review readiness."
    >
      <SectionCard title="Policy outline" description="Replace this starter copy with legal-reviewed content before release.">
        <View style={{ gap: 8 }}>
          <Text>• What data the product collects and why.</Text>
          <Text>• Login, order, queue, wallet, support, and risk-related data uses.</Text>
          <Text>• Account deletion request process and retention exceptions.</Text>
          <Text>• Anti-fraud and risk retention where legally required.</Text>
          <Text>• Contact method for privacy questions.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Important note" description="This starter page is structural only, not final legal text.">
        <Text>Before store submission, replace this with your final privacy policy content and keep the web version aligned at /privacy.</Text>
      </SectionCard>
    </Screen>
  );
}

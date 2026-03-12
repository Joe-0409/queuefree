import { Text, View } from "react-native";
import { Screen } from "../../src/components/screen";
import { SectionCard } from "../../src/components/section-card";

export default function SupportScreen() {
  return (
    <Screen
      title="Support"
      subtitle="App copy can say Support / Contact Us, while the public web route remains locked to /contact."
    >
      <SectionCard title="Contact channels" description="Replace placeholder details with your real support channels before release.">
        <View style={{ gap: 8 }}>
          <Text>• Email: support@queuefree.com</Text>
          <Text>• Support hours: Mon–Sat, 09:00–18:00 Asia/Manila</Text>
          <Text>• Use this channel for order, queue, withdrawal, or account concerns.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Appeal path" description="Users should have a clear support and appeal route for queue, risk, and withdrawal issues.">
        <Text>Keep support reachable from home, queue, wallet, and me pages.</Text>
      </SectionCard>
    </Screen>
  );
}

import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { demoInviteRecords } from "../../../src/lib/demo-data";
import { getInviteStatusTone } from "../../../src/lib/status-maps";

export default function InvitesTabScreen() {
  return (
    <Screen
      title="Invites"
      subtitle="Invite logic stays single-layer only. Effective and invalid states must remain explainable."
    >
      <DemoBanner />

      <SectionCard title="My invite code" description="Binding stays optional and time-limited for MVP.">
        <Text>Invite code: QUEUEFREE2026</Text>
        <Text>Effective invites help later wallet activation or trust flow, depending on backend rules.</Text>
      </SectionCard>

      <SectionCard title="Invite records" description="The UI must clearly show BOUND / PENDING_EFFECTIVE / EFFECTIVE / INVALID.">
        <View style={{ gap: 12 }}>
          {demoInviteRecords.map((record) => (
            <SectionCard
              key={record.id}
              title={record.maskedPhone}
              description={record.reason}
              rightSlot={<StatusPill label={record.status} tone={getInviteStatusTone(record.status)} />}
            >
              <Text>Reason: {record.reason}</Text>
            </SectionCard>
          ))}
        </View>
      </SectionCard>
    </Screen>
  );
}

import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { getInviteStatusTone } from "../../../src/lib/status-maps";
import { useInvitesScreenQuery } from "../../../src/queries/use-mobile-queries";

export default function InvitesTabScreen() {
  const invitesQuery = useInvitesScreenQuery();

  return (
    <Screen
      title="Invites"
      subtitle="Invite logic stays single-layer only. Effective and invalid states must remain explainable."
    >
      <DemoBanner />

      {invitesQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing invite overview"
          description="Invite summary and invite records now flow through the mobile repository layer."
        />
      ) : null}

      {invitesQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Invite overview is unavailable"
          description="Retry the repository-backed invite query."
          onRetry={() => {
            void invitesQuery.refetch();
          }}
        />
      ) : null}

      {invitesQuery.data ? (
        <>
          <SectionCard title="My invite code" description="Binding stays optional and time-limited for MVP.">
            <Text>Invite code: {invitesQuery.data.inviteCode}</Text>
            <Text>Effective invites help later wallet activation or trust flow, depending on backend rules.</Text>
          </SectionCard>

          <SectionCard title="Invite records" description="The UI must clearly show BOUND / PENDING_EFFECTIVE / EFFECTIVE / INVALID.">
            <View style={{ gap: 12 }}>
              {invitesQuery.data.records.map((record) => (
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
        </>
      ) : null}
    </Screen>
  );
}

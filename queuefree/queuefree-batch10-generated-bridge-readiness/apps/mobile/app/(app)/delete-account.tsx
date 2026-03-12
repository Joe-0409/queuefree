import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { ACCOUNT_DELETE_STATUSES } from "@queuefree/shared";
import { PrimaryButton } from "../../src/components/primary-button";
import { QueryStateCard } from "../../src/components/query-state-card";
import { Screen } from "../../src/components/screen";
import { SectionCard } from "../../src/components/section-card";
import { StatusPill } from "../../src/components/status-pill";
import { getAccountDeleteStatusTone } from "../../src/lib/status-maps";
import { useDeleteAccountPreviewQuery } from "../../src/queries/use-mobile-queries";

export default function DeleteAccountScreen() {
  const [submitted, setSubmitted] = useState(false);
  const deleteQuery = useDeleteAccountPreviewQuery();
  const currentStatus = useMemo(() => (submitted ? ACCOUNT_DELETE_STATUSES[1] : ACCOUNT_DELETE_STATUSES[0]), [submitted]);

  return (
    <Screen
      title="Delete account"
      subtitle="Deletion in this product is not a simple disable action. It is request + settlement + anonymization."
    >
      {deleteQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing deletion guidance"
          description="Deletion guidance now reads through the repository-backed query layer."
        />
      ) : null}

      {deleteQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Deletion guidance is unavailable"
          description="Retry the delete-account preview query."
          onRetry={() => {
            void deleteQuery.refetch();
          }}
        />
      ) : null}

      {deleteQuery.data ? (
        <>
          <SectionCard
            title="Deletion lifecycle"
            description="The final backend should drive these states."
            rightSlot={<StatusPill label={currentStatus} tone={getAccountDeleteStatusTone(currentStatus)} />}
          >
            <View style={{ gap: 8 }}>
              {deleteQuery.data.statuses.map((status) => (
                <Text key={status}>• {status}</Text>
              ))}
            </View>
          </SectionCard>

          <SectionCard title="Before you submit" description="Show blockers, impact, and unsettled items clearly.">
            <View style={{ gap: 8 }}>
              {deleteQuery.data.blockers.map((item) => (
                <Text key={item}>• {item}</Text>
              ))}
            </View>
          </SectionCard>

          <SectionCard title="Impact notes" description="The deletion path stays request + settlement + anonymization.">
            <View style={{ gap: 8 }}>
              {deleteQuery.data.impactNotes.map((item) => (
                <Text key={item}>• {item}</Text>
              ))}
            </View>
          </SectionCard>

          <SectionCard title="Demo action" description="The real backend later connects the generated delete-account request call with idempotency protection.">
            <PrimaryButton
              label={submitted ? "Demo request submitted" : "Submit demo delete request"}
              disabled={submitted}
              variant="danger"
              onPress={() => setSubmitted(true)}
            />
            {submitted ? <Text>Your demo request is now shown as submitted. Real backend later advances the state machine.</Text> : null}
          </SectionCard>
        </>
      ) : null}
    </Screen>
  );
}

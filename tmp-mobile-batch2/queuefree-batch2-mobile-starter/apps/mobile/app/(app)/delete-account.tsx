import { useState } from "react";
import { Text, View } from "react-native";
import { PrimaryButton } from "../../src/components/primary-button";
import { Screen } from "../../src/components/screen";
import { SectionCard } from "../../src/components/section-card";
import { StatusPill } from "../../src/components/status-pill";

export default function DeleteAccountScreen() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Screen
      title="Delete account"
      subtitle="Deletion in this product is not a simple disable action. It is request + settlement + anonymization."
    >
      <SectionCard
        title="Deletion lifecycle"
        description="The final backend should drive these states."
        rightSlot={<StatusPill label={submitted ? "DELETE_REQUESTED" : "NOT_REQUESTED"} tone={submitted ? "warning" : "neutral"} />}
      >
        <View style={{ gap: 8 }}>
          <Text>• DELETE_REQUESTED</Text>
          <Text>• PENDING_SETTLEMENT</Text>
          <Text>• READY_TO_ANONYMIZE</Text>
          <Text>• ANONYMIZED</Text>
        </View>
      </SectionCard>

      <SectionCard title="Before you submit" description="Show blockers, impact, and unsettled items clearly.">
        <View style={{ gap: 8 }}>
          <Text>• Active queue entries may be removed or settled according to rules.</Text>
          <Text>• Wallet and order settlement must finish before anonymization.</Text>
          <Text>• Some records may stay retained for anti-fraud, tax, legal, or audit reasons.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Demo action" description="The real backend later connects POST /v1/me/delete-account-requests with idempotency protection.">
        <PrimaryButton
          label={submitted ? "Demo request submitted" : "Submit demo delete request"}
          disabled={submitted}
          variant="danger"
          onPress={() => setSubmitted(true)}
        />
        {submitted ? <Text>Your demo request is now shown as submitted. Real backend later advances the state machine.</Text> : null}
      </SectionCard>
    </Screen>
  );
}

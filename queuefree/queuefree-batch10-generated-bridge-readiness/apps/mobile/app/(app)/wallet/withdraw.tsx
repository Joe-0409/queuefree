import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import { formatMinorMoney } from "@queuefree/shared";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { TextField } from "../../../src/components/text-field";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

const schema = z.object({
  amountMinor: z
    .string()
    .regex(/^\d+$/, "Amount must be a whole-number minor unit string.")
    .min(1, "Amount is required."),
  accountName: z.string().min(2, "Please enter the account name."),
  accountNumber: z.string().min(4, "Please enter the account number.")
});

type FormValues = z.infer<typeof schema>;

export default function WithdrawScreen() {
  const { config } = useRuntimeConfig();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amountMinor: String(config.withdrawMinAmountMinor),
      accountName: "",
      accountNumber: ""
    }
  });

  const submit = form.handleSubmit((values) => {
    const amount = Number(values.amountMinor);

    if (amount < config.withdrawMinAmountMinor || amount > config.withdrawSingleMaxMinor) {
      form.setError("amountMinor", {
        type: "manual",
        message: `Amount should stay between ${formatMinorMoney(config.withdrawMinAmountMinor)} and ${formatMinorMoney(config.withdrawSingleMaxMinor)}.`
      });
      return;
    }

    setSubmitted(true);
  });

  return (
    <Screen
      title="Withdraw"
      subtitle="The MVP keeps min, single-max, and daily-max values in runtime config, not in page-level hardcoded constants."
    >
      <SectionCard title="Withdrawal limits" description="These are default fallback values until backend runtime config is connected.">
        <Text>Minimum: {formatMinorMoney(config.withdrawMinAmountMinor)}</Text>
        <Text>Single max: {formatMinorMoney(config.withdrawSingleMaxMinor)}</Text>
        <Text>Daily max: {formatMinorMoney(config.withdrawDailyMaxMinor)}</Text>
      </SectionCard>

      <SectionCard title="Submit a withdrawal" description="The real backend later connects generated withdrawal submission plus server-side risk review.">
        <Controller
          control={form.control}
          name="amountMinor"
          render={({ field, fieldState }) => (
            <TextField
              label="Amount (minor unit integer)"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="50000"
              keyboardType="number-pad"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="accountName"
          render={({ field, fieldState }) => (
            <TextField
              label="Account name"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Juan Dela Cruz"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="accountNumber"
          render={({ field, fieldState }) => (
            <TextField
              label="Account number"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="09123456789"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <PrimaryButton label="Submit demo withdrawal" onPress={submit} />
        {submitted ? <Text>Demo withdrawal submitted. Real backend later moves the status through APPLIED / RISK_REVIEW / PROCESSING / SUCCESS or failure states.</Text> : null}
      </SectionCard>
    </Screen>
  );
}

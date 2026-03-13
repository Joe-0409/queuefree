import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import { mobileTheme } from "@queuefree/ui-tokens";
import { CheckboxRow } from "../../../src/components/checkbox-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { PromoHeroCard } from "../../../src/components/promo-hero-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { TextField } from "../../../src/components/text-field";
import { useAuthStore } from "../../../src/store/auth-store";

const schema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Please enter a valid phone number.")
    .max(16, "Phone number is too long."),
  inviteCode: z.string().max(24, "Invite code is too long.").optional().or(z.literal("")),
  agreeToLegal: z.literal(true, {
    errorMap: () => ({ message: "Please agree to the privacy policy and terms before continuing." })
  })
});

type FormValues = z.infer<typeof schema>;

export default function PhoneAuthScreen() {
  const setPhoneNumber = useAuthStore((state) => state.setPhoneNumber);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phoneNumber: "",
      inviteCode: "",
      agreeToLegal: false as never
    }
  });

  const submit = form.handleSubmit((values) => {
    setPhoneNumber(values.phoneNumber);
    router.push("/(public)/auth/otp");
  });

  return (
    <Screen
      title="Phone sign in"
      subtitle="One phone number handles both registration and login. No password flow is added in MVP."
    >
      <PromoHeroCard
        eyebrow="Phone → OTP"
        title="Sign in with one clear step"
        description="Keep the flow lightweight: one phone number, optional invite code, one primary action."
        chips={[
          { label: "Market", value: "PH" },
          { label: "Language", value: "English" }
        ]}
      />

      <SectionCard title="Continue with phone" description="Country switching stays lightweight in MVP. Enter one PH-format number and proceed.">
        <Controller
          control={form.control}
          name="phoneNumber"
          render={({ field, fieldState }) => (
            <TextField
              label="Phone number"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="+63 9xx xxx xxxx"
              keyboardType="phone-pad"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="inviteCode"
          render={({ field, fieldState }) => (
            <TextField
              label="Invite code (optional)"
              value={field.value ?? ""}
              onChangeText={field.onChange}
              placeholder="QUEUEFREE2026"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="agreeToLegal"
          render={({ field, fieldState }) => (
            <View style={styles.checkboxBlock}>
              <CheckboxRow
                checked={Boolean(field.value)}
                onPress={() => field.onChange(!field.value)}
                label="I agree to the Privacy Policy and Terms of Service."
                hint="The app keeps in-app privacy, terms, support, rules, and delete-account access."
              />
              {fieldState.error ? <Text style={styles.error}>{fieldState.error.message}</Text> : null}
            </View>
          )}
        />

        <PrimaryButton label="Continue with OTP" variant="promo" size="lg" onPress={submit} />
      </SectionCard>

      <Text style={styles.helperText}>
        Demo reminder: OTP verification is still local in this batch. The visual patch does not change auth contract scope.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  checkboxBlock: {
    gap: 6
  },
  error: {
    color: mobileTheme.colors.danger,
    fontSize: 12
  },
  helperText: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18
  }
});

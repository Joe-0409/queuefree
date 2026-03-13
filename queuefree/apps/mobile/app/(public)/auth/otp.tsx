import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text } from "react-native";
import { z } from "zod";
import { mobileTheme } from "@queuefree/ui-tokens";
import { PrimaryButton } from "../../../src/components/primary-button";
import { PromoHeroCard } from "../../../src/components/promo-hero-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { TextField } from "../../../src/components/text-field";
import { useAuthStore } from "../../../src/store/auth-store";

const schema = z.object({
  otpCode: z
    .string()
    .length(6, "Please enter the 6-digit OTP.")
    .regex(/^\d+$/, "OTP should be numeric.")
});

type FormValues = z.infer<typeof schema>;

export default function OtpScreen() {
  const phoneNumber = useAuthStore((state) => state.phoneNumber);
  const login = useAuthStore((state) => state.login);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      otpCode: ""
    }
  });

  const submit = form.handleSubmit(() => {
    login(phoneNumber || "+63 912 345 6789");
    router.replace("/(app)/(tabs)/home");
  });

  return (
    <Screen
      title="Verify OTP"
      subtitle={`Enter the 6-digit code for ${phoneNumber || "your phone number"}.`}
    >
      <PromoHeroCard
        eyebrow="OTP verification"
        title="Finish sign in with one code"
        description="The real backend later verifies OTP through generated client calls. This batch keeps the visual flow ready without adding a password path."
      />

      <SectionCard title="Verification code" description="Enter any 6 digits in demo mode.">
        <Controller
          control={form.control}
          name="otpCode"
          render={({ field, fieldState }) => (
            <TextField
              label="OTP code"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="123456"
              keyboardType="number-pad"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <PrimaryButton label="Verify and enter app" variant="promo" size="lg" onPress={submit} />

        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Edit phone number</Text>
        </Pressable>
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backLink: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 4
  }
});

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text } from "react-native";
import { z } from "zod";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { PrimaryButton } from "../../../src/components/primary-button";
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
      subtitle={`We are using a demo flow now. Enter any 6 digits to continue for ${phoneNumber || "your phone number"}.`}
    >
      <SectionCard title="Step 2" description="Real backend flow later uses POST /v1/auth/otp/verify.">
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

        <PrimaryButton label="Verify and enter app" onPress={submit} />
        <PrimaryButton
          label="Back to phone step"
          variant="secondary"
          onPress={() => router.back()}
        />
      </SectionCard>

      <SectionCard title="Reminder" description="The real app must keep privacy policy, terms, support, rules, and delete account access available in-app.">
        <Text>• Language stays English for MVP</Text>
        <Text>• No country selector in MVP</Text>
        <Text>• Session refresh later uses POST /v1/auth/refresh</Text>
      </SectionCard>
    </Screen>
  );
}

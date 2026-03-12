import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { PrimaryButton } from "../../../src/components/primary-button";
import { TextField } from "../../../src/components/text-field";
import { CheckboxRow } from "../../../src/components/checkbox-row";
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
      subtitle="Use one phone number for both registration and login. Invite code binding stays optional."
    >
      <SectionCard title="Step 1" description="Enter your phone number and confirm legal consent.">
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
            <View style={{ gap: 6 }}>
              <CheckboxRow
                checked={Boolean(field.value)}
                onPress={() => field.onChange(!field.value)}
                label="I agree to the Privacy Policy and Terms of Service."
                hint="The app will keep in-app privacy, terms, support, and delete account access."
              />
              {fieldState.error ? <Text style={{ color: "#B91C1C", fontSize: 12 }}>{fieldState.error.message}</Text> : null}
            </View>
          )}
        />

        <PrimaryButton label="Send demo OTP" onPress={submit} />
      </SectionCard>

      <SectionCard title="What happens next" description="OTP success will create the user account, default wallet, and default queue guard record on the real backend.">
        <Text>• This starter uses demo flow only</Text>
        <Text>• Backend should later register and export the OTP send contract through OpenAPI</Text>
        <Text>• Frontend should swap mock flow after OpenAPI SDK is generated</Text>
      </SectionCard>
    </Screen>
  );
}

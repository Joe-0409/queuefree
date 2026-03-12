import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { TextField } from "../../../src/components/text-field";

const schema = z.object({
  fullName: z.string().min(2, "Please enter the receiver name."),
  phoneNumber: z.string().min(10, "Please enter the receiver phone."),
  line1: z.string().min(5, "Please enter the full address.")
});

type FormValues = z.infer<typeof schema>;

export default function AddressesScreen() {
  const [addresses, setAddresses] = useState([
    "Juan Dela Cruz · +63 912 345 6789 · 21 Ayala Avenue, Makati City"
  ]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      line1: ""
    }
  });

  const submit = form.handleSubmit((values) => {
    setAddresses((current) => [
      `${values.fullName} · ${values.phoneNumber} · ${values.line1}`,
      ...current
    ]);
    form.reset();
  });

  return (
    <Screen title="Addresses" subtitle="The real backend later connects address list and address save through generated client calls.">
      <SectionCard title="Saved addresses" description="Use clear shipping details before checkout.">
        <View style={{ gap: 10 }}>
          {addresses.map((item) => (
            <NavRow key={item} label={item} />
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Add new address" description="This starter keeps the form local only.">
        <Controller
          control={form.control}
          name="fullName"
          render={({ field, fieldState }) => (
            <TextField
              label="Receiver name"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Juan Dela Cruz"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="phoneNumber"
          render={({ field, fieldState }) => (
            <TextField
              label="Receiver phone"
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
          name="line1"
          render={({ field, fieldState }) => (
            <TextField
              label="Address line"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="21 Ayala Avenue, Makati City"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <PrimaryButton label="Save demo address" onPress={submit} />
        <Text>Checkout later reads the selected address snapshot, not a mutable live address object.</Text>
      </SectionCard>
    </Screen>
  );
}

# Batch 5 File Contents

## `package.json`

```json
{
  "name": "queuefree",
  "private": true,
  "version": "0.1.0",
  "packageManager": "pnpm@10.32.0",
  "engines": {
    "node": ">=22.22.0 <23"
  },
  "scripts": {
    "dev:mobile": "pnpm --filter @queuefree/mobile dev",
    "android": "pnpm --filter @queuefree/mobile android",
    "ios": "pnpm --filter @queuefree/mobile ios",
    "web:mobile": "pnpm --filter @queuefree/mobile web",
    "typecheck": "pnpm verify:registry-first-frontend && turbo run typecheck",
    "dev:web": "pnpm --filter @queuefree/web dev",
    "build:web": "pnpm --filter @queuefree/web build",
    "dev:admin": "pnpm --filter @queuefree/admin dev",
    "build:admin": "pnpm --filter @queuefree/admin build",
    "verify:registry-first-frontend": "node ./scripts/verify-registry-first-frontend.mjs",
    "typecheck:frontends": "pnpm verify:registry-first-frontend && turbo run typecheck --filter=@queuefree/shared --filter=@queuefree/ui-tokens --filter=@queuefree/api-client --filter=@queuefree/mobile --filter=@queuefree/web --filter=@queuefree/admin"
  },
  "devDependencies": {
    "turbo": "^2.4.4",
    "typescript": "^5.8.3"
  }
}

```

## `README-第5批-Registry-First前端清理与接线准备.md`

```md
# QueueFree 第 5 批：Registry-First 前端清理与接线准备

这批不是新增业务页面。

这批的目标只有两个：

1. 把前面前端骨架里不够严格的地方清理掉，重新对齐 **PRD v1.2 + 协作契约 + registry baseline**
2. 把后续 `packages/api-client` 的真正接线顺序锁回到：**registry -> OpenAPI -> generated sdk -> frontend consume**

---

## 这批修正了什么

- 删除了 `packages/api-client` 里的手写 API path 占位文件
- 把 `packages/api-client` 改回 **pre-OpenAPI placeholder**
- 把 Mobile 里的未登记环境变量清理掉，只保留 registry 已登记变量
- 把前端页面和 handoff 文档里出现的“猜测型 API path”提示语改成 **模块级说明**
- 新增一个本地校验脚本：`pnpm verify:registry-first-frontend`

---

## 你现在怎么用

### 1）打开项目

用 VS Code 打开整个项目文件夹。

### 2）安装依赖

在项目根目录打开终端，输入：

```bash
pnpm install
```

### 3）先跑这条检查

```bash
pnpm verify:registry-first-frontend
```

如果通过，你会看到：

```text
Registry-first frontend verification passed.
```

### 4）再启动你要看的前端

手机端：

```bash
pnpm dev:mobile
```

官网：

```bash
pnpm dev:web
```

后台：

```bash
pnpm dev:admin
```

### 5）这批最重要的协作顺序

从现在开始，前端这边默认遵守下面顺序：

1. 后端先补 registry
2. 后端再导出 OpenAPI
3. 再生成 `packages/api-client`
4. 前端再删 mock、接真实 SDK

前端不要反过来先猜接口。

```

## `scripts/verify-registry-first-frontend.mjs`

```js
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const generatedDir = path.join(repoRoot, 'packages', 'api-client', 'src', 'generated');
const hasGeneratedClient = fs.existsSync(generatedDir)
  && fs.readdirSync(generatedDir).some((name) => !name.startsWith('.'));

if (hasGeneratedClient) {
  console.log('Generated api-client detected. Pre-OpenAPI frontend boundary check is skipped.');
  process.exit(0);
}

const forbiddenEnvTokens = [
  'EXPO_PUBLIC_ENV_NAME',
  'EXPO_PUBLIC_ENABLE_DEMO_MODE'
];

const forbiddenApiFragments = ['/v1/', '/v1/admin'];
const allowedFilesForApiFragments = new Set([
  path.normalize('docs/contracts/queuefree-collaboration-contract-v1.2.md'),
  path.normalize('docs/registry/registry-baseline-v1.2.md')
]);

const scanRoots = [
  'apps',
  path.join('packages', 'api-client'),
  path.join('docs', 'contracts'),
  path.join('docs', 'handoffs')
];

const textExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.md', '.json']);
const violations = [];

function walk(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.turbo' || entry.name === 'dist') {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    const ext = path.extname(entry.name);
    if (!textExtensions.has(ext) && entry.name !== '.env.example') {
      continue;
    }

    const relPath = path.relative(repoRoot, fullPath);
    const normalizedRelPath = path.normalize(relPath);
    const text = fs.readFileSync(fullPath, 'utf8');

    for (const token of forbiddenEnvTokens) {
      if (text.includes(token)) {
        violations.push(`${relPath}: contains forbidden pre-registry env token ${token}`);
      }
    }

    if (!allowedFilesForApiFragments.has(normalizedRelPath)) {
      for (const fragment of forbiddenApiFragments) {
        if (text.includes(fragment)) {
          violations.push(`${relPath}: contains hard-coded API fragment ${fragment} before OpenAPI generation`);
        }
      }
    }
  }
}

for (const root of scanRoots) {
  walk(path.join(repoRoot, root));
}

const illegalManualClientFile = path.join(repoRoot, 'packages', 'api-client', 'src', 'endpoints.ts');
if (fs.existsSync(illegalManualClientFile)) {
  violations.push('packages/api-client/src/endpoints.ts should not exist before OpenAPI generation.');
}

if (violations.length > 0) {
  console.error('Registry-first frontend verification failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Registry-first frontend verification passed. No forbidden pre-OpenAPI API path or env token was found.');

```

## `packages/api-client/package.json`

```json
{
  "name": "@queuefree/api-client",
  "private": true,
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}

```

## `packages/api-client/README.md`

```md
# @queuefree/api-client

状态：Pre-OpenAPI Placeholder

这个包当前**不包含任何手写业务 API contract**。

根据 `queuefree_prd_v1_2`、协作契约、registry baseline：

- `packages/api-client` 只能由 **OpenAPI 生成**
- 前端在没有 OpenAPI 的阶段，**不能**在这里手写 path / request / response / DTO / schema
- 前端当前只能继续使用：
  - `packages/shared`
  - 各 app 内部的本地 mock / placeholder 数据

## 正确顺序

1. 后端先更新 registry（如果触碰冻结项）
2. 后端导出 OpenAPI
3. 用生成器生成 `packages/api-client`
4. 前端再从本地 mock 切换到 generated SDK

## 当前允许保留的内容

- 这个包的位置
- `src/index.ts` 的空占位入口
- `openapi/` 目录占位
- `src/generated/` 目录占位

## 当前明确不允许

- 手写 REST path 常量
- 手写请求 / 响应字段
- 手写业务 DTO
- 把 NestJS DTO / Swagger 类型复制到这里

```

## `packages/api-client/src/index.ts`

```ts
/**
 * QueueFree pre-OpenAPI placeholder.
 *
 * Do not add hand-written business contracts here.
 * Replace this file with a generated SDK entrypoint only after backend exports OpenAPI.
 */
export {};

```

## `apps/mobile/.env.example`

```dotenv
EXPO_PUBLIC_APP_ENV=local
EXPO_PUBLIC_API_BASE_URL=http://localhost:4000
EXPO_PUBLIC_WEB_BASE_URL=http://localhost:3000
EXPO_PUBLIC_SENTRY_DSN=
EXPO_PUBLIC_POSTHOG_KEY=
EXPO_PUBLIC_POSTHOG_HOST=

```

## `apps/mobile/expo-env.d.ts`

```ts
/// <reference types="expo/types" />

declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_APP_ENV?: string;
    EXPO_PUBLIC_API_BASE_URL?: string;
    EXPO_PUBLIC_WEB_BASE_URL?: string;
    EXPO_PUBLIC_SENTRY_DSN?: string;
    EXPO_PUBLIC_POSTHOG_KEY?: string;
    EXPO_PUBLIC_POSTHOG_HOST?: string;
  }
}

```

## `apps/mobile/src/lib/env.ts`

```ts
export const appEnv = {
  appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? 'local',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
  webBaseUrl: process.env.EXPO_PUBLIC_WEB_BASE_URL ?? 'http://localhost:3000',
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
  posthogKey: process.env.EXPO_PUBLIC_POSTHOG_KEY ?? '',
  posthogHost: process.env.EXPO_PUBLIC_POSTHOG_HOST ?? ''
} as const;

```

## `apps/mobile/app/(public)/auth/phone.tsx`

```tsx
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

```

## `apps/mobile/app/(public)/auth/otp.tsx`

```tsx
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
      <SectionCard title="Step 2" description="Real backend flow later verifies the OTP through generated OpenAPI client calls.">
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
        <Text>• Session refresh later comes from the generated auth client after backend exports OpenAPI</Text>
      </SectionCard>
    </Screen>
  );
}

```

## `apps/mobile/app/(app)/(tabs)/tasks.tsx`

```tsx
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { demoTasks } from "../../../src/lib/demo-data";

export default function TasksTabScreen() {
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  const claimedSet = useMemo(() => new Set(claimedIds), [claimedIds]);

  return (
    <Screen
      title="Tasks"
      subtitle="Tasks can extend retention, grant fragments, or support wallet activation paths later."
    >
      <DemoBanner />

      <SectionCard title="Task center" description="Rewards should remain traceable. Real task reads and claims must come from the generated client after backend registers the task contract.">
        <View style={{ gap: 12 }}>
          {demoTasks.map((task) => {
            const alreadyClaimed = claimedSet.has(task.id);
            return (
              <SectionCard key={task.id} title={task.title} description={task.rewardLabel}>
                <Text>Progress: {task.progressLabel}</Text>
                <Text>Status: {alreadyClaimed ? "Already claimed in demo mode" : task.claimable ? "Ready to claim" : "Not ready yet"}</Text>
                <PrimaryButton
                  label={alreadyClaimed ? "Claimed" : task.claimable ? "Claim demo reward" : "Not claimable yet"}
                  disabled={!task.claimable || alreadyClaimed}
                  onPress={() => setClaimedIds((current) => [...current, task.id])}
                />
              </SectionCard>
            );
          })}
        </View>
      </SectionCard>
    </Screen>
  );
}

```

## `apps/mobile/app/(app)/checkout/[productId].tsx`

```tsx
import { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { formatMinorMoney } from "@queuefree/shared";
import { CheckboxRow } from "../../../src/components/checkbox-row";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { getProductById } from "../../../src/lib/demo-data";

export default function CheckoutScreen() {
  const params = useLocalSearchParams<{ productId: string; quantity?: string }>();
  const productId = params.productId || "prod-earbuds";
  const quantity = Number(params.quantity ?? 1);
  const product = useMemo(() => getProductById(productId), [productId]);
  const [agreeToRules, setAgreeToRules] = useState(false);

  const totalMinor = product.priceMinor * quantity;
  const orderId = `order-${product.id}-demo`;

  return (
    <Screen
      title="Checkout"
      subtitle="The order snapshot should be fixed at checkout. Payment success later becomes the queue conversion page."
    >
      <DemoBanner />

      <SectionCard title="Shipping address" description="The real backend later uses the user's saved address list.">
        <Text>Demo address: 21 Ayala Avenue, Makati City, Metro Manila</Text>
      </SectionCard>

      <SectionCard title="Order snapshot" description="One order, one product, multiple quantity allowed.">
        <KeyValueRow label="Product" value={product.title} />
        <KeyValueRow label="Unit price" value={formatMinorMoney(product.priceMinor)} />
        <KeyValueRow label="Quantity" value={String(quantity)} />
        <KeyValueRow label="Payable total" value={formatMinorMoney(totalMinor)} emphasize />
      </SectionCard>

      <SectionCard title="Payment and rules" description="Do not use IAP / Play Billing for physical goods. Real payment providers must go through backend adapters.">
        <CheckboxRow
          checked={agreeToRules}
          onPress={() => setAgreeToRules((current) => !current)}
          label="I understand the queue rules, payment rules, and refund impact."
          hint="The real frontend later uses generated order creation and payment-intent calls after backend exports OpenAPI."
        />
      </SectionCard>

      <View style={{ gap: 12 }}>
        <PrimaryButton
          label="Pay and create demo order"
          disabled={!agreeToRules}
          onPress={() =>
            router.replace({
              pathname: "/(app)/orders/success/[orderId]",
              params: { orderId }
            })
          }
        />
        {!agreeToRules ? <Text>Please confirm the rules before continuing.</Text> : null}
      </View>
    </Screen>
  );
}

```

## `apps/mobile/app/(app)/wallet/withdraw.tsx`

```tsx
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

```

## `apps/mobile/app/(app)/me/addresses.tsx`

```tsx
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

```

## `apps/mobile/app/(app)/me/security.tsx`

```tsx
import { router } from "expo-router";
import { Text, View } from "react-native";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useAuthStore } from "../../../src/store/auth-store";

const demoDevices = [
  "iPhone 15 Pro · Manila · Active now",
  "Chrome on MacBook · Makati · 2 hours ago"
];

export default function SecurityScreen() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Screen
      title="Security"
      subtitle="Session refresh and logout later connect through generated auth client calls. Device visibility is useful for user trust and support."
    >
      <SectionCard title="Devices" description="The real backend later connects device visibility through generated client calls.">
        <View style={{ gap: 10 }}>
          {demoDevices.map((device) => (
            <NavRow key={device} label={device} />
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Session actions" description="Demo logout only clears local state.">
        <PrimaryButton
          label="Log out"
          variant="danger"
          onPress={() => {
            logout();
            router.replace("/(public)/welcome");
          }}
        />
        <Text>Session refresh and logout later come from the generated auth client after backend exports OpenAPI.</Text>
      </SectionCard>
    </Screen>
  );
}

```

## `apps/mobile/app/(app)/rules/activity/[campaignId].tsx`

```tsx
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "../../../../src/components/screen";
import { SectionCard } from "../../../../src/components/section-card";

export default function ActivityRulesScreen() {
  const params = useLocalSearchParams<{ campaignId: string }>();
  const campaignId = params.campaignId || "campaign-summer-2026";

  return (
    <Screen
      title="Activity rules"
      subtitle="Campaign and activity copy should later come from backend-managed content, not permanent page-level hardcoding."
    >
      <SectionCard title="Campaign snapshot" description={`Campaign ID: ${campaignId}`}>
        <View style={{ gap: 8 }}>
          <Text>• Activity scope may be limited to specific products or windows.</Text>
          <Text>• Activity copy should stay consistent with rule center and web public rules.</Text>
          <Text>• Rewarded ads remain off for the first review build.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Implementation note" description="This page is a starter placeholder until rules content is delivered by backend and CMS-like config.">
        <Text>Real frontend later consumes generated rules content contracts after backend registers and exports the public rules API.</Text>
      </SectionCard>
    </Screen>
  );
}

```

## `apps/mobile/app/(app)/delete-account.tsx`

```tsx
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

      <SectionCard title="Demo action" description="The real backend later connects the generated delete-account request call with idempotency protection.">
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

```

## `apps/web/src/lib/env.ts`

```ts
export const publicAppEnv = {
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? 'local',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
  webBaseUrl: process.env.NEXT_PUBLIC_WEB_BASE_URL ?? 'http://localhost:3000',
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? ''
} as const;

```

## `apps/web/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LAUNCH_WEBSITE } from '@queuefree/shared';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { publicAppEnv } from '@/lib/env';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(publicAppEnv.webBaseUrl || `https://${LAUNCH_WEBSITE}`),
  title: {
    default: 'QueueFree',
    template: '%s | QueueFree'
  },
  description: 'QueueFree public website for product overview, rules, privacy, terms, account deletion, and contact guidance.',
  openGraph: {
    title: 'QueueFree',
    description: 'Shopping-first public queue promotion with public rules and compliance pages.',
    url: `https://${LAUNCH_WEBSITE}`,
    siteName: 'QueueFree'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en-PH">
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

```

## `apps/web/app/loading.tsx`

```tsx
import { PageShell } from '@/components/page-shell';
import { Card, CardContent } from '@/components/ui/card';

export default function Loading(): React.ReactElement {
  return (
    <PageShell>
      <Card>
        <CardContent className="space-y-3 p-6">
          <div className="text-sm font-semibold text-slate-950">Loading public page</div>
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
        </CardContent>
      </Card>
    </PageShell>
  );
}

```

## `apps/web/app/error.tsx`

```tsx
'use client';

import { PageShell } from '@/components/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Error({ reset }: { error: Error; reset: () => void }): React.ReactElement {
  return (
    <PageShell>
      <Card className="border-danger/20 bg-danger-soft">
        <CardContent className="space-y-4 p-6">
          <div className="text-lg font-semibold text-slate-950">Public page error</div>
          <p className="text-sm text-slate-700">
            This public page failed to render. Retry the route. If the failure persists after real API integration, check the generated client and the deployed content source.
          </p>
          <Button onClick={reset}>Retry</Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}

```

## `apps/admin/src/lib/env.ts`

```ts
export const adminAppEnv = {
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? 'local',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
  adminBaseUrl: process.env.NEXT_PUBLIC_ADMIN_BASE_URL ?? 'http://localhost:3001',
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? ''
} as const;

```

## `apps/admin/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { adminAppEnv } from '@/lib/env';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(adminAppEnv.adminBaseUrl),
  title: {
    default: 'QueueFree Admin',
    template: '%s | QueueFree Admin'
  },
  description: 'QueueFree admin skeleton for operations, finance, risk, governance, and audit modules.'
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en-PH">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

```

## `apps/admin/app/loading.tsx`

```tsx
import { Card, CardContent } from '@/components/ui/card';

export default function Loading(): React.ReactElement {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
      <Card className="w-full max-w-xl">
        <CardContent className="space-y-3 p-6">
          <div className="text-sm font-semibold text-slate-950">Loading admin page</div>
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
        </CardContent>
      </Card>
    </div>
  );
}

```

## `apps/admin/app/error.tsx`

```tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Error({ reset }: { error: Error; reset: () => void }): React.ReactElement {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
      <Card className="w-full max-w-xl border-danger/20 bg-danger-soft">
        <CardContent className="space-y-4 p-6">
          <div className="text-lg font-semibold text-slate-950">Admin page error</div>
          <p className="text-sm text-slate-700">
            This admin route failed to render. Retry the page. If it still fails after real Admin SDK integration, check the generated client and registry updates first.
          </p>
          <Button onClick={reset}>Retry</Button>
        </CardContent>
      </Card>
    </div>
  );
}

```

## `apps/admin/app/(console)/loading.tsx`

```tsx
import { AdminShell } from '@/components/admin-shell';
import { PageShell } from '@/components/page-shell';
import { Card, CardContent } from '@/components/ui/card';

export default function ConsoleLoading(): React.ReactElement {
  return (
    <AdminShell>
      <PageShell>
        <Card>
          <CardContent className="space-y-3 p-6">
            <div className="text-sm font-semibold text-slate-950">Loading console module</div>
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
          </CardContent>
        </Card>
      </PageShell>
    </AdminShell>
  );
}

```

## `apps/admin/app/(console)/error.tsx`

```tsx
'use client';

import { AdminShell } from '@/components/admin-shell';
import { PageShell } from '@/components/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ConsoleError({ reset }: { error: Error; reset: () => void }): React.ReactElement {
  return (
    <AdminShell>
      <PageShell>
        <Card className="border-danger/20 bg-danger-soft">
          <CardContent className="space-y-4 p-6">
            <div className="text-lg font-semibold text-slate-950">Console route error</div>
            <p className="text-sm text-slate-700">
              The current admin module failed to render. Retry the route. If real data is already wired in the future, verify registry updates and generated SDK output before debugging UI code.
            </p>
            <Button onClick={reset}>Retry</Button>
          </CardContent>
        </Card>
      </PageShell>
    </AdminShell>
  );
}

```

## `docs/contracts/mobile-screen-api-map-v1.2.md`

```md
# QueueFree Mobile Screen → Backend Domain Dependency Map v1.2

状态：Pre-OpenAPI Boundary  
唯一规则源：`queuefree_prd_v1_2`

本文件**不是 API path 注册表**。  
本文件只说明：手机端每个冻结路由，后续会依赖哪个**后端模块域**。

在 backend 尚未完成 registry + OpenAPI 之前：

- 这里**不写**猜测型 REST path
- 这里**不写**请求字段 / 响应字段
- 这里**不写** DTO 结构
- 前端继续只用 `packages/shared` + 本地 mock

---

## 1. Public 路由

| 冻结路由 | 页面职责 | 后端模块域 | 当前前端状态 |
| --- | --- | --- | --- |
| `/(public)/welcome` | 欢迎、规则摘要、风险提示 | rules content | 静态说明 |
| `/(public)/auth/phone` | 手机号输入、法律同意、邀请码 | auth / invite bind policy | 本地表单 + demo flow |
| `/(public)/auth/otp` | OTP 校验、登录注册合流 | auth / session | 本地表单 + demo flow |

## 2. Tab 路由

| 冻结路由 | 页面职责 | 后端模块域 | 当前前端状态 |
| --- | --- | --- | --- |
| `/(app)/(tabs)/home` | 商品摘要、活动摘要、规则入口 | product catalog / rules content / notifications | 本地 mock |
| `/(app)/(tabs)/queue` | 队列列表、当前排名、保活状态 | queue entries / queue guard | 本地 mock |
| `/(app)/(tabs)/tasks` | 任务列表、领奖 | tasks | 本地 mock |
| `/(app)/(tabs)/invites` | 邀请码、邀请状态、奖励记录 | invites | 本地 mock |
| `/(app)/(tabs)/wallet` | 钱包总览、账变、提现记录 | wallet / withdrawals / withdrawal accounts | 本地 mock |
| `/(app)/(tabs)/me` | 资料、地址、安全、规则、删除账号入口 | profile / addresses / devices / account deletion | 本地 mock |

## 3. Detail Stack 路由

| 冻结路由 | 页面职责 | 后端模块域 | 当前前端状态 |
| --- | --- | --- | --- |
| `/(app)/product/[productId]` | 商品详情 | product catalog | 本地 mock |
| `/(app)/checkout/[productId]` | 地址选择、订单确认、支付前置 | addresses / orders / payment intents | 本地 mock |
| `/(app)/orders/success/[orderId]` | 支付成功、入队成功 | orders / queue entries / queue guard | 本地 mock |
| `/(app)/queue/[entryId]` | 队列详情、boost 展示 | queue entries / queue boost | 本地 mock |
| `/(app)/wallet/withdraw` | 提现申请 | wallet / withdrawals / withdrawal accounts | 本地表单 |
| `/(app)/me/addresses` | 地址列表、地址新增 | addresses | 本地表单 |
| `/(app)/me/security` | 设备、安全、登出 | devices / auth session | 本地 mock |
| `/(app)/rules` | 规则中心 | rules content | 静态说明 |
| `/(app)/rules/queue` | 队列规则 | rules content | 静态说明 |
| `/(app)/rules/wallet` | 钱包规则 | rules content | 静态说明 |
| `/(app)/rules/activity/[campaignId]` | 活动规则 | rules content / campaigns | 静态说明 |
| `/(app)/privacy` | 隐私政策 | public compliance content | 静态说明 |
| `/(app)/terms` | 服务条款 | public compliance content | 静态说明 |
| `/(app)/support` | 客服 / 申诉说明 | support contact content | 静态说明 |
| `/(app)/delete-account` | 删除账号说明与申请占位 | account deletion | 本地 demo flow |

---

## 4. 正确接线顺序

1. 后端先更新 registry（如果有新增冻结项）
2. 后端导出 OpenAPI
3. 重新生成 `packages/api-client`
4. 前端再把对应模块从 mock 切到 generated SDK

顺序不能反。

```

## `docs/contracts/web-public-route-map-v1.2.md`

```md
# QueueFree Web Public Route Map v1.2

状态：Drafted in Batch 3  
规则源：`queuefree_prd_v1_2` + `docs/contracts/queuefree-collaboration-contract-v1.2.md` + `docs/registry/registry-baseline-v1.2.md`

---

## 1. 本轮目标

落地 `apps/web` 的公开官网与合规页面骨架，严格遵守已经冻结的 Web 公共路由：

- `/`
- `/privacy`
- `/terms`
- `/rules`
- `/rules/queue`
- `/rules/wallet`
- `/rules/activity/[slug]`
- `/delete-account`
- `/contact`

本轮 **不新增** 路由，不修改任何已冻结路径。

---

## 2. 页面与职责映射

### `/`

用途：官网首页 / 审核首屏 / 品牌说明页

承担：

- 产品定位说明
- “买商品 -> 入队 -> 等时隙” 的公开解释
- 合规入口导航
- 首发市场与规则版本说明

### `/privacy`

用途：公开隐私政策页

承担：

- 数据收集范围说明
- 数据用途说明
- 删除与保留边界说明
- 公开规则与隐私关系说明

### `/terms`

用途：公开服务条款页

承担：

- 购物优先定位说明
- 非保证返现说明
- 风控 / 审核 / 售后影响说明
- 首发范围说明

### `/rules`

用途：规则中心首页

承担：

- 规则入口导航
- Queue / Wallet / Activity 子页分发
- 运行时参数只展示 fallback 示例，不作为业务真相源

### `/rules/queue`

用途：公开队列规则页

承担：

- 1 订单 = 1 席位
- Top30 保护区
- Boost 边界
- 冻结不参与有效排名
- 固定时隙结算说明

### `/rules/wallet`

用途：公开钱包与提现规则页

承担：

- pending / available / frozen 解释
- 钱包激活解释
- 提现门槛 fallback 示例
- 不支持充值 / 转账说明

### `/rules/activity/[slug]`

用途：公开活动规则页

承担：

- 活动规则独立 URL
- 展示活动可调整项与不可突破底线
- 作为活动链接、审核资料、投放落地页的规范页面

### `/delete-account`

用途：公开删除账号说明页

承担：

- 删除并非即时物理删除
- 阻塞项说明
- 状态机说明
- 清算后匿名化说明

### `/contact`

用途：公开客服 / 申诉入口说明页

承担：

- 联系与申诉分类说明
- 审核阶段的公开联系入口
- 后续接真实工单或邮箱时保持固定 URL 不变

---

## 3. 本轮约束

- 不新增 Web 冻结路由
- 不改 `/contact` 为 `/support`
- 不新增未登记 env var
- 不直接猜测后端规则 API 响应
- 当前页面文案以静态合规骨架为主
- 后续若切换为 CMS 或动态 rules 内容，必须以后端 OpenAPI 为准

```

## `docs/contracts/frontend-preopenapi-boundary-v1.2.md`

```md
# QueueFree Frontend Pre-OpenAPI Boundary v1.2

状态：Informational  
唯一规则源：`queuefree_prd_v1_2`

本文件不是 registry，也不是新的共享契约。

本文件只用于声明：**在 backend 还没有完成 registry + OpenAPI 之前，前端线程到底可以做什么，不能做什么。**

## 当前允许

- 做页面骨架
- 做 loading / error / empty / success feedback
- 做本地 mock 数据
- 做模块级别的 handoff 文档
- 做 `packages/api-client` 的空占位和生成说明
- 做前端目录、组件、布局、主题、格式化、导航

## 当前不允许

- 手写 REST path 常量
- 手写 request / response field
- 手写业务 DTO
- 在 `packages/api-client` 手写 SDK
- 在 `packages/shared` 混入 NestJS DTO
- 在页面文案里把猜测型 path 当成既成事实

## 正确顺序

1. backend 先更新 registry
2. backend 再导出 OpenAPI
3. 生成 `packages/api-client`
4. frontend 再切真实数据

```

## `docs/handoffs/backend-next-steps-from-mobile-batch2.md`

```md
# QueueFree 第 2 批：给后端线程的衔接说明（Batch 5 清理后版本）

唯一规则源：`queuefree_prd_v1_2`

## 当前前端状态

前端第 2 批已经完成 `apps/mobile` 路由骨架。

当前手机端：

- 只依赖 `packages/shared`
- 继续使用本地 mock / placeholder 数据
- 已经移除手写猜测型 API path 说明
- 等待后端按 registry-first 顺序补齐 OpenAPI

## 后端线程下一步正确顺序

1. 若触碰冻结项，先更新 `docs/registry/registry-baseline-v1.2.md`
2. 再导出 OpenAPI
3. 再生成 `packages/api-client`
4. 前端再逐模块替换本地 mock

## 后端优先建议的模块域

建议按下面顺序推进，不要求你在本文件里口头发明字段：

1. auth / session
2. product catalog
3. orders / payment intents
4. queue entries / queue guard / boost
5. wallet / withdrawal accounts / withdrawals
6. tasks
7. invites
8. profile / addresses / devices
9. rules content / notifications
10. account deletion

## 对后端线程的硬约束提醒

- 不要跳过 registry 直接新增 path / field / state
- 不要在没有 OpenAPI 的情况下让前端手写 contract
- 不要把 NestJS DTO / Swagger class 放进 `packages/shared`
- 前端只会消费 `packages/shared` 和生成后的 `packages/api-client`

## 当前前端最需要你输出什么

1. registry 更新（如果你新增冻结项）
2. OpenAPI 文件
3. 生成好的 `packages/api-client`
4. runtime config 的真实下发链路
5. 按模块分批可读可接的最小 SDK

```

## `docs/handoffs/server-next-steps-from-mobile-batch2.md`

```md
# QueueFree 第 2 批：给服务器线程的衔接说明（Batch 5 清理后版本）

唯一规则源：`queuefree_prd_v1_2`

## 前端第 2 批已经固定的东西

已经固定且不要再改：

- Monorepo：`apps/` + `packages/`
- Mobile：Expo + React Native + expo-router
- Web / Admin：Next.js
- `packages/shared` 已存在
- `packages/api-client` 当前回到 pre-OpenAPI placeholder
- Mobile 路由已经按 PRD 固定

## 服务器线程下一步优先做什么

### 1）环境变量分组继续按 registry 走

至少分：

- `mobile`
- `web`
- `admin`
- `api`
- `worker`
- `shared`

### 2）Mobile 公开环境变量只使用已登记项

#### mobile
- `EXPO_PUBLIC_APP_ENV`
- `EXPO_PUBLIC_API_BASE_URL`
- `EXPO_PUBLIC_WEB_BASE_URL`
- `EXPO_PUBLIC_SENTRY_DSN`
- `EXPO_PUBLIC_POSTHOG_KEY`
- `EXPO_PUBLIC_POSTHOG_HOST`

#### api / worker
- 数据库连接
- Redis 连接
- JWT secret
- 支付 provider secret
- 短信 provider secret
- Sentry DSN
- 对象存储配置

### 3）保持移动端访问入口不变

移动端后续主要连：

- 已登记的 API 域名矩阵
- 已登记的 Web 域名矩阵

不要改 public Web 固定路径：

- `/privacy`
- `/terms`
- `/rules`
- `/delete-account`
- `/contact`

### 4）把 Expo EAS 与 API 部署流程文档化

至少覆盖：

- local
- dev
- staging
- production

并明确：

- 谁负责 EAS build
- 谁负责 EAS submit
- 谁负责 Render API / Worker 部署
- 谁负责 Vercel Web / Admin 部署

## 服务器线程禁止事项

- 不要把 Web `/contact` 改回 `/support`
- 不要私自新增 mobile 公开环境变量
- 不要让 mobile 直接依赖 secret
- 不要让前端把业务阈值写进 `.env`

## 前端等你输出什么

1. 环境变量清单（按应用拆）
2. dev / staging / prod 域名表
3. Expo EAS 基本流程
4. API / Worker 部署矩阵
5. Sentry / PostHog 接入位说明
6. mobile 本地 `.env.example` 最终版

```

## `docs/handoffs/backend-next-steps-from-web-batch3.md`

```md
# 给后端线程：第 3 批 Web 官网完成后的衔接说明（Batch 5 清理后版本）

## 1. 本轮没有新增冻结项

这一批只落地了 `apps/web` 页面骨架。

没有新增：

- enum
- state
- API path
- request field
- response field
- table field
- event
- worker
- queue
- cron
- env var
- domain
- route

因此这轮 **不要求你修改 registry**。

## 2. 这批 Web 目前不消费猜测型 API

现在的官网与合规页：

- 直接消费 `packages/shared` 的硬规则常量
- 对可运营阈值只展示 fallback 示例
- 不依赖 `packages/api-client`

## 3. 你下一步需要准备什么

请你后续在后端线程补齐：

- public rules content 模块
- public compliance content 模块（如果你希望后续由后台管理）

注意：

- 如果你新增 path / field / state，先登记 registry，再生成 OpenAPI，再生成 `packages/api-client`
- Web 公开路径已经锁定，不要改 URL
- `/contact` 继续保持公开合规页面，不要改回 `/support`

## 4. 对 Web 来说你最重要的保证

- 规则内容未来即使切成动态数据，也必须保持现有公开 URL 不变
- 前端不会提前口头接字段，只会等待 registry + OpenAPI

```

## `docs/handoffs/三个对话框怎么继续发.md`

```md
# 你接下来怎么给三个对话框发消息（Batch 5 后版本，可直接复制）

## 发给前端对话框

```text
继续按 queuefree_prd_v1_2 作为唯一规则源工作，并继承 docs/contracts/queuefree-collaboration-contract-v1.2.md、docs/registry/registry-baseline-v1.2.md、已有 packages/shared、已有 packages/api-client。保持 registry-first，不发明新的共享契约；在 backend 还没更新 registry + OpenAPI 前，只允许继续做前端内部骨架、loading/error/empty、mock 占位、以及接线准备工作。
```

## 发给后端对话框

```text
继续按 queuefree_prd_v1_2 作为唯一规则源工作，并继承 docs/contracts/queuefree-collaboration-contract-v1.2.md、docs/registry/registry-baseline-v1.2.md、docs/handoffs/backend-next-steps-from-mobile-batch2.md、docs/handoffs/backend-next-steps-from-web-batch3.md、docs/handoffs/backend-next-steps-from-admin-batch4.md。当前前端已清理掉手写猜测型 API path，请严格按 registry-first 顺序：先登记，再 OpenAPI，再生成 packages/api-client。
```

## 发给服务器对话框

```text
继续按 queuefree_prd_v1_2 作为唯一规则源工作，并继承 docs/contracts/queuefree-collaboration-contract-v1.2.md、docs/registry/registry-baseline-v1.2.md、docs/handoffs/server-next-steps-from-mobile-batch2.md、docs/handoffs/server-next-steps-from-web-batch3.md、docs/handoffs/server-next-steps-from-admin-batch4.md。当前前端已对齐 registry-first，请只使用已登记的环境变量、域名和公开路径继续推进部署与 EAS 流程。
```

```

## `docs/handoffs/backend-next-steps-from-frontend-batch5.md`

```md
# Backend Next Steps from Frontend Batch 5

## 前端本轮已完成

- 清理了 `packages/api-client` 中的手写 path 占位
- 清理了 mobile 里的未登记 env var
- 清理了前端页面 / 文档里的猜测型 API path 描述
- 新增 pre-OpenAPI 边界校验脚本

## 你接下来需要做的事

1. 对新增冻结项先更新 registry
2. 按模块导出 OpenAPI
3. 生成 `packages/api-client`
4. 以模块分批给前端接线：
   - auth
   - products
   - orders / payment
   - queue / queue guard
   - wallet / withdrawals
   - tasks
   - invites
   - rules content
   - admin read-only domains

## 你当前不要做的事

- 不要跳过 registry 直接给前端口头字段
- 不要把 DTO 类型塞进 `packages/shared`
- 不要让前端手抄接口

```

## `docs/handoffs/server-next-steps-from-frontend-batch5.md`

```md
# Server Next Steps from Frontend Batch 5

## 前端本轮已完成

- Mobile 公开 env 已清理回 registry baseline
- Web / Admin 公开路由继续保持不变
- `packages/api-client` 回到 pre-OpenAPI placeholder

## 你接下来需要做的事

1. 保持当前域名矩阵不变
2. 保持当前 env 分组不变
3. 补齐 EAS / Vercel / Render / Cloudflare 的部署与发布文档
4. 准备前端需要的最终 `.env.example` 与环境矩阵说明

## 你当前不要做的事

- 不要新增未登记公开 env
- 不要更改 Web `/contact`
- 不要更改 Admin / Web / API 已登记域名基线

```

## `docs/handoffs/第5批-发给后端和服务器的话术.md`

```md
当前前端已完成第5批 registry-first 清理，请后端与服务器线程统一继承：

1. queuefree_prd_v1_2
2. docs/contracts/queuefree-collaboration-contract-v1.2.md
3. docs/registry/registry-baseline-v1.2.md
4. packages/shared
5. packages/api-client

注意：
- 前端已删除手写猜测型 API path 占位
- mobile 已移除未登记 env var
- 从现在开始，必须严格执行：先登记，再 OpenAPI，再生成 packages/api-client，再让前端接真实数据

```

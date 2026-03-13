import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
 "apps/mobile/src/store/pending-checkout-store.ts",
 "apps/mobile/src/hooks/use-pending-checkout.ts",
 "apps/mobile/src/components/pending-checkout-card.tsx",
 "apps/mobile/src/components/pending-checkout-card.stories.tsx",
 "apps/mobile/app/(app)/checkout/[productId].tsx",
 "apps/mobile/app/(app)/orders/success/[orderId].tsx",
 "apps/mobile/app/(app)/(tabs)/queue.tsx"
];

const missing = required.filter((relativePath) => !fs.existsSync(path.join(root, relativePath)));

if (missing.length > 0) {
 console.error("[QueueFree batch17] Pending checkout loop verification failed.");
 for (const file of missing) {
 console.error(`- missing: ${file}`);
 }
 process.exit(1);
}

const checkoutText = fs.readFileSync(path.join(root, "apps/mobile/app/(app)/checkout/[productId].tsx"), "utf8");
const successText = fs.readFileSync(path.join(root, "apps/mobile/app/(app)/orders/success/[orderId].tsx"), "utf8");
const queueText = fs.readFileSync(path.join(root, "apps/mobile/app/(app)/(tabs)/queue.tsx"), "utf8");
const adapterText = fs.readFileSync(path.join(root, "apps/mobile/src/adapters/mobile-read-adapter.ts"), "utf8");
const schemaText = fs.readFileSync(path.join(root, "apps/mobile/src/schemas/mobile-screen-schemas.ts"), "utf8");

for (const marker of ["PendingCheckoutCard", "useCheckoutDraft", "buildPendingCheckoutSession"]) {
 if (!checkoutText.includes(marker)) {
 console.error(`[QueueFree batch17] Checkout screen is missing ${marker}.`);
 process.exit(1);
 }
}

for (const marker of ["PendingCheckoutCard", "AWAITING_QUEUE_ENTRY", "refreshQueueState"]) {
 if (!successText.includes(marker)) {
 console.error(`[QueueFree batch17] Order success screen is missing ${marker}.`);
 process.exit(1);
 }
}

for (const marker of ["PendingCheckoutCard", "reconcileQueueEntries"]) {
 if (!queueText.includes(marker)) {
 console.error(`[QueueFree batch17] Queue screen is missing ${marker}.`);
 process.exit(1);
 }
}

for (const marker of ["state: 'QUEUE_CREATED' | 'AWAITING_QUEUE_ENTRY'", "entryId: string | null"]) {
 if (!adapterText.includes(marker)) {
 console.error(`[QueueFree batch17] OrderSuccessData is missing marker: ${marker}`);
 process.exit(1);
 }
}

for (const marker of ["z.enum(['QUEUE_CREATED', 'AWAITING_QUEUE_ENTRY'])", "entryId: z.string().min(1).nullable()", "helperText: nonEmptyStringSchema"]) {
 if (!schemaText.includes(marker)) {
 console.error(`[QueueFree batch17] orderSuccessDataSchema is missing marker: ${marker}`);
 process.exit(1);
 }
}

console.log("[QueueFree batch17] Pending checkout loop files look complete.");
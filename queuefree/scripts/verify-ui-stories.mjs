import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const requiredPaths = [
 'apps/mobile/.storybook/main.ts',
 'apps/mobile/.storybook/preview.tsx',
 'apps/mobile/src/components/promo-badge.tsx',
 'apps/mobile/src/components/promo-hero-card.tsx',
 'apps/mobile/src/components/wallet-hero-card.tsx',
 'apps/mobile/src/components/mechanism-step-strip.tsx',
 'apps/mobile/src/components/lightweight-rule-entry-row.tsx',
 'apps/mobile/src/components/product-card.tsx',
 'apps/mobile/src/components/queue-entry-card.tsx',
 'apps/mobile/src/components/slot-summary-card.tsx',
 'apps/mobile/src/components/promo-badge.stories.tsx',
 'apps/mobile/src/components/promo-hero-card.stories.tsx',
 'apps/mobile/src/components/wallet-hero-card.stories.tsx',
 'apps/mobile/src/components/mechanism-step-strip.stories.tsx',
 'apps/mobile/src/components/lightweight-rule-entry-row.stories.tsx',
 'apps/mobile/src/components/product-card.stories.tsx',
 'apps/mobile/src/components/queue-entry-card.stories.tsx',
 'apps/mobile/src/components/slot-summary-card.stories.tsx',
 'apps/mobile/src/components/primary-button.stories.tsx',
 'apps/mobile/src/components/section-card.stories.tsx',
 'apps/mobile/src/components/text-field.stories.tsx',
 'apps/mobile/src/components/pending-checkout-card.tsx',
 'apps/mobile/src/components/pending-checkout-card.stories.tsx',
 'packages/ui-tokens/src/mobile-theme.ts',
 'packages/ui-tokens/src/web-theme.ts'
];

const missing = requiredPaths.filter((relativePath) => !fs.existsSync(path.join(root, relativePath)));

if (missing.length > 0) {
 console.error('[QueueFree batch15] UI story coverage check failed.');
 for (const file of missing) {
 console.error(`- missing: ${file}`);
 }
 process.exit(1);
}

const mobileTheme = fs.readFileSync(path.join(root, 'packages/ui-tokens/src/mobile-theme.ts'), 'utf8');
const webTheme = fs.readFileSync(path.join(root, 'packages/ui-tokens/src/web-theme.ts'), 'utf8');

for (const tokenName of ['gradientStart', 'gradientEnd', 'softBackground', 'strongTextOnColor', 'badgeBackground', 'badgeText']) {
 if (!mobileTheme.includes(tokenName) || !webTheme.includes(tokenName)) {
 console.error(`[QueueFree batch15] promo token "${tokenName}" is missing from ui-tokens.`);
 process.exit(1);
 }
}

console.log('[QueueFree batch15] UI story coverage and promo tokens look complete.');
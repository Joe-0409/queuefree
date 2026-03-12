import {
  DEFAULT_RUNTIME_CONFIG,
  formatMinorMoney,
  WALLET_SUPPORTS_PEER_TRANSFER,
  WALLET_SUPPORTS_TOP_UP
} from '@queuefree/shared';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { walletRuleCards } from '@/lib/site-content';

export default function WalletRulesPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Wallet Rules"
          title="Pending, available, frozen, activation, and withdrawal boundaries"
          description="The public web page explains the wallet model without exposing internal debt handling details that are reserved for backend accounting logic."
          aside={
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">Fallback launch values</p>
              <div className="mt-5 space-y-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Minimum withdrawal: {formatMinorMoney(DEFAULT_RUNTIME_CONFIG.withdrawMinAmountMinor)}</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Single max: {formatMinorMoney(DEFAULT_RUNTIME_CONFIG.withdrawSingleMaxMinor)}</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Daily max: {formatMinorMoney(DEFAULT_RUNTIME_CONFIG.withdrawDailyMaxMinor)}</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Rewarded ads default: {DEFAULT_RUNTIME_CONFIG.rewardedAdsEnabled ? 'On' : 'Off'}</div>
              </div>
            </div>
          }
        />

        <section className="grid gap-4 lg:grid-cols-2">
          {walletRuleCards.map((item, index) => (
            <SectionCard
              key={item.title}
              title={item.title}
              body={item.body}
              tone={index === 0 ? 'warning' : index === 1 ? 'accent' : 'default'}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Wallet capabilities excluded in MVP</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <SectionCard
              title="Top-up"
              body={`Wallet top-up is ${WALLET_SUPPORTS_TOP_UP ? 'enabled' : 'disabled'} in the launch baseline.`}
              tone="danger"
            />
            <SectionCard
              title="Peer transfer"
              body={`User-to-user wallet transfer is ${WALLET_SUPPORTS_PEER_TRANSFER ? 'enabled' : 'disabled'} in the launch baseline.`}
              tone="danger"
            />
          </div>
          <div className="mt-8 space-y-4 text-sm text-slate-600">
            <p>
              Cashback is calculated from eligible product value and capped by rule-based limits. Shipping, taxes,
              packaging, and value-added fees are outside the cashback base.
            </p>
            <p>
              Refunds or after-sale changes can reduce pending cashback or trigger clawback logic after release.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

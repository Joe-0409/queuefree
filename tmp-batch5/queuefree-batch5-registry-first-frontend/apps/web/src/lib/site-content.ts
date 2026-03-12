import {
  ACCOUNT_DELETE_STATUSES,
  DEFAULT_RUNTIME_CONFIG,
  LAUNCH_CURRENCY,
  LAUNCH_LANGUAGE,
  LAUNCH_LOCALE,
  LAUNCH_MARKET,
  LAUNCH_RULE_VERSION,
  LAUNCH_TIMEZONE,
  LAUNCH_WEBSITE,
  ORDER_QUEUE_SEAT_COUNT,
  QUEUE_BOOST_MAX_PER_ENTRY,
  QUEUE_ENTRY_STATUSES,
  QUEUE_TOP_PROTECTED_COUNT,
  WALLET_SUPPORTS_PEER_TRANSFER,
  WALLET_SUPPORTS_TOP_UP,
  formatMinorMoney
} from '@queuefree/shared';

export const siteName = 'QueueFree';

export const launchBaseline = [
  { label: 'Launch market', value: LAUNCH_MARKET },
  { label: 'Currency', value: LAUNCH_CURRENCY },
  { label: 'Timezone', value: LAUNCH_TIMEZONE },
  { label: 'Locale', value: LAUNCH_LOCALE },
  { label: 'Language', value: LAUNCH_LANGUAGE },
  { label: 'Rule version', value: LAUNCH_RULE_VERSION }
] as const;

export const heroBullets = [
  'Buy real products, then join the public queue after payment succeeds.',
  'Queue settlement uses fixed slots instead of instant wins.',
  'Cashback may apply based on public rules. It is not guaranteed.',
  'Rules, privacy, terms, contact, and account deletion pages stay public on the web.'
] as const;

export const howItWorks = [
  {
    title: '1. Buy a real product',
    body: 'MVP has no cart. One order contains one product, but the quantity can be multiple.'
  },
  {
    title: '2. Payment creates one queue seat',
    body: `${ORDER_QUEUE_SEAT_COUNT} order creates ${ORDER_QUEUE_SEAT_COUNT} queue seat. Quantity changes order value, not seat count.`
  },
  {
    title: '3. Check in to keep queue entries active',
    body: 'Check-in is user-level. One daily check-in protects all of the user’s active queue orders.'
  },
  {
    title: '4. Fixed settlement slots decide winners',
    body: `Each slot settles the current valid rank #1. Frozen orders do not join valid ranking or settlement.`
  }
] as const;

export const ruleHighlights = [
  {
    title: 'Protected zone',
    body: `Top ${QUEUE_TOP_PROTECTED_COUNT} is protected. Boost cannot jump into or past the protected zone.`
  },
  {
    title: 'Boost limits',
    body: `Boost is per order and capped at ${QUEUE_BOOST_MAX_PER_ENTRY} times for each queue entry.`
  },
  {
    title: 'Wallet model',
    body: `Cashback lands in pending first, then moves to available after delivery plus the observation window.`
  },
  {
    title: 'No wallet top-up',
    body: `Wallet top-up is ${WALLET_SUPPORTS_TOP_UP ? 'enabled' : 'disabled'}, and peer transfer is ${WALLET_SUPPORTS_PEER_TRANSFER ? 'enabled' : 'disabled'} in MVP.`
  }
] as const;

export const complianceLinks = [
  { href: '/', label: 'Home' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/rules', label: 'Rules Center' },
  { href: '/delete-account', label: 'Delete Account' },
  { href: '/contact', label: 'Contact & Appeal' }
] as const;

export const queueRuleCards = [
  {
    title: 'Public queue by market',
    body: `MVP runs one public pool for the launch market ${LAUNCH_MARKET}. Cross-country mixed pools are out of scope.`
  },
  {
    title: 'Seat truth',
    body: 'Queue truth is sortScore. Displayed rank is a derived valid rank for active entries only.'
  },
  {
    title: 'Frozen entries',
    body: 'Frozen orders keep their original sort score, but stop participating in valid ranking and settlement until restored.'
  },
  {
    title: 'Settlement timing',
    body: `The default runtime fallback keeps ${DEFAULT_RUNTIME_CONFIG.defaultDailySlotCount} settlement slots per day, but actual slot schedules must come from runtime config.`
  }
] as const;

export const walletRuleCards = [
  {
    title: 'Pending balance',
    body: 'Winning a slot creates pending cashback first. Pending balance is not withdrawable.'
  },
  {
    title: 'Available balance',
    body: 'Available balance appears only after delivery is confirmed and the observation window ends.'
  },
  {
    title: 'Withdrawal thresholds',
    body: `Fallback launch values are min ${formatMinorMoney(DEFAULT_RUNTIME_CONFIG.withdrawMinAmountMinor)}, single max ${formatMinorMoney(DEFAULT_RUNTIME_CONFIG.withdrawSingleMaxMinor)}, daily max ${formatMinorMoney(DEFAULT_RUNTIME_CONFIG.withdrawDailyMaxMinor)}.`
  },
  {
    title: 'Activation gate',
    body: 'Withdrawal requires wallet activation. MVP keeps two paths: valid invite or non-social activation task.'
  }
] as const;

export const activityRulesBySlug = {
  'launch-week': {
    title: 'Launch Week Rules',
    summary: 'Launch week introduces selected products, fixed settlement slots, and public rule disclosure. No guaranteed cashback language may be used.',
    highlights: [
      'Only campaign-tagged products join the activity scope.',
      'Campaign rules can adjust cashback cap and slot density, but cannot change one order equals one queue seat.',
      'Protected zone, boost cap, and pending-to-available wallet flow remain unchanged.'
    ],
    constraints: [
      'No forced ad viewing.',
      'No sale of queue priority or probability rights.',
      'No claim of guaranteed winnings.'
    ]
  },
  'first-order-focus': {
    title: 'First Order Focus Rules',
    summary: 'This sample activity page shows how the public website explains onboarding campaigns without changing the platform’s hard rules.',
    highlights: [
      'First-order tasks can grant soft rewards such as guard hours, XP, or boost fragments.',
      'Real product purchase and public queue rules still govern eligibility.',
      'Invite rewards remain single-layer only.'
    ],
    constraints: [
      'No wallet top-up.',
      'No peer transfer.',
      'No multi-level referral structure.'
    ]
  }
} as const;

export type ActivitySlug = keyof typeof activityRulesBySlug;

export const deleteAccountBlockers = [
  'Active, frozen, or review-held queue entries still tied to the account.',
  'Pending, available, or frozen wallet balance waiting for settlement.',
  'A withdrawal request that is still processing or under review.',
  'Orders that are still unfulfilled, in after-sale handling, or waiting for delivery truth.'
] as const;

export const deleteAccountFlow = [
  'Submit a delete-account request inside the app.',
  'The account moves into delete-request or pending-settlement status depending on open business items.',
  'Active, frozen, or suspended queue entries leave ranking with the unified removal reason.',
  'After settlement completes, the account becomes ready for anonymization.',
  'MVP uses logical deletion plus PII anonymization instead of instant physical deletion.'
] as const;

export const queueStatusList = QUEUE_ENTRY_STATUSES;
export const deleteStatusList = ACCOUNT_DELETE_STATUSES;

export const privacySections = [
  {
    title: 'What data we collect',
    body: 'The MVP product flow uses phone-based sign-in, order data, queue activity, wallet records, device and risk-control signals, plus customer-support context needed to operate the service.'
  },
  {
    title: 'Why we collect it',
    body: 'Data is used to provide authentication, order fulfillment, queue settlement, wallet release, withdrawals, fraud prevention, customer support, and legal compliance.'
  },
  {
    title: 'Retention and deletion',
    body: 'Deleting the account does not always mean instant erasure. Financial, audit, order, and risk data can stay as anonymized or legally retained records when required.'
  },
  {
    title: 'Public rule transparency',
    body: `Launch website ${LAUNCH_WEBSITE} keeps public pages for rules, privacy, terms, contact, and delete-account guidance so users and app reviewers can inspect the operating model.`
  }
] as const;

export const termsSections = [
  {
    title: 'Real-goods commerce first',
    body: 'Users purchase physical goods. Queue participation is an attached promotion rule after payment succeeds and does not replace the product purchase itself.'
  },
  {
    title: 'No guaranteed cashback',
    body: 'Cashback may apply according to public queue rules, settlement slots, and wallet release conditions. No part of the service promises winnings.'
  },
  {
    title: 'Operational controls',
    body: 'Risk review, order reduction, refund handling, withdrawal review, and account deletion settlement can affect the user journey when necessary for compliance or fraud control.'
  },
  {
    title: 'Launch scope',
    body: `The first MVP launch is locked to market ${LAUNCH_MARKET}, locale ${LAUNCH_LOCALE}, currency ${LAUNCH_CURRENCY}, and timezone ${LAUNCH_TIMEZONE}.`
  }
] as const;

import {
  ACCOUNT_DELETE_STATUSES,
  ADMIN_ROLES,
  INVITE_MAX_DEPTH,
  INVITE_RELATION_STATUSES,
  LAUNCH_MARKET,
  LAUNCH_RULE_VERSION,
  LAUNCH_TIMEZONE,
  ORDER_STATUSES,
  QUEUE_BOOST_MAX_PER_ENTRY,
  QUEUE_ENTRY_STATUSES,
  QUEUE_TOP_PROTECTED_COUNT,
  SETTLEMENT_SLOT_STATUSES,
  USER_QUEUE_GUARD_STATUSES,
  WALLET_ACTIVATION_METHODS,
  WITHDRAWAL_STATUSES,
  formatDateTime,
  formatMinorMoney
} from '@queuefree/shared';
import type { BadgeTone } from '@/components/ui/badge';
import type { DataTableConfig } from '@/components/ui/data-table';

export type Metric = {
  title: string;
  value: string;
  description: string;
  tone?: BadgeTone;
};

export type ListPageConfig = {
  eyebrow: string;
  title: string;
  description: string;
  meta: string[];
  metrics: Metric[];
  tableTitle: string;
  tableDescription: string;
  table: DataTableConfig;
  secondaryTable?: DataTableConfig & {
    title: string;
    description: string;
  };
  notes: string[];
};

export type DetailSection = {
  title: string;
  description: string;
  rows: Array<{
    label: string;
    value: string;
  }>;
};

export type DetailPageConfig = {
  eyebrow: string;
  title: string;
  description: string;
  meta: string[];
  badgeLabel: string;
  badgeTone: BadgeTone;
  backHref: string;
  metrics: Metric[];
  sections: DetailSection[];
  actions: string[];
  notes: string[];
  relatedLinks: Array<{
    href: string;
    label: string;
  }>;
};

const generatedAt = formatDateTime('2026-03-11T08:00:00.000Z');
const nextSlotAt = formatDateTime('2026-03-11T12:00:00.000Z');
const lastDeliveryAt = formatDateTime('2026-03-10T06:15:00.000Z');

function statusTone(value: string): BadgeTone {
  if (value.includes('FAILED') || value.includes('REJECTED') || value.includes('REMOVED') || value.includes('INVALID')) {
    return 'danger';
  }

  if (value.includes('FROZEN') || value.includes('RISK') || value.includes('PENDING') || value.includes('GRACE')) {
    return 'warning';
  }

  if (value.includes('SUCCESS') || value.includes('SUCCEEDED') || value.includes('ACTIVE') || value.includes('EFFECTIVE')) {
    return 'accent';
  }

  return 'brand';
}

export const dashboardMetrics: Metric[] = [
  {
    title: 'Active queue entries',
    value: '1,284',
    description: `Includes only ${QUEUE_ENTRY_STATUSES[1]} entries eligible for slot settlement.`,
    tone: 'accent'
  },
  {
    title: 'Pending release',
    value: formatMinorMoney(486500),
    description: 'Won orders remain in pending balance until delivery plus observation period.',
    tone: 'warning'
  },
  {
    title: 'Withdrawals in review',
    value: '27',
    description: `Pipeline spans ${WITHDRAWAL_STATUSES[1]} and ${WITHDRAWAL_STATUSES[2]} only.`,
    tone: 'brand'
  },
  {
    title: 'Open risk backlog',
    value: '14',
    description: 'Orders, invites, and withdrawals awaiting manual decision.',
    tone: 'danger'
  }
];

export const dashboardQueueTable: DataTableConfig = {
  columns: [
    { key: 'module', label: 'Module' },
    { key: 'snapshot', label: 'Snapshot' },
    { key: 'note', label: 'Current note' }
  ],
  rows: [
    {
      module: 'Queue protection',
      snapshot: `${QUEUE_TOP_PROTECTED_COUNT} protected positions`,
      note: 'Boost cannot enter or cross the protected zone.'
    },
    {
      module: 'Boost limit',
      snapshot: `${QUEUE_BOOST_MAX_PER_ENTRY} per order`,
      note: 'Still a placeholder action in Admin until write contracts are registered.'
    },
    {
      module: 'Next slot',
      snapshot: nextSlotAt,
      note: 'Slot execution and replay controls remain non-functional in this batch.'
    }
  ]
};

export const dashboardWalletTable: DataTableConfig = {
  columns: [
    { key: 'scope', label: 'Scope' },
    { key: 'status', label: 'Status' },
    { key: 'amount', label: 'Amount', align: 'right' },
    { key: 'note', label: 'Note' }
  ],
  rows: [
    {
      scope: 'Pending cashback release',
      status: { label: QUEUE_ENTRY_STATUSES[5], tone: statusTone(QUEUE_ENTRY_STATUSES[5]) },
      amount: formatMinorMoney(486500),
      note: 'Delivery observation window still applies.'
    },
    {
      scope: 'Withdrawals awaiting finance',
      status: { label: WITHDRAWAL_STATUSES[1], tone: statusTone(WITHDRAWAL_STATUSES[1]) },
      amount: formatMinorMoney(193000),
      note: 'Finance decision remains a placeholder.'
    },
    {
      scope: 'Withdrawals processing',
      status: { label: WITHDRAWAL_STATUSES[2], tone: statusTone(WITHDRAWAL_STATUSES[2]) },
      amount: formatMinorMoney(72500),
      note: 'No payout provider integration in this batch.'
    }
  ]
};

export const dashboardBacklogTable: DataTableConfig = {
  columns: [
    { key: 'lane', label: 'Lane' },
    { key: 'count', label: 'Count', align: 'right' },
    { key: 'priority', label: 'Priority' },
    { key: 'note', label: 'Next contract dependency' }
  ],
  rows: [
    {
      lane: 'Order aftersale review',
      count: '8',
      priority: { label: 'High', tone: 'warning' },
      note: 'Requires registered Admin order action payload.'
    },
    {
      lane: 'Queue removal review',
      count: '5',
      priority: { label: 'High', tone: 'warning' },
      note: 'Requires registered Admin queue action payload.'
    },
    {
      lane: 'Withdrawal review',
      count: '27',
      priority: { label: 'Critical', tone: 'danger' },
      note: 'Needs registered Admin withdrawal decision contract.'
    },
    {
      lane: 'Risk case decision',
      count: '14',
      priority: { label: 'Critical', tone: 'danger' },
      note: 'Needs registered risk decision payload and audit reason contract.'
    }
  ]
};

export const dashboardRiskNotes = [
  'No Admin API path has been added in this batch. The app is route-safe, not data-complete.',
  'The frontend will not invent request or response fields for approvals, actions, or audit reasons.',
  `Shared rule version remains locked to ${LAUNCH_RULE_VERSION} for market ${LAUNCH_MARKET}.`,
  'Any new Admin mutation must update the registry baseline first, then OpenAPI, then packages/api-client.'
];

function baseMeta(): string[] {
  return [`Market: ${LAUNCH_MARKET}`, `Timezone: ${LAUNCH_TIMEZONE}`, `Rule: ${LAUNCH_RULE_VERSION}`, `Snapshot: ${generatedAt}`];
}

const listConfigs: Record<
  'products' | 'orders' | 'queues' | 'slots' | 'campaigns' | 'tasks' | 'invites' | 'wallet' | 'withdrawals' | 'risk' | 'governance' | 'audit',
  ListPageConfig
> = {
  products: {
    eyebrow: 'Operations · Products',
    title: 'Products',
    description: 'Skeleton list for catalog, queue eligibility, and campaign binding under the frozen /products route.',
    meta: baseMeta(),
    metrics: [
      { title: 'Sellable in PH', value: '18', description: 'Products currently exposed to the single launch market.', tone: 'accent' },
      { title: 'Queue enabled', value: '13', description: 'Only queue-eligible products may create queue seats.', tone: 'brand' },
      { title: 'Campaign bound', value: '4', description: 'Products with active campaign binding placeholders.', tone: 'warning' },
      { title: 'Needs stock review', value: '2', description: 'Placeholder flag for stock and pricing validation.', tone: 'danger' }
    ],
    tableTitle: 'Catalog placeholder rows',
    tableDescription: 'These rows are presentation-only and do not imply a final Admin API response.',
    table: {
      columns: [
        { key: 'productId', label: 'Product ID' },
        { key: 'market', label: 'Market' },
        { key: 'queue', label: 'Queue' },
        { key: 'campaign', label: 'Campaign binding' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          productId: 'prod-demo-101',
          market: 'PH',
          queue: { label: 'Enabled', tone: 'accent' },
          campaign: 'March Starter Promo',
          note: 'Queueable consumer gadget bundle.'
        },
        {
          productId: 'prod-demo-202',
          market: 'PH',
          queue: { label: 'Disabled', tone: 'warning' },
          campaign: 'None',
          note: 'Inventory or fulfilment review required before queue enablement.'
        },
        {
          productId: 'prod-demo-303',
          market: 'PH',
          queue: { label: 'Enabled', tone: 'accent' },
          campaign: 'Queue Booster Week',
          note: 'Keep activity rules copy aligned with public website.'
        }
      ]
    },
    secondaryTable: {
      title: 'Why the page stays static',
      description: 'Product CRUD and SKU editing need registered Admin contracts before implementation.',
      columns: [
        { key: 'module', label: 'Need' },
        { key: 'status', label: 'Current state' },
        { key: 'dependency', label: 'Dependency' }
      ],
      rows: [
        {
          module: 'Product list API',
          status: { label: 'Not connected', tone: 'warning' },
          dependency: 'Register Admin read-only product contract.'
        },
        {
          module: 'Product write actions',
          status: { label: 'Blocked', tone: 'danger' },
          dependency: 'Register product CRUD payloads and audit reason fields.'
        }
      ]
    },
    notes: [
      'No product DTO or Swagger type has been copied into frontend code.',
      'Queue enablement remains visual-only until Admin write endpoints are registered.',
      'Campaign binding stays descriptive so frontend does not invent nested product schemas.'
    ]
  },
  orders: {
    eyebrow: 'Operations · Orders',
    title: 'Orders',
    description: 'Skeleton list for order lookup, fulfilment visibility, and aftersale notes.',
    meta: baseMeta(),
    metrics: [
      { title: 'Paid orders', value: '162', description: `Rows commonly show ${ORDER_STATUSES[2]} or later lifecycle stages.`, tone: 'accent' },
      { title: 'Awaiting fulfilment', value: '37', description: ORDER_STATUSES[3], tone: 'brand' },
      { title: 'Aftersale open', value: '9', description: ORDER_STATUSES[8], tone: 'warning' },
      { title: 'Refund risk', value: '4', description: `${ORDER_STATUSES[9]} or ${ORDER_STATUSES[10]} need queue clawback review.`, tone: 'danger' }
    ],
    tableTitle: 'Order placeholder rows',
    tableDescription: 'List page aligns to PRD order management scope without inventing Admin action payloads.',
    table: {
      columns: [
        { key: 'orderId', label: 'Order ID' },
        { key: 'status', label: 'Status' },
        { key: 'queueSeat', label: 'Queue seat' },
        { key: 'amount', label: 'Paid amount', align: 'right' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          orderId: 'ord-demo-5001',
          status: { label: ORDER_STATUSES[2], tone: statusTone(ORDER_STATUSES[2]) },
          queueSeat: '1 seat',
          amount: formatMinorMoney(159900),
          note: 'Ready for queue entry creation after risk pass.'
        },
        {
          orderId: 'ord-demo-5002',
          status: { label: ORDER_STATUSES[8], tone: statusTone(ORDER_STATUSES[8]) },
          queueSeat: '1 seat',
          amount: formatMinorMoney(219900),
          note: 'Aftersale review may imply cashback clawback later.'
        },
        {
          orderId: 'ord-demo-5003',
          status: { label: ORDER_STATUSES[5], tone: statusTone(ORDER_STATUSES[5]) },
          queueSeat: '1 seat',
          amount: formatMinorMoney(89900),
          note: 'Delivery timestamp becomes truth source for pending release countdown.'
        }
      ]
    },
    notes: [
      'No hidden order mutation is wired here. Batch 4 is read-only by design.',
      'Backend order adjustment, refund entry, and logistics write operations must be registered before frontend actions exist.',
      'The table is a placeholder screen, not a final API response contract.'
    ]
  },
  queues: {
    eyebrow: 'Operations · Queues',
    title: 'Queues',
    description: 'Skeleton list for queue pool health, effective rank visibility, and freeze or removal review.',
    meta: baseMeta(),
    metrics: [
      { title: 'Active entries', value: '1,284', description: QUEUE_ENTRY_STATUSES[1], tone: 'accent' },
      { title: 'Frozen entries', value: '86', description: QUEUE_ENTRY_STATUSES[2], tone: 'warning' },
      { title: 'Winning pending release', value: '21', description: QUEUE_ENTRY_STATUSES[5], tone: 'brand' },
      { title: 'Removed entries', value: '48', description: QUEUE_ENTRY_STATUSES[4], tone: 'danger' }
    ],
    tableTitle: 'Queue entry placeholder rows',
    tableDescription: 'Current effective rank is descriptive only; no queue write actions are attached.',
    table: {
      columns: [
        { key: 'entryId', label: 'Entry ID' },
        { key: 'status', label: 'Status' },
        { key: 'effectiveRank', label: 'Effective rank', align: 'right' },
        { key: 'boostUsed', label: 'Boost used', align: 'right' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          entryId: 'qe-demo-9001',
          status: { label: QUEUE_ENTRY_STATUSES[1], tone: statusTone(QUEUE_ENTRY_STATUSES[1]) },
          effectiveRank: '31',
          boostUsed: '2 / 2',
          note: `Best possible boost insertion still stops at rank ${QUEUE_TOP_PROTECTED_COUNT + 1}.`
        },
        {
          entryId: 'qe-demo-9002',
          status: { label: QUEUE_ENTRY_STATUSES[2], tone: statusTone(QUEUE_ENTRY_STATUSES[2]) },
          effectiveRank: '—',
          boostUsed: '1 / 2',
          note: `User guard is currently ${USER_QUEUE_GUARD_STATUSES[1]}.`
        },
        {
          entryId: 'qe-demo-9003',
          status: { label: QUEUE_ENTRY_STATUSES[5], tone: statusTone(QUEUE_ENTRY_STATUSES[5]) },
          effectiveRank: 'Winner',
          boostUsed: '0 / 2',
          note: 'Pending release remains blocked until delivery plus observation window.'
        }
      ]
    },
    notes: [
      'Queue ranking, freeze, restore, and remove operations must remain backend-transactional and are not wired in this batch.',
      `Boost rules still follow shared hard limits: max ${QUEUE_BOOST_MAX_PER_ENTRY} per order and no crossing the Top${QUEUE_TOP_PROTECTED_COUNT}.`,
      'Event log rows are placeholders only until a read contract is registered.'
    ]
  },
  slots: {
    eyebrow: 'Operations · Slots',
    title: 'Settlement slots',
    description: 'Skeleton list for slot scheduling, execution outcome, and replay surfaces.',
    meta: baseMeta(),
    metrics: [
      { title: 'Scheduled today', value: '3', description: 'Default daily slot count fallback for MVP launch.', tone: 'brand' },
      { title: 'Running now', value: '1', description: SETTLEMENT_SLOT_STATUSES[1], tone: 'warning' },
      { title: 'Succeeded', value: '8', description: SETTLEMENT_SLOT_STATUSES[2], tone: 'accent' },
      { title: 'Needs replay', value: '1', description: `${SETTLEMENT_SLOT_STATUSES[3]} or ${SETTLEMENT_SLOT_STATUSES[4]}`, tone: 'danger' }
    ],
    tableTitle: 'Slot placeholder rows',
    tableDescription: 'Rows reflect fixed-slot settlement thinking, but not a final Admin slot API shape.',
    table: {
      columns: [
        { key: 'slotId', label: 'Slot ID' },
        { key: 'status', label: 'Status' },
        { key: 'market', label: 'Market' },
        { key: 'slotAt', label: 'Slot at' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          slotId: 'slot-20260311-1200',
          status: { label: SETTLEMENT_SLOT_STATUSES[0], tone: statusTone(SETTLEMENT_SLOT_STATUSES[0]) },
          market: 'PH',
          slotAt: nextSlotAt,
          note: 'Scheduled slot awaiting dispatcher trigger.'
        },
        {
          slotId: 'slot-20260311-1600',
          status: { label: SETTLEMENT_SLOT_STATUSES[1], tone: statusTone(SETTLEMENT_SLOT_STATUSES[1]) },
          market: 'PH',
          slotAt: formatDateTime('2026-03-11T08:00:00.000Z'),
          note: 'Execution in progress. Replay controls stay disabled.'
        },
        {
          slotId: 'slot-20260310-2000',
          status: { label: SETTLEMENT_SLOT_STATUSES[4], tone: statusTone(SETTLEMENT_SLOT_STATUSES[4]) },
          market: 'PH',
          slotAt: formatDateTime('2026-03-10T12:00:00.000Z'),
          note: 'Replay placeholder only. Needs registered Admin replay action.'
        }
      ]
    },
    notes: [
      'Slot create, retry, and replay actions are intentionally not wired.',
      'Frontend does not invent winner payloads or settlement replay schemas.',
      'Slot timestamps remain displayed in the locked launch timezone.'
    ]
  },
  campaigns: {
    eyebrow: 'Operations · Campaigns',
    title: 'Campaigns',
    description: 'Skeleton list for campaign scope, cashback caps, extra slots, and public rules-copy surfaces.',
    meta: baseMeta(),
    metrics: [
      { title: 'Active campaigns', value: '4', description: 'Campaign shell only. No live write path in this batch.', tone: 'brand' },
      { title: 'Bound products', value: '9', description: 'Presentation-only count for product scope.', tone: 'accent' },
      { title: 'Extra slots planned', value: '2', description: 'Extra slot scheduling remains a placeholder.', tone: 'warning' },
      { title: 'Copy review needed', value: '1', description: 'Public activity rules page must stay aligned with admin configuration.', tone: 'danger' }
    ],
    tableTitle: 'Campaign placeholder rows',
    tableDescription: 'Campaign visuals help align frontend and backend without inventing a final contract.',
    table: {
      columns: [
        { key: 'campaignId', label: 'Campaign ID' },
        { key: 'status', label: 'Lifecycle' },
        { key: 'cap', label: 'Cashback cap', align: 'right' },
        { key: 'slotMode', label: 'Slot mode' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          campaignId: 'cmp-march-starter',
          status: { label: 'Drafted in skeleton', tone: 'warning' },
          cap: formatMinorMoney(200000),
          slotMode: 'Default slots',
          note: 'Keep public rules text synchronized after real contract registration.'
        },
        {
          campaignId: 'cmp-queue-booster',
          status: { label: 'Placeholder active', tone: 'accent' },
          cap: formatMinorMoney(150000),
          slotMode: 'Extra slot requested',
          note: 'Additional slot logic must stay backend-driven.'
        }
      ]
    },
    notes: [
      'Campaign rules text is a UI placeholder, not the public rules truth source.',
      'Frontend will not infer product inclusion arrays or campaign write payloads.',
      'Any new campaign route or field must be registered first.'
    ]
  },
  tasks: {
    eyebrow: 'Operations · Tasks',
    title: 'Tasks',
    description: 'Skeleton list for task definitions, lifecycle notes, and reward placeholder content.',
    meta: baseMeta(),
    metrics: [
      { title: 'New user tasks', value: '5', description: 'First-session education and activation placeholders.', tone: 'brand' },
      { title: 'Daily tasks', value: '3', description: 'Recurring participation shells only.', tone: 'accent' },
      { title: 'Trust tasks', value: '2', description: 'Manual verification surfaces not wired yet.', tone: 'warning' },
      { title: 'Needs reward contract', value: '4', description: 'Task reward payloads are not registered yet.', tone: 'danger' }
    ],
    tableTitle: 'Task placeholder rows',
    tableDescription: 'Tasks remain descriptive so frontend does not invent Admin task payloads.',
    table: {
      columns: [
        { key: 'taskId', label: 'Task ID' },
        { key: 'scope', label: 'Scope' },
        { key: 'reward', label: 'Reward hint' },
        { key: 'status', label: 'Lifecycle' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          taskId: 'task-checkin-streak',
          scope: 'Daily',
          reward: 'Guard time or soft incentive',
          status: { label: 'Skeleton only', tone: 'warning' },
          note: 'Do not finalize reward schema without registry registration.'
        },
        {
          taskId: 'task-first-order',
          scope: 'New user',
          reward: 'Onboarding reward',
          status: { label: 'Skeleton only', tone: 'warning' },
          note: 'Task claim endpoints already exist for C-end, Admin config does not yet.'
        }
      ]
    },
    notes: [
      'This page does not invent task definition fields or write payloads.',
      'Task lifecycle labels are local presentation content, not shared enums.',
      'Backend should register task admin read and write contracts separately.'
    ]
  },
  invites: {
    eyebrow: 'Operations · Invites',
    title: 'Invites',
    description: 'Skeleton list for invite relation lookup, effectiveness review, and activation notes.',
    meta: baseMeta(),
    metrics: [
      { title: 'Bound relations', value: '240', description: INVITE_RELATION_STATUSES[0], tone: 'brand' },
      { title: 'Pending effective', value: '31', description: INVITE_RELATION_STATUSES[1], tone: 'warning' },
      { title: 'Effective', value: '179', description: INVITE_RELATION_STATUSES[2], tone: 'accent' },
      { title: 'Invalid', value: '12', description: INVITE_RELATION_STATUSES[3], tone: 'danger' }
    ],
    tableTitle: 'Invite placeholder rows',
    tableDescription: 'Relation status and wallet activation hints use only shared frozen values.',
    table: {
      columns: [
        { key: 'relationId', label: 'Relation ID' },
        { key: 'status', label: 'Status' },
        { key: 'activation', label: 'Wallet activation' },
        { key: 'depth', label: 'Depth', align: 'right' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          relationId: 'inv-rel-1001',
          status: { label: INVITE_RELATION_STATUSES[2], tone: statusTone(INVITE_RELATION_STATUSES[2]) },
          activation: WALLET_ACTIVATION_METHODS[0],
          depth: String(INVITE_MAX_DEPTH),
          note: 'Effective after cooling-off and qualifying behavior.'
        },
        {
          relationId: 'inv-rel-1002',
          status: { label: INVITE_RELATION_STATUSES[1], tone: statusTone(INVITE_RELATION_STATUSES[1]) },
          activation: WALLET_ACTIVATION_METHODS[1],
          depth: String(INVITE_MAX_DEPTH),
          note: 'Awaiting effectivity window.'
        },
        {
          relationId: 'inv-rel-1003',
          status: { label: INVITE_RELATION_STATUSES[3], tone: statusTone(INVITE_RELATION_STATUSES[3]) },
          activation: WALLET_ACTIVATION_METHODS[2],
          depth: String(INVITE_MAX_DEPTH),
          note: 'Invalidation reason must come from backend once contract is registered.'
        }
      ]
    },
    notes: [
      'Invite relation detail pages remain display-only.',
      'No extra invite depth or unofficial status has been introduced.',
      'Wallet activation method labels come from shared frozen enums only.'
    ]
  },
  wallet: {
    eyebrow: 'Funds · Wallet',
    title: 'Wallet',
    description: 'Skeleton overview for user wallet balances, activation hints, and append-only ledger placeholders.',
    meta: baseMeta(),
    metrics: [
      { title: 'Pending balance', value: formatMinorMoney(486500), description: 'Waiting for delivery and observation completion.', tone: 'warning' },
      { title: 'Available balance', value: formatMinorMoney(265200), description: 'Presentation-only amount for payout review shell.', tone: 'accent' },
      { title: 'Frozen balance', value: formatMinorMoney(82200), description: 'May be affected by risk, review, or clawback handling.', tone: 'brand' },
      { title: 'Exceptions flagged', value: '3', description: 'Front-end will not display negative wallet balances.', tone: 'danger' }
    ],
    tableTitle: 'Wallet overview placeholder rows',
    tableDescription: 'Wallet rows are user-facing summaries, not a final admin ledger schema.',
    table: {
      columns: [
        { key: 'scope', label: 'Scope' },
        { key: 'pending', label: 'Pending', align: 'right' },
        { key: 'available', label: 'Available', align: 'right' },
        { key: 'frozen', label: 'Frozen', align: 'right' },
        { key: 'note', label: 'Finance note' }
      ],
      rows: [
        {
          scope: 'user-demo-1001',
          pending: formatMinorMoney(125000),
          available: formatMinorMoney(63200),
          frozen: formatMinorMoney(0),
          note: `Last delivery reference: ${lastDeliveryAt}`
        },
        {
          scope: 'user-demo-2008',
          pending: formatMinorMoney(0),
          available: formatMinorMoney(94200),
          frozen: formatMinorMoney(17500),
          note: 'Frozen amount under manual review.'
        },
        {
          scope: 'user-demo-3011',
          pending: formatMinorMoney(361500),
          available: formatMinorMoney(107800),
          frozen: formatMinorMoney(64700),
          note: 'Potential exception note only; internal debt remains backend-only.'
        }
      ]
    },
    secondaryTable: {
      title: 'Activation and ledger placeholders',
      description: 'Activation methods use frozen shared enums. Ledger remains append-only in backend design.',
      columns: [
        { key: 'topic', label: 'Topic' },
        { key: 'value', label: 'Current placeholder' },
        { key: 'note', label: 'Why it matters' }
      ],
      rows: [
        {
          topic: 'Activation methods',
          value: WALLET_ACTIVATION_METHODS.join(', '),
          note: 'UI copy must stay aligned with backend wallet-activation truth.'
        },
        {
          topic: 'Account deletion guard',
          value: ACCOUNT_DELETE_STATUSES.join(', '),
          note: 'Delete-account readiness may depend on wallet settlement completion.'
        }
      ]
    },
    notes: [
      'No ledger API contract has been invented here.',
      'Recoverable debt remains backend-internal and is not surfaced as a negative visible balance.',
      'Withdrawal and risk linkage remain placeholders until registered contracts exist.'
    ]
  },
  withdrawals: {
    eyebrow: 'Funds · Withdrawals',
    title: 'Withdrawals',
    description: 'Skeleton list for withdrawal pipeline, finance review, and payout placeholder handling.',
    meta: baseMeta(),
    metrics: [
      { title: 'Applied', value: '41', description: WITHDRAWAL_STATUSES[0], tone: 'brand' },
      { title: 'Risk review', value: '18', description: WITHDRAWAL_STATUSES[1], tone: 'warning' },
      { title: 'Processing', value: '9', description: WITHDRAWAL_STATUSES[2], tone: 'accent' },
      { title: 'Rejected or failed', value: '5', description: `${WITHDRAWAL_STATUSES[4]} / ${WITHDRAWAL_STATUSES[5]}`, tone: 'danger' }
    ],
    tableTitle: 'Withdrawal placeholder rows',
    tableDescription: 'List rows use only frozen withdrawal statuses and no unregistered action payloads.',
    table: {
      columns: [
        { key: 'withdrawalId', label: 'Withdrawal ID' },
        { key: 'status', label: 'Status' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'channel', label: 'Channel' },
        { key: 'note', label: 'Finance note' }
      ],
      rows: [
        {
          withdrawalId: 'wd-20260311-001',
          status: { label: WITHDRAWAL_STATUSES[1], tone: statusTone(WITHDRAWAL_STATUSES[1]) },
          amount: formatMinorMoney(30000),
          channel: 'Bank placeholder',
          note: 'Needs risk review and finance context.'
        },
        {
          withdrawalId: 'wd-20260311-014',
          status: { label: WITHDRAWAL_STATUSES[2], tone: statusTone(WITHDRAWAL_STATUSES[2]) },
          amount: formatMinorMoney(80000),
          channel: 'Wallet-to-bank placeholder',
          note: 'No payout provider status mapping in batch 4.'
        },
        {
          withdrawalId: 'wd-20260310-022',
          status: { label: WITHDRAWAL_STATUSES[4], tone: statusTone(WITHDRAWAL_STATUSES[4]) },
          amount: formatMinorMoney(45000),
          channel: 'Bank placeholder',
          note: 'Rejection reason is not modeled here until registered.'
        }
      ]
    },
    notes: [
      'Approval, rejection, and payout operations are intentionally disabled.',
      'No rejection-reason schema has been invented.',
      'Withdrawal actions must include audit and idempotency handling once backend registers them.'
    ]
  },
  risk: {
    eyebrow: 'Funds & Risk · Cases',
    title: 'Risk cases',
    description: 'Skeleton case pool for abnormal orders, invites, withdrawals, and queue reviews.',
    meta: baseMeta(),
    metrics: [
      { title: 'Queue-related cases', value: '5', description: 'Freeze, remove, and restore review placeholders.', tone: 'warning' },
      { title: 'Order-related cases', value: '3', description: 'Split-order and aftersale risk shells.', tone: 'danger' },
      { title: 'Invite-related cases', value: '2', description: 'Effectivity and invalidation review shells.', tone: 'brand' },
      { title: 'Withdrawal-related cases', value: '4', description: 'Manual payout review remains blocked until contract registration.', tone: 'accent' }
    ],
    tableTitle: 'Risk case placeholder rows',
    tableDescription: 'This page avoids new risk enums and keeps status language local to the screen.',
    table: {
      columns: [
        { key: 'caseId', label: 'Case ID' },
        { key: 'objectType', label: 'Object type' },
        { key: 'signal', label: 'Primary signal' },
        { key: 'priority', label: 'Priority' },
        { key: 'note', label: 'Current note' }
      ],
      rows: [
        {
          caseId: 'risk-1001',
          objectType: 'Withdrawal',
          signal: 'High-value payout review',
          priority: { label: 'Critical', tone: 'danger' },
          note: 'Awaiting registered decision payload.'
        },
        {
          caseId: 'risk-1002',
          objectType: 'Order',
          signal: 'Rapid split-order pattern',
          priority: { label: 'High', tone: 'warning' },
          note: 'May affect queue eligibility if backend confirms.'
        },
        {
          caseId: 'risk-1003',
          objectType: 'Invite',
          signal: 'Effectivity exception',
          priority: { label: 'Medium', tone: 'brand' },
          note: 'Review relation lifecycle against invite rules.'
        }
      ]
    },
    notes: [
      'This page intentionally avoids inventing a frozen risk-status enum.',
      'Decision, freeze, and release actions require registry-first payload registration.',
      'Case linkage to orders, invites, withdrawals, and queues stays descriptive only.'
    ]
  },
  governance: {
    eyebrow: 'Governance',
    title: 'Governance',
    description: 'Skeleton governance surface for RBAC, role matrix, and sensitive-operation approval notes.',
    meta: baseMeta(),
    metrics: [
      { title: 'Roles registered', value: String(ADMIN_ROLES.length), description: 'Only frozen Admin roles are displayed.', tone: 'brand' },
      { title: 'Sensitive domains', value: '4', description: 'Funds, risk, governance, and queue-control surfaces.', tone: 'warning' },
      { title: 'Approval notes required', value: '6', description: 'Placeholder count for sensitive write actions.', tone: 'accent' },
      { title: 'Blocked write flows', value: '8', description: 'No real write flow until contract registration.', tone: 'danger' }
    ],
    tableTitle: 'Role matrix placeholder',
    tableDescription: 'Role names come directly from shared frozen enums. Scope text is UI-only.',
    table: {
      columns: [
        { key: 'role', label: 'Role' },
        { key: 'scope', label: 'Primary scope' },
        { key: 'restricted', label: 'Sensitive limit' },
        { key: 'note', label: 'Governance note' }
      ],
      rows: ADMIN_ROLES.map((role) => ({
        role,
        scope:
          role === 'SUPER_ADMIN'
            ? 'All modules'
            : role === 'OPS_ADMIN'
              ? 'Products, campaigns, tasks, slots'
              : role === 'CS_ADMIN'
                ? 'Read-only customer support surfaces'
                : role === 'FINANCE_ADMIN'
                  ? 'Wallet and withdrawals'
                  : 'Risk review and enforcement',
        restricted:
          role === 'OPS_ADMIN'
            ? 'Cannot move wallet funds'
            : role === 'CS_ADMIN'
              ? 'Cannot approve finance or risk actions'
              : role === 'FINANCE_ADMIN'
                ? 'Cannot alter product or queue rules'
                : role === 'RISK_ADMIN'
                  ? 'Cannot rewrite public compliance routes'
                  : 'Requires audit reason on sensitive actions',
        note: 'UI matrix only. Real RBAC policy stays backend-owned.'
      }))
    },
    notes: [
      'Role values use only the shared frozen AdminRole enum.',
      'Permission granularity is intentionally described in prose until backend registers policy details.',
      'Sensitive-operation reason capture should be modeled with audit contracts before UI forms exist.'
    ]
  },
  audit: {
    eyebrow: 'Governance · Audit',
    title: 'Audit log',
    description: 'Skeleton audit view for sensitive operations, traceability, and export placeholder planning.',
    meta: baseMeta(),
    metrics: [
      { title: 'Tracked domains', value: '11', description: 'Products, orders, queues, slots, campaigns, tasks, invites, wallet, withdrawals, risk, governance.', tone: 'brand' },
      { title: 'Sensitive actions pending contract', value: '8', description: 'Write flows still blocked in this batch.', tone: 'warning' },
      { title: 'Export placeholder', value: '1', description: 'Export UI stays informational only.', tone: 'accent' },
      { title: 'Missing reason schema', value: '1', description: 'Audit reason payload not registered yet.', tone: 'danger' }
    ],
    tableTitle: 'Audit placeholder rows',
    tableDescription: 'Rows illustrate the kind of traceability the backend should later expose.',
    table: {
      columns: [
        { key: 'time', label: 'Time' },
        { key: 'actor', label: 'Actor' },
        { key: 'module', label: 'Module' },
        { key: 'action', label: 'Action' },
        { key: 'reason', label: 'Reason placeholder' }
      ],
      rows: [
        {
          time: generatedAt,
          actor: 'finance-admin-demo',
          module: 'Withdrawals',
          action: 'Placeholder review open',
          reason: 'Reason schema not registered yet.'
        },
        {
          time: formatDateTime('2026-03-11T05:30:00.000Z'),
          actor: 'risk-admin-demo',
          module: 'Risk',
          action: 'Placeholder case inspection',
          reason: 'Decision payload intentionally absent.'
        },
        {
          time: formatDateTime('2026-03-10T14:20:00.000Z'),
          actor: 'ops-admin-demo',
          module: 'Slots',
          action: 'Placeholder replay investigation',
          reason: 'Replay action contract not registered.'
        }
      ]
    },
    notes: [
      'This table is illustrative only and does not define a final audit schema.',
      'Audit export remains a placeholder link or button until backend registration happens.',
      'Sensitive reasons must be registered before the UI adds structured input.'
    ]
  }
};

export function getListPageConfig(
  key: keyof typeof listConfigs
): ListPageConfig {
  return listConfigs[key];
}

export function getDetailPageConfig(
  key: 'product' | 'order' | 'queue' | 'slot' | 'campaign' | 'task' | 'invite' | 'risk',
  id: string
): DetailPageConfig {
  switch (key) {
    case 'product':
      return {
        eyebrow: 'Operations · Product detail',
        title: `Product ${id}`,
        description: 'Catalog detail shell for pricing, queue eligibility, stock notes, and campaign bindings.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: 'Frozen route detail',
        badgeTone: 'brand',
        backHref: '/products',
        metrics: [
          { title: 'Queue eligibility', value: 'Enabled', description: 'Placeholder only. No write action attached.', tone: 'accent' },
          { title: 'Market scope', value: LAUNCH_MARKET, description: 'Single launch market is locked in v1.2.', tone: 'brand' },
          { title: 'Default cap', value: formatMinorMoney(200000), description: 'Product-level cashback cap placeholder.', tone: 'warning' },
          { title: 'Stock review', value: 'Manual', description: 'Stock editing is out of scope in this batch.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Catalog overview',
            description: 'Baseline placeholders for a product record.',
            rows: [
              { label: 'Product ID', value: id },
              { label: 'Market', value: LAUNCH_MARKET },
              { label: 'Queue setting', value: 'Queue-enabled placeholder' },
              { label: 'Activity binding', value: 'March Starter Promo placeholder' }
            ]
          },
          {
            title: 'Pricing and stock',
            description: 'Displayed as screen copy only, not a final API contract.',
            rows: [
              { label: 'Current price hint', value: formatMinorMoney(159900) },
              { label: 'Inventory hint', value: 'Stock managed by backend truth source' },
              { label: 'SKU scope', value: 'Single-product order model preserved' },
              { label: 'Admin action state', value: 'Read-only skeleton' }
            ]
          }
        ],
        actions: [
          'Create product — disabled until registry and OpenAPI registration.',
          'Update queue setting — disabled until Admin write contract exists.',
          'Bind to campaign — disabled until campaign write contract exists.'
        ],
        notes: [
          'This page must not define product write payloads ahead of backend registration.',
          'Queue enablement and campaign binding are shown only as placeholders.',
          'The route is frozen; the data schema is not invented here.'
        ],
        relatedLinks: [
          { href: '/products', label: 'Products' },
          { href: '/campaigns', label: 'Campaigns' },
          { href: '/orders', label: 'Orders' }
        ]
      };

    case 'order':
      return {
        eyebrow: 'Operations · Order detail',
        title: `Order ${id}`,
        description: 'Order detail shell for fulfilment, queue linkage, payment snapshot, and aftersale placeholder handling.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: ORDER_STATUSES[2],
        badgeTone: statusTone(ORDER_STATUSES[2]),
        backHref: '/orders',
        metrics: [
          { title: 'Order state', value: ORDER_STATUSES[2], description: 'Sample state only; no live fetch in batch 4.', tone: 'accent' },
          { title: 'Quantity', value: '2', description: 'One order can have quantity > 1 but still only one queue seat.', tone: 'brand' },
          { title: 'Paid amount', value: formatMinorMoney(219900), description: 'Minor-unit formatted via shared formatter.', tone: 'warning' },
          { title: 'Queue seat', value: '1', description: 'Hard rule from PRD and shared constants.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Order snapshot',
            description: 'Static placeholders aligned to PRD order concepts.',
            rows: [
              { label: 'Order ID', value: id },
              { label: 'Current status', value: ORDER_STATUSES[2] },
              { label: 'Launch market', value: LAUNCH_MARKET },
              { label: 'Rule version', value: LAUNCH_RULE_VERSION }
            ]
          },
          {
            title: 'Fulfilment and queue',
            description: 'These labels do not define any backend response shape.',
            rows: [
              { label: 'Queue linkage', value: '1 order = 1 queue entry' },
              { label: 'Shipping truth source', value: 'Logistics callback or admin confirmation' },
              { label: 'Delivery reference', value: lastDeliveryAt },
              { label: 'Aftersale placeholder', value: ORDER_STATUSES[8] }
            ]
          }
        ],
        actions: [
          'Reduce quantity — disabled until registered Admin order action.',
          'Record refund / aftersale — disabled until registry and OpenAPI are updated.',
          'Override fulfilment state — disabled until registered audit-aware mutation exists.'
        ],
        notes: [
          'No refund payload or logistics patch schema has been added here.',
          'The frontend screen should consume generated Admin APIs later, not internal backend types.',
          'Queue seat behavior remains fixed: quantity changes amount, not seat count.'
        ],
        relatedLinks: [
          { href: '/orders', label: 'Orders' },
          { href: '/queues', label: 'Queues' },
          { href: '/risk', label: 'Risk cases' }
        ]
      };

    case 'queue':
      return {
        eyebrow: 'Operations · Queue detail',
        title: `Queue entry ${id}`,
        description: 'Queue detail shell for status, effective rank, guard linkage, settlement context, and event-log placeholders.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: QUEUE_ENTRY_STATUSES[1],
        badgeTone: statusTone(QUEUE_ENTRY_STATUSES[1]),
        backHref: '/queues',
        metrics: [
          { title: 'Effective rank', value: '31', description: `Rank ${QUEUE_TOP_PROTECTED_COUNT + 1} is the best boost target outside the protected zone.`, tone: 'accent' },
          { title: 'Boost used', value: '2 / 2', description: `Per-order boost cap is ${QUEUE_BOOST_MAX_PER_ENTRY}.`, tone: 'warning' },
          { title: 'Guard state', value: USER_QUEUE_GUARD_STATUSES[0], description: 'Guard remains user-level, not order-level.', tone: 'brand' },
          { title: 'Settlement context', value: nextSlotAt, description: 'Winner selection occurs on fixed settlement slots only.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Queue state',
            description: 'Frozen-route detail view for a single queue entry.',
            rows: [
              { label: 'Entry ID', value: id },
              { label: 'Current status', value: QUEUE_ENTRY_STATUSES[1] },
              { label: 'Protected zone size', value: String(QUEUE_TOP_PROTECTED_COUNT) },
              { label: 'Current effective rank', value: '31' }
            ]
          },
          {
            title: 'Guard and settlement',
            description: 'Queue rules stay aligned to shared constants and PRD v1.2.',
            rows: [
              { label: 'User guard status', value: USER_QUEUE_GUARD_STATUSES[0] },
              { label: 'Next slot', value: nextSlotAt },
              { label: 'Boost rule', value: `No entry may cross Top${QUEUE_TOP_PROTECTED_COUNT}` },
              { label: 'Winner release', value: QUEUE_ENTRY_STATUSES[5] }
            ]
          }
        ],
        actions: [
          'Freeze entry — disabled until queue mutation contract is registered.',
          'Restore entry — disabled until queue mutation contract is registered.',
          'Remove entry — disabled until queue mutation contract is registered.'
        ],
        notes: [
          'Queue status values come only from the shared frozen enum.',
          'Event logs and rank histories are not guessed here.',
          'Any mutation must remain backend-transactional and audit-aware.'
        ],
        relatedLinks: [
          { href: '/queues', label: 'Queues' },
          { href: '/slots', label: 'Slots' },
          { href: '/risk', label: 'Risk cases' }
        ]
      };

    case 'slot':
      return {
        eyebrow: 'Operations · Slot detail',
        title: `Settlement slot ${id}`,
        description: 'Slot detail shell for schedule, execution state, and replay placeholder handling.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: SETTLEMENT_SLOT_STATUSES[0],
        badgeTone: statusTone(SETTLEMENT_SLOT_STATUSES[0]),
        backHref: '/slots',
        metrics: [
          { title: 'Slot state', value: SETTLEMENT_SLOT_STATUSES[0], description: 'Illustrative only for this skeleton screen.', tone: 'brand' },
          { title: 'Scheduled at', value: nextSlotAt, description: 'Launch timezone formatting stays locked.', tone: 'warning' },
          { title: 'Market', value: LAUNCH_MARKET, description: 'One market pool for MVP launch.', tone: 'accent' },
          { title: 'Replay state', value: SETTLEMENT_SLOT_STATUSES[4], description: 'Replay controls are placeholders only.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Schedule context',
            description: 'Slot scheduling is shown without creating a final response schema.',
            rows: [
              { label: 'Slot ID', value: id },
              { label: 'Status', value: SETTLEMENT_SLOT_STATUSES[0] },
              { label: 'Market', value: LAUNCH_MARKET },
              { label: 'Slot at', value: nextSlotAt }
            ]
          },
          {
            title: 'Execution notes',
            description: 'Replay and manual dispatch remain backend-owned concerns.',
            rows: [
              { label: 'Execution model', value: 'Fixed slot settlement' },
              { label: 'Winner count', value: '1 active top-ranked order per slot' },
              { label: 'Retry placeholder', value: SETTLEMENT_SLOT_STATUSES[3] },
              { label: 'Replay placeholder', value: SETTLEMENT_SLOT_STATUSES[4] }
            ]
          }
        ],
        actions: [
          'Create slot — disabled until Admin write contract is registered.',
          'Retry slot — disabled until replay / retry payload is registered.',
          'Replay slot — disabled until replay / retry payload is registered.'
        ],
        notes: [
          'No winner schema or settlement replay contract has been guessed.',
          'Slots remain backend-driven even when Admin surfaces controls later.',
          'Timezone display stays Asia/Manila for MVP launch.'
        ],
        relatedLinks: [
          { href: '/slots', label: 'Slots' },
          { href: '/queues', label: 'Queues' },
          { href: '/campaigns', label: 'Campaigns' }
        ]
      };

    case 'campaign':
      return {
        eyebrow: 'Operations · Campaign detail',
        title: `Campaign ${id}`,
        description: 'Campaign detail shell for product scope, cap hints, slot adjustments, and rules-copy planning.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: 'Campaign skeleton',
        badgeTone: 'brand',
        backHref: '/campaigns',
        metrics: [
          { title: 'Cashback cap', value: formatMinorMoney(200000), description: 'Example cap only, not final contract data.', tone: 'warning' },
          { title: 'Bound products', value: '4', description: 'Placeholder count for scope review.', tone: 'accent' },
          { title: 'Extra slots', value: '1', description: 'Extra slot logic remains backend-owned.', tone: 'brand' },
          { title: 'Copy sync risk', value: '1', description: 'Public rules copy must match admin state later.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Campaign overview',
            description: 'Descriptive placeholders for ops and content teams.',
            rows: [
              { label: 'Campaign ID', value: id },
              { label: 'Market', value: LAUNCH_MARKET },
              { label: 'Cashback cap hint', value: formatMinorMoney(200000) },
              { label: 'Activity route sync', value: '/rules/activity/[slug]' }
            ]
          },
          {
            title: 'Execution notes',
            description: 'Backend remains the truth source for slot and eligibility calculations.',
            rows: [
              { label: 'Product scope', value: 'Placeholder list only' },
              { label: 'Extra slots', value: 'Optional, backend-managed' },
              { label: 'Rules copy', value: 'Public website alignment required' },
              { label: 'Current state', value: 'Read-only skeleton' }
            ]
          }
        ],
        actions: [
          'Edit campaign basics — disabled until registered Admin payloads exist.',
          'Bind products — disabled until product scope contract exists.',
          'Publish campaign copy — disabled until public rules sync contract exists.'
        ],
        notes: [
          'Campaign public copy cannot become the secret truth source; it must mirror backend truth.',
          'No new activity route has been added here.',
          'Product scope arrays are not guessed on the frontend.'
        ],
        relatedLinks: [
          { href: '/campaigns', label: 'Campaigns' },
          { href: '/products', label: 'Products' },
          { href: '/slots', label: 'Slots' }
        ]
      };

    case 'task':
      return {
        eyebrow: 'Operations · Task detail',
        title: `Task ${id}`,
        description: 'Task detail shell for lifecycle notes, reward hinting, and launch readiness checks.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: 'Task skeleton',
        badgeTone: 'warning',
        backHref: '/tasks',
        metrics: [
          { title: 'Lifecycle', value: 'Skeleton only', description: 'No admin task lifecycle contract exists yet.', tone: 'warning' },
          { title: 'Reward hint', value: 'Guard time / soft reward', description: 'Placeholder wording only.', tone: 'brand' },
          { title: 'Audience', value: 'Daily or onboarding', description: 'Scope kept textual on purpose.', tone: 'accent' },
          { title: 'Contract state', value: 'Unregistered', description: 'No Admin task config payload yet.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Task overview',
            description: 'This screen stays conceptual until registry registration happens.',
            rows: [
              { label: 'Task ID', value: id },
              { label: 'Current state', value: 'Skeleton only' },
              { label: 'Reward hint', value: 'Guard time, fragments, or onboarding reward' },
              { label: 'Write path', value: 'Not registered' }
            ]
          }
        ],
        actions: [
          'Update task — disabled until task admin contract is registered.',
          'Schedule task — disabled until task admin contract is registered.',
          'Retire task — disabled until task admin contract is registered.'
        ],
        notes: [
          'Task configuration is intentionally text-only here.',
          'No task DTO or response model has been copied into shared code.',
          'Backend should register read and write paths separately for Admin.'
        ],
        relatedLinks: [
          { href: '/tasks', label: 'Tasks' },
          { href: '/invites', label: 'Invites' },
          { href: '/governance', label: 'Governance' }
        ]
      };

    case 'invite':
      return {
        eyebrow: 'Operations · Invite detail',
        title: `Invite relation ${id}`,
        description: 'Invite relation detail shell for lifecycle, effectivity, and wallet-activation guidance.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: INVITE_RELATION_STATUSES[1],
        badgeTone: statusTone(INVITE_RELATION_STATUSES[1]),
        backHref: '/invites',
        metrics: [
          { title: 'Relation status', value: INVITE_RELATION_STATUSES[1], description: 'Uses frozen shared invite statuses only.', tone: 'warning' },
          { title: 'Depth', value: String(INVITE_MAX_DEPTH), description: 'Single-level invite depth is fixed in MVP.', tone: 'brand' },
          { title: 'Activation hint', value: WALLET_ACTIVATION_METHODS[0], description: 'Wallet activation method comes from shared enum.', tone: 'accent' },
          { title: 'Invalidation review', value: INVITE_RELATION_STATUSES[3], description: 'Reason payload is intentionally absent.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Relation overview',
            description: 'Invite lifecycle placeholder data only.',
            rows: [
              { label: 'Relation ID', value: id },
              { label: 'Status', value: INVITE_RELATION_STATUSES[1] },
              { label: 'Depth', value: String(INVITE_MAX_DEPTH) },
              { label: 'Wallet activation', value: WALLET_ACTIVATION_METHODS[0] }
            ]
          },
          {
            title: 'Effectivity and review',
            description: 'Detailed reasons must come from backend after registration.',
            rows: [
              { label: 'Cooling-off state', value: 'Pending effective placeholder' },
              { label: 'Invalidation status', value: INVITE_RELATION_STATUSES[3] },
              { label: 'Reason payload', value: 'Not registered in batch 4' },
              { label: 'Reward linkage', value: 'Placeholder only' }
            ]
          }
        ],
        actions: [
          'Invalidate relation — disabled until decision payload is registered.',
          'Restore relation — disabled until decision payload is registered.',
          'Adjust reward linkage — disabled until admin reward contract exists.'
        ],
        notes: [
          'No unofficial invite status has been introduced.',
          'Invalidation reasons must not be guessed in the frontend.',
          'Wallet activation method values come only from shared frozen enums.'
        ],
        relatedLinks: [
          { href: '/invites', label: 'Invites' },
          { href: '/wallet', label: 'Wallet' },
          { href: '/risk', label: 'Risk cases' }
        ]
      };

    case 'risk':
      return {
        eyebrow: 'Funds & Risk · Case detail',
        title: `Risk case ${id}`,
        description: 'Risk case detail shell for linked objects, signals, and decision placeholder surfaces.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: 'Manual review',
        badgeTone: 'danger',
        backHref: '/risk',
        metrics: [
          { title: 'Linked object', value: 'Withdrawal', description: 'Example only; not a final case schema.', tone: 'warning' },
          { title: 'Current lane', value: 'Manual review', description: 'Local UI wording only.', tone: 'danger' },
          { title: 'Linked queue note', value: QUEUE_ENTRY_STATUSES[2], description: 'Review may affect queue status later.', tone: 'brand' },
          { title: 'Decision contract', value: 'Missing', description: 'No admin risk decision payload registered yet.', tone: 'accent' }
        ],
        sections: [
          {
            title: 'Case overview',
            description: 'Case details remain descriptive to avoid freezing unregistered fields.',
            rows: [
              { label: 'Case ID', value: id },
              { label: 'Primary object', value: 'Withdrawal placeholder' },
              { label: 'Primary signal', value: 'Large payout anomaly' },
              { label: 'Current handling', value: 'Manual review placeholder' }
            ]
          },
          {
            title: 'Linked objects',
            description: 'Relationship text only; no nested response contract is implied.',
            rows: [
              { label: 'Order reference', value: 'ord-demo-5002' },
              { label: 'Queue reference', value: 'qe-demo-9002' },
              { label: 'Withdrawal reference', value: 'wd-20260311-001' },
              { label: 'Invite reference', value: 'inv-rel-1002' }
            ]
          }
        ],
        actions: [
          'Approve risk case — disabled until decision payload and audit reason are registered.',
          'Reject risk case — disabled until decision payload and audit reason are registered.',
          'Escalate to governance — disabled until workflow contract is registered.'
        ],
        notes: [
          'This page intentionally does not introduce a frozen risk-case status enum.',
          'Linked-object identifiers are illustrative screen text, not final API fields.',
          'Decision and enforcement actions must be registered before frontend implementation.'
        ],
        relatedLinks: [
          { href: '/risk', label: 'Risk cases' },
          { href: '/withdrawals', label: 'Withdrawals' },
          { href: '/queues', label: 'Queues' }
        ]
      };
  }
}

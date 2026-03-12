import { ADMIN_ROUTES } from '@queuefree/shared';

export type AdminRoute = (typeof ADMIN_ROUTES)[number];

export type AdminNavItem = {
  href: AdminRoute;
  label: string;
  description: string;
};

export type AdminNavGroup = {
  title: string;
  items: AdminNavItem[];
};

export const adminNavigation: AdminNavGroup[] = [
  {
    title: 'Overview',
    items: [
      {
        href: '/',
        label: 'Dashboard',
        description: 'Core business metrics, queue health, fund summary, and pending reviews.'
      }
    ]
  },
  {
    title: 'Operations',
    items: [
      {
        href: '/products',
        label: 'Products',
        description: 'Catalog, queue eligibility, and campaign binding placeholders.'
      },
      {
        href: '/orders',
        label: 'Orders',
        description: 'Order search, fulfilment snapshot, aftersale placeholder.'
      },
      {
        href: '/queues',
        label: 'Queues',
        description: 'Queue pool views, freeze notes, and event-log placeholders.'
      },
      {
        href: '/slots',
        label: 'Slots',
        description: 'Fixed settlement slot scheduling and replay surfaces.'
      },
      {
        href: '/campaigns',
        label: 'Campaigns',
        description: 'Cashback cap, extra slots, and rules-copy shells.'
      },
      {
        href: '/tasks',
        label: 'Tasks',
        description: 'Task configuration, reward notes, and lifecycle placeholders.'
      },
      {
        href: '/invites',
        label: 'Invites',
        description: 'Invite relation lookup, invalidation notes, and reward review.'
      }
    ]
  },
  {
    title: 'Funds & Risk',
    items: [
      {
        href: '/wallet',
        label: 'Wallet',
        description: 'User wallet overview, ledger placeholders, activation hints.'
      },
      {
        href: '/withdrawals',
        label: 'Withdrawals',
        description: 'Withdrawal pipeline and finance-review queue.'
      },
      {
        href: '/risk',
        label: 'Risk',
        description: 'Risk case pool, linked object review, and decision placeholders.'
      }
    ]
  },
  {
    title: 'Governance',
    items: [
      {
        href: '/governance',
        label: 'Governance',
        description: 'Role matrix, approval guardrails, and sensitive-operation notes.'
      },
      {
        href: '/audit',
        label: 'Audit',
        description: 'Audit lookup shell and export placeholder.'
      }
    ]
  }
];

const flattenedNavItems = adminNavigation.flatMap((group) => group.items);

export function isNavItemActive(href: AdminRoute, pathname: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveNavItem(pathname: string): AdminNavItem | null {
  return flattenedNavItems.find((item) => isNavItemActive(item.href, pathname)) ?? null;
}

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

// Mobile screen models for Batch 12D

// Runtime Config
export interface RuntimeConfig {
  marketCode: string;
  currencyCode: string;
  timezone: string;
  locale: string;
  language: string;
  ruleVersion: string;
  rewardedAdsEnabled: boolean;
}

export interface HealthStatus {
  status: 'ok';
  service: string;
  version: string;
  environment: string;
  timestamp: string;
}

// Me
export interface MeOverview {
  userId: string;
  phoneMasked: string;
  accountDeleteStatus: string;
  walletActivationMethod: string | null;
}

// Products
export interface Product {
  productId: string;
  title: string;
  coverImageUrl: string;
  priceMinor: number;
  currencyCode: string;
  maxQty: number;
  isQueueEligible: boolean;
  description?: string;
  imageUrls?: string[];
}

export interface ProductList {
  items: Product[];
  cursor: string | null;
}

// Queue Guard
export interface QueueGuard {
  status: 'VALID' | 'EXPIRED_GRACE';
  lastCheckinAt: string | null;
  validUntil: string;
  graceUntil: string | null;
}

// Queue Entries
export interface QueueEntry {
  queueEntryId: string;
  orderId: string;
  productId: string;
  productTitle: string;
  coverImageUrl: string;
  status: string;
  activeRank: number | null;
  boostUsedCount: number;
  wonCashbackAmountMinor: number | null;
  enteredAt?: string;
}

// Rules
export interface Rule {
  slug: string;
  title: string;
  summary: string;
  updatedAt: string;
  ruleVersion: string;
  sections?: string[];
}

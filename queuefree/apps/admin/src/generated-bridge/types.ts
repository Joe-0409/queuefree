// Admin screen models for Batch 14

export interface AdminRuntimeConfig {
  marketCode: string;
  currencyCode: string;
  timezone: string;
  locale: string;
  language: string;
  ruleVersion: string;
  rewardedAdsEnabled: boolean;
}

export interface AdminProduct {
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

export interface AdminProductList {
  items: AdminProduct[];
  cursor: string | null;
}

export interface AdminQueueEntry {
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

export interface AdminRule {
  slug: string;
  title: string;
  summary: string;
  updatedAt: string;
  ruleVersion: string;
  sections?: string[];
}

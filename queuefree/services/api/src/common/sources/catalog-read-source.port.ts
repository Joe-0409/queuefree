export const CATALOG_READ_SOURCE_PORT = Symbol('CATALOG_READ_SOURCE_PORT');

export interface OrderableSkuRecord {
  productId: string;
  skuId: string;
  priceMinor: number;
  currencyCode: string;
  maxQty: number;
}

export interface ProductListRecord {
  productId: string;
  title: string;
  coverImageUrl: string;
  priceMinor: number;
  currencyCode: string;
  maxQty: number;
  isQueueEligible: boolean;
}

export interface ProductDetailRecord {
  productId: string;
  title: string;
  description: string;
  imageUrls: string[];
  priceMinor: number;
  currencyCode: string;
  maxQty: number;
  isQueueEligible: boolean;
}

export interface CatalogReadSourcePort {
  findOrderableSku(
    productId: string,
    skuId: string
  ): Promise<OrderableSkuRecord | null>;

  listProducts(cursor?: string): Promise<ProductListRecord[]>;

  findProductById(productId: string): Promise<ProductDetailRecord | null>;
}

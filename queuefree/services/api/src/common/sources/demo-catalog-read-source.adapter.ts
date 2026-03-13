import { Injectable } from '@nestjs/common';
import {
  DEMO_CURRENCY_CODE,
  DEMO_IS_QUEUE_ELIGIBLE,
  DEMO_MAX_QTY,
  DEMO_PRICE_MINOR,
  DEMO_PRODUCT_COVER_IMAGE_URL,
  DEMO_PRODUCT_DESCRIPTION,
  DEMO_PRODUCT_ID,
  DEMO_PRODUCT_IMAGE_URLS,
  DEMO_PRODUCT_TITLE,
  DEMO_SECOND_IS_QUEUE_ELIGIBLE,
  DEMO_SECOND_MAX_QTY,
  DEMO_SECOND_PRICE_MINOR,
  DEMO_SECOND_PRODUCT_COVER_IMAGE_URL,
  DEMO_SECOND_PRODUCT_DESCRIPTION,
  DEMO_SECOND_PRODUCT_ID,
  DEMO_SECOND_PRODUCT_IMAGE_URLS,
  DEMO_SECOND_PRODUCT_TITLE,
  DEMO_SECOND_SKU_ID,
  DEMO_SKU_ID
} from '../demo/demo-fixtures';
import {
  CatalogReadSourcePort,
  OrderableSkuRecord,
  ProductDetailRecord,
  ProductListRecord
} from './catalog-read-source.port';

@Injectable()
export class DemoCatalogReadSourceAdapter implements CatalogReadSourcePort {
  async findOrderableSku(
    productId: string,
    skuId: string
  ): Promise<OrderableSkuRecord | null> {
    if (productId === DEMO_PRODUCT_ID && skuId === DEMO_SKU_ID) {
      return {
        productId: DEMO_PRODUCT_ID,
        skuId: DEMO_SKU_ID,
        priceMinor: DEMO_PRICE_MINOR,
        currencyCode: DEMO_CURRENCY_CODE,
        maxQty: DEMO_MAX_QTY
      };
    }

    if (productId === DEMO_SECOND_PRODUCT_ID && skuId === DEMO_SECOND_SKU_ID) {
      return {
        productId: DEMO_SECOND_PRODUCT_ID,
        skuId: DEMO_SECOND_SKU_ID,
        priceMinor: DEMO_SECOND_PRICE_MINOR,
        currencyCode: DEMO_CURRENCY_CODE,
        maxQty: DEMO_SECOND_MAX_QTY
      };
    }

    return null;
  }

  async listProducts(_cursor?: string): Promise<ProductListRecord[]> {
    return [
      {
        productId: DEMO_PRODUCT_ID,
        title: DEMO_PRODUCT_TITLE,
        coverImageUrl: DEMO_PRODUCT_COVER_IMAGE_URL,
        priceMinor: DEMO_PRICE_MINOR,
        currencyCode: DEMO_CURRENCY_CODE,
        maxQty: DEMO_MAX_QTY,
        isQueueEligible: DEMO_IS_QUEUE_ELIGIBLE
      },
      {
        productId: DEMO_SECOND_PRODUCT_ID,
        title: DEMO_SECOND_PRODUCT_TITLE,
        coverImageUrl: DEMO_SECOND_PRODUCT_COVER_IMAGE_URL,
        priceMinor: DEMO_SECOND_PRICE_MINOR,
        currencyCode: DEMO_CURRENCY_CODE,
        maxQty: DEMO_SECOND_MAX_QTY,
        isQueueEligible: DEMO_SECOND_IS_QUEUE_ELIGIBLE
      }
    ].filter((item) => item.isQueueEligible);
  }

  async findProductById(productId: string): Promise<ProductDetailRecord | null> {
    if (productId === DEMO_PRODUCT_ID) {
      return {
        productId: DEMO_PRODUCT_ID,
        title: DEMO_PRODUCT_TITLE,
        description: DEMO_PRODUCT_DESCRIPTION,
        imageUrls: [...DEMO_PRODUCT_IMAGE_URLS],
        priceMinor: DEMO_PRICE_MINOR,
        currencyCode: DEMO_CURRENCY_CODE,
        maxQty: DEMO_MAX_QTY,
        isQueueEligible: DEMO_IS_QUEUE_ELIGIBLE
      };
    }

    if (productId === DEMO_SECOND_PRODUCT_ID) {
      return {
        productId: DEMO_SECOND_PRODUCT_ID,
        title: DEMO_SECOND_PRODUCT_TITLE,
        description: DEMO_SECOND_PRODUCT_DESCRIPTION,
        imageUrls: [...DEMO_SECOND_PRODUCT_IMAGE_URLS],
        priceMinor: DEMO_SECOND_PRICE_MINOR,
        currencyCode: DEMO_CURRENCY_CODE,
        maxQty: DEMO_SECOND_MAX_QTY,
        isQueueEligible: DEMO_SECOND_IS_QUEUE_ELIGIBLE
      };
    }

    return null;
  }
}

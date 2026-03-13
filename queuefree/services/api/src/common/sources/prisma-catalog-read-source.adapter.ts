import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CatalogReadSourcePort,
  OrderableSkuRecord,
  ProductDetailRecord,
  ProductListRecord
} from './catalog-read-source.port';

@Injectable()
export class PrismaCatalogReadSourceAdapter implements CatalogReadSourcePort {
  constructor(private readonly prisma: PrismaService) {}

  async findOrderableSku(
    productId: string,
    skuId: string
  ): Promise<OrderableSkuRecord | null> {
    const record = await this.prisma.productSku.findUnique({
      where: {
        skuId
      },
      select: {
        skuId: true,
        productId: true,
        priceMinor: true,
        currencyCode: true,
        maxQty: true,
        product: {
          select: {
            productId: true,
            isQueueEligible: true
          }
        }
      }
    });

    if (!record) {
      return null;
    }

    if (record.productId !== productId) {
      return null;
    }

    if (!record.product.isQueueEligible) {
      return null;
    }

    return {
      productId: record.productId,
      skuId: record.skuId,
      priceMinor: record.priceMinor,
      currencyCode: record.currencyCode,
      maxQty: record.maxQty
    };
  }

  async listProducts(_cursor?: string): Promise<ProductListRecord[]> {
    const records = await this.prisma.product.findMany({
      where: {
        isQueueEligible: true
      },
      orderBy: {
        productId: 'asc'
      },
      select: {
        productId: true,
        title: true,
        coverImageUrl: true,
        isQueueEligible: true,
        skus: {
          take: 1,
          orderBy: {
            skuId: 'asc'
          },
          select: {
            priceMinor: true,
            currencyCode: true,
            maxQty: true
          }
        }
      }
    });

    return records.flatMap((record) => {
      const sku = record.skus[0];
      if (!sku) {
        return [];
      }

      return [
        {
          productId: record.productId,
          title: record.title,
          coverImageUrl: record.coverImageUrl,
          priceMinor: sku.priceMinor,
          currencyCode: sku.currencyCode,
          maxQty: sku.maxQty,
          isQueueEligible: record.isQueueEligible
        }
      ];
    });
  }

  async findProductById(productId: string): Promise<ProductDetailRecord | null> {
    const record = await this.prisma.product.findUnique({
      where: {
        productId
      },
      select: {
        productId: true,
        title: true,
        description: true,
        imageUrls: true,
        isQueueEligible: true,
        skus: {
          take: 1,
          orderBy: {
            skuId: 'asc'
          },
          select: {
            priceMinor: true,
            currencyCode: true,
            maxQty: true
          }
        }
      }
    });

    if (!record) {
      return null;
    }

    if (!record.isQueueEligible) {
      return null;
    }

    const sku = record.skus[0];
    if (!sku) {
      return null;
    }

    return {
      productId: record.productId,
      title: record.title,
      description: record.description,
      imageUrls: JSON.parse(record.imageUrls || '[]'),
      priceMinor: sku.priceMinor,
      currencyCode: sku.currencyCode,
      maxQty: sku.maxQty,
      isQueueEligible: record.isQueueEligible
    };
  }
}

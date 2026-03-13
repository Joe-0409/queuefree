import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CATALOG_READ_SOURCE_PORT,
  CatalogReadSourcePort
} from '../common/sources/catalog-read-source.port';
import { ProductDetailResponseDto } from './dto/product-detail-response.dto';
import { ProductListItemDto } from './dto/product-list-item.dto';
import { ProductListResponseDto } from './dto/product-list-response.dto';
import { ListProductsQueryDto } from './dto/list-products-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(CATALOG_READ_SOURCE_PORT)
    private readonly catalogReadSource: CatalogReadSourcePort
  ) {}

  async listProducts(query: ListProductsQueryDto): Promise<ProductListResponseDto> {
    const records = await this.catalogReadSource.listProducts(query.cursor);

    const items: ProductListItemDto[] = records.map((product) => ({
      productId: product.productId,
      title: product.title,
      coverImageUrl: product.coverImageUrl,
      priceMinor: product.priceMinor,
      currencyCode: product.currencyCode,
      maxQty: product.maxQty,
      isQueueEligible: product.isQueueEligible
    }));

    return {
      items,
      cursor: null
    };
  }

  async getProductById(productId: string): Promise<ProductDetailResponseDto> {
    const product = await this.catalogReadSource.findProductById(productId);

    if (!product) {
      throw new NotFoundException({
        code: 'PRODUCT_NOT_FOUND',
        message: 'Product not found.'
      });
    }

    return {
      productId: product.productId,
      title: product.title,
      description: product.description,
      imageUrls: product.imageUrls,
      priceMinor: product.priceMinor,
      currencyCode: product.currencyCode,
      maxQty: product.maxQty,
      isQueueEligible: product.isQueueEligible
    };
  }
}

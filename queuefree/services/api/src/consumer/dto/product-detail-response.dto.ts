import { ApiProperty } from '@nestjs/swagger';

export class ProductDetailSkuDto {
  @ApiProperty({ format: 'uuid' })
  skuId: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  priceMinor: number;

  @ApiProperty()
  soldOut: boolean;
}

export class ProductDetailResponseDto {
  @ApiProperty({ format: 'uuid' })
  productId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  descriptionText: string;

  @ApiProperty()
  coverImageUrl: string;

  @ApiProperty({ type: [String] })
  galleryImageUrls: string[];

  @ApiProperty()
  priceMinor: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  defaultCashbackCapMinor: number;

  @ApiProperty()
  queueEnabled: boolean;

  @ApiProperty()
  soldOut: boolean;

  @ApiProperty()
  maxOrderQty: number;

  @ApiProperty({ type: [ProductDetailSkuDto] })
  skus: ProductDetailSkuDto[];
}

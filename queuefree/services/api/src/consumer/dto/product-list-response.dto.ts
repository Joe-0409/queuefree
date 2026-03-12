import { ApiProperty } from '@nestjs/swagger';

export class ProductListItemDto {
  @ApiProperty({ format: 'uuid' })
  productId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  coverImageUrl: string;

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
}

export class ProductListResponseDto {
  @ApiProperty({ type: [ProductListItemDto] })
  items: ProductListItemDto[];
}

import { ApiProperty } from '@nestjs/swagger';

export class ConsumerProductListItemDto {
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

export class ConsumerProductListResponseDto {
  @ApiProperty({ type: [ConsumerProductListItemDto] })
  items: ConsumerProductListItemDto[];
}
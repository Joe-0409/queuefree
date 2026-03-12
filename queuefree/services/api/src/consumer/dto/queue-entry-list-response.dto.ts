import { ApiProperty } from '@nestjs/swagger';

export class QueueEntryListItemDto {
  @ApiProperty({ format: 'uuid' })
  queueEntryId: string;

  @ApiProperty({ format: 'uuid' })
  orderId: string;

  @ApiProperty({ format: 'uuid' })
  productId: string;

  @ApiProperty()
  productTitle: string;

  @ApiProperty()
  productCoverImageUrl: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  status: string;

  @ApiProperty({ nullable: true })
  activeRank: number | null;

  @ApiProperty()
  boostUsedCount: number;

  @ApiProperty()
  canBoost: boolean;

  @ApiProperty()
  isInProtectZone: boolean;

  @ApiProperty({ nullable: true })
  nextSettlementSlotAt: string | null;

  @ApiProperty({ nullable: true })
  finalCashbackMinor: number | null;

  @ApiProperty()
  currency: string;
}

export class QueueEntryListResponseDto {
  @ApiProperty({ type: [QueueEntryListItemDto] })
  items: QueueEntryListItemDto[];

  @ApiProperty({ nullable: true })
  nextCursor: string | null;
}

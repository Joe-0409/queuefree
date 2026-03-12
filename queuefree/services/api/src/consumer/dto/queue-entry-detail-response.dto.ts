import { ApiProperty } from '@nestjs/swagger';

export class QueueEntryTimelineItemDto {
  @ApiProperty({ format: 'uuid' })
  timelineId: string;

  @ApiProperty()
  occurredAt: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  descriptionText: string;
}

export class QueueEntryDetailResponseDto {
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
  productSkuLabel: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  paidAmountMinor: number;

  @ApiProperty()
  currency: string;

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

  @ApiProperty()
  queueGuardStatus: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({ nullable: true })
  wonSettlementSlotAt: string | null;

  @ApiProperty({ nullable: true })
  cashbackAvailableAt: string | null;

  @ApiProperty({ nullable: true })
  finalCashbackMinor: number | null;

  @ApiProperty({ type: [QueueEntryTimelineItemDto] })
  timeline: QueueEntryTimelineItemDto[];
}

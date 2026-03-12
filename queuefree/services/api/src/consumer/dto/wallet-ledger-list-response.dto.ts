import { ApiProperty } from '@nestjs/swagger';

export class WalletLedgerListItemDto {
  @ApiProperty({ format: 'uuid' })
  ledgerId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  balanceBucket: string;

  @ApiProperty()
  deltaMinor: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({ format: 'uuid', nullable: true })
  relatedOrderId: string | null;

  @ApiProperty({ format: 'uuid', nullable: true })
  relatedWithdrawalId: string | null;

  @ApiProperty({ nullable: true })
  noteText: string | null;
}

export class WalletLedgerListResponseDto {
  @ApiProperty({ type: [WalletLedgerListItemDto] })
  items: WalletLedgerListItemDto[];

  @ApiProperty({ nullable: true })
  nextCursor: string | null;
}

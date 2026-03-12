import { ApiProperty } from '@nestjs/swagger';

export class WithdrawalListItemDto {
  @ApiProperty({ format: 'uuid' })
  withdrawalId: string;

  @ApiProperty()
  amountMinor: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty({ nullable: true })
  rejectReasonText: string | null;
}

export class WithdrawalListResponseDto {
  @ApiProperty({ type: [WithdrawalListItemDto] })
  items: WithdrawalListItemDto[];

  @ApiProperty({ nullable: true })
  nextCursor: string | null;
}

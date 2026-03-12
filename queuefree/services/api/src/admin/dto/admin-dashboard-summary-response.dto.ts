import { ApiProperty } from '@nestjs/swagger';

export class AdminDashboardSummaryResponseDto {
  @ApiProperty()
  paidOrderCountToday: number;

  @ApiProperty()
  activeQueueEntryCount: number;

  @ApiProperty()
  frozenQueueEntryCount: number;

  @ApiProperty()
  scheduledSettlementSlotCount: number;

  @ApiProperty()
  runningSettlementSlotCount: number;

  @ApiProperty()
  pendingWithdrawalCount: number;

  @ApiProperty()
  pendingRiskCaseCount: number;
}

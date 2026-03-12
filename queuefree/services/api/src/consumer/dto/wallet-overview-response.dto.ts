import { ApiProperty } from '@nestjs/swagger';

export class WalletOverviewResponseDto {
  @ApiProperty()
  walletActivated: boolean;

  @ApiProperty({ nullable: true })
  activationMethod: string | null;

  @ApiProperty()
  pendingBalanceMinor: number;

  @ApiProperty()
  availableBalanceMinor: number;

  @ApiProperty()
  frozenBalanceMinor: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  canWithdraw: boolean;

  @ApiProperty()
  hasSettlementException: boolean;
}

import { ApiProperty } from '@nestjs/swagger';

export class ConsumerMeOverviewResponseDto {
  @ApiProperty({ format: 'uuid' })
  userId: string;

  @ApiProperty()
  phoneMasked: string;

  @ApiProperty()
  inviteCode: string;

  @ApiProperty()
  walletActivated: boolean;

  @ApiProperty({ nullable: true })
  walletActivationMethod: string | null;

  @ApiProperty()
  accountDeleteStatus: string;

  @ApiProperty()
  marketCode: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  timezone: string;

  @ApiProperty()
  ruleVersion: string;
}

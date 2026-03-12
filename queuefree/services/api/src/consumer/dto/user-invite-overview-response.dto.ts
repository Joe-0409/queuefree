import { ApiProperty } from '@nestjs/swagger';

export class UserInviteOverviewResponseDto {
  @ApiProperty()
  inviteCode: string;

  @ApiProperty()
  inviteLink: string;

  @ApiProperty()
  canBindInviteCode: boolean;

  @ApiProperty({ nullable: true })
  bindWindowEndsAt: string | null;

  @ApiProperty()
  totalInviteCount: number;

  @ApiProperty()
  pendingEffectiveInviteCount: number;

  @ApiProperty()
  effectiveInviteCount: number;

  @ApiProperty()
  invalidInviteCount: number;

  @ApiProperty()
  walletActivated: boolean;

  @ApiProperty({ nullable: true })
  walletActivationMethod: string | null;
}

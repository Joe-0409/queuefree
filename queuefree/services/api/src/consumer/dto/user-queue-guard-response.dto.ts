import { ApiProperty } from '@nestjs/swagger';

export class UserQueueGuardResponseDto {
  @ApiProperty()
  status: string;

  @ApiProperty()
  validUntil: string;

  @ApiProperty()
  graceUntil: string;

  @ApiProperty({ nullable: true })
  lastCheckinAt: string | null;

  @ApiProperty()
  canCheckInNow: boolean;

  @ApiProperty()
  activeEntriesCount: number;

  @ApiProperty()
  frozenEntriesCount: number;
}

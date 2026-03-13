import { ApiProperty } from '@nestjs/swagger';

export class ConsumerUserQueueGuardResponseDto {
  @ApiProperty({ enum: ['VALID', 'EXPIRED_GRACE'], enumName: 'UserQueueGuardStatus' })
  status!: 'VALID' | 'EXPIRED_GRACE';

  @ApiProperty({ example: '2026-03-13T20:00:00.000Z' })
  validUntil!: string;

  @ApiProperty({ example: null, nullable: true })
  graceUntil!: string | null;

  @ApiProperty({ example: '2026-03-12T08:30:00.000Z', nullable: true })
  lastCheckinAt!: string | null;

  @ApiProperty({ example: true })
  canCheckInNow!: boolean;

  @ApiProperty({ example: 3 })
  activeEntriesCount!: number;

  @ApiProperty({ example: 1 })
  frozenEntriesCount!: number;
}

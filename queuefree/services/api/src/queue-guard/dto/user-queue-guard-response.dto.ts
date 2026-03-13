import { ApiProperty } from '@nestjs/swagger';

export const USER_QUEUE_GUARD_STATUSES = [
  'VALID',
  'EXPIRED_GRACE'
] as const;

export type UserQueueGuardStatus = (typeof USER_QUEUE_GUARD_STATUSES)[number];

export class UserQueueGuardResponseDto {
  @ApiProperty({
    enum: USER_QUEUE_GUARD_STATUSES,
    enumName: 'UserQueueGuardStatus',
    example: 'VALID'
  })
  status!: UserQueueGuardStatus;

  @ApiProperty({
    example: '2026-03-12T08:30:00.000Z',
    nullable: true
  })
  lastCheckinAt: string | null;

  @ApiProperty({
    example: '2026-03-13T20:00:00.000Z'
  })
  validUntil: string;

  @ApiProperty({
    example: null,
    nullable: true
  })
  graceUntil: string | null;
}

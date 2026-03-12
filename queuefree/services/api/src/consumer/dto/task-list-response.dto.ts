import { ApiProperty } from '@nestjs/swagger';

export class TaskListItemDto {
  @ApiProperty({ format: 'uuid' })
  taskId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  descriptionText: string;

  @ApiProperty()
  categoryLabel: string;

  @ApiProperty()
  rewardSummaryText: string;

  @ApiProperty()
  progressCurrent: number;

  @ApiProperty()
  progressTarget: number;

  @ApiProperty()
  claimable: boolean;

  @ApiProperty()
  claimed: boolean;

  @ApiProperty({ nullable: true })
  expiresAt: string | null;
}

export class TaskListResponseDto {
  @ApiProperty({ type: [TaskListItemDto] })
  items: TaskListItemDto[];
}

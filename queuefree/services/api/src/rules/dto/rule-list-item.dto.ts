import { ApiProperty } from '@nestjs/swagger';

export class RuleListItemDto {
  @ApiProperty({
    example: 'queue',
    type: String
  })
  slug!: string;

  @ApiProperty({
    example: 'Queue Rules',
    type: String
  })
  title!: string;

  @ApiProperty({
    example: 'How queue ranking, protection, boost, and settlement slots work.',
    type: String
  })
  summary!: string;

  @ApiProperty({
    example: '2026-03-11T00:00:00.000Z',
    format: 'date-time',
    type: String
  })
  updatedAt!: string;

  @ApiProperty({
    example: 'v1.2',
    type: String
  })
  ruleVersion!: string;
}

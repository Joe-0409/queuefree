import { ApiProperty } from '@nestjs/swagger';

export class RuleListItemDto {
  @ApiProperty({
    example: 'queue'
  })
  slug!: string;

  @ApiProperty({
    example: 'Queue Rules'
  })
  title!: string;

  @ApiProperty({
    example: 'How queue ranking, protection, boost, and settlement slots work.'
  })
  summary!: string;

  @ApiProperty({
    example: '2026-03-11T00:00:00.000Z',
    format: 'date-time'
  })
  updatedAt!: string;

  @ApiProperty({
    example: 'v1.2'
  })
  ruleVersion!: string;
}

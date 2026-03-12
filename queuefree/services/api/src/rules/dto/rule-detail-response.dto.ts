import { ApiProperty } from '@nestjs/swagger';

export class RuleDetailResponseDto {
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
    example: ['Queue rank is based on effective active entries only.', 'Settlement runs on fixed public slots.'],
    type: [String]
  })
  sections!: string[];

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

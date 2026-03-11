import { ApiProperty } from '@nestjs/swagger';

export class RuntimeConfigResponseDto {
  @ApiProperty({ example: 'PH', type: String })
  marketCode!: string;

  @ApiProperty({ example: 'PHP', type: String })
  currencyCode!: string;

  @ApiProperty({ example: 'Asia/Manila', type: String })
  timezone!: string;

  @ApiProperty({ example: 'en-PH', type: String })
  locale!: string;

  @ApiProperty({ example: 'English', type: String })
  language!: string;

  @ApiProperty({ example: 'v1.2', type: String })
  ruleVersion!: string;

  @ApiProperty({ example: false, type: Boolean })
  rewardedAdsEnabled!: boolean;
}

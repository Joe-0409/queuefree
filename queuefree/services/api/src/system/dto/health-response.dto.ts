import { ApiProperty } from '@nestjs/swagger';
import { AppEnv } from '@queuefree/shared';

export class HealthResponseDto {
  @ApiProperty({ enum: ['ok'], example: 'ok', type: String })
  status!: 'ok';

  @ApiProperty({ example: '@queuefree/api', type: String })
  service!: string;

  @ApiProperty({ example: '0.0.1', type: String })
  version!: string;

  @ApiProperty({ enum: AppEnv, enumName: 'AppEnv', example: AppEnv.LOCAL })
  environment!: AppEnv;

  @ApiProperty({ example: '2026-03-11T00:00:00.000Z', format: 'date-time', type: String })
  timestamp!: string;
}

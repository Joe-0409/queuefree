import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiErrorResponseDto {
  @ApiProperty({ example: 'INTERNAL_SERVER_ERROR', type: String })
  code!: string;

  @ApiProperty({ example: 'Unexpected server error.', type: String })
  message!: string;

  @ApiPropertyOptional({ example: 'req_demo_123', type: String })
  requestId?: string;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    description: 'Opaque structured error details for debugging or validation feedback.'
  })
  details?: unknown;
}

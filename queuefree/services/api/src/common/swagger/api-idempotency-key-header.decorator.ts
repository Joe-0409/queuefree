import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function ApiIdempotencyKeyHeader(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    ApiHeader({
      name: 'Idempotency-Key',
      required: true,
      description: 'Idempotency key for safely retryable write actions.',
      schema: {
        type: 'string'
      },
      example: 'idem_demo_01'
    })
  );
}

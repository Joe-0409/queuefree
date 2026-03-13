import { BadRequestException } from '@nestjs/common';

export function requireIdempotencyKey(value: unknown): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new BadRequestException({
      message: 'Idempotency-Key header is required.'
    });
  }

  return value.trim();
}

export function requireNonEmptyString(
  value: unknown,
  fieldName: string
): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new BadRequestException({
      message: `${fieldName} is required.`
    });
  }

  return value.trim();
}

export function requirePositiveInteger(
  value: unknown,
  fieldName: string
): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) {
    throw new BadRequestException({
      message: `${fieldName} must be an integer greater than or equal to 1.`
    });
  }

  return value;
}

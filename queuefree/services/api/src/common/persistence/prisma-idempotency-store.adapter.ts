import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IdempotencyRecord, IdempotencyStorePort, PutIdempotencyRecordInput } from './idempotency-store.port';

@Injectable()
export class PrismaIdempotencyStoreAdapter implements IdempotencyStorePort {
  constructor(private readonly prisma: PrismaService) {}

  async findByScopeAndUserAndKey(params: {
    scope: string;
    userId: string;
    idempotencyKey: string;
  }): Promise<IdempotencyRecord | null> {
    const record = await this.prisma.idempotencyKey.findUnique({
      where: {
        scope_userId_idempotencyKey: {
          scope: params.scope,
          userId: params.userId,
          idempotencyKey: params.idempotencyKey,
        },
      },
    });
    return record;
  }

  async put(input: PutIdempotencyRecordInput): Promise<IdempotencyRecord> {
    const record = await this.prisma.idempotencyKey.upsert({
      where: {
        scope_userId_idempotencyKey: {
          scope: input.scope,
          userId: input.userId,
          idempotencyKey: input.idempotencyKey,
        },
      },
      update: {},
      create: {
        scope: input.scope,
        userId: input.userId,
        idempotencyKey: input.idempotencyKey,
        requestSignature: input.requestSignature,
        responsePayloadJson: input.responsePayloadJson,
        httpStatus: input.httpStatus,
        expiresAt: input.expiresAt,
      },
    });
    return record;
  }
}

import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable
} from '@nestjs/common';
import {
  IDEMPOTENCY_STORE_PORT,
  IdempotencyRecord,
  IdempotencyStorePort
} from '../persistence/idempotency-store.port';
import { requireIdempotencyKey } from '../validation/request-validation.util';

export type PersistentIdempotencyMismatchMode = 'bad_request' | 'conflict';

interface GetOrCreatePersistentIdempotencyParams<T> {
  scope: string;
  userId: string;
  idempotencyKey?: string;
  requestSignature: string;
  mismatchMode: PersistentIdempotencyMismatchMode;
  successStatus: number;
  ttlMs?: number;
  factory: () => Promise<T>;
}

@Injectable()
export class PersistentIdempotencyService {
  private readonly defaultTtlMs = 24 * 60 * 60 * 1000;

  constructor(
    @Inject(IDEMPOTENCY_STORE_PORT)
    private readonly store: IdempotencyStorePort
  ) {}

  async getOrCreate<T>(
    params: GetOrCreatePersistentIdempotencyParams<T>
  ): Promise<T> {
    const normalizedIdempotencyKey = requireIdempotencyKey(
      params.idempotencyKey
    );
    const recordKey = {
      scope: params.scope,
      userId: params.userId,
      idempotencyKey: normalizedIdempotencyKey
    };

    const existing = await this.store.findByScopeAndUserAndKey(recordKey);
    if (existing) {
      return this.resolveExisting(
        existing,
        params.requestSignature,
        params.mismatchMode
      );
    }

    const response = await params.factory();

    try {
      await this.store.put({
        scope: params.scope,
        userId: params.userId,
        idempotencyKey: normalizedIdempotencyKey,
        requestSignature: params.requestSignature,
        responsePayloadJson: JSON.stringify(response),
        httpStatus: params.successStatus,
        expiresAt: new Date(Date.now() + (params.ttlMs ?? this.defaultTtlMs))
      });
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        const concurrent = await this.store.findByScopeAndUserAndKey(recordKey);
        if (concurrent) {
          return this.resolveExisting(
            concurrent,
            params.requestSignature,
            params.mismatchMode
          );
        }
      }

      throw error;
    }

    return response;
  }

  private resolveExisting<T>(
    record: IdempotencyRecord,
    requestSignature: string,
    mismatchMode: PersistentIdempotencyMismatchMode
  ): T {
    if (record.requestSignature !== requestSignature) {
      if (mismatchMode === 'conflict') {
        throw new ConflictException({
          message: 'Idempotency-Key cannot be reused for a different request.'
        });
      }

      throw new BadRequestException({
        message: 'Idempotency-Key cannot be reused for a different request.'
      });
    }

    return JSON.parse(record.responsePayloadJson) as T;
  }

  private isUniqueConstraintError(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'P2002'
    );
  }
}

import {
  BadRequestException,
  ConflictException,
  Injectable
} from '@nestjs/common';

export type IdempotencyMismatchMode = 'bad_request' | 'conflict';

interface CachedIdempotencyResult<T> {
  requestSignature: string;
  response: T;
  expiresAtMs: number;
}

interface GetOrCreateIdempotentResultParams<T> {
  scope: string;
  idempotencyKey: string;
  requestSignature: string;
  mismatchMode: IdempotencyMismatchMode;
  factory: () => T;
}

@Injectable()
export class InMemoryIdempotencyService {
  private readonly ttlMs = 5 * 60 * 1000;
  private readonly store = new Map<string, CachedIdempotencyResult<unknown>>();

  getOrCreate<T>(params: GetOrCreateIdempotentResultParams<T>): T {
    this.evictExpiredEntries();

    const storeKey = `${params.scope}:${params.idempotencyKey}`;
    const existing = this.store.get(storeKey) as
      | CachedIdempotencyResult<T>
      | undefined;

    if (existing) {
      if (existing.requestSignature !== params.requestSignature) {
        if (params.mismatchMode === 'conflict') {
          throw new ConflictException({
            message: 'Idempotency-Key cannot be reused for a different request.'
          });
        }

        throw new BadRequestException({
          message: 'Idempotency-Key cannot be reused for a different request.'
        });
      }

      return existing.response;
    }

    const response = params.factory();

    this.store.set(storeKey, {
      requestSignature: params.requestSignature,
      response,
      expiresAtMs: Date.now() + this.ttlMs
    });

    return response;
  }

  private evictExpiredEntries(): void {
    const now = Date.now();

    for (const [key, value] of this.store.entries()) {
      if (value.expiresAtMs <= now) {
        this.store.delete(key);
      }
    }
  }
}

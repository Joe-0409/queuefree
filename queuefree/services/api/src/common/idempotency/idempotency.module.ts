import { Global, Module } from '@nestjs/common';
import { InMemoryIdempotencyService } from './in-memory-idempotency.service';
import { PersistentIdempotencyService } from './persistent-idempotency.service';

@Global()
@Module({
  providers: [InMemoryIdempotencyService, PersistentIdempotencyService],
  exports: [InMemoryIdempotencyService, PersistentIdempotencyService]
})
export class IdempotencyModule {}

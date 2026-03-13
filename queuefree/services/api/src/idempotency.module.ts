import { Global, Module } from '@nestjs/common';
import { InMemoryIdempotencyService } from './in-memory-idempotency.service';

@Global()
@Module({
  providers: [InMemoryIdempotencyService],
  exports: [InMemoryIdempotencyService]
})
export class IdempotencyModule {}

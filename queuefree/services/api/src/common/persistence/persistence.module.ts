import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { IDEMPOTENCY_STORE_PORT } from './idempotency-store.port';
import { PrismaIdempotencyStoreAdapter } from './prisma-idempotency-store.adapter';
import { ORDERS_PERSISTENCE_PORT } from '../../orders/orders.persistence.port';
import { PrismaOrdersPersistenceAdapter } from '../../orders/prisma-orders.persistence.adapter';
import { PAYMENTS_PERSISTENCE_PORT } from '../../payments/payments.persistence.port';
import { PrismaPaymentsPersistenceAdapter } from '../../payments/prisma-payments.persistence.adapter';
import { QUEUE_GUARD_PERSISTENCE_PORT } from '../../queue-guard/queue-guard.persistence.port';
import { PrismaQueueGuardPersistenceAdapter } from '../../queue-guard/prisma-queue-guard.persistence.adapter';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    PrismaIdempotencyStoreAdapter,
    PrismaOrdersPersistenceAdapter,
    PrismaPaymentsPersistenceAdapter,
    PrismaQueueGuardPersistenceAdapter,
    {
      provide: IDEMPOTENCY_STORE_PORT,
      useExisting: PrismaIdempotencyStoreAdapter
    },
    {
      provide: ORDERS_PERSISTENCE_PORT,
      useExisting: PrismaOrdersPersistenceAdapter
    },
    {
      provide: PAYMENTS_PERSISTENCE_PORT,
      useExisting: PrismaPaymentsPersistenceAdapter
    },
    {
      provide: QUEUE_GUARD_PERSISTENCE_PORT,
      useExisting: PrismaQueueGuardPersistenceAdapter
    }
  ],
  exports: [
    IDEMPOTENCY_STORE_PORT,
    ORDERS_PERSISTENCE_PORT,
    PAYMENTS_PERSISTENCE_PORT,
    QUEUE_GUARD_PERSISTENCE_PORT
  ]
})
export class PersistenceModule {}

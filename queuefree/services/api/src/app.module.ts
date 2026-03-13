import { Module } from '@nestjs/common';
import { ApiConfigModule } from './common/config/api-config.module';
import { IdempotencyModule } from './common/idempotency/idempotency.module';
import { PersistenceModule } from './common/persistence/persistence.module';
import { SourcesModule } from './common/sources/sources.module';
import { MeModule } from './me/me.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';
import { QueueGuardModule } from './queue-guard/queue-guard.module';
import { RulesModule } from './rules/rules.module';
import { SystemModule } from './system/system.module';
import { ConsumerModule } from './consumer/consumer.module';
import { AdminModule } from './admin/admin.module';

@Module({
 imports: [
 ApiConfigModule,
 SourcesModule,
 PersistenceModule,
 IdempotencyModule,
 SystemModule,
 RulesModule,
 MeModule,
 ProductsModule,
 QueueGuardModule,
 OrdersModule,
 PaymentsModule,
 ConsumerModule,
 AdminModule
 ]
})
export class AppModule {}
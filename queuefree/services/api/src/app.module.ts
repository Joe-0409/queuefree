import { Module } from '@nestjs/common';
import { ApiConfigModule } from './common/config/api-config.module';
import { RulesModule } from './rules/rules.module';
import { SystemModule } from './system/system.module';
import { ConsumerModule } from './consumer/consumer.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ApiConfigModule, SystemModule, RulesModule, ConsumerModule, AdminModule]
})
export class AppModule {}

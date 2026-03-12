import { Module } from '@nestjs/common';
import { ApiConfigModule } from './common/config/api-config.module';
import { RulesModule } from './rules/rules.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [ApiConfigModule, SystemModule, RulesModule]
})
export class AppModule {}

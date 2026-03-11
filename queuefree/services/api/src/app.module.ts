import { Module } from '@nestjs/common';
import { ApiConfigModule } from './common/config/api-config.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [ApiConfigModule, SystemModule]
})
export class AppModule {}

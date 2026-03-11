import { Global, Module } from '@nestjs/common';
import { API_ENV } from './api-config.tokens';
import { ApiConfigService } from './api-config.service';
import { ApiEnvSchema } from './api-env.schema';

@Global()
@Module({
  providers: [
    {
      provide: API_ENV,
      useFactory: () => ApiEnvSchema.parse(process.env)
    },
    ApiConfigService
  ],
  exports: [API_ENV, ApiConfigService]
})
export class ApiConfigModule {}

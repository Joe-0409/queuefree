import { Inject, Injectable } from '@nestjs/common';
import type { AppEnv } from '@queuefree/shared';
import { API_ENV } from './api-config.tokens';
import type { ApiEnv } from './api-env.schema';

@Injectable()
export class ApiConfigService {
  constructor(@Inject(API_ENV) private readonly env: ApiEnv) {}

  get port(): number {
    return this.env.PORT;
  }

  get appEnv(): AppEnv {
    return this.env.APP_ENV;
  }

  get raw(): Readonly<ApiEnv> {
    return this.env;
  }
}

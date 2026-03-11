import {
  DEFAULT_RUNTIME_CONFIG,
  type HealthResponseBody,
  type RuntimeConfigResponseBody
} from '@queuefree/shared';
import { Injectable } from '@nestjs/common';
import apiPackageJson from '../../package.json';
import { ApiConfigService } from '../common/config/api-config.service';

@Injectable()
export class SystemService {
  constructor(private readonly apiConfig: ApiConfigService) {}

  getHealth(): HealthResponseBody {
    return {
      status: 'ok',
      service: apiPackageJson.name,
      version: apiPackageJson.version,
      environment: this.apiConfig.appEnv,
      timestamp: new Date().toISOString()
    };
  }

  getRuntimeConfig(): RuntimeConfigResponseBody {
    return DEFAULT_RUNTIME_CONFIG;
  }
}

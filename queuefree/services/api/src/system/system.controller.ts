import {
  HEALTH_ENDPOINT,
  SYSTEM_RUNTIME_CONFIG_ENDPOINT,
  type HealthResponseBody,
  type RuntimeConfigResponseBody
} from '@queuefree/shared';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ApiErrorResponseDto } from '../common/dto/api-error-response.dto';
import { HealthResponseDto } from './dto/health-response.dto';
import { RuntimeConfigResponseDto } from './dto/runtime-config-response.dto';
import { SystemService } from './system.service';

@ApiTags('System')
@Controller()
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get(HEALTH_ENDPOINT.replace(/^\/v1\//, ''))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Health probe for the API service' })
  @ApiOkResponse({ type: HealthResponseDto })
  @ApiInternalServerErrorResponse({ type: ApiErrorResponseDto })
  getHealth(): HealthResponseBody {
    return this.systemService.getHealth();
  }

  @Get(SYSTEM_RUNTIME_CONFIG_ENDPOINT.replace(/^\/v1\//, ''))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get public runtime configuration needed by mobile/web/admin clients' })
  @ApiOkResponse({ type: RuntimeConfigResponseDto })
  @ApiInternalServerErrorResponse({ type: ApiErrorResponseDto })
  getRuntimeConfig(): RuntimeConfigResponseBody {
    return this.systemService.getRuntimeConfig();
  }
}

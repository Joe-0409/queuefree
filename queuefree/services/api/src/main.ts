import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import {
  API_PREFIX,
  OPENAPI_DOCS_PATH,
  OPENAPI_JSON_PATH
} from '@queuefree/shared';
import { AppModule } from './app.module';
import { ApiConfigService } from './common/config/api-config.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { buildOpenApiDocument } from './openapi/openapi.factory';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const apiConfig = app.get(ApiConfigService);

  app.enableCors({ origin: true, credentials: true });
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalFilters(new HttpExceptionFilter());

  const documentFactory = () => buildOpenApiDocument(app);

  SwaggerModule.setup(OPENAPI_DOCS_PATH.replace(/^\//, ''), app, documentFactory, {
    jsonDocumentUrl: OPENAPI_JSON_PATH.replace(/^\//, ''),
    raw: ['json'],
    ui: true
  });

  await app.listen(apiConfig.port, '0.0.0.0');
}

void bootstrap();

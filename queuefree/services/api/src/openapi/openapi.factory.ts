import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, type SwaggerDocumentOptions } from '@nestjs/swagger';
import apiPackageJson from '../../package.json';

export function buildOpenApiDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('QueueFree API')
    .setDescription(
      'Initial C-end OpenAPI surface for QueueFree. This batch exposes system-level endpoints plus the minimum public rules endpoints needed by Web rules pages and packages/api-client.'
    )
    .setVersion(apiPackageJson.version)
    .addServer('http://localhost:4000', 'local')
    .addServer('https://dev-api.queuefree.com', 'dev')
    .addServer('https://stg-api.queuefree.com', 'staging')
    .addServer('https://api.queuefree.com', 'prod')
    .addTag('System', 'System health and public runtime configuration.')
    .addTag('Rules', 'Public rules center documents for Web and App.')
    .build();

  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: false,
    deepScanRoutes: true,
    autoTagControllers: false,
    operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey
  };

  return SwaggerModule.createDocument(app, config, options);
}

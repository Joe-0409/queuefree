import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, type SwaggerDocumentOptions } from '@nestjs/swagger';
import apiPackageJson from '../../package.json';

export function buildOpenApiDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('QueueFree API')
    .setDescription(
      'Initial C-end OpenAPI surface for QueueFree. This batch only exposes system-level endpoints required to bootstrap packages/api-client and runtime config delivery.'
    )
    .setVersion(apiPackageJson.version)
    .addServer('http://localhost:4000', 'local')
    .addServer('https://dev-api.queuefree.com', 'dev')
    .addServer('https://stg-api.queuefree.com', 'staging')
    .addServer('https://api.queuefree.com', 'prod')
    .build();

  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: false,
    deepScanRoutes: true,
    autoTagControllers: false,
    operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey
  };

  return SwaggerModule.createDocument(app, config, options);
}

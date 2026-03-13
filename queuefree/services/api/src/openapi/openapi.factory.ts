import type { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
  type SwaggerDocumentOptions,
} from '@nestjs/swagger';
import apiPackageJson from '../../package.json';

function normalizeControllerKey(controllerKey: string): string {
  return controllerKey
    .replace(/Controller$/, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export function buildOpenApiOperationId(
  controllerKey: string,
  methodKey: string,
): string {
  const normalizedControllerKey = normalizeControllerKey(controllerKey);

  if (!normalizedControllerKey) {
    return methodKey;
  }

  return `${normalizedControllerKey}_${methodKey}`;
}

export function buildOpenApiDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('QueueFree API')
    .setDescription(
      [
        'Current QueueFree OpenAPI surface.',
        'Includes system endpoints, public rules endpoints, and mounted consumer/admin modules.',
        'Convention:',
        '- paths keep the /v1 prefix',
        '- servers.url must not include /v1',
      ].join('\n'),
    )
    .setVersion(apiPackageJson.version)
    .addServer('http://localhost:4000', 'local')
    .addServer('https://dev-api.queuefree.com', 'dev')
    .addServer('https://stg-api.queuefree.com', 'staging')
    .addServer('https://api.queuefree.com', 'prod')
    .addTag('System', 'System health and runtime configuration.')
    .addTag('Rules', 'Public rules center documents for Web and App.')
    .addTag('Consumer', 'Consumer-facing API surface.')
    .addTag('Admin', 'Admin-facing API surface.')
    .build();

  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: false,
    deepScanRoutes: true,
    autoTagControllers: false,
    operationIdFactory: buildOpenApiOperationId,
  };

  return SwaggerModule.createDocument(app, config, options);
}

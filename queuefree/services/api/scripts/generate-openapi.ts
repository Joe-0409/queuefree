import 'reflect-metadata';

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { API_PREFIX } from '@queuefree/shared';
import { AppModule } from '../src/app.module';
import { buildOpenApiDocument } from '../src/openapi/openapi.factory';

async function main(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.setGlobalPrefix(API_PREFIX);

  const document = buildOpenApiDocument(app);
  const targetPath = resolve(__dirname, '../openapi/openapi.json');

  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, JSON.stringify(document, null, 2), 'utf-8');
  await app.close();
}

void main();

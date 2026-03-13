/**
 * AUTO-GENERATED — DO NOT EDIT
 * Batch 14 readonly — runtime config mappers
 * 
 * TODO: Implement proper DTO mapping
 */

import type { RuntimeConfig } from '@queuefree/shared';

export function mapRuntimeConfigToScreen(): RuntimeConfig {
  return {} as any;
}

export function mapHealthToScreen(): { status: 'ok'; service: string; version: string; environment: string; timestamp: string } {
  return {
    status: 'ok',
    service: 'api',
    version: '0.1.0',
    environment: 'local',
    timestamp: new Date().toISOString(),
  };
}

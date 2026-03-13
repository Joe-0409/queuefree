/**
 * AUTO-GENERATED — DO NOT EDIT
 * Batch 16 mobile write bridge manifest
 */

export const mobileGeneratedWriteBridgeManifest = [
  {
    method: 'createCheckoutSession',
    bridge: 'createCheckoutSessionFromGeneratedBridge',
    fetcher: 'createCheckoutSessionRawFromGeneratedSource',
    mapper: 'mapGeneratedCheckoutSessionPayload',
    wired: true,
    mode: 'write-openapi'
  },
  {
    method: 'checkInQueueGuard',
    bridge: 'checkInQueueGuardFromGeneratedBridge',
    fetcher: 'checkInQueueGuardRawFromGeneratedSource',
    mapper: 'mapGeneratedQueueGuardCheckInPayload',
    wired: true,
    mode: 'write-openapi'
  }
] as const;

export function getMobileGeneratedWriteBridgeCoverageSummary() {
  const total = mobileGeneratedWriteBridgeManifest.length;
  const wired = mobileGeneratedWriteBridgeManifest.filter((entry) => entry.wired).length;
  const pending = total - wired;
  return { total, wired, pending };
}

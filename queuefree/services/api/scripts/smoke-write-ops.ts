import assert from 'node:assert/strict';
import {
  DEMO_ADDRESS_ID,
  DEMO_CURRENCY_CODE,
  DEMO_ORDER_PAID_ID,
  DEMO_PRICE_MINOR,
  DEMO_PRODUCT_ID,
  DEMO_SKU_ID
} from '../src/common/demo/demo-fixtures';

const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:4000';

interface JsonResponse<T = unknown> {
  status: number;
  body: T;
}

function buildSmokeKey(label: string): string {
  return `smoke_${label}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

async function request<T>(params: {
  method: 'POST' | 'GET';
  path: string;
  idempotencyKey?: string;
  body?: unknown;
}): Promise<JsonResponse<T>> {
  const headers: Record<string, string> = {};

  if (params.idempotencyKey) {
    headers['Idempotency-Key'] = params.idempotencyKey;
  }

  if (params.body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${params.path}`, {
    method: params.method,
    headers,
    body: params.body !== undefined ? JSON.stringify(params.body) : undefined
  });

  const raw = await response.text();
  const body = raw.length > 0 ? JSON.parse(raw) : null;

  return {
    status: response.status,
    body: body as T
  };
}

function assertObject(value: unknown): asserts value is Record<string, unknown> {
  assert.equal(typeof value, 'object');
  assert.notEqual(value, null);
  assert.equal(Array.isArray(value), false);
}

async function main(): Promise<void> {
  console.log(`QueueFree Batch 16A smoke test base URL: ${API_BASE_URL}`);
  console.log('Make sure the API is already running before you execute this script.');

  const createOrderKey = buildSmokeKey('orders_create');
  const createOrderBody = {
    productId: DEMO_PRODUCT_ID,
    skuId: DEMO_SKU_ID,
    quantity: 2,
    addressId: DEMO_ADDRESS_ID
  };

  const createOrder = await request<Record<string, unknown>>({
    method: 'POST',
    path: '/v1/orders',
    idempotencyKey: createOrderKey,
    body: createOrderBody
  });

  assert.equal(createOrder.status, 201);
  assertObject(createOrder.body);
  assert.equal(createOrder.body.productId, DEMO_PRODUCT_ID);
  assert.equal(createOrder.body.skuId, DEMO_SKU_ID);
  assert.equal(createOrder.body.quantity, 2);

  const repeatedCreateOrder = await request<Record<string, unknown>>({
    method: 'POST',
    path: '/v1/orders',
    idempotencyKey: createOrderKey,
    body: createOrderBody
  });

  assert.equal(repeatedCreateOrder.status, 201);
  assert.deepEqual(repeatedCreateOrder.body, createOrder.body);

  const mismatchedCreateOrder = await request<Record<string, unknown>>({
    method: 'POST',
    path: '/v1/orders',
    idempotencyKey: createOrderKey,
    body: {
      ...createOrderBody,
      quantity: 3
    }
  });

  assert.equal(mismatchedCreateOrder.status, 400);

  const createdOrderId = String(createOrder.body.orderId);

  const paymentIntentMissingHeader = await request<Record<string, unknown>>({
    method: 'POST',
    path: `/v1/orders/${createdOrderId}/payment-intents`
  });

  assert.equal(paymentIntentMissingHeader.status, 400);

  const createPaymentIntentKey = buildSmokeKey('payment_intent_create');
  const createPaymentIntent = await request<Record<string, unknown>>({
    method: 'POST',
    path: `/v1/orders/${createdOrderId}/payment-intents`,
    idempotencyKey: createPaymentIntentKey
  });

  assert.equal(createPaymentIntent.status, 201);
  assertObject(createPaymentIntent.body);
  assert.equal(createPaymentIntent.body.orderId, createdOrderId);
  assert.equal(createPaymentIntent.body.amountMinor, DEMO_PRICE_MINOR * 2);
  assert.equal(createPaymentIntent.body.currencyCode, DEMO_CURRENCY_CODE);

  const repeatedPaymentIntent = await request<Record<string, unknown>>({
    method: 'POST',
    path: `/v1/orders/${createdOrderId}/payment-intents`,
    idempotencyKey: createPaymentIntentKey
  });

  assert.equal(repeatedPaymentIntent.status, 201);
  assert.deepEqual(repeatedPaymentIntent.body, createPaymentIntent.body);

  const paymentIntentConflict = await request<Record<string, unknown>>({
    method: 'POST',
    path: `/v1/orders/${DEMO_ORDER_PAID_ID}/payment-intents`,
    idempotencyKey: buildSmokeKey('payment_intent_conflict')
  });

  assert.equal(paymentIntentConflict.status, 409);

  const queueGuardMissingHeader = await request<Record<string, unknown>>({
    method: 'POST',
    path: '/v1/queue-guard/check-in'
  });

  assert.equal(queueGuardMissingHeader.status, 400);

  const queueGuardCheckInKey = buildSmokeKey('queue_guard_check_in');
  const queueGuardCheckIn = await request<Record<string, unknown>>({
    method: 'POST',
    path: '/v1/queue-guard/check-in',
    idempotencyKey: queueGuardCheckInKey
  });

  assert.equal(queueGuardCheckIn.status, 200);
  assertObject(queueGuardCheckIn.body);
  assert.equal(typeof queueGuardCheckIn.body.validUntil, 'string');

  const repeatedQueueGuardCheckIn = await request<Record<string, unknown>>({
    method: 'POST',
    path: '/v1/queue-guard/check-in',
    idempotencyKey: queueGuardCheckInKey
  });

  assert.equal(repeatedQueueGuardCheckIn.status, 200);
  assert.deepEqual(repeatedQueueGuardCheckIn.body, queueGuardCheckIn.body);

  console.log('QueueFree Batch 16A smoke test passed.');
}

main().catch((error) => {
  console.error('QueueFree Batch 16A smoke test failed.');
  console.error(error);
  process.exitCode = 1;
});

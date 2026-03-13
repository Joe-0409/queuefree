export const IDEMPOTENCY_STORE_PORT = Symbol('IDEMPOTENCY_STORE_PORT');

export interface IdempotencyRecord {
  scope: string;
  userId: string;
  idempotencyKey: string;
  requestSignature: string;
  responsePayloadJson: string;
  httpStatus: number;
  createdAt: Date;
  expiresAt: Date;
}

export interface PutIdempotencyRecordInput {
  scope: string;
  userId: string;
  idempotencyKey: string;
  requestSignature: string;
  responsePayloadJson: string;
  httpStatus: number;
  expiresAt: Date;
}

export interface IdempotencyStorePort {
  findByScopeAndUserAndKey(params: {
    scope: string;
    userId: string;
    idempotencyKey: string;
  }): Promise<IdempotencyRecord | null>;

  put(input: PutIdempotencyRecordInput): Promise<IdempotencyRecord>;
}

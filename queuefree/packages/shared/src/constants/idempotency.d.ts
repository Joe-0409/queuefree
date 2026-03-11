export declare const IDEMPOTENCY_HEADER_NAME: "Idempotency-Key";
export declare const IDEMPOTENCY_KEY_TTL_HOURS = 24;
export declare const IDEMPOTENT_C_ACTION_PATHS: readonly ["/v1/orders", "/v1/orders/:orderId/payment-intents", "/v1/queue-guard/check-in", "/v1/queue-entries/:queueEntryId/boost", "/v1/tasks/:taskId/claim", "/v1/withdrawals", "/v1/me/delete-account-requests"];
export declare const IDEMPOTENT_SERVER_ACTIONS: readonly ["payments.webhook", "settlements.run-slot-settlement", "wallet.release-cashback", "wallet.clawback", "withdrawals.callback"];
//# sourceMappingURL=idempotency.d.ts.map
  export const ORDER_STATUSES = [
    "CREATED",
"WAIT_PAY",
"PAID",
"FULFILLING",
"SHIPPED",
"DELIVERED",
"COMPLETED",
"CANCELED",
"AFTERSALE_OPEN",
"PARTIAL_REFUNDED",
"FULL_REFUNDED"
  ] as const;

  export type OrderStatus = (typeof ORDER_STATUSES)[number];

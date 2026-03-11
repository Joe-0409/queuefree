export const ORDER_QUEUE_SEAT_COUNT = 1;
export const QUEUE_TOP_PROTECTED_COUNT = 30;
export const QUEUE_BOOST_MAX_PER_ENTRY = 2;
export const INVITE_MAX_DEPTH = 1;

export const WALLET_SUPPORTS_TOP_UP = false;
export const WALLET_SUPPORTS_PEER_TRANSFER = false;

export const ORDER_SUPPORTS_CART = false;
export const ORDER_SUPPORTS_MULTI_PRODUCT_PER_ORDER = false;
export const BOOST_IS_SELLABLE = false;
export const INVITE_IS_SINGLE_LEVEL = true;

export const DEFAULT_MINOR_UNIT_SCALE = 100;

export const HARD_BUSINESS_RULES = {
  orderQueueSeatCount: ORDER_QUEUE_SEAT_COUNT,
  queueTopProtectedCount: QUEUE_TOP_PROTECTED_COUNT,
  queueBoostMaxPerEntry: QUEUE_BOOST_MAX_PER_ENTRY,
  inviteMaxDepth: INVITE_MAX_DEPTH,
  walletSupportsTopUp: WALLET_SUPPORTS_TOP_UP,
  walletSupportsPeerTransfer: WALLET_SUPPORTS_PEER_TRANSFER,
  orderSupportsCart: ORDER_SUPPORTS_CART,
  orderSupportsMultiProductPerOrder: ORDER_SUPPORTS_MULTI_PRODUCT_PER_ORDER,
  boostIsSellable: BOOST_IS_SELLABLE,
  inviteIsSingleLevel: INVITE_IS_SINGLE_LEVEL,
  defaultMinorUnitScale: DEFAULT_MINOR_UNIT_SCALE,
} as const;

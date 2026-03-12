export const API_PREFIX = "/v1" as const;
export const ADMIN_API_PREFIX = "/v1/admin" as const;

export const API_ENDPOINTS = {
  auth: {
    sendOtp: `${API_PREFIX}/auth/otp/send`,
    verifyOtp: `${API_PREFIX}/auth/otp/verify`,
    refresh: `${API_PREFIX}/auth/refresh`,
    logout: `${API_PREFIX}/auth/logout`
  },
  me: {
    get: `${API_PREFIX}/me`,
    patchProfile: `${API_PREFIX}/me/profile`,
    addresses: `${API_PREFIX}/me/addresses`,
    devices: `${API_PREFIX}/me/devices`,
    deleteAccountRequests: `${API_PREFIX}/me/delete-account-requests`
  },
  products: {
    list: `${API_PREFIX}/products`,
    detail: (productId: string) => `${API_PREFIX}/products/${productId}`
  },
  orders: {
    create: `${API_PREFIX}/orders`,
    list: `${API_PREFIX}/orders`,
    detail: (orderId: string) => `${API_PREFIX}/orders/${orderId}`,
    paymentIntents: (orderId: string) => `${API_PREFIX}/orders/${orderId}/payment-intents`
  },
  queue: {
    entries: `${API_PREFIX}/queue-entries`,
    entryDetail: (queueEntryId: string) => `${API_PREFIX}/queue-entries/${queueEntryId}`,
    guard: `${API_PREFIX}/queue-guard`,
    checkIn: `${API_PREFIX}/queue-guard/check-in`,
    boost: (queueEntryId: string) => `${API_PREFIX}/queue-entries/${queueEntryId}/boost`
  },
  tasks: {
    list: `${API_PREFIX}/tasks`,
    claim: (taskId: string) => `${API_PREFIX}/tasks/${taskId}/claim`
  },
  invites: {
    me: `${API_PREFIX}/invites/me`,
    bind: `${API_PREFIX}/invites/bind`,
    records: `${API_PREFIX}/invites/records`
  },
  wallet: {
    get: `${API_PREFIX}/wallet`,
    ledgers: `${API_PREFIX}/wallet/ledgers`,
    withdrawalAccounts: `${API_PREFIX}/withdrawal-accounts`,
    withdrawals: `${API_PREFIX}/withdrawals`
  },
  rules: {
    list: `${API_PREFIX}/rules`,
    detail: (slug: string) => `${API_PREFIX}/rules/${slug}`
  },
  notifications: {
    list: `${API_PREFIX}/notifications`
  }
} as const;

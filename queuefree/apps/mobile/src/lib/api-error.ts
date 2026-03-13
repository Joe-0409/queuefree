type ErrorShape = {
  code?: string;
  message?: string;
  requestId?: string;
};

export function getApiErrorMessage(error: unknown, fallback = 'The request failed. Please try again.') {
  if (typeof error === 'string' && error.trim()) {
    return error;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  if (error && typeof error === 'object') {
    const shape = error as ErrorShape;
    const message = shape.message?.trim();
    const code = shape.code?.trim();
    const requestId = shape.requestId?.trim();

    if (message && code && requestId) {
      return `${message} (${code}; request ${requestId})`;
    }

    if (message && code) {
      return `${message} (${code})`;
    }

    if (message) {
      return message;
    }

    if (code) {
      return `Request failed with code ${code}.`;
    }
  }

  return fallback;
}

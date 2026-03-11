import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import type { ApiErrorBody } from '@queuefree/shared';

interface HttpRequestLike {
  headers?: Record<string, string | string[] | undefined>;
}

interface HttpResponseLike {
  status(code: number): {
    json(body: unknown): void;
  };
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<HttpResponseLike>();
    const request = context.getRequest<HttpRequestLike>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const { code, message, details } = this.normalizeException(exception, status);

    const requestIdHeader = request.headers?.['x-request-id'];
    const requestId =
      typeof requestIdHeader === 'string'
        ? requestIdHeader
        : Array.isArray(requestIdHeader)
          ? requestIdHeader[0]
          : undefined;

    const body: ApiErrorBody = {
      code,
      message,
      ...(details === undefined ? {} : { details }),
      ...(requestId ? { requestId } : {})
    };

    response.status(status).json(body);
  }

  private normalizeException(
    exception: unknown,
    status: number
  ): {
    code: string;
    message: string;
    details?: unknown;
  } {
    if (!(exception instanceof HttpException)) {
      return {
        code: this.mapStatusToCode(status),
        message: 'Unexpected server error.'
      };
    }

    const payload = exception.getResponse();

    if (typeof payload === 'string') {
      return {
        code: this.mapStatusToCode(status),
        message: payload
      };
    }

    if (typeof payload === 'object' && payload !== null) {
      const record = payload as Record<string, unknown>;
      const rawMessage = record.message;
      const message = Array.isArray(rawMessage)
        ? rawMessage.join(', ')
        : typeof rawMessage === 'string'
          ? rawMessage
          : exception.message;

      return {
        code:
          typeof record.code === 'string'
            ? record.code
            : this.mapStatusToCode(status),
        message,
        details:
          record.details ??
          (Array.isArray(rawMessage) ? { messages: rawMessage } : undefined)
      };
    }

    return {
      code: this.mapStatusToCode(status),
      message: exception.message
    };
  }

  private mapStatusToCode(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'BAD_REQUEST';
      case HttpStatus.UNAUTHORIZED:
        return 'UNAUTHORIZED';
      case HttpStatus.FORBIDDEN:
        return 'FORBIDDEN';
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND';
      case HttpStatus.CONFLICT:
        return 'CONFLICT';
      case HttpStatus.TOO_MANY_REQUESTS:
        return 'TOO_MANY_REQUESTS';
      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  }
}

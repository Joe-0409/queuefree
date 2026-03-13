import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';
import { ApiErrorResponseDto } from '../dto/api-error-response.dto';

interface ApiCommonErrorResponsesOptions {
  badRequestDescription?: string;
  notFoundDescription?: string;
  conflictDescription?: string;
}

export function ApiCommonErrorResponses(
  options?: ApiCommonErrorResponsesOptions
): MethodDecorator & ClassDecorator {
  const decorators: Array<MethodDecorator | ClassDecorator> = [
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
      type: ApiErrorResponseDto
    })
  ];

  if (options?.badRequestDescription) {
    decorators.push(
      ApiBadRequestResponse({
        description: options.badRequestDescription,
        type: ApiErrorResponseDto
      })
    );
  }

  if (options?.notFoundDescription) {
    decorators.push(
      ApiNotFoundResponse({
        description: options.notFoundDescription,
        type: ApiErrorResponseDto
      })
    );
  }

  if (options?.conflictDescription) {
    decorators.push(
      ApiConflictResponse({
        description: options.conflictDescription,
        type: ApiErrorResponseDto
      })
    );
  }

  return applyDecorators(...decorators);
}

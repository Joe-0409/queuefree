import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ApiErrorResponseDto } from '../common/dto/api-error-response.dto';
import { UserQueueGuardResponseDto } from './dto/user-queue-guard-response.dto';
import { QueueGuardService } from './queue-guard.service';

@ApiTags('Queue Guard')
@Controller('queue-guard')
export class QueueGuardController {
  constructor(private readonly queueGuardService: QueueGuardService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get the current user-level queue guard status'
  })
  @ApiOkResponse({
    type: UserQueueGuardResponseDto
  })
  @ApiInternalServerErrorResponse({
    type: ApiErrorResponseDto
  })
  async getQueueGuard(): Promise<UserQueueGuardResponseDto> {
    return this.queueGuardService.getQueueGuard();
  }
}

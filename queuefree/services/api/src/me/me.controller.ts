import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ApiErrorResponseDto } from '../common/dto/api-error-response.dto';
import { MeOverviewResponseDto } from './dto/me-overview-response.dto';
import { MeService } from './me.service';

@ApiTags('Me')
@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get the current C-end user overview needed by the Me tab'
  })
  @ApiOkResponse({
    type: MeOverviewResponseDto
  })
  @ApiInternalServerErrorResponse({
    type: ApiErrorResponseDto
  })
  async getMeOverview(): Promise<MeOverviewResponseDto> {
    return this.meService.getMeOverview();
  }
}

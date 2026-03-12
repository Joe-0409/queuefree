import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';
import { ApiErrorResponseDto } from '../common/dto/api-error-response.dto';
import { RuleDetailResponseDto } from './dto/rule-detail-response.dto';
import { RuleListItemDto } from './dto/rule-list-item.dto';
import { RulesService } from './rules.service';

@ApiTags('Rules')
@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List public rule documents for the Web/App rules center'
  })
  @ApiOkResponse({
    type: RuleListItemDto,
    isArray: true
  })
  @ApiInternalServerErrorResponse({
    type: ApiErrorResponseDto
  })
  listRules(): RuleListItemDto[] {
    return this.rulesService.listRules();
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get a public rule document by slug'
  })
  @ApiParam({
    name: 'slug',
    example: 'queue'
  })
  @ApiOkResponse({
    type: RuleDetailResponseDto
  })
  @ApiNotFoundResponse({
    type: ApiErrorResponseDto
  })
  @ApiInternalServerErrorResponse({
    type: ApiErrorResponseDto
  })
  getRuleBySlug(@Param('slug') slug: string): RuleDetailResponseDto {
    return this.rulesService.getRuleBySlug(slug);
  }
}

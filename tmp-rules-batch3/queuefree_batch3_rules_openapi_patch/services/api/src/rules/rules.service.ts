import { Injectable, NotFoundException } from '@nestjs/common';
import { RuleDetailResponseDto } from './dto/rule-detail-response.dto';
import { RuleListItemDto } from './dto/rule-list-item.dto';

@Injectable()
export class RulesService {
  listRules(): RuleListItemDto[] {
    return [];
  }

  getRuleBySlug(slug: string): RuleDetailResponseDto {
    throw new NotFoundException(`Rule not found: ${slug}`);
  }
}

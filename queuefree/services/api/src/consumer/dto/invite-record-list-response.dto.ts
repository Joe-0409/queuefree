import { ApiProperty } from '@nestjs/swagger';

export class InviteRecordListItemDto {
  @ApiProperty({ format: 'uuid' })
  relationId: string;

  @ApiProperty()
  inviteeMaskedPhone: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({ nullable: true })
  effectiveAt: string | null;

  @ApiProperty({ nullable: true })
  invalidReasonText: string | null;
}

export class InviteRecordListResponseDto {
  @ApiProperty({ type: [InviteRecordListItemDto] })
  items: InviteRecordListItemDto[];

  @ApiProperty({ nullable: true })
  nextCursor: string | null;
}

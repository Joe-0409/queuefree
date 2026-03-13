import { ApiProperty } from '@nestjs/swagger';

export class MeOverviewResponseDto {
 @ApiProperty({
 example: 'user_demo_01',
 description: 'The unique identifier of the current user'
 })
 userId: string;

 @ApiProperty({
 example: '+63 *** *** 1234',
 description: 'Masked phone number for display'
 })
 phoneMasked: string;

 @ApiProperty({
 example: 'NOT_REQUESTED',
 description: 'Current account deletion status'
 })
 accountDeleteStatus: string;

 @ApiProperty({
 example: 'INVITE',
 description: 'How the wallet was activated',
 nullable: true
 })
 walletActivationMethod: string | null;
}
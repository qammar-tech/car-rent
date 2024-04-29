import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail } from 'class-validator';

export class ResendInviteLinkDto {
  @ApiProperty({ example: 'email@example.com', required: true })
  @IsEmail()
  email: string;

  @Allow()
  ip: string;
}

import { UserStatus } from '@app/user/user.types';
import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';

export class InviteLinkDto {
  @ApiProperty({ example: 'email@example.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Bucks', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  name: string;

  @ApiProperty({
    example: UserStatus.Active,
    required: false,
    default: UserStatus.Active,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status: UserStatus;

  @Allow()
  ip: string;
}

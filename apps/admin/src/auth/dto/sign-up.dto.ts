import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IncomingHttpHeaders } from 'node:http';
import { HeadersValidator } from '../validators/headers.validator';
import { InviteLinkValidator } from '../validators/invite-link.validator';

export class SignUpDto {
  @ApiProperty({ example: 'email@example.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'fingerprint',
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  password: string;

  @ApiProperty({ example: 'sajbjhvdsbhvdbsakbvdsajlhv', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @Validate(InviteLinkValidator)
  inviteLink: string;

  @Validate(HeadersValidator)
  headers: IncomingHttpHeaders;

  @Allow()
  ip: string;
}

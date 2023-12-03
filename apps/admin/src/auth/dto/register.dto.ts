import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IncomingHttpHeaders } from 'node:http';
import { HeadersValidator } from '../validators/headers.validator';
import { Match } from '@app/common/validators/match.decorator';
import { UserType } from '../auth.types';

export class RegisterDto {
  @ApiProperty({ example: 'email@example.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'abcd1234',
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  password: string;

  @ApiProperty({
    example: 'The Vendor',
    required: true,
    minLength: 1,
    maxLength: 128,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name: string;

  @ApiProperty({
    example: 'abcd1234',
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  @Match(RegisterDto, (s) => s.password, { message: 'Passwords do not match' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  repeatPassword: string;

  @ApiProperty({
    example: 'abcd1234',
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  @Match(RegisterDto, (s) => s.password, { message: 'Passwords do not match' })
  @IsOptional()
  @IsEnum(UserType)
  role: UserType;

  @Validate(HeadersValidator)
  headers: IncomingHttpHeaders;

  @Allow()
  ip: string;
}

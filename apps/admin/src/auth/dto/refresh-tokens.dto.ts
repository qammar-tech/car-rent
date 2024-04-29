import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IncomingHttpHeaders } from 'node:http';
import { HeadersValidator } from '../validators/headers.validator';
import { RefreshTokenValidator } from '../validators/refresh-token.validator';

export class RefreshTokensDto {
  @ApiProperty({
    example: 'F?2BVjaxNR-&hn%',
    required: true,
    minLength: 64,
    maxLength: 64,
  })
  @IsString()
  @MinLength(64)
  @MaxLength(64)
  @Validate(RefreshTokenValidator)
  refreshToken: string;

  @Validate(HeadersValidator)
  headers: IncomingHttpHeaders;

  @Allow()
  ip: string;
}

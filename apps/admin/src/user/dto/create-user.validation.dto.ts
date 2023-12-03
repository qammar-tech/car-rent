import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserStatus } from '@app/user/user.types';
import { ValidateHelper } from '@app/common/helpers/validate.helper';
import { UserType } from '@admin/auth/auth.types';
import { Match } from '@app/common/validators/match.decorator';

export class CreateUserValidationDto {
  @ApiProperty({ example: 'John Bucks', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  name: string;

  @ApiProperty({ example: 'example@domain.com', required: true })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: 'example@domain.com', required: true })
  @IsNotEmpty()
  @MaxLength(255)
  password: string;

  @ApiProperty({
    example: 'abcd1234',
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  @Match(CreateUserValidationDto, (s) => s.password, {
    message: 'Passwords do not match',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  repeatPassword: string;

  @ApiProperty({
    example: UserStatus.Active,
    required: false,
    default: UserStatus.Active,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status: UserStatus;

  @ApiProperty({
    example: UserType.Individual,
    required: false,
    default: UserType.Individual,
  })
  @IsEnum(UserType)
  role: UserType;
}

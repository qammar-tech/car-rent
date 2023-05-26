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
} from 'class-validator';
import { UserStatus } from '@app/user/user.types';
import { ValidateHelper } from '@app/common/helpers/validate.helper';

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

  @ApiProperty({
    example:
      'https://img.new.livestream.com/events/00000000004f5dbd/7ffdcd50-2e4b-497a-acca-bc33070c3e12.jpg',
    required: false,
    maxLength: 2048,
  })
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  @MaxLength(2048)
  photoUrl: string;

  @ApiProperty({ example: '011-971-55-000-0000', required: true })
  @Transform(({ value }) => ValidateHelper.sanitizePhoneNumber(value))
  @IsNotEmpty()
  @IsPhoneNumber()
  @MaxLength(255)
  phoneNumber: string;

  @ApiProperty({
    example: UserStatus.Active,
    required: false,
    default: UserStatus.Active,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status: UserStatus;
}

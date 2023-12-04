import { Admin } from '@admin/admin/admin.entity';
import { User } from '@app/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentValidationDto {
  //   @ApiProperty({ example: 'John Bucks', required: true })
  //   @IsNotEmpty()
  //   @IsNumber()
  //   userId: number;

  @Allow()
  user: User | Admin;
}

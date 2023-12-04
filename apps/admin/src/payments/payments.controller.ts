import { AuthRequest } from '@admin/auth/auth.types';
import { JwtAuthGuard } from '@admin/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@admin/auth/guards/local-auth.guard';
import { RequestToBodyInterceptor } from '@app/common/interceptors/request-to-body.interceptor';
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreatePaymentValidationDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ description: `Create a new payment` })
  @UseInterceptors(new RequestToBodyInterceptor('admin', 'admin'))
  @UseInterceptors(new RequestToBodyInterceptor('user', 'user'))
  @Post()
  async create(@Body() data: CreatePaymentValidationDto) {
    return this.paymentsService.create(data);
  }

  // @ApiOperation({ description: `Get all user with pagination` })
  // @Get()
  // async findAllPaginated(
  //   @Query() searchParams: UserFilterDto,
  // ): Promise<PagingResult<User>> {
  //   return this.paymentsService.findAllPaginated(searchParams);
  // }
}

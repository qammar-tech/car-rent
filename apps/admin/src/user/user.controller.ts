import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserValidationDto } from './dto/create-user.validation.dto';
import { UpdateUserValidationDto } from './dto/update-user.validation.dto';
import { PagingResult } from 'typeorm-cursor-pagination';
import { UserFilterDto } from './dto/user.filter.dto';
import { JwtAuthGuard } from '@admin/auth/guards/jwt-auth.guard';
import { User } from '@app/user/user.entity';
import { PaginatedResult } from '@app/common/pagination/pagination.types';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: `Create a new user` })
  @Post()
  async create(@Body() createUserDto: CreateUserValidationDto) {
    return this.userService.create(createUserDto);
  }
  @ApiOperation({ description: `Update user properties` })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserValidationDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ description: `Get all user with pagination` })
  @Get()
  async findAllPaginated(
    @Query() searchParams: UserFilterDto,
  ): Promise<PagingResult<User>> {
    return this.userService.findAllPaginated(searchParams);
  }
  @ApiOperation({ description: `Get a user by id` })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }
}

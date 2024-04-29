import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskService } from './tasks.service';
import { PagingResult } from 'typeorm-cursor-pagination';
import { TasksFilterDto } from './dto/task.filter.dto';
import { JwtAuthGuard } from '@admin/auth/guards/jwt-auth.guard';
import { ApiResponseHelper } from '@app/common/helpers/api-response-helper';
import { CreateTaskDto } from './dto/create-task.dto';
import { RequestToBodyInterceptor } from '@app/common/interceptors/request-to-body.interceptor';
import { AuthRequest } from '@admin/auth/auth.types';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginatedResult } from '@app/common/pagination/pagination.types';
import { Tasks } from '@app/tasks';

@ApiResponse(ApiResponseHelper.unauthorized())
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ description: `Create a new task` })
  @UseInterceptors(
    ClassSerializerInterceptor,
    new RequestToBodyInterceptor('user', 'user'),
  )
  @Post()
  async create(@Req() req: AuthRequest, @Body() data: CreateTaskDto) {
    return this.taskService.create(req.user, data);
  }

  @ApiOperation({ description: `Delete a specific task` })
  @UseInterceptors(
    ClassSerializerInterceptor,
    new RequestToBodyInterceptor('user', 'user'),
  )
  @Delete(':uuid')
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return this.taskService.delete(uuid);
  }

  @ApiOperation({ description: `Update task` })
  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() data: UpdateTaskDto,
  ) {
    return this.taskService.update(uuid, data);
  }

  @ApiOperation({ description: `Get all tasks with pagination` })
  @ApiResponse(ApiResponseHelper.success(PaginatedResult<Tasks>))
  @Get()
  async findAllPaginated(
    @Query() searchParams: TasksFilterDto,
  ): Promise<PagingResult<Tasks>> {
    return this.taskService.findAllPaginated(searchParams);
  }
}

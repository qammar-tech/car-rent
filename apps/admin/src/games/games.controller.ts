import { JwtAuthGuard } from '@admin/auth/guards/jwt-auth.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';

@UseGuards(JwtAuthGuard)
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  // @Public()
  // @ApiOperation({ description: `Create a new user` })
  // @Post()
  // async create(@Body() createUserDto: CreateUserValidationDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @ApiOperation({ description: `Get all user with pagination` })
  // @Get()
  // async findAllPaginated(
  //   @Query() searchParams: UserFilterDto,
  // ): Promise<PagingResult<User>> {
  //   return this.userService.findAllPaginated(searchParams);
  // }

  // @ApiOperation({ description: `Get a user by id` })
  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.userService.findById(id);
  // }
}

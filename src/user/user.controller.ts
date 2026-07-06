import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import type { User } from './user.service';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /users
  @Get()
  getUsers(@Query('name') name: string): User[] {
    return this.userService.findAllUsers(name);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    return this.userService.findOneUser(id);
  }

  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return {
      message: 'User created successfully',
      data: CreateUserDto,
    };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return {
      data: { id, ...UpdateUserDto },
      message: 'User Updated successfully',
    };
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  deleteUser(@Param('id') id: string) {
    return {
      data: {
        id,
        message: 'You have access to this route',
      },
    };
  }
}

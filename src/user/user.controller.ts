import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    // GET /users
  @Get()
  getUsers(@Query('name') name: string) {
    return [
      { id: 1, name: name }
    ];
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return {
        id,
        name: 'jay'
    }
  }

  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return {
        message: 'User created successfully',
        data: CreateUserDto
    }
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return {
        data: {id, ...UpdateUserDto},
        message: 'User Updated successfully'
    }
  }


  
}
 
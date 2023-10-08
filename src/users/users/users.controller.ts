import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { User } from '../user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard/jwt-auth-guard.guard';
import { IsAdminGuard } from 'src/auth/is-admin/is-admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<User> {
    return await this.userService.delete(id);
  }
}

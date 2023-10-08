import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Task } from './task.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard/jwt-auth-guard.guard';
import { IsAdminGuard } from 'src/auth/is-admin/is-admin.guard';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() task: Task): Promise<Task> {
    return await this.tasksService.create(task);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string | undefined,
    @Body() task: Task,
  ): Promise<Task> {
    return await this.tasksService.update(id, task);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.delete(id);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  @Get('all/:userId')
  @UseGuards(JwtAuthGuard)
  async findAllUser(@Param('userId') userId: string): Promise<Task[]> {
    return await this.tasksService.findAllUser(userId);
  }

  @Get(':userId/:id')
  @UseGuards(JwtAuthGuard)
  async findOneUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<Task> {
    return await this.tasksService.findOneUser(id, userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  async findOne(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.findOne(id);
  }
}

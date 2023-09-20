import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema, Task } from './task.schema';
import { TasksController } from './tasks.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { RabbitMqModule } from 'src/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    RabbitMqModule
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}

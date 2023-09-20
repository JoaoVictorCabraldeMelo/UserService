import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { RabbitMqService } from './rabbit-mq/rabbit-mq.service';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://joao:123123@localhost:27017/?authMechanism=DEFAULT', { 
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    RabbitMqModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

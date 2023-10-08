import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {}),
    UsersModule,
    AuthModule,
    TasksModule,
    RabbitMqModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { RabbitMqModule } from 'src/rabbit-mq/rabbit-mq.module';

@Module({
  providers: [EmailService],
  exports: [EmailService],
  imports: [RabbitMqModule]
})
export class EmailModule {}

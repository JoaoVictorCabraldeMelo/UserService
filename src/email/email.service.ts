import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMqService } from 'src/rabbit-mq/rabbit-mq.service';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService implements OnModuleInit {
  constructor(private readonly rabbitMqService: RabbitMqService) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async onModuleInit() {
    this.rabbitMqService.subscribeToQueue('user_created', (message) => {
      const user = JSON.parse(message);
      this.sendEmail(
        user.email,
        'Bem vindo ao Aplicativo',
        'Olá, seja bem vindo ao Aplicativo 😉',
      );
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const msg = {
      to,
      from: 'example.com',
      subject,
      text,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
    }
  }
}

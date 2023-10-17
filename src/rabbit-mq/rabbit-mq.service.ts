import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Connection, Channel, connect } from 'amqplib';

@Injectable()
export class RabbitMqService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;
  private channel: Channel;

  async onModuleInit(): Promise<void> {
    const rabbitMQUri = process.env.RABBITMQ_URI || "amqp://joao:123123@localhost:5672";
    this.connection = await connect(rabbitMQUri);
    this.channel = await this.connection.createChannel();
  }

  async onModuleDestroy(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
  }

  async publishToQueue(queue: string, message: string): Promise<void> {
    await this.channel.assertQueue(queue, { durable: false });
    this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async subscribeToQueue(
    queue: string,
    callback: (message: string) => void,
  ): Promise<void> {
    await this.channel.assertQueue(queue, { durable: false });
    this.channel.consume(queue, (message) => {
      callback(message.content.toString());
      this.channel.ack(message);
    });
  }
}

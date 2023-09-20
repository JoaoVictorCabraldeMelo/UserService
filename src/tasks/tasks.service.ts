import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { RabbitMqService } from 'src/rabbit-mq/rabbit-mq.service';

@Injectable()
export class TasksService implements OnModuleInit {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskDocument>,
    private readonly rabbitMqService: RabbitMqService
  ) { }

  async onModuleInit(): Promise<void> {
    this.rabbitMqService.subscribeToQueue('user_created', (message) => {
      let user = JSON.parse(message);
      this.create({
        title: 'Primeira Tarefa 🚀',
        userId: user._id,
        description: 'Tarefa de boas vindas',
        deleted_at: null,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
      });
    });
  }

  async create(task: Task): Promise<Task> {
    const createdTask = new this.taskModel(task);
    return await createdTask.save();
  }

  async update(id: string, task: Task): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }

  async delete(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, { $set: { deleted_at: Date.now() } }, { new: true });
  }

  async findOneUser(id: string, userId: string): Promise<Task> {
    return await this.taskModel.findOne({ _id: id, userId }).exec();
  }

  async findAllUser(userId: string): Promise<Task[]> {
    return await this.taskModel.find({ userId }).exec();
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskModel.findOne({ _id: id }).exec();
  }

}

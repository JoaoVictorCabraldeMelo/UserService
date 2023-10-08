import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import { RabbitMqService } from 'src/rabbit-mq/rabbit-mq.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly rabbitMqService: RabbitMqService,
  ) {}

  async create(user: User): Promise<any> {
    const hashedPassword = await bcrypt.hash(String(user.password), 10);
    user.password = hashedPassword;

    const createdUser = new this.userModel(user);
    const { password, ...result } = (await createdUser.save()).toObject();

    const payload = { email: result.email };
    const acess_token = this.jwtService.sign(payload);

    await this.rabbitMqService.publishToQueue(
      'user_created',
      JSON.stringify(result),
    );

    return { user: result, acess_token };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel
      .findOne({ email: email, deleted_at: null })
      .exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<User> | null {
    try {
      return await this.userModel.findByIdAndUpdate(
        id,
        { $set: { deleted_at: Date.now() } },
        { new: true },
      );
    } catch (error) {
      console.log('Erro ao atualizar o usuario:', error);
      return null;
    }
  }

  async restore(id: string): Promise<User> | null {
    try {
      return await this.userModel.findByIdAndUpdate(
        id,
        { $set: { deleted_at: null } },
        { new: true },
      );
    } catch (error) {
      console.log('Erro ao atualizar o usuario:', error);
      return null;
    }
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsMongoId, IsString } from 'class-validator';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  @IsString()
  title: string;

  @Prop({ isRequired: false, default: '' })
  @IsString()
  description: string;

  @Prop({ required: true })
  @IsMongoId()
  userId: Types.ObjectId;

  @Prop({ default: Date.now, isRequired: false })
  created_at: Date;

  @Prop({ default: Date.now, isRequired: false })
  updated_at: Date;

  @Prop({ default: null, isRequired: false })
  deleted_at: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

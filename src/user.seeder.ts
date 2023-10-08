import mongoose from 'mongoose';
import { UserSchema, UserDocument } from './users/user.schema';
import * as bcrypt from 'bcrypt';

const seedUser = async () => {
  try {
    console.log('Começando a seedar');
    await mongoose.connect(process.env.MONGODB_URI, {});
    const User = mongoose.model<UserDocument>('User', UserSchema);
    await User.deleteMany({});
    await User.create({
      name: 'João',
      password: await bcrypt.hash('123123', 10),
      email: 'joaozin@gmail.com',
      isAdmin: true,
    });
    console.log('Seed finalizado com sucesso 🙂');
    await mongoose.disconnect();
  } catch (error) {
    console.error(`Algo deu errado ☠️: ${error}`);
  }
};

seedUser();

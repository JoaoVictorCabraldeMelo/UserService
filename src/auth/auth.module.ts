import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { IsAdminGuard } from './is-admin/is-admin.guard';

@Module({
  providers: [AuthService, JwtStrategy, IsAdminGuard],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class AuthModule {}

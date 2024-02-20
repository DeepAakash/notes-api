import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/Entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'ABDIhaInjkadnkjiaxnsiANjjadiSJBDjzb',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '1d'
      }
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

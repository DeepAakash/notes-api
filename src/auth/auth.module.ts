import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/Entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtCustomStrategy } from './jwt-custom.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'ABDIhaInjkadnkjiaxnsiANjjadiSJBDjzb',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '1d'
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtCustomStrategy],
  exports: [PassportModule, JwtCustomStrategy]
})
export class AuthModule {}

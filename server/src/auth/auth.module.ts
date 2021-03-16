import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

//* Internal import
import { FacebookStrategy, GithubStrategy, GoogleStrategy } from './auth.passport';
import { UserRepository } from '../models/user/entities/user.repository';
import { TokenRepository } from '../providers/token/entities/token.repository';
import { TokenService } from '../providers/token/token.service';
import { AuthController } from './auth.controller';
import { UserService } from '../models/user/user.service';
import { AuthService } from './auth.service';
import { RedisService } from '../providers/redis/redis.service';
import { MailModule } from '../providers/mail/mail.module';

@Module({
        imports: [TypeOrmModule.forFeature([UserRepository, TokenRepository]), JwtModule.register({ secret: process.env.JWT_SECRET_KEY }), MailModule],
        controllers: [AuthController],
        providers: [AuthService, UserService, RedisService, TokenService, GoogleStrategy, FacebookStrategy, GithubStrategy],
        exports: [AuthService, JwtModule],
})
export class AuthModule {}

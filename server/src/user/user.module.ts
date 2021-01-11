import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

//* Internal import
import { UserRepository } from './entities/userRepository.entity';
import { TokenRepository } from '../token/entities/token.repository';
import { TokenService } from '../token/token.service';
import { AuthService } from '../auth/auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RedisService } from '../redis/redis.service';
import { MailService } from '../mail/mail.service';

@Module({
        imports: [TypeOrmModule.forFeature([UserRepository, TokenRepository]), JwtModule.register({ secret: process.env.JWT_SECRET_KEY })],
        controllers: [UserController],
        providers: [UserService, TokenService, AuthService, RedisService, MailService],
})
export class UserModule {}

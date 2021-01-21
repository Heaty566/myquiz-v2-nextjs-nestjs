import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

//* Internal import
import { UserRepository } from './entities/user.repository';
import { TokenRepository } from '../../providers/token/entities/token.repository';
import { TokenService } from '../../providers/token/token.service';
import { AuthService } from '../../auth/auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RedisService } from '../../providers/redis/redis.service';
import { MailService } from '../../providers/mail/mail.service';
import { AwsService } from '../../providers/aws/aws.service';

@Module({
        imports: [TypeOrmModule.forFeature([UserRepository, TokenRepository]), JwtModule.register({ secret: process.env.JWT_SECRET_KEY })],
        controllers: [UserController],
        providers: [UserService, TokenService, AuthService, RedisService, MailService, AwsService],
})
export class UserModule {}

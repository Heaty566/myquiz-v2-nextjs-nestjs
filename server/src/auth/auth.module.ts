import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

//* Internal import
import { FacebookStrategy, GithubStrategy, GoogleStrategy } from './auth.passport';
import { UserRepository } from '../user/entities/userRepository.entity';
import { TokenRepository } from '../token/entities/token.repository';
import { TokenService } from '../token/token.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Module({
        imports: [TypeOrmModule.forFeature([UserRepository, TokenRepository]), JwtModule.register({ secret: process.env.JWT_SECRET_KEY })],
        controllers: [AuthController],
        providers: [AuthService, UserService, TokenService, GoogleStrategy, FacebookStrategy, GithubStrategy],
})
export class AuthModule {}

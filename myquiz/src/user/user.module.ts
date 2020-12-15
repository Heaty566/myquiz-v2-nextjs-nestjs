import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entities/userRepository.entity';
import { JwtModule } from '@nestjs/jwt';
import { TokenRepository } from '../token/entities/token.repository';
import { TokenService } from '../token/token.service';
import { AuthService } from '../auth/auth.service';

@Module({
        imports: [TypeOrmModule.forFeature([UserRepository, TokenRepository]), JwtModule.register({ secret: process.env.JWT_SECRET_KEY })],
        controllers: [UserController],
        providers: [UserService, TokenService, AuthService],
})
export class UserModule {}

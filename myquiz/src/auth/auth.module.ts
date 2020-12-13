import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/entities/userRepository.entity';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';
import { TokenRepository } from '../token/entities/token.repository';

const JwtConfig = JwtModule.register({ secret: process.env.JWT_SECRET_KEY });

@Module({
        imports: [TypeOrmModule.forFeature([UserRepository, TokenRepository]), JwtConfig],
        controllers: [AuthController],
        providers: [AuthService, TokenService],
})
export class AuthModule {}

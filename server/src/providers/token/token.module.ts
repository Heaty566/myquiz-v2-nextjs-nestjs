import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

//* Internal import
import { TokenRepository } from './entities/token.repository';
import { UserService } from '../../models/user/user.service';
import { UserRepository } from '../../models/user/entities/userRepository.entity';

@Module({
        imports: [TypeOrmModule.forFeature([TokenRepository, UserRepository]), JwtModule.register({ secret: process.env.JWT_SECRET_KEY })],
        providers: [TokenService, UserService],
})
export class TokenModule {}

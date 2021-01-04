import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

//* Internal import
import { TokenRepository } from './entities/token.repository';

@Module({
        imports: [TypeOrmModule.forFeature([TokenRepository]), JwtModule.register({ secret: process.env.JWT_SECRET_KEY })],
        providers: [TokenService],
})
export class TokenModule {}

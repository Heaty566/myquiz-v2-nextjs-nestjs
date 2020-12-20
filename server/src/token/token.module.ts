import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenRepository } from './entities/token.repository';
import { JwtModule } from '@nestjs/jwt';
// console.log(process.env.JWT_SECRET_KEY);
@Module({
        imports: [TypeOrmModule.forFeature([TokenRepository]), JwtModule.register({ secret: process.env.JWT_SECRET_KEY })],
        providers: [TokenService],
})
export class TokenModule {}

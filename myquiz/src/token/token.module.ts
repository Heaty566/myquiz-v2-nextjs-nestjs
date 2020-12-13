import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenRepository } from './entities/token.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
        imports: [TypeOrmModule.forFeature([TokenRepository]), JwtModule.register({ secret: '213' })],
        providers: [TokenService],
})
export class TokenModule {}

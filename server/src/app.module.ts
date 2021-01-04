import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
//* Internal import
import { CountVisitorInterceptor } from './global/interceptor/countVisitor.interceptor';
import { Token } from './token/entities/token.entity';
import { RedisService } from './redis/redis.service';
import { User } from './user/entities/user.entity';
import { RedisModule } from './redis/redis.module';
import { TokenModule } from './token/token.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

const DBConfig = TypeOrmModule.forRoot({
        url: process.env.DB_URL,
        type: 'mongodb',
        synchronize: true,
        keepConnectionAlive: true,
        useUnifiedTopology: true,
        database: 'myquiz',
        entities: [User, Token],
});

const Config = ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `./config/.env.${process.env.NODE_ENV}`,
});

const JwtConfig = JwtModule.register({ secret: process.env.JWT_SECRET_KEY });

@Module({
        imports: [Config, DBConfig, UserModule, JwtConfig, AuthModule, TokenModule, RedisModule],
        controllers: [AppController],
        providers: [
                {
                        provide: APP_INTERCEPTOR,
                        useClass: CountVisitorInterceptor,
                },
                RedisService,
        ],
})
export class AppModule {}

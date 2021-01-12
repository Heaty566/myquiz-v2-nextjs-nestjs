import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
//* Internal import
import { CountVisitorInterceptor } from './common/interceptor/countVisitor.interceptor';
import { Token } from './providers/token/entities/token.entity';
import { User } from './models/user/entities/user.entity';
import { RedisModule } from './providers/redis/redis.module';
import { TokenModule } from './providers/token/token.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './models/user/user.module';
import { MailModule } from './providers/mail/mail.module';
import { RedisService } from './providers/redis/redis.service';
import { AwsService } from './providers/aws/aws.service';
import { AppController } from './app.controller';

const Config = ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `./config/.env.${process.env.NODE_ENV}`,
});
const DBConfig = TypeOrmModule.forRoot({
        url: process.env.DB_URL,
        type: 'mongodb',
        synchronize: true,
        keepConnectionAlive: true,
        useUnifiedTopology: true,
        entities: [User, Token],
});

const JwtConfig = JwtModule.register({ secret: process.env.JWT_SECRET_KEY });

@Module({
        imports: [Config, DBConfig, UserModule, JwtConfig, AuthModule, TokenModule, RedisModule, MailModule, AwsService],
        controllers: [AppController],
        providers: [
                {
                        provide: APP_INTERCEPTOR,
                        useClass: CountVisitorInterceptor,
                },
                RedisService,
                AwsService,
        ],
})
export class AppModule {}

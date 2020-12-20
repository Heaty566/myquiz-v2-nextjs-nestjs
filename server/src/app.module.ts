import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { TokenModule } from './token/token.module';
import { Token } from './token/entities/token.entity';
import { JwtModule } from '@nestjs/jwt';

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
        envFilePath: `./src/config/.env.${process.env.NODE_ENV}`,
});

const JwtConfig = JwtModule.register({ secret: process.env.JWT_SECRET_KEY });

@Module({
        imports: [Config, DBConfig, UserModule, JwtConfig, AuthModule, TokenModule],
        controllers: [AppController],
        providers: [AppService],
})
export class AppModule {}

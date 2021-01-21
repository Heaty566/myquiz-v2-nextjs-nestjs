import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizRepository } from './entities/quiz.repository';
import { TokenService } from '../../providers/token/token.service';
import { TokenRepository } from '../../providers/token/entities/token.repository';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/entities/user.repository';

@Module({
        imports: [
                TypeOrmModule.forFeature([QuizRepository, TokenRepository, UserRepository]),
                JwtModule.register({ secret: process.env.JWT_SECRET_KEY }),
        ],
        controllers: [QuizController],
        providers: [QuizService, TokenService, UserService],
})
export class QuizModule {}

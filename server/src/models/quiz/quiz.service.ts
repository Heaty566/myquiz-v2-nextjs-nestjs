import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { Quiz } from './entities/quiz.entity';
import { QuizRepository } from './entities/quiz.repository';

@Injectable()
export class QuizService {
        constructor(private readonly quizRepository: QuizRepository) {}

        async saveQuiz(input: CreateQuizDto, userId: ObjectId) {
                const quiz = new Quiz();
                quiz.createDate = input.createDate;
                quiz.name = input.name;
                // quiz.questi = input.questions;
                quiz.userId = userId;

                return await this.quizRepository.save(quiz);
        }
        async findQuizByField(field: keyof Quiz, value: any) {
                return this.quizRepository.findOneByField(field, value);
        }
}

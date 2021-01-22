import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { FindManyOptions, In } from 'typeorm';
import { CusService } from '../../common/interfaces/CusService';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/entities/user.repository';
import { Quiz } from './entities/quiz.entity';
import { QuizRepository } from './entities/quiz.repository';

@Injectable()
export class QuizService extends CusService<Quiz> {
        constructor(@InjectRepository(Quiz) private readonly quizRepository: QuizRepository, @InjectRepository(User) private readonly userRepository: UserRepository) {
                super(quizRepository);
        }
        async getQuizByIds(input: Array<ObjectId>) {
                const options: FindManyOptions<Quiz> = {};
                return await this.quizRepository.findManyByField('_id', input, options);
        }

        async deleteOneQuiz(input: Quiz) {
                const user = await this.userRepository.findOneByField('_id', input.userId);
                if (!user) return null;
                user.quizIds = user.quizIds.filter((item) => !new ObjectId(input._id).equals(item));
                await this.userRepository.save(user);
                return await this.quizRepository.remove(input);
        }
}

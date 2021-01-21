import { CusRepository } from '../../../common/interfaces/CusRepository';
import { EntityRepository } from 'typeorm';
import { Quiz } from './quiz.entity';

@EntityRepository(Quiz)
export class QuizRepository extends CusRepository<Quiz> {}

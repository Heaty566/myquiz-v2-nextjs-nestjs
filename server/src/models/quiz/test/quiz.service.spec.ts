import { INestApplication } from '@nestjs/common';
import { ObjectId } from 'mongodb';

//* Internal import
import { initTestModule } from '../../../../test/initTest';
import { CreateQuizDto } from '../dto/createQuiz.dto';
import { QuizRepository } from '../entities/quiz.repository';
import { QuizService } from '../quiz.service';
import { fakeQuiz, fakeUser } from '../../../../test/fakeEntity';
import { Question } from '../entities/question.entity';
import { UserRepository } from '../../user/entities/user.repository';
import { Quiz } from '../entities/quiz.entity';
import { User } from 'src/models/user/entities/user.entity';

describe('QuizService', () => {
        let app: INestApplication;
        let quizRepository: QuizRepository;
        let userRepository: UserRepository;
        let quizService: QuizService;

        beforeAll(async () => {
                const { getApp, module } = await initTestModule();
                app = getApp;
                quizService = module.get<QuizService>(QuizService);
                userRepository = module.get<UserRepository>(UserRepository);
                quizRepository = module.get<QuizRepository>(QuizRepository);
        });

        describe('deleteQuiz', () => {
                let quiz: Quiz;
                let user: User;
                beforeEach(async () => {
                        user = await userRepository.save(fakeUser());
                        const dummyQuiz = fakeQuiz();
                        dummyQuiz.userId = user._id;
                        quiz = await quizRepository.save(dummyQuiz);
                        user.quizIds = [quiz._id];
                        user = await userRepository.save(user);
                });

                it('Pass', async () => {
                        const isResult = await quizService.deleteOneQuiz(quiz);
                        const getQuiz = await quizRepository.findOne({ _id: quiz._id });
                        const getUser = await userRepository.findOne({ _id: user._id });

                        expect(getUser).not.toContainEqual(quiz._id);
                        expect(getQuiz).toBeUndefined();
                        expect(isResult).toBeDefined();
                });

                it('Failed (not found)', async () => {
                        quiz._id = new ObjectId();
                        const isResult = await quizService.deleteOneQuiz(quiz);

                        expect(isResult._id).toBeUndefined();
                });
                it('Failed (not found)', async () => {
                        quiz.userId = new ObjectId();
                        const isResult = await quizService.deleteOneQuiz(quiz);

                        expect(isResult).toBeNull();
                });
        });

        afterAll(async () => {
                await quizRepository.clear();
                await app.close();
        });
});

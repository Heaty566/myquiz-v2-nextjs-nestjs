import { INestApplication } from '@nestjs/common';
import { ObjectId } from 'mongodb';

//* Internal import
import { initTestModule } from '../../../../test/initTest';
import { QuizRepository } from '../entities/quiz.repository';
import { QuizService } from '../quiz.service';
import { fakeQuiz, fakeUser } from '../../../../test/fakeEntity';
import { UserRepository } from '../../user/entities/user.repository';
import { Quiz } from '../entities/quiz.entity';
import { User } from 'src/models/user/entities/user.entity';

describe('QuizService', () => {
        let app: INestApplication;
        let quizRepository: QuizRepository;
        let userRepository: UserRepository;
        let quizService: QuizService;
        let quizArr: Quiz[];

        beforeAll(async () => {
                const { getApp, module } = await initTestModule();
                app = getApp;
                quizService = module.get<QuizService>(QuizService);
                userRepository = module.get<UserRepository>(UserRepository);
                quizRepository = module.get<QuizRepository>(QuizRepository);
        });

        beforeAll(async () => {
                quizArr = [];
                for (let index = 0; index < 100; index++) {
                        const quiz = fakeQuiz();
                        quiz.name = 'quizName' + index;
                        const insertQuiz = await quizRepository.save(quiz);
                        quizArr.push(insertQuiz);
                }
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

        describe('getQuizByIds', () => {
                it('Pass 100 quizzes', async () => {
                        const quizIds = quizArr.map((item) => item._id);

                        const quizzes = await quizService.getQuizByIds(quizIds, { take: 1000 });
                        expect(quizzes).toHaveLength(100);
                        expect(quizIds).toHaveLength(100);
                });
                it('Pass 20 quizzes', async () => {
                        const quizIds = quizArr.map((item) => item._id);

                        const quizzes = await quizService.getQuizByIds(quizIds);
                        expect(quizzes).toHaveLength(20);
                        expect(quizIds).toHaveLength(100);
                });
        });
        describe('getQuizzesByName', () => {
                it('Pass 100 quizzes', async () => {
                        const quizIds = quizArr.map((item) => item._id);

                        const quizzes = await quizService.getQuizzesByName('quizname');

                        expect(quizzes).toHaveLength(20);
                        expect(quizIds).toHaveLength(100);
                });
                it('Pass 1 quizzes', async () => {
                        const quizIds = quizArr.map((item) => item._id);

                        const quizzes = await quizService.getQuizzesByName('quizName10');
                        expect(quizzes).toHaveLength(1);
                        expect(quizIds).toHaveLength(100);
                });
        });

        afterAll(async () => {
                await quizRepository.clear();
                await app.close();
        });
});

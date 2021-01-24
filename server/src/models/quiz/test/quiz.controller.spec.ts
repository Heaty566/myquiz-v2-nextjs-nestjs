import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';

//* Internal import
import { fakeQuiz } from '../../../../test/fakeEntity';
import { initTestModule } from '../../../../test/initTest';
import { QuizRepository } from '../entities/quiz.repository';
import { UserRepository } from '../../../models/user/entities/user.repository';
import { User } from '../../../models/user/entities/user.entity';
import { CreateQuizDto } from '../dto/createQuiz.dto';
import { Quiz } from '../entities/quiz.entity';
import { ObjectId } from 'mongodb';

describe('quizController', () => {
        let app: INestApplication;
        let quizRepository: QuizRepository;
        let userRepository: UserRepository;
        let cookie: string[];

        let userInfo: User;
        beforeAll(async () => {
                const { getApp, module, reToken, user } = await initTestModule();
                app = getApp;
                cookie = reToken;
                userInfo = user;

                userRepository = module.get<UserRepository>(UserRepository);
                quizRepository = module.get<QuizRepository>(QuizRepository);
        });

        describe('Get /api/quiz/user', () => {
                const callApi = (userCookie) => supertest(app.getHttpServer()).get('/api/quiz/user').set({ cookie: userCookie }).send();

                beforeAll(async () => {
                        const dummyQuiz = fakeQuiz();
                        dummyQuiz.userId = userInfo._id;
                        const quiz1 = await quizRepository.save(dummyQuiz);
                        const dummyQuiz2 = fakeQuiz();
                        dummyQuiz2.userId = userInfo._id;
                        const quiz2 = await quizRepository.save(dummyQuiz2);
                        userInfo.quizIds = [quiz1._id, quiz2._id];
                        await userRepository.save(userInfo);
                });

                it('Pass', async () => {
                        const res = await callApi(cookie);
                        expect(res.body.data).toHaveLength(2);
                        expect(res.status).toBe(200);
                });
                it('Failed (user invalid)', async () => {
                        const res = await callApi('');

                        expect(res.body.message).toBeDefined();
                        expect(res.body.data).toBeUndefined();
                        expect(res.status).toBe(401);
                });
        });
        describe('Get /api/quiz/:id', () => {
                const callApi = (id: ObjectId) => supertest(app.getHttpServer()).get(`/api/quiz/${id}`).send();
                let quizId: ObjectId;
                beforeAll(async () => {
                        const dummyQuiz = fakeQuiz();
                        const quiz = await quizRepository.save(dummyQuiz);
                        quizId = quiz._id;
                });

                it('Pass', async () => {
                        const res = await callApi(quizId);

                        expect(res.body.data).toBeDefined();
                        expect(res.body.data._id).toBe(String(quizId));
                        expect(res.status).toBe(200);
                });
                it('Failed (quiz does not exist)', async () => {
                        const res = await callApi(new ObjectId());

                        expect(res.body.data).toBeUndefined();
                        expect(res.status).toBe(400);
                });
        });
        describe('Get /api/search/query', () => {
                const callApi = (name: string) => supertest(app.getHttpServer()).get(`/api/quiz/search?name=${name}`).send();
                let quizId: Quiz;
                beforeAll(async () => {
                        const dummyQuiz = fakeQuiz();
                        const quiz = await quizRepository.save(dummyQuiz);
                        quizId = quiz;
                });

                it('Pass', async () => {
                        const res = await callApi(quizId.name);

                        expect(res.body.data).toBeDefined();
                        expect(res.status).toBe(200);
                });
                it('Failed (quiz does not exist)', async () => {
                        const res = await callApi('hello');

                        expect(res.body.data).toHaveLength(0);
                        expect(res.status).toBe(200);
                });
        });

        describe('Post /api/quiz', () => {
                let clientInput: CreateQuizDto;

                const callApi = (input: CreateQuizDto) => supertest(app.getHttpServer()).post('/api/quiz').set({ cookie }).send(input);

                beforeEach(() => {
                        clientInput = {
                                name: fakeQuiz().name,
                                questions: fakeQuiz().questions,
                        };
                });

                it('Pass', async () => {
                        await callApi(clientInput);
                        const user = await userRepository.findOne({ username: userInfo.username });

                        const quiz = await quizRepository.findOne({ name: clientInput.name });

                        expect(quiz).toBeDefined();
                        expect(user.quizIds).toContainEqual(quiz._id);
                });
                it('Failed (name is taken)', async () => {
                        await callApi(clientInput);
                        const res = await callApi(clientInput);
                        expect(res.status).toBe(400);
                        expect(res.body.details).toBeDefined();
                });
                it('Failed (invalid input)', async () => {
                        delete clientInput.questions;
                        const res = await callApi(clientInput);
                        expect(res.status).toBe(400);
                        expect(res.body.details).toBeDefined();
                });
        });

        describe('PUT /api/quiz/:id', () => {
                let clientInput: CreateQuizDto;
                let quiz: Quiz;

                const callApi = (input: CreateQuizDto, id: string) =>
                        supertest(app.getHttpServer())
                                .put('/api/quiz/' + id)
                                .set({ cookie })
                                .send(input);

                beforeAll(async () => {
                        const dummyQuiz = fakeQuiz();
                        dummyQuiz.userId = userInfo._id;
                        quiz = await quizRepository.save(dummyQuiz);
                });

                beforeEach(() => {
                        clientInput = {
                                name: fakeQuiz().name,
                                questions: fakeQuiz().questions,
                        };
                });

                it('Pass', async () => {
                        await callApi(clientInput, String(quiz._id));
                        const getQuiz = await quizRepository.findOne({ _id: quiz._id });

                        expect(getQuiz.name).toBe(clientInput.name);
                });

                it('Failed (userId and user do not match)', async () => {
                        await quizRepository.update({ _id: quiz._id }, { userId: new ObjectId() });
                        const res = await callApi(clientInput, String(quiz._id));
                        expect(res.status).toBe(401);
                        expect(res.body.message).toBeDefined();
                });
                it('Failed (quiz not found)', async () => {
                        const res = await callApi(clientInput, '123');
                        expect(res.status).toBe(400);
                        expect(res.body.message).toBeDefined();
                });
        });
        describe('Delete /api/quiz/:id', () => {
                let quiz: Quiz;

                const callApi = (id: string) =>
                        supertest(app.getHttpServer())
                                .delete('/api/quiz/' + id)
                                .set({ cookie })
                                .send();

                beforeEach(async () => {
                        const dummyQuiz = fakeQuiz();
                        dummyQuiz.userId = userInfo._id;
                        quiz = await quizRepository.save(dummyQuiz);
                });

                it('Pass', async () => {
                        const res = await callApi(String(quiz._id));
                        const getQuiz = await quizRepository.findOne({ _id: quiz._id });
                        const user = await userRepository.findOne({ username: userInfo.username });
                        const isContain = user.quizIds.includes(quiz._id);

                        expect(isContain).toBeFalsy();
                        expect(res.body.message).toBeDefined();
                        expect(getQuiz).toBeUndefined();
                });

                it('Failed (userId and user do not match)', async () => {
                        await quizRepository.update({ _id: quiz._id }, { userId: new ObjectId() });
                        const res = await callApi(String(quiz._id));

                        expect(res.status).toBe(401);
                        expect(res.body.message).toBeDefined();
                });
                it('Failed (quiz not found)', async () => {
                        const res = await callApi('123');
                        expect(res.status).toBe(400);
                        expect(res.body.message).toBeDefined();
                });
        });

        afterAll(async () => {
                await userRepository.clear();
                await quizRepository.clear();
                await app.close();
        });
});

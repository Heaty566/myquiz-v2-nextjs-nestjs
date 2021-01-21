import { INestApplication } from '@nestjs/common';
import { ObjectId } from 'mongodb';

//* Internal import
import { initTestModule } from '../../../../test/initTest';
import { CreateQuizDto } from '../dto/createQuiz.dto';
import { QuizRepository } from '../entities/quiz.repository';
import { QuizService } from '../quiz.service';
import { fakeData } from '../../../../test/fakeData';
import { Question } from '../entities/question.entity';

describe('QuizService', () => {
        let app: INestApplication;
        let quizRepository: QuizRepository;
        let quizService: QuizService;

        beforeAll(async () => {
                const { getApp, module } = await initTestModule();
                app = getApp;
                quizService = module.get<QuizService>(QuizService);
                quizRepository = module.get<QuizRepository>(QuizRepository);
        });

        const generatorQuestion = () => {
                const question = new Question();
                question.question = fakeData(10);
                question.answers = [fakeData(10), fakeData(10), fakeData(10)];
                question.correctAnswers = [true, false, false];
                return question;
        };

        describe('saveQuiz', () => {
                let input: CreateQuizDto;

                beforeEach(() => {
                        input = {
                                createDate: new Date(),
                                name: fakeData(10),
                                questions: [generatorQuestion(), generatorQuestion(), generatorQuestion(), generatorQuestion(), generatorQuestion()],
                        };
                });
                it('Pass', async () => {
                        const newQuiz = await quizService.saveQuiz(input, new ObjectId());
                        const getQuiz = await quizRepository.findOne({ _id: newQuiz._id });

                        expect(newQuiz.name).toBe(getQuiz.name);
                        expect(newQuiz).toBeDefined();
                });
        });
        describe('findQuizByField', () => {
                let quizName: string;

                beforeEach(async () => {
                        const input = {
                                createDate: new Date(),
                                name: fakeData(10),
                                questions: [generatorQuestion(), generatorQuestion(), generatorQuestion(), generatorQuestion(), generatorQuestion()],
                        };

                        await quizRepository.save(input);

                        quizName = input.name;
                });
                it('Pass', async () => {
                        const getQuiz = await quizService.findQuizByField('name', quizName);

                        expect(getQuiz).toBeDefined();
                });
                it('Failed not found', async () => {
                        const getQuiz = await quizService.findQuizByField('name', '123');

                        expect(getQuiz).toBeUndefined();
                });
        });

        afterAll(async () => {
                await quizRepository.clear();
                await app.close();
        });
});

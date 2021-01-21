import { questionJoiSchema, quizJoiSchema } from '../quiz.validator';
import { Question } from '../../../models/quiz/entities/question.entity';
import { Quiz } from '../../../models/quiz/entities/quiz.entity';
import { joiSchemaGenerator } from '../';
import * as Joi from 'joi';
import { fakeData } from '../../../../test/fakeData';

describe('quizValidator', () => {
        describe('questionValidator', () => {
                let input: Question;
                let validator: Joi.ObjectSchema;

                beforeEach(() => {
                        input = {
                                question: fakeData(10),
                                answers: [fakeData(10), fakeData(10), fakeData(10), fakeData(10)],
                                correctAnswers: [false, false, false, true],
                        };
                        validator = Joi.object({
                                question: questionJoiSchema('question'),
                                answers: questionJoiSchema('answers'),
                                correctAnswers: questionJoiSchema('correctAnswers'),
                        });
                });

                it('Pass', () => {
                        const { error } = validator.validate(input, { abortEarly: false });

                        expect(error).toBeUndefined();
                });
                it('Failed at least one true', () => {
                        input.correctAnswers = [false, false, false, false];
                        const { error } = validator.validate(input, { abortEarly: false });

                        expect(error).toBeDefined();
                });
                it('Failed smaller than question array', () => {
                        input.correctAnswers = [false, false, false];
                        const { error } = validator.validate(input, { abortEarly: false });

                        expect(error).toBeDefined();
                });
                it('Failed check item', () => {
                        input.answers = ['1'];
                        input.correctAnswers = [true];
                        const { error } = validator.validate(input, { abortEarly: false });

                        expect(error).toBeDefined();
                });
        });
});

import * as Joi from 'joi';
//* Internal import
import { errorMsg } from './messageErrorMapper.joi';
import { Question } from '../../models/quiz/entities/question.entity';
import { Quiz } from '../../models/quiz/entities/quiz.entity';
import { JoiCusArray } from './extend/cusArray';

export function quizJoiSchema(field: keyof Quiz) {
        switch (field) {
                case 'name':
                        return Joi.string().min(5).max(40).trim().lowercase().required().messages(errorMsg());
                case 'createDate':
                        return Joi.date().required().messages(errorMsg());

                case 'questions':
                        return Joi.array()
                                .items(
                                        Joi.object({
                                                question: questionJoiSchema('question'),
                                                answers: questionJoiSchema('answers'),
                                                correctAnswers: questionJoiSchema('correctAnswers'),
                                        }),
                                )
                                .min(1)
                                .max(10000)
                                .required()
                                .messages(errorMsg());
        }
}

export function questionJoiSchema(field: keyof Question) {
        switch (field) {
                case 'question':
                        return Joi.string().min(2).max(2000).trim().required().messages(errorMsg());
                case 'answers':
                        return Joi.array()
                                .items(Joi.string().min(2).max(2000).trim().messages(errorMsg()))
                                .min(1)
                                .max(10)
                                .required()
                                .messages(errorMsg());
                case 'correctAnswers':
                        return JoiCusArray.array()
                                .some(true)
                                .items(Joi.boolean().messages(errorMsg()))
                                .length(Joi.ref('answers', { adjust: (value) => value.length }))
                                .required()
                                .messages(errorMsg());
        }
}

import * as Joi from 'joi';

//* Internal import
import { Question } from '../entities/question.entity';
import { joiSchemaGenerator, quizJoiSchema } from '../../../common/validation';
import { Quiz } from '../entities/quiz.entity';
const { getJoiSchemas } = joiSchemaGenerator<Quiz>(quizJoiSchema);

export class CreateQuizDto {
        name: string;
        questions: Question[];
}

export const vCreateQuizDto = Joi.object({
        ...getJoiSchemas(['name', 'questions']),
});

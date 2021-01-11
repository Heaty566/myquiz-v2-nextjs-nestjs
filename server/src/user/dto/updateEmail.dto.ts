import * as Joi from 'joi';

//* Internal import
import { userJoiSchema, joiSchemaGenerator } from '../../common/validation';
import { User } from '../entities/user.entity';

const { getJoiSchemas } = joiSchemaGenerator<User>(userJoiSchema);

export class UpdateEmailDto {
        email: string;
}

export const updateEmailDtoValidator = Joi.object({
        ...getJoiSchemas(['email']),
});

import * as Joi from 'joi';

//* Internal import
import { userJoiSchema, joiSchemaGenerator } from '../../common/validation';
import { User } from '../../user/entities/user.entity';

const { getJoiSchema, getJoiSchemas } = joiSchemaGenerator<User>(userJoiSchema);

export class CreateUserDto {
        fullName: string;
        password: string;
        username: string;
        confirmPassword: string;
}

export const createUserDtoValidator = Joi.object({
        ...getJoiSchemas(['username', 'password', 'fullName']),
        confirmPassword: getJoiSchema('password').valid(Joi.ref('password')),
});

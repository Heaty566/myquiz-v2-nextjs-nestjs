import { userJoiSchema, joiSchemaGenarator } from '../../common/test/validation';
import * as Joi from 'joi';
import { User } from '../../user/entities/user.entity';

const { getJoiSchema, getJoiSchemas } = joiSchemaGenarator<User>(userJoiSchema);

export class CreateUserDto {
        fullname: string;
        password: string;
        username: string;
        confirmPassword: string;
}

export const createUserDtoValidator = Joi.object({
        ...getJoiSchemas(['username', 'password', 'fullname']),
        confirmPassword: getJoiSchema('password').valid(Joi.ref('password')),
});

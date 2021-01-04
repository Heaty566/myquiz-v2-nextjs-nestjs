import * as Joi from 'joi';

//* Internal import
import { userJoiSchema, joiSchemaGenerator } from '../../global/validation';
import { User } from '../../user/entities/user.entity';

const { getJoiSchemas } = joiSchemaGenerator<User>(userJoiSchema);

export class LoginUserDto {
        username: string;
        password: string;
}

export const loginUserDtoValidator = Joi.object({
        ...getJoiSchemas(['username', 'password']),
});

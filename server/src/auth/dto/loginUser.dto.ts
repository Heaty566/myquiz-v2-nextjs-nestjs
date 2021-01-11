import * as Joi from 'joi';

//* Internal import
import { userJoiSchema, joiSchemaGenerator } from '../../common/validation';
import { User } from '../../models/user/entities/user.entity';

const { getJoiSchemas } = joiSchemaGenerator<User>(userJoiSchema);

export class LoginUserDto {
        username: string;
        password: string;
}

export const vLoginUserDto = Joi.object({
        ...getJoiSchemas(['username', 'password']),
});

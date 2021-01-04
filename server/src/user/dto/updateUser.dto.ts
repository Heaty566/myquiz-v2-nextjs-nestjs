import * as Joi from 'joi';

//* Internal import
import { userJoiSchema, joiSchemaGenerator } from '../../global/validation';
import { User } from '../../user/entities/user.entity';

const { getJoiSchemas } = joiSchemaGenerator<User>(userJoiSchema);

export class UpdateUserDto {
        fullName: string;
        email: string;
}

export const updateUserDtoValidator = Joi.object({
        ...getJoiSchemas(['email', 'fullName']),
});

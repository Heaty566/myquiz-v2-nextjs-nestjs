import * as Joi from 'joi';

//* Internal import
import { userJoiSchema, joiSchemaGenerator } from '../../global/validation';
import { User } from '../entities/user.entity';

const { getJoiSchema } = joiSchemaGenerator<User>(userJoiSchema);

export class ChangePasswordDto {
        newPassword: string;
        confirmPassword: string;
}

export const changePasswordDtoValidator = Joi.object({
        newPassword: getJoiSchema('password'),
        confirmPassword: getJoiSchema('password').valid(Joi.ref('newPassword')),
});

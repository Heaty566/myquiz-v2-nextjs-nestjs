import * as Joi from 'joi';

//* Internal import
import { userJoiSchema, joiSchemaGenerator } from '../../common/validation';
import { User } from '../../models/user/entities/user.entity';

const { getJoiSchemas, getJoiSchema } = joiSchemaGenerator<User>(userJoiSchema);

export class EmailResetPasswordDto {
        email: string;
}

export class PasswordResetDto {
        newPassword: string;
        confirmPassword: string;
        resetKey: string;
}

export const vEmailResetPassword = Joi.object({
        ...getJoiSchemas(['email']),
});
export const vPasswordResetDtoValidator = Joi.object({
        resetKey: Joi.string().required(),
        newPassword: getJoiSchema('password'),
        confirmPassword: getJoiSchema('password').valid(Joi.ref('newPassword')),
});

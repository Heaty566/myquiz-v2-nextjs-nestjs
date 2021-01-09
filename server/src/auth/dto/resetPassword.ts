import * as Joi from 'joi';

//* Internal import
import { userJoiSchema, joiSchemaGenerator } from '../../common/validation';
import { User } from '../../user/entities/user.entity';

const { getJoiSchemas, getJoiSchema } = joiSchemaGenerator<User>(userJoiSchema);

export class EmailResetPasswordDto {
        email: string;
}

export class PasswordResetDto {
        password: string;
        confirmPassword: string;
        resetKey: string;
}

export const emailResetPasswordDtoValidator = Joi.object({
        ...getJoiSchemas(['email']),
});
export const passwordResetDtoValidator = Joi.object({
        resetKey: Joi.string().required(),
        password: getJoiSchema('password'),
        confirmPassword: getJoiSchema('password').valid(Joi.ref('password')),
});

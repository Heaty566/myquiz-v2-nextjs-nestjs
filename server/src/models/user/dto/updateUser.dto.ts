import * as Joi from 'joi';

//* Internal import
import { userJoiSchema, joiSchemaGenerator } from '../../../common/validation';
import { User } from '../entities/user.entity';

const { getJoiSchemas } = joiSchemaGenerator<User>(userJoiSchema);

export class UpdateUserDto {
        fullName: string;
}

export const vUpdateUserDto = Joi.object({
        ...getJoiSchemas(['fullName']),
});

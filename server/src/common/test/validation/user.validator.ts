import * as Joi from 'joi';

import { formatError } from './joi.error';
import { User } from '../../../user/entities/user.entity';

export function userJoiSchema(field: keyof User) {
        switch (field) {
                case 'fullname':
                        return Joi.string()
                                .min(5)
                                .max(40)
                                .trim()
                                .lowercase()
                                .required()
                                .messages(formatError('Name', {}));
                case 'password':
                        return Joi.string()
                                .min(8)
                                .max(32)
                                .default('')
                                .trim()
                                .alphanum()
                                .required()
                                .messages(formatError('Password'));
                case 'username':
                        return Joi.string()
                                .max(32)
                                .min(5)
                                .lowercase()
                                .trim()
                                .default('')
                                .alphanum()
                                .required()
                                .messages(formatError('Username'));
        }
}

import * as Joi from 'joi';

//* Internal import
import { formatError } from './messageError.joi';
import { User } from '../../user/entities/user.entity';

export function userJoiSchema(field: keyof User) {
        switch (field) {
                case 'fullName':
                        return Joi.string().min(5).max(40).trim().lowercase().required().messages(formatError());
                case 'password':
                        return Joi.string().min(8).max(32).trim().alphanum().required().messages(formatError());
                case 'username':
                        return Joi.string().max(32).min(5).lowercase().trim().alphanum().required().messages(formatError());
                case 'email':
                        return Joi.string().max(100).min(2).lowercase().trim().email().required().messages(formatError());
        }
}

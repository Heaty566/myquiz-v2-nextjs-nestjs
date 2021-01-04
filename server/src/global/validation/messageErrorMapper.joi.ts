import { ValidationError } from 'joi';

export const JoiErrorMapper = (err: ValidationError) => {
        const errorObj = {};

        for (const item of err.details) {
                errorObj[item.context.key] = `${item.message}`;
        }

        return errorObj;
};

export type ObjError = { [key: string]: string };

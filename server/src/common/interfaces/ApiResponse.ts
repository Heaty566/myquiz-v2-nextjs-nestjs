import { ObjError } from '../validation/messageErrorMapper.joi';

export class ApiResponse<T> {
        message?: string;
        data?: T;
        details?: ObjError;
}

import { ObjError } from '../validation/messageErrorMapper.joi';

export class ApiResponse {
        message?: string;
        data?: any;
        details?: ObjError;
}

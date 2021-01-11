import { ObjError } from '../validation/messageErrorMapper.joi';

export class ApiResponse {
        message?: string;
        data?: any;
        detail?: ObjError;
}

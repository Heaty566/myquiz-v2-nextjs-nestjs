import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

//* Internal import
import { ApiResponse } from '../dto/response.dto';

@Catch(NotFoundException)
export class NotFoundApiHandler implements ExceptionFilter {
        catch(_: NotFoundException, host: ArgumentsHost) {
                const ctx = host.switchToHttp();
                const res = ctx.getResponse<Response>();
                const resApi: ApiResponse = {
                        data: null,
                        message: 'This method is undefined',
                };
                return res.send(resApi).status(HttpStatus.NOT_FOUND);
        }
}

import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { ResponseApi } from '../dto/response.dto';

@Catch(InternalServerErrorException)
export class RuntimeApiHandler implements ExceptionFilter {
        catch(_: NotFoundException, host: ArgumentsHost) {
                const ctx = host.switchToHttp();
                const res = ctx.getResponse<Response>();
                const resApi: ResponseApi = {
                        data: null,
                        message: 'Something went wrong, Please try again later.',
                };

                return res.send(resApi).status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
}

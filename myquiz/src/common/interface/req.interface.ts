import { Request } from 'express';
import { Token } from '../../token/entities/token.entity';

export interface RequestCus extends Request {
        //
        user: Token;
}

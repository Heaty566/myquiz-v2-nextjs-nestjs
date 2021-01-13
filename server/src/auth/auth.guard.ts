import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

//* Internal import
import { ApiResponse } from '../common/interfaces/ApiResponse';
import { TokenService } from '../providers/token/token.service';
import { UserRole } from './entities/userRole.enum';
import { CONSTANT } from '../common/constant';
import { User } from '../models/user/entities/user.entity';
import { ErrorResponse } from '../common/interfaces/ErrorResponse';
@Injectable()
export class UserAuth implements CanActivate {
        private readonly errorResponse: ApiResponse = {
                message: 'Invalid token',
        };

        constructor(private readonly reflector: Reflector, private readonly tokenService: TokenService) {}

        async canActivate(context: ExecutionContext) {
                const req: Request = context.switchToHttp().getRequest();
                const res: Response = context.switchToHttp().getResponse();
                const role = this.reflector.get<UserRole>('role', context.getHandler());

                //get token and re-token from cookie
                const refreshToken: string = req.cookies['re-token'] || '';
                let authToken: string = req.cookies['auth-token'] || '';
                if (!refreshToken) throw ErrorResponse.send({ message: 'Invalid token' }, 'UnauthorizedException');

                let token = await this.tokenService.getValidToken(authToken);

                if (!token) {
                        token = await this.tokenService.getAuthToken(refreshToken);
                        if (!token) throw ErrorResponse.send({ message: 'Invalid token' }, 'UnauthorizedException');

                        authToken = String(token._id);
                        res.cookie('auth-token', authToken, { maxAge: CONSTANT.MINUTE * 5 });
                }

                //generate token if it does not exist
                const userDecode = this.tokenService.decodeJWT<User>(token.data);

                //checking role
                if (role === UserRole.ADMIN && userDecode.role !== UserRole.ADMIN)
                        throw ErrorResponse.send({ message: 'Invalid token' }, 'UnauthorizedException');

                req.user = userDecode;
                return true;
        }
}

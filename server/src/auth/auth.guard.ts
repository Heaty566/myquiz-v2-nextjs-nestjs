import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import * as moment from 'moment';

//* Internal import
import { ApiResponse } from '../common/dto/response.dto';
import { TokenService } from '../token/token.service';
import { UserRole } from './entities/userRole.enum';
import { CONSTANT } from '../common/constant';
import { User } from '../user/entities/user.entity';
import { Token } from '../token/entities/token.entity';
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
                let authToken: string = req.cookies['token'] || '';
                if (!refreshToken) throw new UnauthorizedException(this.errorResponse);

                let token = await this.tokenService.getValidToken(authToken);

                if (!token) {
                        token = await this.tokenService.getAuthToken(refreshToken);
                        if (!token) throw new UnauthorizedException(this.errorResponse);

                        authToken = String(token._id);
                        res.cookie('token', authToken, { maxAge: CONSTANT.MINUTE * 5 });
                }

                //generate token if it does not exist
                const userDecode = this.tokenService.decodeJWT<User>(token.data);

                //checking role
                if (role === UserRole.ADMIN && userDecode.role !== UserRole.ADMIN) throw new UnauthorizedException(this.errorResponse);

                req.user = userDecode;
                return true;
        }
}

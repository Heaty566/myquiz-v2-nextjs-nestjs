import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

//* Internal import
import { ApiResponse } from '../global/dto/response.dto';
import { Token } from '../token/entities/token.entity';
import { TokenService } from '../token/token.service';
import { UserRole } from './entities/userRole.enum';
import { CONSTANT } from '../global/constant';
@Injectable()
export class UserAuth implements CanActivate {
        private readonly errorResponse: ApiResponse = {
                message: 'Invalid token',
        };

        constructor(
                private readonly reflector: Reflector,

                private readonly jwtService: JwtService,
                private readonly tokenService: TokenService,
        ) {}

        async canActivate(context: ExecutionContext) {
                const req: Request = context.switchToHttp().getRequest();
                const res: Response = context.switchToHttp().getResponse();

                const refreshToken = req.cookies['re-token'] || '';
                let authToken: string = req.cookies['token'] || '';
                if (!refreshToken) throw new UnauthorizedException(this.errorResponse);

                if (!authToken) {
                        const newAuthToken = await this.tokenService.getAuthToken(refreshToken);
                        if (!newAuthToken) throw new UnauthorizedException(this.errorResponse);
                        res.cookie('token', newAuthToken, { maxAge: CONSTANT.MINUTE * 5 });

                        authToken = newAuthToken;
                }

                const decodeToken = this.decodeToken(authToken);
                if (typeof decodeToken === 'object') {
                        const role = this.reflector.get<UserRole>('role', context.getHandler());

                        if (role === UserRole.ADMIN && decodeToken.role !== UserRole.ADMIN) throw new UnauthorizedException(this.errorResponse);
                        const reqUser = Object.assign(new Token(), decodeToken);

                        req.user = reqUser;
                        return true;
                }
                return false;
        }

        decodeToken(token: string) {
                try {
                        const data = this.jwtService.decode(token);
                        return data;
                } catch (_) {
                        throw new UnauthorizedException(this.errorResponse);
                }
        }
}

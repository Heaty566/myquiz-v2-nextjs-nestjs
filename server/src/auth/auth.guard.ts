import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './entities/userRole.enum';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';
import { Token } from '../token/entities/token.entity';
import { CONSTANT } from '../common/constant';
@Injectable()
export class UserAuth implements CanActivate {
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
                if (!refreshToken) throw new UnauthorizedException('Invalid token');

                if (!authToken) {
                        const newAuthToken = await this.tokenService.getAuthToken(refreshToken);
                        if (!newAuthToken) throw new UnauthorizedException('Invalid token');
                        res.cookie('token', newAuthToken, { maxAge: CONSTANT.MINUTE * 5 });

                        authToken = newAuthToken;
                }

                const decodeToken = this.decodeToken(authToken);
                if (typeof decodeToken === 'object') {
                        const role = this.reflector.get<UserRole>('role', context.getHandler());

                        if (role === UserRole.ADMIN && decodeToken.role !== UserRole.ADMIN) throw new UnauthorizedException('Invalid token');
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
                        throw new UnauthorizedException('Invalid token');
                }
        }
}

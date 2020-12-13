import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './entities/userRole.enum';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/entities/userRepository.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuth implements CanActivate {
        constructor(
                private readonly reflector: Reflector,
                @InjectRepository(User) private readonly userRepository: UserRepository,
                private readonly jwtService: JwtService,
        ) {}

        async canActivate(context: ExecutionContext) {
                const role = this.reflector.get<UserRole>('role', context.getHandler());

                // const user = await this.userRepository.findOne({ where: {_id: s } });
                return true;
        }

        async decodeToken(token: string) {
                try {
                        const data = this.jwtService.decode(token);
                        return data;
                } catch (_) {
                        throw new UnauthorizedException('Invalid token');
                }
        }
}

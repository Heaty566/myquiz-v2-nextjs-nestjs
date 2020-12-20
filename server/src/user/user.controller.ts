import { Controller, Get, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserAuth } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { RequestCus } from '../common/interface/req.interface';
import * as _ from 'lodash';
@Controller('user')
export class UserController {
        constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

        @Get('')
        @UseGuards(UserAuth)
        async getUserInfo(@Req() req: RequestCus) {
                const user = await this.authService.findUserByField('_id', req.user.userId);
                if (!user) throw new UnauthorizedException('Invalid User');

                return _.pick(user, ['username', 'fullname', 'email', 'avatarUrl', 'isPremium', 'role']);
        }
}

import { Controller, Get, UseGuards, Req, UnauthorizedException, Put, UsePipes, Body } from '@nestjs/common';
import { Request } from 'express';
import * as _ from 'lodash';

//* Internal import
import { ChangePasswordDto, changePasswordDtoValidator } from './dto/changePassword.dto';
import { JoiValidatorPipe } from '../global/pipe/validator.pipe';
import { AuthService } from '../auth/auth.service';
import { UserAuth } from '../auth/auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto, updateUserDtoValidator } from './dto/updateUser.dto';
import { ApiResponse } from '../global/dto/response.dto';
@Controller('user')
export class UserController {
        constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

        @Get('')
        @UseGuards(UserAuth)
        async getUserInfo(@Req() req: Request): Promise<ApiResponse> {
                const user = await this.userService.findUserByField('_id', req.user.userId);
                if (!user) throw new UnauthorizedException('Invalid User');

                return { data: _.pick(user, ['username', 'fullName', 'email', 'avatarUrl', 'isPremium', 'role']) };
        }

        @Put('/password')
        @UseGuards(UserAuth)
        @UsePipes(new JoiValidatorPipe(changePasswordDtoValidator))
        async changePassword(@Body() body: ChangePasswordDto, @Req() req: Request): Promise<ApiResponse> {
                const encryptedPassword = await this.authService.encryptString(body.newPassword, 10);
                const user = await this.userService.findUserByField('_id', req.user.userId);
                user.password = encryptedPassword;

                await this.userService.updateUser(user);

                return { message: 'Updated user information' };
        }

        @Put('')
        @UseGuards(UserAuth)
        @UsePipes(new JoiValidatorPipe(updateUserDtoValidator))
        async updateUser(@Body() body: UpdateUserDto, @Req() req: Request): Promise<ApiResponse> {
                const user = await this.userService.findUserByField('_id', req.user.userId);
                user.fullName = body.fullName;
                user.email = body.email;

                await this.userService.updateUser(user);
                return { message: 'Updated user information' };
        }
}

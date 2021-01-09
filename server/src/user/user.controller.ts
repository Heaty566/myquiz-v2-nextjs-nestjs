import { Controller, Get, UseGuards, Req, UnauthorizedException, Put, UsePipes, Body, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import * as _ from 'lodash';

//* Internal import
import { ChangePasswordDto, changePasswordDtoValidator } from './dto/changePassword.dto';
import { JoiValidatorPipe } from '../common/validation/validator.pipe';
import { AuthService } from '../auth/auth.service';
import { UserAuth } from '../auth/auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto, updateUserDtoValidator } from './dto/updateUser.dto';
import { ApiResponse } from '../common/dto/response.dto';
import { CreateUserDto, createUserDtoValidator } from '../auth/dto/createUser.dto';

@Controller('user')
export class UserController {
        constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

        @Get('')
        @UseGuards(UserAuth)
        async getUserInfo(@Req() req: Request): Promise<ApiResponse> {
                const user = await this.userService.findUserByField('_id', req.user._id);
                if (!user) throw new UnauthorizedException('Invalid User');

                return { data: _.pick(user, ['username', 'fullName', 'email', 'avatarUrl', 'isPremium', 'role']) };
        }

        @Put('/password')
        @UseGuards(UserAuth)
        @UsePipes(new JoiValidatorPipe(changePasswordDtoValidator))
        async changePassword(@Body() body: ChangePasswordDto, @Req() req: Request): Promise<ApiResponse> {
                const encryptedPassword = await this.authService.encryptString(body.newPassword, 10);
                const user = await this.userService.findUserByField('_id', req.user._id);
                user.password = encryptedPassword;

                await this.userService.updateUser(user);

                return { message: 'Updated user information' };
        }

        @Put('')
        @UseGuards(UserAuth)
        @UsePipes(new JoiValidatorPipe(updateUserDtoValidator))
        async updateUser(@Body() body: UpdateUserDto, @Req() req: Request): Promise<ApiResponse> {
                const user = await this.userService.findUserByField('_id', req.user._id);
                user.fullName = body.fullName;
                user.email = body.email;

                await this.userService.updateUser(user);
                return { message: 'Updated user information' };
        }

        @Put('/social-info')
        @UseGuards(UserAuth)
        @UsePipes(new JoiValidatorPipe(createUserDtoValidator))
        async updateSocialInfo(@Body() body: CreateUserDto, @Req() req: Request): Promise<ApiResponse> {
                const user = await this.userService.findUserByField('_id', req.user._id);
                if (user.username != '') throw new BadRequestException({ message: 'User with the given id already updated' });

                const getUser = await this.userService.findUserByField('username', body.username);
                if (getUser) throw new BadRequestException({ message: 'Username is taken' });

                user.username = body.username;
                user.password = await this.authService.encryptString(body.password, 10);
                user.fullName = body.fullName;
                await this.userService.updateUser(user);

                return { message: 'Updated user information' };
        }
}

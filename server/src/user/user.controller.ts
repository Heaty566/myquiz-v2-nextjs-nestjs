import { Controller, Get, UseGuards, Req, UnauthorizedException, Put, UsePipes, Body, BadRequestException, Post, Param } from '@nestjs/common';
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
import { UpdateEmailDto, updateEmailDtoValidator } from './dto/updateEmail.dto';
import { CreateUserDto, createUserDtoValidator } from '../auth/dto/createUser.dto';
import { RedisService } from '../redis/redis.service';
import { MailService } from '../mail/mail.service';
import { otpGenerator } from '../common/helper/otpGenerator';

import { TokenService } from '../token/token.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
        constructor(
                private readonly redisService: RedisService,
                private readonly userService: UserService,
                private readonly authService: AuthService,
                private readonly mailService: MailService,
                private readonly tokenService: TokenService,
        ) {}

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

                await this.userService.updateUser(user);
                return { message: 'Updated user information' };
        }

        @Post('/email')
        @UseGuards(UserAuth)
        @UsePipes(new JoiValidatorPipe(updateEmailDtoValidator))
        async updateEmail(@Body() body: UpdateEmailDto, @Req() req: Request): Promise<ApiResponse> {
                const errorsObject: ApiResponse = {
                        message: 'Some thing went wrong',
                };

                const isExistEmail = await this.userService.findUserByField('email', body.email);
                if (isExistEmail) throw new BadRequestException({ message: 'Email is taken' });

                req.user.email = body.email;
                const jwt = this.tokenService.generateJWT(req.user);
                const key = otpGenerator(6);
                this.redisService.setByValue(key, jwt, 5);

                const isSendSuccess = await this.mailService.otpMail(body.email, key);
                if (!isSendSuccess) throw new BadRequestException(errorsObject);

                return {
                        message: 'An email has been sent to your email',
                };
        }

        @Put('/email/:key')
        async resetPasswordHandler(@Param('key') key): Promise<ApiResponse> {
                const errorsObject: ApiResponse = {
                        message: 'OTP is invalid',
                };

                const findRedisKey = await this.redisService.getByKey(key);
                if (!findRedisKey) throw new BadRequestException(errorsObject);

                const decode = this.tokenService.decodeJWT<User>(findRedisKey);
                const user = await this.userService.findUserByField('_id', decode._id);
                user.email = decode.email;

                await this.userService.updateUser(user);
                this.redisService.deleteByKey(key);
                return {
                        message: 'Update user success',
                };
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

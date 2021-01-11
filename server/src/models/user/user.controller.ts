import { Controller, Get, UseGuards, Req, Put, UsePipes, Body, Post, Param } from '@nestjs/common';
import { Request } from 'express';
import * as _ from 'lodash';

//* Internal import
import { ChangePasswordDto, vChangePasswordDto } from './dto/changePassword.dto';
import { JoiValidatorPipe } from '../../common/validation/validator.pipe';
import { AuthService } from '../../auth/auth.service';
import { UserAuth } from '../../auth/auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto, vUpdateUserDto } from './dto/updateUser.dto';
import { ApiResponse } from '../../common/interfaces/ApiResponse';
import { UpdateEmailDto, vUpdateEmailDto } from './dto/updateEmail.dto';
import { CreateUserDto, vCreateUserDto } from '../../auth/dto/createUser.dto';
import { RedisService } from '../../providers/redis/redis.service';
import { MailService } from '../../providers/mail/mail.service';
import { otpGenerator } from '../../common/helper/otpGenerator';

import { TokenService } from '../../providers/token/token.service';
import { User } from './entities/user.entity';
import { ErrorResponse } from '../../common/interfaces/ErrorResponse';

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
                if (!user) throw ErrorResponse.send({ message: 'Invalid User' }, 'UnauthorizedException');

                return { data: _.pick(user, ['username', 'fullName', 'email', 'avatarUrl', 'isPremium', 'role']) };
        }

        @Put('/password')
        @UseGuards(UserAuth)
        @UsePipes(new JoiValidatorPipe(vChangePasswordDto))
        async changePassword(@Body() body: ChangePasswordDto, @Req() req: Request): Promise<ApiResponse> {
                const encryptedPassword = await this.authService.encryptString(body.newPassword, 10);
                const user = await this.userService.findUserByField('_id', req.user._id);
                user.password = encryptedPassword;

                await this.userService.updateUser(user);

                return { message: 'Updated user information' };
        }

        @Put('')
        @UseGuards(UserAuth)
        @UsePipes(new JoiValidatorPipe(vUpdateUserDto))
        async updateUser(@Body() body: UpdateUserDto, @Req() req: Request): Promise<ApiResponse> {
                const user = await this.userService.findUserByField('_id', req.user._id);
                user.fullName = body.fullName;

                await this.userService.updateUser(user);
                return { message: 'Updated user information' };
        }

        @Post('/email')
        @UseGuards(UserAuth)
        @UsePipes(new JoiValidatorPipe(vUpdateEmailDto))
        async updateEmail(@Body() body: UpdateEmailDto, @Req() req: Request): Promise<ApiResponse> {
                const isExistEmail = await this.userService.findUserByField('email', body.email);
                if (isExistEmail) throw ErrorResponse.send({ message: 'Email is taken' }, 'BadRequestException');

                req.user.email = body.email;
                const jwt = this.tokenService.generateJWT(req.user);
                const key = otpGenerator(6);
                this.redisService.setByValue(key, jwt, 5);

                const isSendSuccess = await this.mailService.otpMail(body.email, key);
                if (!isSendSuccess) throw ErrorResponse.send({ message: 'Can not send email to' + body.email }, 'InternalServerErrorException');

                return {
                        message: 'An email has been sent to your email',
                };
        }

        @Put('/email/:key')
        async resetPasswordHandler(@Param('key') key): Promise<ApiResponse> {
                const findRedisKey = await this.redisService.getByKey(key);
                if (!findRedisKey) throw ErrorResponse.send({ message: 'OTP is invalid' }, 'BadRequestException');

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
        @UsePipes(new JoiValidatorPipe(vCreateUserDto))
        async updateSocialInfo(@Body() body: CreateUserDto, @Req() req: Request): Promise<ApiResponse> {
                const user = await this.userService.findUserByField('_id', req.user._id);
                if (user.username != '') throw ErrorResponse.send({ message: 'User with the given id already updated' }, 'BadRequestException');

                const getUser = await this.userService.findUserByField('username', body.username);
                if (getUser) throw ErrorResponse.send({ message: 'Username is taken' }, 'BadRequestException');

                user.username = body.username;
                user.password = await this.authService.encryptString(body.password, 10);
                user.fullName = body.fullName;
                await this.userService.updateUser(user);

                return { message: 'Updated user information' };
        }
}

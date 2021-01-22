import { Controller, Post, Body, UsePipes, Res, Get, UseGuards, Req, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';

//* Internal import
import { vEmailResetPassword, EmailResetPasswordDto, PasswordResetDto, vPasswordResetDtoValidator } from './dto/resetPassword';
import { CreateUserDto, vCreateUserDto } from './dto/createUser.dto';
import { vLoginUserDto, LoginUserDto } from './dto/loginUser.dto';
import { JoiValidatorPipe } from '../common/validation/validator.pipe';
import { TokenService } from '../providers/token/token.service';
import { UserService } from '../models/user/user.service';
import { CONSTANT } from '../common/constant';
import { AuthService } from './auth.service';
import { ErrorResponse } from '../common/interfaces/ErrorResponse';
import { ApiResponse } from '../common/interfaces/ApiResponse';
import { MailService } from '../providers/mail/mail.service';
import { RedisService } from '../providers/redis/redis.service';
import { User } from '../models/user/entities/user.entity';

@Controller('auth')
export class AuthController {
        constructor(
                private readonly authService: AuthService,
                private readonly tokenService: TokenService,
                private readonly userService: UserService,
                private readonly redisService: RedisService,
                private readonly mailService: MailService,
        ) {}

        /**
         * @description Handle to register for normal user
         * @param body  fullName:string ,username: string ; password: string ; confirmPassword: string
         * @returns a re-token token to user for the next authentication
         */
        @Post('/register')
        @UsePipes(new JoiValidatorPipe(vCreateUserDto))
        async registerUser(
                @Body()
                body: CreateUserDto,
                @Res() res: Response,
        ) {
                const isExistUsername = await this.userService.getOneFindField('username', body.username);
                if (isExistUsername) throw ErrorResponse.send({ details: { username: 'is taken' } }, 'BadRequestException');

                const encryptedPassword = await this.authService.encryptString(body.password);
                const user = new User();
                user.username = body.username;
                user.password = encryptedPassword;
                user.fullName = body.fullName;

                const newUser = await this.authService.updateOrSave(user);
                const reToken = await this.tokenService.getRefreshToken(newUser);

                return res.cookie('re-token', reToken, { maxAge: 180 * CONSTANT.DAY }).send();
        }

        /**
         * @description Handle to login for normal user
         * @param body username: string ; password: string
         * @returns a re-token token to user for the next authentication
         */
        @Post('/login')
        @UsePipes(new JoiValidatorPipe(vLoginUserDto))
        async loginUser(@Body() body: LoginUserDto, @Res() res: Response) {
                const errorResponse = ErrorResponse.send({ details: { username: 'or Password are invalid' } }, 'BadRequestException');

                const getUser = await this.userService.getOneFindField('username', body.username);
                if (!getUser) throw errorResponse;

                const isCorrectPassword = await this.authService.compareEncrypt(body.password, getUser.password);
                if (!isCorrectPassword) throw errorResponse;

                const refreshToken = await this.tokenService.getRefreshToken(getUser);
                return res.cookie('re-token', refreshToken, { maxAge: CONSTANT.DAY * 180 }).send();
        }

        /**
         * @description Handle to send a email with reset key
         * @param body email: string
         */
        @Post('/reset-password')
        @UsePipes(new JoiValidatorPipe(vEmailResetPassword))
        async resetUserPassword(@Body() body: EmailResetPasswordDto): Promise<ApiResponse> {
                const user = await this.userService.getOneFindField('email', body.email);
                if (!user) throw ErrorResponse.send({ details: { email: 'is not found' } }, 'BadRequestException');

                const jwt = this.tokenService.generateJWT(user);
                const key = String(new ObjectId());
                this.redisService.setByValue(key, jwt, 30);

                const isSendSuccess = await this.mailService.forgetPasswordMail(user.email, key);
                if (!isSendSuccess) throw ErrorResponse.send({ details: { email: 'Can not send email to ' + body.email } }, 'BadRequestException');

                return {
                        message: 'An email has been sent to your email',
                };
        }

        /**
         * @description Handle to reset password with reset key (the key will be deleted after reset)
         * @param body resetKey: string ; password: string ; confirmPassword: string
         */
        @Put('/reset-password')
        @UsePipes(new JoiValidatorPipe(vPasswordResetDtoValidator))
        async resetPasswordHandler(@Body() body: PasswordResetDto): Promise<ApiResponse> {
                const findRedisKey = await this.redisService.getByKey(body.resetKey);
                if (!findRedisKey) throw ErrorResponse.send({ details: { resetKey: 'is invalid' } }, 'BadRequestException');

                const decode = this.tokenService.decodeJWT<User>(findRedisKey);
                const user = await this.userService.getOneFindField('_id', decode._id);
                user.password = await this.authService.encryptString(body.newPassword, 10);

                await this.userService.updateOrSave(user);
                this.redisService.deleteByKey(body.resetKey);
                return {
                        message: 'Update user success',
                };
        }

        /**
         * @description Handle login with Google in
         */
        @Get('/google')
        @UseGuards(AuthGuard('google'))
        googleAuth() {
                //
        }

        /**
         * @description Handle login with Google out
         */
        @Get('/google/callback')
        @UseGuards(AuthGuard('google'))
        async googleCallBack(@Req() req: Request, @Res() res: Response) {
                const refreshToken = await this.tokenService.getRefreshToken(req.user);

                return res.cookie('re-token', refreshToken, { maxAge: CONSTANT.DAY * 180 }).redirect(process.env.CLIENT_URL);
        }

        /**
         * @description Handle login with Facebook in
         */
        @Get('/facebook')
        @UseGuards(AuthGuard('facebook'))
        facebookAuth() {
                //
        }

        /**
         * @description Handle login with Facebook out
         */
        @Get('/facebook/callback')
        @UseGuards(AuthGuard('facebook'))
        async facebookCallback(@Req() req: Request, @Res() res: Response) {
                const refreshToken = await this.tokenService.getRefreshToken(req.user);

                return res.cookie('re-token', refreshToken, { maxAge: CONSTANT.DAY * 180 }).redirect(process.env.CLIENT_URL);
        }

        /**
         * @description Handle login with Github in
         */
        @Get('/github')
        @UseGuards(AuthGuard('github'))
        githubAuth() {
                //
        }

        /**
         * @description Handle login with Github out
         */
        @Get('/github/callback')
        @UseGuards(AuthGuard('github'))
        async githubCallback(@Req() req: Request, @Res() res: Response) {
                const refreshToken = await this.tokenService.getRefreshToken(req.user);

                return res.cookie('re-token', refreshToken, { maxAge: CONSTANT.DAY * 180 }).redirect(process.env.CLIENT_URL);
        }
}

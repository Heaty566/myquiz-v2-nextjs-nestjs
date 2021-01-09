import { Controller, Post, Body, BadRequestException, UsePipes, Res, Get, UseGuards, Req, Put, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';

//* Internal import
import { emailResetPasswordDtoValidator, EmailResetPasswordDto, PasswordResetDto, passwordResetDtoValidator } from './dto/resetPassword';
import { CreateUserDto, createUserDtoValidator } from './dto/createUser.dto';
import { loginUserDtoValidator, LoginUserDto } from './dto/loginUser.dto';
import { JoiValidatorPipe } from '../common/validation/validator.pipe';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { CONSTANT } from '../common/constant';
import { AuthService } from './auth.service';
import { ApiResponse } from '../common/dto/response.dto';
import { MailService } from '../mail/mail.service';
import { RedisService } from '../redis/redis.service';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
        constructor(
                private readonly authService: AuthService,
                private readonly tokenService: TokenService,
                private readonly userService: UserService,
                private readonly redisService: RedisService,
                private readonly mailService: MailService,
        ) {}

        @Post('/register')
        @UsePipes(new JoiValidatorPipe(createUserDtoValidator))
        async registerUser(
                @Body()
                body: CreateUserDto,
                @Res() res: Response,
        ) {
                const errorsObject: ApiResponse = {
                        message: 'Username is taken',
                };

                const isExistUser = await this.userService.findUserByField('username', body.username);
                if (isExistUser) throw new BadRequestException(errorsObject);

                const newUser = await this.authService.createNewUser(body);
                const refreshToken = await this.tokenService.getRefreshToken(newUser);

                return res.cookie('re-token', refreshToken, { maxAge: 180 * CONSTANT.DAY }).send();
        }

        @Post('/login')
        @UsePipes(new JoiValidatorPipe(loginUserDtoValidator))
        async loginUser(@Body() body: LoginUserDto, @Res() res: Response) {
                const errorsObject: ApiResponse = {
                        message: 'Username or Password are invalid',
                };

                const getUser = await this.userService.findUserByField('username', body.username);
                if (!getUser) throw new BadRequestException(errorsObject);

                const isCorrectPassword = await this.authService.compareEncrypt(body.password, getUser.password);
                if (!isCorrectPassword) throw new BadRequestException(errorsObject);

                const refreshToken = await this.tokenService.getRefreshToken(getUser);
                return res.cookie('re-token', refreshToken, { maxAge: CONSTANT.DAY * 180 }).send();
        }

        @Post('/reset-password')
        @UsePipes(new JoiValidatorPipe(emailResetPasswordDtoValidator))
        async resetUserPassword(@Body() body: EmailResetPasswordDto): Promise<ApiResponse> {
                const errorsObject: ApiResponse = {
                        message: 'Email is not found',
                };

                const user = await this.userService.findUserByField('email', body.email);
                if (!user) throw new BadRequestException(errorsObject);

                const jwt = this.tokenService.generateJWT(user);
                const key = String(new ObjectId());
                this.redisService.setByValue(key, jwt, 30);

                const isSendSuccess = await this.mailService.forgetPasswordMail(user.email, key);
                if (!isSendSuccess) throw new BadRequestException(errorsObject);

                return {
                        message: 'An email has been sent to your email',
                };
        }

        @Put('/reset-password')
        @UsePipes(new JoiValidatorPipe(passwordResetDtoValidator))
        async resetPasswordHandler(@Body() body: PasswordResetDto): Promise<ApiResponse> {
                const errorsObject: ApiResponse = {
                        message: 'Reset key is invalid',
                };

                const findRedisKey = await this.redisService.getByKey(body.resetKey);
                if (!findRedisKey) throw new BadRequestException(errorsObject);

                const decode = this.tokenService.decodeJWT<User>(findRedisKey);
                const user = await this.userService.findUserByField('_id', decode._id);
                user.password = await this.authService.encryptString(body.password, 10);

                await this.userService.updateUser(user);
                this.redisService.deleteByKey(body.resetKey);
                return {
                        message: 'Update user success',
                };
        }

        @Get('/google')
        @UseGuards(AuthGuard('google'))
        googleAuth() {
                //
        }

        @Get('/google/callback')
        @UseGuards(AuthGuard('google'))
        async googleCallBack(@Req() req: Request, @Res() res: Response) {
                const refreshToken = await this.tokenService.getRefreshToken(req.user);

                return res.cookie('re-token', refreshToken, { maxAge: CONSTANT.DAY * 180 }).redirect(process.env.CLIENT_URL);
        }

        @Get('/facebook')
        @UseGuards(AuthGuard('facebook'))
        facebookAuth() {
                //
        }

        @Get('/facebook/callback')
        @UseGuards(AuthGuard('facebook'))
        async facebookCallback(@Req() req: Request, @Res() res: Response) {
                const refreshToken = await this.tokenService.getRefreshToken(req.user);

                return res.cookie('re-token', refreshToken, { maxAge: CONSTANT.DAY * 180 }).redirect(process.env.CLIENT_URL);
        }

        @Get('/github')
        @UseGuards(AuthGuard('github'))
        githubAuth() {
                //
        }

        @Get('/github/callback')
        @UseGuards(AuthGuard('github'))
        async githubCallback(@Req() req: Request, @Res() res: Response) {
                const refreshToken = await this.tokenService.getRefreshToken(req.user);

                return res.cookie('re-token', refreshToken, { maxAge: CONSTANT.DAY * 180 }).redirect(process.env.CLIENT_URL);
        }
}

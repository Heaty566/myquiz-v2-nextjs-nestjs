import { Controller, Post, Body, BadRequestException, UsePipes, Res, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

//* Internal import
import { CreateUserDto, createUserDtoValidator } from './dto/createUser.dto';
import { loginUserDtoValidator, LoginUserDto } from './dto/loginUser.dto';
import { ObjError } from '../global/validation/messageErrorMapper.joi';
import { JoiValidatorPipe } from '../global/pipe/validator.pipe';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { CONSTANT } from '../global/constant';
import { AuthService } from './auth.service';
import { ApiResponse } from '../global/dto/response.dto';
@Controller('auth')
export class AuthController {
        constructor(
                private readonly authService: AuthService,
                private readonly tokenService: TokenService,
                private readonly userService: UserService,
        ) {}

        @Post('/register')
        @UsePipes(new JoiValidatorPipe(createUserDtoValidator))
        async registerUser(
                @Body()
                body: CreateUserDto,
                @Res() res: Response,
        ) {
                const errorsObject: ApiResponse = {
                        message: 'Username or Password are invalid',
                };

                const isExistUser = await this.userService.findUserByField('username', body.username);
                if (isExistUser) throw new BadRequestException(errorsObject);

                const { isPremium, role, _id } = await this.authService.createNewUser(body);
                const refreshToken = await this.tokenService.getRefreshToken({ isPremium, role, userId: _id });

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

                const refreshToken = await this.tokenService.getRefreshToken({
                        isPremium: getUser.isPremium,
                        role: getUser.role,
                        userId: getUser._id,
                });
                return res.cookie('re-token', refreshToken, { maxAge: CONSTANT.DAY * 180 }).send();
        }

        @Get('/google')
        @UseGuards(AuthGuard('google'))
        googleAuth() {
                //
        }

        @Get('/google/callback')
        @UseGuards(AuthGuard('google'))
        async googleCallBack(@Req() req: Request, @Res() res: Response) {
                const { isPremium, role, userId } = req.user;
                const refreshToken = await this.tokenService.getRefreshToken({
                        isPremium,
                        role,
                        userId,
                });

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
                const { isPremium, role, userId } = req.user;
                const refreshToken = await this.tokenService.getRefreshToken({
                        isPremium,
                        role,
                        userId,
                });

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
                const { isPremium, role, userId } = req.user;
                const refreshToken = await this.tokenService.getRefreshToken({
                        isPremium,
                        role,
                        userId,
                });

                return res.cookie('re-token', refreshToken, { maxAge: CONSTANT.DAY * 180 }).redirect(process.env.CLIENT_URL);
        }
}

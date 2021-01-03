import { Controller, Post, Body, BadRequestException, UsePipes, Res } from '@nestjs/common';
import { Response } from 'express';
import { JoiValidatorPipe } from '../common/pipe/validator.pipe';
import { loginUserDtoValidator, LoginUserDto } from './dto/loginUser.dto';
import { TokenService } from '../token/token.service';
import { AuthService } from './auth.service';
import { CreateUserDto, createUserDtoValidator } from './dto/createUser.dto';
import { CONSTANT } from '../common/constant';
import { ObjError } from '../common/validation/JoiErrorMapper.helper';

@Controller('auth')
export class AuthController {
        constructor(private readonly authService: AuthService, private readonly tokenService: TokenService) {}

        @Post('/register')
        @UsePipes(new JoiValidatorPipe(createUserDtoValidator))
        async registerUser(
                @Body()
                body: CreateUserDto,
                @Res() res: Response,
        ) {
                const errorsObject: ObjError = {
                        username: 'username or password are invalid',
                };
                const isExistUser = await this.authService.findUserByField('username', body.username);
                if (isExistUser) throw new BadRequestException(errorsObject);

                const { isPremium, role, _id } = await this.authService.createNewUser(body);
                const refreshToken = await this.tokenService.getRefreshToken({ isPremium, role, userId: _id });

                return res.cookie('re-token', refreshToken, { maxAge: 180 * CONSTANT.DAY }).send();
        }

        @Post('/login')
        @UsePipes(new JoiValidatorPipe(loginUserDtoValidator))
        async loginUser(@Body() body: LoginUserDto, @Res() res: Response) {
                const errorsObject: ObjError = {
                        username: 'username or password are invalid',
                };

                const getUser = await this.authService.findUserByField('username', body.username);
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
}

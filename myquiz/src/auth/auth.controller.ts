import { Controller, Post, Body, BadRequestException, UsePipes, Res } from '@nestjs/common';
import { Response } from 'express';
import { JoiValidatorPipe } from '../common/pipe/validator.pipe';
import { loginUserDtoValidator, LoginUserDto } from './dto/loginUser.dto';
import { TokenService } from '../token/token.service';
import { AuthService } from './auth.service';
import { CreateUserDto, createUserDtoValidator } from './dto/createUser.dto';

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
                const isExistUser = await this.authService.findUserByField('username', body.username);
                if (isExistUser) throw new BadRequestException('Username is taken');

                const { isPremium, role, _id } = await this.authService.createNewUser(body);
                const refershToken = await this.tokenService.getRefershToken({ isPremium, role, userId: _id });

                return res.cookie('re-token', refershToken).send({ message: 'Registration completed successfully' });
        }

        @Post('/login')
        @UsePipes(new JoiValidatorPipe(loginUserDtoValidator))
        async loginUser(@Body() body: LoginUserDto, @Res() res: Response) {
                const getUser = await this.authService.findUserByField('username', body.username);
                if (!getUser) throw new BadRequestException('Username or password are invalid');

                const isCorrectPasswrod = await this.authService.compareEncrypt(body.password, getUser.password);
                if (!isCorrectPasswrod) throw new BadRequestException('Username or password are invalid');

                const refershToken = await this.tokenService.getRefershToken({
                        isPremium: getUser.isPremium,
                        role: getUser.role,
                        userId: getUser._id,
                });
                return res.cookie('re-token', refershToken).send({ message: 'Login user successfully' });
        }
}

import { Controller, Post, UseGuards, Body, BadRequestException, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuth } from './auth.guard';
import { Roles } from './auth.decorator';
import { UserRole } from './entities/userRole.enum';
import { CreateUserDto, createUserDtoValidator } from './dto/CreateUser.dto';
import { JoiValidatorPipe } from '../common/pipe/validator.pipe';
import { TokenService } from '../token/token.service';

@Controller('auth')
export class AuthController {
        constructor(private readonly authService: AuthService, private readonly tokenService: TokenService) {}

        @Post('/register')
        @UsePipes(new JoiValidatorPipe(createUserDtoValidator))
        async registerUser(
                @Body()
                body: CreateUserDto,
        ) {
                const isExistUser = await this.authService.findUserByField('username', body.username);
                if (isExistUser) throw new BadRequestException('Username is taken');

                const { isPremium, role, _id } = await this.authService.createNewUser(body);

                return this.tokenService.getRefershToken({ isPremium, role, userId: _id });
        }
}

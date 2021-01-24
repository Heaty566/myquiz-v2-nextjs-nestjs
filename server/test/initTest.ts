import { Test, TestingModule } from '@nestjs/testing';
//* Internal import
import { router } from '../src/common/router';
import { AppModule } from '../src/app.module';
import { fakeUser } from './fakeEntity';
import { UserService } from '../src/models/user/user.service';
import { TokenService } from '../src/providers/token/token.service';

export const initTestModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule],
        }).compile();

        const configModule = module.createNestApplication();

        router(configModule);

        const getApp = await configModule.init();

        const user = fakeUser();

        const userService = module.get<UserService>(UserService);
        const tokenService = module.get<TokenService>(TokenService);

        const insertUser = await userService.updateOrSave(user);
        const reToken = await tokenService.getRefreshToken(insertUser);

        //apply middleware

        return { getApp, module, reToken: [`re-token=${reToken}; Max-Age=15552000; Path=/;`], user };
};

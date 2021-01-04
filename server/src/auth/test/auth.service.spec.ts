import { INestApplication } from '@nestjs/common';

//* Internal import
import { UserRepository } from '../../user/entities/userRepository.entity';
import { getCreateUserDto } from '../../../test/fakeData/fakeAuth';
import { initTestModule } from '../../../test/initTest';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
        let app: INestApplication;
        let userRepository: UserRepository;
        let authService: AuthService;
        beforeAll(async () => {
                const { getApp, module } = await initTestModule();
                app = getApp;

                userRepository = module.get<UserRepository>(UserRepository);
                authService = module.get<AuthService>(AuthService);
        });

        describe('createNewUser', () => {
                let createUserData;

                beforeEach(() => {
                        createUserData = getCreateUserDto();
                });
                it('create success user', async () => {
                        const newUser = await authService.createNewUser(createUserData);
                        const getUser = await userRepository.findOne({ username: newUser.username });
                        expect(getUser).toBeDefined();
                });
        });

        afterAll(async () => {
                await app.close();
                await userRepository.clear();
        });
});

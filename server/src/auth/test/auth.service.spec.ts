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
        describe('loginUserWithProvider', () => {
                it('create user with facebook', async () => {
                        await authService.createNewUserByOtherProvider('example', '123', 'facebookId');
                        const getUser = await userRepository.findOne({ facebookId: '123' });

                        expect(getUser).toBeDefined();
                });
                it('create user with google', async () => {
                        await authService.createNewUserByOtherProvider('example', '123', 'googleId');
                        const getUser = await userRepository.findOne({ googleId: '123' });

                        expect(getUser).toBeDefined();
                });
                it('create user with github', async () => {
                        await authService.createNewUserByOtherProvider('example', '123', 'githubId');
                        const getUser = await userRepository.findOne({ githubId: '123' });

                        expect(getUser).toBeDefined();
                });
        });

        afterAll(async () => {
                await app.close();
                await userRepository.clear();
        });
});

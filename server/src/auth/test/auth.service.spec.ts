import { INestApplication } from '@nestjs/common';

//* Internal import
import { UserRepository } from '../../models/user/entities/user.repository';
import { fakeUser } from '../../../test/fakeEntity';
import { initTestModule } from '../../../test/initTest';
import { AuthService } from '../auth.service';
import { CreateUserDto } from '../dto/createUser.dto';

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
                let createUserData: CreateUserDto;

                beforeEach(() => {
                        const getUser = fakeUser();
                        createUserData = {
                                fullName: getUser.fullName,
                                confirmPassword: getUser.password,
                                password: getUser.password,
                                username: getUser.username,
                        };
                });
                it('Pass', async () => {
                        const newUser = await authService.createNewUser(createUserData);
                        const getUser = await userRepository.findOne({ username: newUser.username });
                        expect(getUser).toBeDefined();
                });
        });
        describe('loginUserWithProvider', () => {
                it('Pass (with Facebook)', async () => {
                        await authService.createNewUserByOtherProvider('example', '123', 'facebookId');
                        const getUser = await userRepository.findOne({ facebookId: '123' });

                        expect(getUser).toBeDefined();
                });
                it('Pass (with Google)', async () => {
                        await authService.createNewUserByOtherProvider('example', '123', 'googleId');
                        const getUser = await userRepository.findOne({ googleId: '123' });

                        expect(getUser).toBeDefined();
                });

                it('Pass (with Github)', async () => {
                        await authService.createNewUserByOtherProvider('example', '123', 'githubId');
                        const getUser = await userRepository.findOne({ githubId: '123' });

                        expect(getUser).toBeDefined();
                });
        });

        afterAll(async () => {
                await userRepository.clear();
                await app.close();
        });
});

import { INestApplication } from '@nestjs/common';

//* Internal import
import { UserRepository } from '../../models/user/entities/user.repository';
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

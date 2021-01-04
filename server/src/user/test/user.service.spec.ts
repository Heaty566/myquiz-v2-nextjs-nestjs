import { INestApplication } from '@nestjs/common';
import { ObjectId } from 'mongodb';

//* Internal import
import { UserRepository } from '../entities/userRepository.entity';
import { getCreateUserDto } from '../../../test/fakeData/fakeAuth';
import { initTestModule } from '../../../test/initTest';
import { AuthService } from '../../auth/auth.service';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
        let app: INestApplication;
        let userRepository: UserRepository;
        let userService: UserService;
        let authService: AuthService;
        let userInfo: User;
        beforeAll(async () => {
                const { getApp, module } = await initTestModule();
                app = getApp;

                userRepository = module.get<UserRepository>(UserRepository);
                userService = module.get<UserService>(UserService);
                authService = module.get<AuthService>(AuthService);
        });

        beforeAll(async () => {
                const registerUser = getCreateUserDto();
                userInfo = await authService.createNewUser(registerUser);
        });

        describe('findUserByField', () => {
                it('find user with valid id', async () => {
                        const getUser = await userService.findUserByField('_id', userInfo._id);

                        expect(getUser).toBeDefined();
                });

                it('find user with other field', async () => {
                        const getUser = await userService.findUserByField('username', userInfo.username);

                        expect(getUser).toBeDefined();
                });

                it('find user with invalid id', async () => {
                        const getUser = await userService.findUserByField('_id', new ObjectId());

                        expect(getUser).toBeUndefined();
                });
                it('find user with invalid field', async () => {
                        const getUser = await userService.findUserByField('username', '123');

                        expect(getUser).toBeUndefined();
                });
        });

        describe('updateUser', () => {
                it('update user password to `change`', async () => {
                        const mirrorUser: User = { ...userInfo };
                        mirrorUser.password = 'change';
                        await userService.updateUser(mirrorUser);
                        const getUser = await userService.findUserByField('username', userInfo.username);

                        expect(getUser.password).toBe('change');
                });
        });

        afterAll(async () => {
                await app.close();
                await userRepository.clear();
        });
});

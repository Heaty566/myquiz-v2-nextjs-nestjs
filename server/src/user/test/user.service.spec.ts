import { INestApplication } from '@nestjs/common';
import { ObjectId } from 'mongodb';

//* Internal import
import { UserRepository } from '../entities/userRepository.entity';
import { fakeUser } from '../../../test/fakeEnity';
import { initTestModule } from '../../../test/initTest';
import { AuthService } from '../../auth/auth.service';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { CreateUserDto } from '../../auth/dto/createUser.dto';

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
                const getUser = fakeUser();
                const registerUser: CreateUserDto = {
                        username: getUser.username,
                        confirmPassword: getUser.password,
                        password: getUser.password,
                        fullName: getUser.fullName,
                };

                userInfo = await authService.createNewUser(registerUser);
        });

        describe('findUserByField', () => {
                it('Pass (with Id)', async () => {
                        const getUser = await userService.findUserByField('_id', userInfo._id);

                        expect(getUser).toBeDefined();
                });

                it('Pass (other field)', async () => {
                        const getUser = await userService.findUserByField('username', userInfo.username);

                        expect(getUser).toBeDefined();
                });

                it('Failed (invalid id)', async () => {
                        const getUser = await userService.findUserByField('_id', new ObjectId());

                        expect(getUser).toBeUndefined();
                });
                it('Failed (invalid field)', async () => {
                        const getUser = await userService.findUserByField('username', '123');

                        expect(getUser).toBeUndefined();
                });
        });

        describe('updateUser', () => {
                it('Pass', async () => {
                        const mirrorUser: User = { ...userInfo };
                        mirrorUser.password = 'change';
                        await userService.updateUser(mirrorUser);
                        const getUser = await userService.findUserByField('username', userInfo.username);

                        expect(getUser.password).toBe('change');
                });
        });

        afterAll(async () => {
                await userRepository.clear();
                await app.close();
        });
});

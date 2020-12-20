import { INestApplication } from '@nestjs/common';
import { getTestInit } from '../../common/test/getInit';
import { getCreateUserDto } from '../../common/test/fakeData/fakeAuth';
import { UserRepository } from '../../user/entities/userRepository.entity';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
        let app: INestApplication;
        let userRepostiory: UserRepository;
        let authService: AuthService;
        beforeAll(async () => {
                const { getApp, module } = await getTestInit();
                app = getApp;

                userRepostiory = module.get<UserRepository>(UserRepository);
                authService = module.get<AuthService>(AuthService);
        });

        describe('createNewUser', () => {
                let createUserData;

                beforeEach(() => {
                        createUserData = getCreateUserDto();
                });
                it('create success user', async () => {
                        const newUser = await authService.createNewUser(createUserData);
                        const getUser = await userRepostiory.findOne({ _id: newUser._id });
                        expect(getUser).toBeDefined();
                });
        });

        afterAll(async () => {
                await app.close();
                await userRepostiory.clear();
        });
});

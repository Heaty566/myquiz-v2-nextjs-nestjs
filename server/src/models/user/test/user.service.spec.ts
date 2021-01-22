import { INestApplication } from '@nestjs/common';
import { ObjectId } from 'mongodb';

//* Internal import
import { UserRepository } from '../entities/user.repository';
import { initTestModule } from '../../../../test/initTest';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
        let app: INestApplication;
        let userRepository: UserRepository;
        let userService: UserService;

        let userInfo: User;
        beforeAll(async () => {
                const { getApp, module, user } = await initTestModule();
                app = getApp;

                userInfo = user;

                userRepository = module.get<UserRepository>(UserRepository);
                userService = module.get<UserService>(UserService);
        });

        describe('findUserByField', () => {
                it('Pass (with Id)', async () => {
                        const getUser = await userService.getOneFindField('_id', userInfo._id);

                        expect(getUser).toBeDefined();
                });

                it('Pass (other field)', async () => {
                        const getUser = await userService.getOneFindField('username', userInfo.username);

                        expect(getUser).toBeDefined();
                });

                it('Failed (invalid id)', async () => {
                        const getUser = await userService.getOneFindField('_id', new ObjectId());

                        expect(getUser).toBeUndefined();
                });
                it('Failed (invalid field)', async () => {
                        const getUser = await userService.getOneFindField('username', '123');

                        expect(getUser).toBeUndefined();
                });
        });

        describe('updateUser', () => {
                it('Pass', async () => {
                        const mirrorUser: User = { ...userInfo };
                        mirrorUser.password = 'change';
                        await userService.updateOrSave(mirrorUser);
                        const getUser = await userService.getOneFindField('username', userInfo.username);

                        expect(getUser.password).toBe('change');
                });
        });

        afterAll(async () => {
                await userRepository.clear();
                await app.close();
        });
});

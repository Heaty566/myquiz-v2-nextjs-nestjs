import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';

//* Internal import
import { UserRepository } from '../entities/userRepository.entity';
import { getDummyUser } from '../../../test/fakeData/fakeAuth';
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { fakeData } from '../../../test/fakeData/fakeData';
import { TokenService } from '../../token/token.service';
import { initTestModule } from '../../../test/initTest';
import { AuthService } from '../../auth/auth.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { CreateUserDto } from '../../auth/dto/createUser.dto';

describe('userController', () => {
        let app: INestApplication;
        let userRepository: UserRepository;
        let authService: AuthService;
        let tokenService: TokenService;
        let cookie: string;

        let userInfo: User;
        beforeAll(async () => {
                const { getApp, module } = await initTestModule();
                app = getApp;

                tokenService = module.get<TokenService>(TokenService);

                authService = module.get<AuthService>(AuthService);
                userRepository = module.get<UserRepository>(UserRepository);
        });

        beforeAll(async () => {
                const getUser = getDummyUser();
                const createUserData: CreateUserDto = {
                        username: getUser.username,
                        confirmPassword: getUser.password,
                        password: getUser.password,
                        fullName: getUser.fullName,
                };
                const res = await supertest(app.getHttpServer()).post('/api/auth/register').send(createUserData);

                cookie = res.headers['set-cookie'];

                userInfo = await userRepository.findOne({ username: createUserData.username });
        });

        describe('GET /api/user', () => {
                const callApi = () => supertest(app.getHttpServer()).get('/api/user').set({ cookie: cookie }).send();

                let invalidReToken: string;
                beforeAll(async () => {
                        const user = getDummyUser();
                        invalidReToken = await tokenService.getRefreshToken(user);
                });
                it('get user', async () => {
                        const res = await callApi();

                        expect(res.status).toBe(200);
                        expect(res.body).toBeDefined();
                });

                it('failed no token provider', async () => {
                        const res = await supertest(app.getHttpServer()).get('/api/user').send();

                        expect(res.status).toBe(401);
                        expect(res.body);
                });

                it('invalid token', async () => {
                        const cookies = `re-token=${invalidReToken}; Path=/`;
                        const res = await supertest(app.getHttpServer()).get('/api/user').set({ cookie: cookies }).send({});
                        expect(res.body.message).toBeDefined();
                        expect(res.status).toBe(401);
                });
        });

        describe('PUT /api/user/password', () => {
                const callApi = (input: ChangePasswordDto) =>
                        supertest(app.getHttpServer()).put('/api/user/password').set({ cookie: cookie }).send(input);

                let dummyInput: ChangePasswordDto;
                let dummyPassword: string;
                beforeEach(async () => {
                        dummyPassword = fakeData(10, 'lettersAndNumbers');

                        dummyInput = {
                                confirmPassword: dummyPassword,
                                newPassword: dummyPassword,
                        };
                });

                it('update password with valid input', async () => {
                        await callApi(dummyInput);

                        const user = await userRepository.findOne({ username: userInfo.username });

                        const isCorrectChange = await authService.compareEncrypt(dummyPassword, user.password);
                        expect(isCorrectChange).toBeTruthy();
                });

                it('update password with valid input (newPassword and confirmPassword does not match)', async () => {
                        dummyInput.confirmPassword = fakeData(10, 'lettersAndNumbers');
                        const res = await callApi(dummyInput);
                        const user = await userRepository.findOne({ username: userInfo.username });

                        const isCorrectChange = await authService.compareEncrypt(dummyPassword, user.password);

                        expect(isCorrectChange).toBeFalsy();
                        expect(res.status).toBe(400);
                });
        });
        describe('PUT /api/user/information', () => {
                const callApi = (input: UpdateUserDto) => supertest(app.getHttpServer()).put('/api/user').set({ cookie: cookie }).send(input);

                let dummyInput: UpdateUserDto;

                beforeEach(async () => {
                        const getUser = getDummyUser();
                        dummyInput = {
                                email: getUser.email,
                                fullName: getUser.fullName,
                        };
                });

                it('update password with valid input', async () => {
                        await callApi(dummyInput);

                        const user = await userRepository.findOne({ username: userInfo.username });

                        expect(user.email).toBe(dummyInput.email);
                        expect(user.fullName).toBe(dummyInput.fullName);
                });

                it('update password with valid input (wrong email pattern)', async () => {
                        dummyInput.email = fakeData(10, 'lettersAndNumbers');
                        const res = await callApi(dummyInput);
                        const user = await userRepository.findOne({ username: userInfo.username });

                        expect(user.fullName).not.toBe(dummyInput.fullName);
                        expect(user.email).not.toBe(dummyInput.email);
                        expect(res.status).toBe(400);
                });
        });

        describe('PUT /social-info', () => {
                //
                let updateSocialDto: CreateUserDto;
                const reqApi = (input: CreateUserDto, token: string) =>
                        supertest(app.getHttpServer())
                                .put('/api/user/social-info')
                                .set({ cookie: 're-token=' + token })
                                .send(input);
                let updateUser: User;
                let updateToken: string;

                beforeEach(async () => {
                        const getUser = getDummyUser();
                        updateSocialDto = {
                                fullName: getUser.fullName,
                                username: getUser.username,
                                password: getUser.password,
                                confirmPassword: getUser.password,
                        };
                        getUser.username = '';
                        updateUser = await userRepository.save(getUser);

                        updateToken = await tokenService.getRefreshToken(updateUser);
                });

                it('update user success', async () => {
                        await reqApi(updateSocialDto, updateToken);
                        const user = await userRepository.findOne({ username: updateSocialDto.username });

                        expect(user.username).toBeDefined();
                        expect(user.githubId).toBe(updateUser.githubId);
                });
                it('update user failed (user already update)', async () => {
                        await reqApi(updateSocialDto, updateToken);
                        const res = await reqApi(updateSocialDto, updateToken);

                        expect(res.status).toBe(400);
                });
                it('update user failed (username is taken)', async () => {
                        await userRepository.save({ username: updateSocialDto.username });
                        const res = await reqApi(updateSocialDto, updateToken);

                        expect(res.status).toBe(400);
                });
        });

        afterAll(async () => {
                await app.close();
                await userRepository.clear();
        });
});

import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';

//* Internal import
import { getCreateTokenDto } from '../../../test/fakeData/fakeToken';
import { UserRepository } from '../entities/userRepository.entity';
import { getCreateUserDto } from '../../../test/fakeData/fakeAuth';
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { fakeData } from '../../../test/fakeData/fakeData';
import { TokenService } from '../../token/token.service';
import { initTestModule } from '../../../test/initTest';
import { AuthService } from '../../auth/auth.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/updateUser.dto';

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
                const createUserData = getCreateUserDto();
                const res = await supertest(app.getHttpServer()).post('/api/auth/register').send(createUserData);

                cookie = res.headers['set-cookie'];

                userInfo = await userRepository.findOne({ username: createUserData.username });
        });

        describe('GET /api/user', () => {
                const callApi = () => supertest(app.getHttpServer()).get('/api/user').set({ cookie: cookie }).send();

                let invalidReToken: string;
                beforeAll(async () => {
                        invalidReToken = await tokenService.getRefreshToken(getCreateTokenDto());
                });
                it('get user', async () => {
                        const res = await callApi();

                        expect(res.body.username).toBeDefined();
                        expect(res.body.fullName).toBeDefined();
                        expect(res.body.password).toBeUndefined();
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
                const callApi = (input: UpdateUserDto) =>
                        supertest(app.getHttpServer()).put('/api/user/information').set({ cookie: cookie }).send(input);

                let dummyInput: UpdateUserDto;

                beforeEach(async () => {
                        dummyInput = {
                                email: 'example@gmail.com',
                                fullName: fakeData(10, 'lettersAndNumbersLowerCase'),
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

        afterAll(async () => {
                await app.close();
                await userRepository.clear();
        });
});

import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';

//* Internal import
import { UserRepository } from '../entities/userRepository.entity';
import { fakeUser } from '../../../../test/fakeEntity';
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { fakeData } from '../../../../test/fakeData';
import { TokenService } from '../../../providers/token/token.service';
import { initTestModule } from '../../../../test/initTest';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { CreateUserDto } from '../../../auth/dto/createUser.dto';
import { UpdateEmailDto } from '../dto/updateEmail.dto';
import { RedisService } from '../../../providers/redis/redis.service';

describe('userController', () => {
        let app: INestApplication;
        let userRepository: UserRepository;
        let authService: AuthService;
        let tokenService: TokenService;
        let redisService: RedisService;
        let cookie: string;

        let userInfo: User;
        beforeAll(async () => {
                const { getApp, module } = await initTestModule();
                app = getApp;

                tokenService = module.get<TokenService>(TokenService);
                redisService = module.get<RedisService>(RedisService);
                authService = module.get<AuthService>(AuthService);
                userRepository = module.get<UserRepository>(UserRepository);
        });

        beforeAll(async () => {
                const getUser = fakeUser();
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
                        const user = fakeUser();
                        invalidReToken = await tokenService.getRefreshToken(user);
                });
                it('PASS', async () => {
                        const res = await callApi();

                        expect(res.status).toBe(200);
                        expect(res.body).toBeDefined();
                });

                it('Failed (no token provides)', async () => {
                        const res = await supertest(app.getHttpServer()).get('/api/user').send();

                        expect(res.status).toBe(401);
                        expect(res.body);
                });

                it('Failed (invalid token)', async () => {
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

                it('Pass', async () => {
                        await callApi(dummyInput);

                        const user = await userRepository.findOne({ username: userInfo.username });

                        const isCorrectChange = await authService.compareEncrypt(dummyPassword, user.password);
                        expect(isCorrectChange).toBeTruthy();
                });

                it('Failed (newPassword and confirmPassword does not match)', async () => {
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
                        const getUser = fakeUser();
                        dummyInput = {
                                fullName: getUser.fullName,
                        };
                });

                it('Pass', async () => {
                        await callApi(dummyInput);

                        const user = await userRepository.findOne({ username: userInfo.username });

                        expect(user.fullName).toBe(dummyInput.fullName);
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
                        const getUser = fakeUser();
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

                it('Pass', async () => {
                        await reqApi(updateSocialDto, updateToken);
                        const user = await userRepository.findOne({ username: updateSocialDto.username });

                        expect(user.username).toBeDefined();
                        expect(user.githubId).toBe(updateUser.githubId);
                });
                it('Failed (user already update)', async () => {
                        await reqApi(updateSocialDto, updateToken);
                        const res = await reqApi(updateSocialDto, updateToken);

                        expect(res.status).toBe(400);
                });
                it('Failed (username is taken)', async () => {
                        await userRepository.save({ username: updateSocialDto.username });
                        const res = await reqApi(updateSocialDto, updateToken);

                        expect(res.status).toBe(400);
                });
        });

        describe('POST /email', () => {
                beforeAll(async () => {
                        let user = fakeUser();
                        user.email = 'example123@gmail.com';
                        user = await userRepository.save(user);
                });

                const reqApi = (input: UpdateEmailDto) => supertest(app.getHttpServer()).post('/api/user/email').set({ cookie }).send(input);

                it('Pass', async () => {
                        const res = await reqApi({ email: 'example@gmail.com' });

                        expect(res.status).toBe(201);
                        expect(res.body).toBeDefined();
                });

                it('Failed (email does not exist)', async () => {
                        const res = await reqApi({ email: 'example123@gmail.com' });
                        expect(res.status).toBe(400);
                        expect(res.body).toBeDefined();
                });
        });

        describe('PUT /email/:key', () => {
                const reqApi = (key: string) =>
                        supertest(app.getHttpServer())
                                .put('/api/user/email/' + key)
                                .send();

                beforeAll(async () => {
                        const fUser = fakeUser();
                        const user = await userRepository.save(fUser);
                        user.email = 'hello@gmail.com';
                        const token = tokenService.generateJWT(user);
                        redisService.setByValue('123456', token);
                });

                it('Pass', async () => {
                        const res = await reqApi('123456');
                        expect(res.status).toBe(200);
                        expect(res.body).toBeDefined();
                });

                it('Failed (reset key have been delete)', async () => {
                        const res = await reqApi('123456');

                        expect(res.status).toBe(400);
                        expect(res.body).toBeDefined();
                });
        });

        afterAll(async () => {
                await userRepository.clear();
                await app.close();
        });
});

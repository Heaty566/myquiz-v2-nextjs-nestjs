import * as supertest from 'supertest';
import { INestApplication } from '@nestjs/common';

//* Internal import
import { fakeUser } from '../../../test/fakeEntity';
import { UserRepository } from '../../models/user/entities/userRepository.entity';
import { initTestModule } from '../../../test/initTest';
import { CreateUserDto } from '../dto/createUser.dto';
import { User } from '../../models/user/entities/user.entity';
import { LoginUserDto } from '../dto/LoginUser.dto';
import { AuthService } from '../auth.service';
import { EmailResetPasswordDto, PasswordResetDto } from '../dto/resetPassword';
import { RedisService } from '../../providers/redis/redis.service';
import { TokenService } from '../../providers/token/token.service';
import { defuse } from '../../../test/testHelper';

let mockObj = Promise.resolve();
jest.mock('@sendgrid/mail', () => {
        return {
                setApiKey: jest.fn(),
                send: jest.fn(() => mockObj),
        };
});

describe('AuthController', () => {
        let app: INestApplication;
        let userRepository: UserRepository;
        let authService: AuthService;
        let redisService: RedisService;
        let tokenService: TokenService;
        beforeAll(async () => {
                const { getApp, module } = await initTestModule();
                app = getApp;
                tokenService = module.get<TokenService>(TokenService);
                userRepository = module.get<UserRepository>(UserRepository);
                redisService = module.get<RedisService>(RedisService);
                authService = module.get<AuthService>(AuthService);
        });

        describe('POST /register', () => {
                let createUserData: CreateUserDto;
                const reqApi = (input: CreateUserDto) => supertest(app.getHttpServer()).post('/api/auth/register').send(input);

                beforeEach(() => {
                        const getUser = fakeUser();
                        createUserData = {
                                fullName: getUser.fullName,
                                username: getUser.username,
                                password: getUser.password,
                                confirmPassword: getUser.password,
                        };
                });
                it('Pass', async () => {
                        const res = await reqApi(createUserData);

                        expect(res.headers['set-cookie']).toBeDefined();
                        expect(res.status).toBe(201);
                });

                it('Failed (username is taken)', async () => {
                        await reqApi(createUserData);
                        const res = await reqApi(createUserData);
                        expect(res.status).toBe(400);
                });

                it('Failed (confirmPassword does not match)', async () => {
                        createUserData.confirmPassword = '12345678';
                        const res = await reqApi(createUserData);

                        expect(res.status).toBe(400);
                });
        });

        describe('POST /login', () => {
                //
                let loginUserDto: LoginUserDto;
                const reqApi = (input: LoginUserDto) => supertest(app.getHttpServer()).post('/api/auth/login').send(input);

                beforeEach(async () => {
                        const getUser = fakeUser();
                        loginUserDto = {
                                username: getUser.username,
                                password: getUser.password,
                        };
                        const encryptPassword = await authService['encryptString'](loginUserDto.password);
                        await userRepository.insert({ username: loginUserDto.username, password: encryptPassword });
                });
                it('Pass', async () => {
                        const res = await reqApi(loginUserDto);

                        expect(res.headers['set-cookie']).toBeDefined();
                        expect(res.status).toBe(201);
                });

                it('Failed (username does not exist)', async () => {
                        loginUserDto.username = 'helloworld';
                        const res = await reqApi(loginUserDto);

                        expect(res.status).toBe(400);
                });
                it('Failed (incorrect password)', async () => {
                        loginUserDto.password = 'helloworld';
                        const res = await reqApi(loginUserDto);
                        expect(res.status).toBe(400);
                });
        });

        describe('POST /reset-password', () => {
                const reqApi = (input: EmailResetPasswordDto) => supertest(app.getHttpServer()).post('/api/auth/reset-password').send(input);
                let user: User;
                beforeAll(async () => {
                        const hello = fakeUser();
                        hello.email = 'hello@gmail.com';
                        user = await userRepository.save(hello);
                });

                it('Pass', async () => {
                        const res = await reqApi({ email: user.email });
                        expect(res.status).toBe(201);
                        expect(res.body).toBeDefined();
                });

                it('Failed (email does not exist)', async () => {
                        const res = await reqApi({ email: 'example@gmail.com' });
                        expect(res.status).toBe(400);
                        expect(res.body).toBeDefined();
                });

                it('Failed (email does not exist in database)', async () => {
                        const res = await reqApi({ email: 'example@gmail.com' });
                        expect(res.status).toBe(400);
                        expect(res.body).toBeDefined();
                });
                it('Failed (email does not exist in database)', async () => {
                        mockObj = defuse(new Promise((resolve, reject) => reject(new Error('Oops'))));

                        const res = await reqApi({ email: 'hello@gmail.com' });

                        expect(res.status).toBe(400);
                        expect(res.body).toBeDefined();
                });
        });

        describe('PUT /reset-password', () => {
                const reqApi = (input: PasswordResetDto) => supertest(app.getHttpServer()).put('/api/auth/reset-password').send(input);
                let user: User;

                beforeAll(async () => {
                        const hello = fakeUser();
                        hello.email = 'hello@gmail.com';
                        user = await userRepository.save(hello);
                        const token = tokenService.generateJWT(hello);
                        redisService.setByValue('value', token);
                });

                it('Pass', async () => {
                        const res = await reqApi({ password: user.password, confirmPassword: user.password, resetKey: 'value' });

                        expect(res.status).toBe(200);
                        expect(res.body).toBeDefined();
                });

                it('Failed (reset key have been delete)', async () => {
                        const res = await reqApi({ password: user.password, confirmPassword: user.password, resetKey: 'value' });

                        expect(res.status).toBe(400);
                        expect(res.body).toBeDefined();
                });
        });

        afterAll(async () => {
                await userRepository.clear();
                await app.close();
        });
});

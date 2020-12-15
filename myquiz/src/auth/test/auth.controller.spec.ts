import * as supertest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { getTestInit } from '../../common/test/getInit';
import { getCreateUserDto, getLoginUserDto } from '../../common/test/fakeData/fakeAuth';
import { UserRepository } from '../../user/entities/userRepository.entity';
import { CreateUserDto } from '../dto/createUser.dto';
import { LoginUserDto } from '../dto/LoginUser.dto';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
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
                let createUserData: CreateUserDto;

                beforeEach(() => {
                        createUserData = getCreateUserDto();
                });
                it('create new user', async () => {
                        const res = await supertest(app.getHttpServer()).post('/auth/register').send(createUserData);

                        expect(res.headers['set-cookie']).toBeDefined();
                        expect(res.status).toBe(201);
                });

                it('invalid input (username is taken)', async () => {
                        await supertest(app.getHttpServer()).post('/auth/register').send(createUserData);
                        const res = await supertest(app.getHttpServer()).post('/auth/register').send(createUserData);
                        expect(res.status).toBe(400);
                        expect(res.body.message).toBeDefined();
                });

                it('invalid input (confirmPassword does not match)', async () => {
                        createUserData.confirmPassword = '12345678';
                        const res = await supertest(app.getHttpServer()).post('/auth/register').send(createUserData);

                        expect(res.status).toBe(400);
                        expect(res.body.data).toBeDefined();
                });
        });

        describe('loginUser', () => {
                //
                let loginUserDto: LoginUserDto;
                beforeEach(async () => {
                        loginUserDto = getLoginUserDto();
                        const encryptPassword = await authService['encryptString'](loginUserDto.password);
                        await userRepostiory.insert({ username: loginUserDto.username, password: encryptPassword });
                });
                it('login user success', async () => {
                        const res = await supertest(app.getHttpServer()).post('/auth/login').send(loginUserDto);

                        expect(res.headers['set-cookie']).toBeDefined();
                        expect(res.status).toBe(201);
                });

                it('invalid input (username does not exist)', async () => {
                        loginUserDto.username = 'helloworld';
                        const res = await supertest(app.getHttpServer()).post('/auth/login').send(loginUserDto);
                        expect(res.body.message).toBeDefined();
                        expect(res.status).toBe(400);
                });
                it('invalid input (incorrect password)', async () => {
                        loginUserDto.password = 'helloworld';
                        const res = await supertest(app.getHttpServer()).post('/auth/login').send(loginUserDto);

                        expect(res.body.message).toBeDefined();
                        expect(res.status).toBe(400);
                });
        });

        afterAll(async () => {
                await app.close();
                await userRepostiory.clear();
        });
});

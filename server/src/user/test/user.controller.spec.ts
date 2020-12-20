import { INestApplication } from '@nestjs/common';
import { getTestInit } from '../../common/test/getInit';
import * as supertest from 'supertest';
import { UserRepository } from '../entities/userRepository.entity';
import { getCreateUserDto } from '../../common/test/fakeData/fakeAuth';
import { TokenService } from '../../token/token.service';

import { getCreateTokenDto } from '../../common/test/fakeData/fakeToken';

describe('userController', () => {
        let app: INestApplication;
        let userRepository: UserRepository;

        let tokenService: TokenService;
        let reToken: string;
        beforeAll(async () => {
                const { getApp, module } = await getTestInit();
                app = getApp;

                tokenService = module.get<TokenService>(TokenService);
                userRepository = module.get<UserRepository>(UserRepository);
        });

        beforeAll(async () => {
                const createUserData = getCreateUserDto();
                const res = await supertest(app.getHttpServer()).post('/auth/register').send(createUserData);
                reToken = res.headers['set-cookie'][0];
        });

        describe('getUser', () => {
                it('get user', async () => {
                        const res = await supertest(app.getHttpServer()).get('/user').set({ cookie: reToken }).send({});

                        expect(res.body.username).toBeDefined();
                        expect(res.body.fullname).toBeDefined();
                        expect(res.body.password).toBeUndefined();
                });

                it('invalid token', async () => {
                        const res = await supertest(app.getHttpServer()).get('/user').send({});
                        expect(res.body.message).toBeDefined();
                        expect(res.status).toBe(401);
                });

                let invalidReToken: string;
                beforeEach(async () => {
                        invalidReToken = await tokenService.getRefershToken(getCreateTokenDto());
                });

                it('invalid token', async () => {
                        const cookies = `re-token=${invalidReToken}; Path=/`;
                        const res = await supertest(app.getHttpServer()).get('/user').set({ cookie: cookies }).send({});
                        expect(res.body.message).toBeDefined();
                        expect(res.status).toBe(401);
                });
        });

        afterAll(async () => {
                await app.close();
                await userRepository.clear();
        });
});

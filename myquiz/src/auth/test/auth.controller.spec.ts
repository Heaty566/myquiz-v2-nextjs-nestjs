import * as supertest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { getTestInit } from '../../common/test/getInit';
import { getCreateUserDto } from '../../common/test/fakeData/fakeAuth';
import { UserRepository } from '../../user/entities/userRepository.entity';

describe('AuthController', () => {
        let app: INestApplication;
        let userRepostiory: UserRepository;
        beforeEach(async () => {
                const { getApp, module } = await getTestInit();
                app = getApp;

                userRepostiory = module.get<UserRepository>(UserRepository);
        });

        describe('createNewUser', () => {
                let createUserData;

                beforeEach(() => {
                        createUserData = getCreateUserDto();
                });
                it('', async () => {
                        const res = await supertest(app.getHttpServer())
                                .post('/auth/register')
                                .send(createUserData);
                        console.log(res.body);
                        expect(res.status).toBe(201);
                });
        });

        afterAll(async () => {
                await app.close();
                await userRepostiory.clear();
        });
});

import { INestApplication } from '@nestjs/common';
import * as moment from 'moment';
import { ObjectId } from 'mongodb';

//* Internal import
import { TokenRepository } from '../entities/token.repository';
import { initTestModule } from '../../../test/initTest';
import { TokenService } from '../token.service';
import { fakeUser } from '../../../test/fakeEnity';
import { UserRepository } from '../../user/entities/userRepository.entity';
import { User } from '../../user/entities/user.entity';
import { Token } from '../entities/token.entity';

describe('TokenService', () => {
        let app: INestApplication;
        let tokenRepository: TokenRepository;
        let tokenService: TokenService;
        let userRepository: UserRepository;
        let user: User;
        beforeAll(async () => {
                const { getApp, module } = await initTestModule();
                app = getApp;

                tokenRepository = module.get<TokenRepository>(TokenRepository);
                tokenService = module.get<TokenService>(TokenService);
                userRepository = module.get<UserRepository>(UserRepository);
        });

        beforeAll(async () => {
                user = await userRepository.save(fakeUser());
        });

        describe('getRefreshToken', () => {
                it('Pass', async () => {
                        const tokenId = await tokenService.getRefreshToken(user);
                        const getToken = await tokenRepository.findOne({ where: { _id: new ObjectId(tokenId) } });
                        const userId = await tokenService.decodeJWT<{ _id: string }>(getToken.data);

                        const checkIs6Month = moment().diff(getToken.expired, 'months');
                        expect(userId._id).toBeDefined();
                        expect(checkIs6Month).toBeLessThanOrEqual(-5);
                        expect(getToken).toBeDefined();
                });
        });

        describe('getAuthToken', () => {
                let user: User;
                beforeEach(() => {
                        user = fakeUser();
                });
                it('Pass', async () => {
                        const encryptedToken = await tokenService.getRefreshToken(user);
                        const getAuthToken = await tokenService.getAuthToken(encryptedToken);

                        expect(getAuthToken).toBeDefined();
                });

                it('Failed (token does not exist)', async () => {
                        const getAuthToken = await tokenService.getAuthToken(String(new ObjectId()));

                        expect(getAuthToken).toBeNull();
                });
                it('Failed (token decode failed)', async () => {
                        const token: Token = {
                                _id: new ObjectId(),
                                data: '123',
                                expired: moment().toDate(),
                        };

                        await tokenRepository.save(token);
                        const getAuthToken = await tokenService.getAuthToken(String(token._id));

                        expect(getAuthToken).toBeNull();
                });
                it('Failed (token decode failed)', async () => {
                        const encryptedToken = await tokenService.getRefreshToken(user);
                        await tokenRepository.update({ _id: new ObjectId(encryptedToken) }, { expired: new Date(2018, 11, 24, 10, 33, 30, 0) });
                        const getAuthToken = await tokenService.getAuthToken(encryptedToken);

                        expect(getAuthToken).toBeNull();
                });
        });

        describe('generateJWT and decodeJWT', () => {
                let user: User;

                beforeEach(async () => {
                        user = await userRepository.save(fakeUser());
                });

                it('Pass', () => {
                        const encryptedToken = tokenService.generateJWT(user);
                        const decodeData = tokenService.decodeJWT<User>(encryptedToken);

                        expect(decodeData).toBeDefined();
                        expect(encryptedToken).toBeDefined();
                });
                it('Failed (invalid jwt)', () => {
                        const decodeData = tokenService.decodeJWT('3213213cxazcxz,mckxsmzlckmdlksz}');

                        expect(decodeData).toBeNull();
                });
        });

        afterAll(async () => {
                await tokenRepository.clear();
                await app.close();
        });
});

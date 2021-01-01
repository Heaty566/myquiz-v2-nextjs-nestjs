import { INestApplication } from '@nestjs/common';
import { getTestInit } from '../../common/test/getInit';
import { TokenService } from '../token.service';
import { TokenRepository } from '../entities/token.repository';
import { getCreateTokenDto } from '../../common/test/fakeData/fakeToken';
import { CreateTokenDto } from '../dto/createToken.dto';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { ObjectId } from 'mongodb';

describe('TokenService', () => {
        let app: INestApplication;
        let tokenRepository: TokenRepository;
        let tokenService: TokenService;
        let jwtService: JwtService;
        beforeAll(async () => {
                const { getApp, module } = await getTestInit();
                app = getApp;

                tokenRepository = module.get<TokenRepository>(TokenRepository);
                tokenService = module.get<TokenService>(TokenService);
                jwtService = module.get<JwtService>(JwtService);
        });

        describe('getRefershToken', () => {
                let token: CreateTokenDto;
                beforeEach(() => {
                        token = getCreateTokenDto();
                });
                it('get refersh token', async () => {
                        const encryptedToken = await tokenService.getRefreshToken(token);
                        const decode = jwtService.decode(encryptedToken);
                        if (typeof decode === 'object') {
                                const checkIs6Month = moment().diff(decode.expiredDate, 'months');
                                const getTokenFromDatabase = await tokenRepository.findOne({ where: { _id: new ObjectId(decode.data) } });

                                expect(getTokenFromDatabase).toBeDefined();
                                expect(checkIs6Month).toBeLessThanOrEqual(-5);
                        }
                });
        });

        describe('getAuthToken', () => {
                let token: CreateTokenDto;
                beforeEach(() => {
                        token = getCreateTokenDto();
                });
                it('get auth token', async () => {
                        const encryptedToken = await tokenService.getRefreshToken(token);
                        const getAuthToken = await tokenService.getAuthToken(encryptedToken);

                        expect(typeof getAuthToken).toBe('string');
                });
                it('invalid input (token does not exist)', async () => {
                        const getTokenFromDatabase = await tokenService.getAuthToken('123456');
                        expect(getTokenFromDatabase).toBeNull();
                });

                it('get auth token (token does not exist in database)', async () => {
                        const encryptedToken = await tokenService.getRefreshToken(token);
                        const decode = jwtService.decode(encryptedToken);
                        if (typeof decode === 'object') {
                                await tokenRepository.delete({ _id: new ObjectId(decode.data) });

                                const getTokenFromDatabase = await tokenService.getAuthToken(encryptedToken);
                                expect(getTokenFromDatabase).toBeNull();
                        }
                });
        });

        afterAll(async () => {
                await app.close();
                await tokenRepository.clear();
        });
});

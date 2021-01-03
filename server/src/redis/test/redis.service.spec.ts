import { INestApplication } from '@nestjs/common';
import { createClient, RedisClient } from 'redis';
import { getTestInit } from '../../common/test/getInit';
import { RedisService } from '../redis.service';

describe('Redis Service', () => {
        let app: INestApplication;
        let redisService: RedisService;
        let redisClient: RedisClient;
        beforeAll(async () => {
                const { getApp, module } = await getTestInit();
                app = getApp;
                redisClient = createClient(Number(process.env.REDIS_PORT) || 7000);
                redisService = module.get<RedisService>(RedisService);
        });

        describe('get and get ByKey', () => {
                it('set value as string', async () => {
                        redisService.setByValue('value', '123');
                        const value = await redisService.getByKey('value');
                        expect(value).toBe('123');
                });
                it('set value as string', async () => {
                        const value = await redisService.getByKey('123');
                        expect(value).toBeNull();
                });
        });

        describe('get and set ByObject', () => {
                it('map to nested obj', async () => {
                        redisService.setByObject('abc', { hello: '123', h: { hello: '21`3' } });
                        const value = await redisService.getByObject('abc');
                        expect(value).toBeDefined();
                });
                it('return null with non-exist object', async () => {
                        const value = await redisService.getByObject('xyz');
                        expect(value).toBeNull();
                });
        });

        afterAll(async () => {
                redisClient.flushdb();
                await app.close();
        });
});

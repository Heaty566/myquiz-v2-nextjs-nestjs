import { INestApplication } from '@nestjs/common';
import { createClient, RedisClient } from 'redis';

//* Internal import
import { initTestModule } from '../../../../test/initTest';
import { RedisService } from '../redis.service';

describe('Redis Service', () => {
        let app: INestApplication;
        let redisService: RedisService;
        let redisClient: RedisClient;
        beforeAll(async () => {
                const { getApp, module } = await initTestModule();
                app = getApp;
                redisClient = createClient(Number(process.env.REDIS_PORT) || 7000);
                redisService = module.get<RedisService>(RedisService);
        });

        describe('set and get ByKey', () => {
                it('PASS', async () => {
                        redisService.setByValue('value', '123');
                        const value = await redisService.getByKey('value');
                        expect(value).toBe('123');
                });
                it('Failed (Key does not exist)', async () => {
                        const value = await redisService.getByKey('123');
                        expect(value).toBeNull();
                });
        });

        describe('deleteByKey', () => {
                it('Pass', async () => {
                        redisService.setByValue('value', '123');
                        redisService.deleteByKey('value');
                        const value = await redisService.getByKey('value');
                        expect(value).toBeNull();
                });
        });

        describe('set and set ByObject', () => {
                it('Pass', async () => {
                        redisService.setByObject('abc', { hello: '123', h: { hello: '21`3' } });
                        const value = await redisService.getByObject('abc');
                        expect(value).toBeDefined();
                });
                it('Failed (object does not exist)', async () => {
                        const value = await redisService.getByObject('xyz');
                        expect(value).toBeNull();
                });
        });

        afterAll(async () => {
                await redisClient.flushdb();
                await app.close();
        });
});

import { createClient, RedisClient } from 'redis';
import { Injectable } from '@nestjs/common';
import * as flat from 'flat';

//* Internal import
import { CONSTANT } from '../common/constant';

@Injectable()
export class RedisService {
        private readonly redisRepository: RedisClient;
        constructor() {
                const redisPort = Number(process.env.REDIS_PORT) || 7000;

                this.redisRepository = createClient({ port: redisPort, host: process.env.REDIS_HOST || '' });
                this.redisRepository.select(process.env.REDIS_DB_NUMBER || 1);
        }

        deleteByKey(key: string) {
                this.redisRepository.del(key);
        }

        setByObject(key: string, value: Record<string, any>) {
                const flatValue: Record<string, any> = flat(value);

                this.redisRepository.hmset(key, flatValue);
        }
        getByObject<T extends Record<string, string>>(key: string) {
                return new Promise((res, rej) => {
                        this.redisRepository.hgetall(key, (err, data) => {
                                if (err) return rej(err);

                                res(flat.unflatten(data) as T);
                        });
                });
        }

        setByValue(key: string, value: number | string, expired?: number) {
                if (expired) {
                        this.redisRepository.setex(key, expired * CONSTANT.MINUTE, String(value));
                } else {
                        this.redisRepository.set(key, String(value));
                }
        }

        // *todo take a note if it goes wrong
        getByKey(key: string): Promise<string> {
                return new Promise((res, rej) => {
                        this.redisRepository.get(key, (err, data) => {
                                if (err) return rej(err);

                                res(data);
                        });
                });
        }
}

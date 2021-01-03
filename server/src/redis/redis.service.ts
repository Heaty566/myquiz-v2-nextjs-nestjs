import { Injectable } from '@nestjs/common';
import * as flat from 'flat';
import { createClient, RedisClient } from 'redis';

@Injectable()
export class RedisService {
        private readonly redisRepository: RedisClient;
        constructor() {
                this.redisRepository = createClient(Number(process.env.REDIS_PORT) || 7000);
                this.redisRepository.select(process.env.REDIS_DB_NUMBER || 1);
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

        setByValue(key: string, value: number | string) {
                this.redisRepository.set(key, String(value));
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

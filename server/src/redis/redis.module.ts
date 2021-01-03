import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
        controllers: [],
        providers: [RedisService],
})
export class RedisModule {}

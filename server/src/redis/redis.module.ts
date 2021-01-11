import { Module } from '@nestjs/common';

//* Internal import
import { RedisService } from './redis.service';

@Module({
        controllers: [],
        providers: [RedisService],
})
export class RedisModule {}

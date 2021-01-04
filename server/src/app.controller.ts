import { Controller, Get } from '@nestjs/common';

//* Internal import
import { RedisService } from './redis/redis.service';
@Controller()
export class AppController {
        constructor(private readonly redisService: RedisService) {}

        @Get('/hello')
        getHello(): string {
                return "i'm you server";
        }

        /*
        this router is count visitor
        */
        @Get('/visitor')
        async getVisitor() {
                const total = await this.redisService.getByKey('countVisitor');
                return total;
        }
}

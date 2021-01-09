import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from './common/dto/response.dto';

//* Internal import
import { RedisService } from './redis/redis.service';
@Controller()
export class AppController {
        constructor(private readonly redisService: RedisService) {}

        /*
        this router is count visitor
        */
        @Get('/visitor')
        async getVisitor(): Promise<ApiResponse> {
                const total = await this.redisService.getByKey('countVisitor');
                return { data: total };
        }
}

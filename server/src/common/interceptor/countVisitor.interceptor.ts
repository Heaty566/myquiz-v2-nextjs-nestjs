import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class CountVisitorInterceptor implements NestInterceptor {
        constructor(private readonly redisService: RedisService) {}

        async intercept(context: ExecutionContext, next: CallHandler) {
                const countVisitor = await this.redisService.getByKey('countVisitor');
                if (!countVisitor) {
                        this.redisService.setByValue('countVisitor', 1);
                } else this.redisService.setByValue('countVisitor', Number(countVisitor) + 1);
                return next.handle();
        }
}

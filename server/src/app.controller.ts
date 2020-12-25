import { Controller, Get } from '@nestjs/common';
import { count } from './common/interceptor/countVisitor.interceptor';
@Controller()
export class AppController {
        @Get('/hello')
        getHello(): string {
                return "i'm you server";
        }

        /*
        this router is count visitor
        */
        @Get('/visitor')
                          getVisitor() {
                 return count;
        }
}

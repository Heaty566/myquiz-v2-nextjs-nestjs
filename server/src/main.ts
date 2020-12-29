import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { router } from './common/app/router';
import { Logger } from '@nestjs/common';

async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        const logger = new Logger('SERVER');

        //init all middlewares
        router(app);
        const port = process.env.PORT || 4000;
        console.log(process.env.CLIENT_URL);
        await app.listen(port, () => {
                logger.log(`Listening on port ${port}`);
                logger.log(`Current mode: ${process.env.NODE_ENV}`);
                logger.log(`Cors allows access: ${process.env.CLIENT_URL}`);
                logger.log(`Database Information: ${process.env.DB_URL}`);
                logger.log('Ready for service');
        });
}
bootstrap();

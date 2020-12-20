import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        app.setGlobalPrefix('/api');
        app.use(cookieParser());
        app.enableCors({ origin: ['http://localhost:7000'], credentials: true });
        const port = process.env.PORT || 4000;
        await app.listen(port, () => {
                console.log('Current Mode: ' + process.env.NODE_ENV);
                console.log('Listening on port ' + port);
        });
}
bootstrap();

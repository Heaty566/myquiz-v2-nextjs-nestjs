import { INestApplication } from '@nestjs/common';
import * as I18n from 'i18n';
import * as morgan from 'morgan';
import { Response, NextFunction, Request } from 'express';
import * as cookieParser from 'cookie-parser';
import { CONSTANT } from '../constant';
import { NotFoundApiHandler } from '../exception/notfound.exception';
import { CountVisitorInterceptor } from '../interceptor/countVisitor.interceptor';
import { RuntimeApiHandler } from '../exception/runtime.exception';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as swagger from 'swagger-ui-express';
import * as doc from '../../docs/doc-v2.json';

I18n.configure({
        locales: ['en', 'vi'],
        directory: `../../locales`,
        cookie: 'lang',
        defaultLocale: 'en',
});

export function router(app: INestApplication) {
        //conmmon middleware
        app.use(I18n.init);
        app.setGlobalPrefix('/api');
        app.use(cookieParser());
        app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });

        //for production
        if (process.env.NODE_ENV === 'production') {
                app.use(helmet());
                app.use(compression());
        }

        //for developer
        if (process.env.NODE_ENV === 'development') {
                app.use(morgan('dev'));
        }
        if (process.env.DOC === 'active') {
                app.use('/doc', swagger.serve, swagger.setup(doc));
        }

        //global exception handler
        app.useGlobalFilters(new NotFoundApiHandler());
        app.useGlobalFilters(new RuntimeApiHandler());

        //global interceptor handler
        app.useGlobalInterceptors(new CountVisitorInterceptor());

        app.use((req: Request, res: Response, next: NextFunction) => {
                const lang = req.cookies['lang'] || '';
                if (!lang) {
                        I18n.setLocale('en');
                        res.cookie('lang', 'en', { maxAge: CONSTANT.DAY * 30 });
                } else I18n.setLocale(lang);

                next();
        });
}

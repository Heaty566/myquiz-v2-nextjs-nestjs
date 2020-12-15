import { AppModule } from '../../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';

export const getTestInit = async () => {
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule],
        }).compile();

        const configModule = module.createNestApplication();

        configModule.use(cookieParser());

        const getApp = await configModule.init();
        //apply middleware

        return { getApp, module };
};

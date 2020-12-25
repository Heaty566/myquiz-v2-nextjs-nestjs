import { AppModule } from '../../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { router } from '../app/router';

export const getTestInit = async () => {
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule],
        }).compile();

        const configModule = module.createNestApplication();

        router(configModule);

        const getApp = await configModule.init();
        //apply middleware

        return { getApp, module };
};

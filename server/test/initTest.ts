import { Test, TestingModule } from '@nestjs/testing';
//* Internal import
import { router } from '../src/common/router';
import { AppModule } from '../src/app.module';

export const initTestModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule],
        }).compile();

        const configModule = module.createNestApplication();

        router(configModule);

        const getApp = await configModule.init();
        //apply middleware

        return { getApp, module };
};

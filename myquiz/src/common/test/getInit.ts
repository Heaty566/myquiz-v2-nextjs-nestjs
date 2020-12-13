import { AppModule } from '../../app.module';
import { Test, TestingModule } from '@nestjs/testing';

export const getTestInit = async () => {
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule],
        }).compile();
        const getApp = await module.createNestApplication().init();
        //apply middleware

        return { getApp, module };
};

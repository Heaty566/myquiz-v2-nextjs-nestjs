import { Module } from '@nestjs/common';

//* Internal import
import { AwsService } from './aws.service';

@Module({
        controllers: [],
        providers: [AwsService],
})
export class AwsModule {}

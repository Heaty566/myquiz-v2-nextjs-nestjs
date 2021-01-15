import { Controller, Get, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from './common/interfaces/File';
import { AwsService } from './providers/aws/aws.service';

//* Internal import
@Controller('/hello')
export class AppController {
        constructor(private readonly awsService: AwsService) {}

        /*
        this router is count visitor
        */
        // @Post('')
        // @UseInterceptors(FileInterceptor('file'))
        // async getVisitor(@UploadedFile() file: File) {
        //         const hello = await this.awsService.uploadFile(file, '123', 'user');
        //         return { data: '12' };
        // }
}

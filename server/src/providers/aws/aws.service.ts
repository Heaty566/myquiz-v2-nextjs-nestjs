import { Injectable } from '@nestjs/common';
import { config, S3 } from 'aws-sdk';
import * as path from 'path';
import { File } from '../../common/interfaces/File';
import { ObjectId } from 'mongodb';

//* Internal import

@Injectable()
export class AwsService {
        private s3: S3;

        constructor() {
                config.update({
                        accessKeyId: process.env.AWS_KEY_ID,
                        secretAccessKey: process.env.AWS_SECRET_KEY,
                });
                this.s3 = new S3();
        }
        checkFileExtension(file: File, extend: string[] = []) {
                const acceptTypes = ['.jpeg', '.jpg', '.png', '.bmp', ...extend];
                const fileType = path.extname(file.originalname).toLocaleLowerCase();

                return acceptTypes.includes(fileType);
        }

        checkFileSize(file: File, limit: number) {
                const limitSize = limit * 1024 * 1024;
                return file.size < limitSize;
        }

        async uploadFile(file: File, awsPath: string, prefix: 'user' | 'system') {
                const fileType = path.extname(file.originalname).toLocaleLowerCase();
                const id = new ObjectId();
                const locationFile = `${prefix}/${awsPath}/${id}${fileType}`;

                return await this.s3
                        .putObject({ Bucket: process.env.AWS_S3_BUCKET_NAME, Body: file.buffer, Key: locationFile, ContentType: file.mimetype })
                        .promise()
                        .then(() => {
                                return locationFile;
                        })
                        .catch((err) => {
                                //*todo handle track err

                                return null;
                        });
        }
}

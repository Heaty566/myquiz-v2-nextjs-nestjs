import { Module } from '@nestjs/common';
import * as mail from '@sendgrid/mail';
import { MailService as SendGrid } from '@sendgrid/mail';
import { MailService } from './mail.service';

@Module({
        controllers: [],
        providers: [
                MailService,
                {
                        provide: SendGrid,
                        useFactory: () => {
                                return mail.setApiKey(process.env.SENDGRID_API_KEY);
                        },
                },
        ],
        exports: [MailService],
})
export class MailModule {}

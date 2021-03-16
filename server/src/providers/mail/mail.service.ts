import { Injectable } from '@nestjs/common';
import { MailService as SendGrid, MailDataRequired } from '@sendgrid/mail';
import * as mail from '@sendgrid/mail';

@Injectable()
export class MailService {
        constructor(private readonly sendGrid: SendGrid) {}

        /**
         *
         * @param receiver mail of user
         * @param key the key for reset password
         */
        forgetPasswordMail(receiver: string, key: string) {
                const link = `${process.env.CLIENT_URL}/user/forgot-password/${key}`;
                const content = `We heard that you lost your MyQuiz password. Sorry about that! 
                               <br/>
                               But don’t worry! You can use the following link to reset your password: 
                               <br/>
                               If you don’t use this link within 30 minutes, it will expire. To get a new password reset link, 
                               visit: <a href=${link}>Click here</a>`;
                return this.sendMail(receiver, content, 'Reset you password');
        }

        /**
         *
         * @param receiver mail of user
         * @param key the key for reset password
         */
        otpMail(receiver: string, key: string) {
                const content = `
                                To authenticate, please use the following One Time Password (OTP): 
                                <br/>
                                <strong style="font-size: 18px;">${key}</strong>
                                <br/>
                                Do not share this OTP with anyone. My Quiz takes your account security very seriously.
                                <br/>
                                If you don’t use this link within 5 minutes, it will expire.
                                `;
                return this.sendMail(receiver, content, 'OTP');
        }

        private sendMail(receiver: string, content: string, subject = 'My Quiz') {
                const msg: MailDataRequired = {
                        to: receiver,
                        from: 'MyQuiz<noreply@heaty566.com>',
                        subject: subject,
                        html: `
                        <div>
                          <p>${content}</p>
                          </br>
                          <p>Thanks,</p>
                          <p>MyQuiz Team</p>
                          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="235" alt="" data-proportionally-constrained="true" data-responsive="false" src="http://cdn.mcauto-images-production.sendgrid.net/96bce11efbe6f18b/cbae9168-5dcb-40e4-9839-a265f2f87588/1264x344.png" height="64"/> 
                        </div>`,
                        mailSettings: {
                                sandboxMode: {
                                        enable: process.env.SENDGRID_SAND_BOX === 'ACTIVE',
                                },
                        },
                };
                return this.sendGrid
                        .send(msg)
                        .then(() => {
                                return true;
                        })
                        .catch(() => {
                                return false;
                        });
        }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as Google, VerifyCallback as GoogleCallback } from 'passport-google-oauth20';
import { Strategy as Facebook } from 'passport-facebook';
import { Strategy as Github } from 'passport-github';

//* Internal import
import { UserService } from '../models/user/user.service';
import { AuthService } from './auth.service';

const callbackPrefix = '/api/auth';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Google, 'google') {
        constructor(private readonly authService: AuthService, private readonly userService: UserService) {
                super({
                        clientID: process.env.GOOGLE_CLIENT_ID,
                        clientSecret: process.env.GOOGLE_SECRET,
                        callbackURL: `${process.env.SERVER_URL}${callbackPrefix}/google/callback`,
                        scope: ['email', 'profile'],
                });
        }

        async validate(accessToken: string, refreshToken: string, profile: any, done: GoogleCallback): Promise<any> {
                const { id, displayName } = profile;
                const user = await this.userService.getOneFindField('googleId', id);
                if (!user) {
                        const newUser = await this.authService.createNewUserByOtherProvider(displayName, id, 'googleId');
                        done(null, newUser);
                }

                done(null, user);
        }
}

@Injectable()
export class FacebookStrategy extends PassportStrategy(Facebook, 'facebook') {
        constructor(private readonly authService: AuthService, private readonly userService: UserService) {
                super({
                        clientID: process.env.FACEBOOK_CLIENT_ID,
                        clientSecret: process.env.FACEBOOK_SECRET,
                        callbackURL: `${process.env.SERVER_URL}${callbackPrefix}/facebook/callback`,
                });
        }

        async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
                const { id, displayName } = profile;
                const user = await this.userService.getOneFindField('facebookId', id);
                if (!user) {
                        const newUser = await this.authService.createNewUserByOtherProvider(displayName, id, 'facebookId');
                        done(null, newUser);
                }

                done(null, user);
        }
}

@Injectable()
export class GithubStrategy extends PassportStrategy(Github, 'github') {
        constructor(private readonly authService: AuthService, private readonly userService: UserService) {
                super({
                        clientID: process.env.GITHUB_CLIENT_ID,
                        clientSecret: process.env.GITHUB_SECRET,
                        callbackURL: `${process.env.SERVER_URL}${callbackPrefix}/github/callback`,
                });
        }

        async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
                const { id, displayName } = profile;
                const user = await this.userService.getOneFindField('githubId', id);
                if (!user) {
                        const newUser = await this.authService.createNewUserByOtherProvider(displayName, id, 'githubId');
                        done(null, newUser);
                }

                done(null, user);
        }
}

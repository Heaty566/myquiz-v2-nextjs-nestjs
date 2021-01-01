import * as React from 'react';
import Image from 'next/image';

//* Import style
import { LoginWithContainer, LoginWithSocialItem } from './style';
import { Text } from '../../../style/typography';

export interface LoginWithSocialProps {}

export const LoginWithSocial: React.FunctionComponent<LoginWithSocialProps> = () => {
        return (
                <LoginWithContainer>
                        <LoginWithSocialItem>
                                <Image src="/asset/icon/google.svg" height="16" width="16" alt="google" />
                                <Text as="p" $type="h4">
                                        Continue with Google
                                </Text>
                        </LoginWithSocialItem>
                        <LoginWithSocialItem>
                                <Image src="/asset/icon/facebook.svg" height="16" width="16" alt="facebook" />
                                <Text as="p" $type="h4">
                                        Continue with Facebook
                                </Text>
                        </LoginWithSocialItem>
                        <LoginWithSocialItem>
                                <Image src="/asset/icon/github.svg" height="16" width="16" alt="github" />
                                <Text as="p" $type="h4">
                                        Continue with Github
                                </Text>
                        </LoginWithSocialItem>
                </LoginWithContainer>
        );
};

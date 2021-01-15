import * as React from 'react';
import Image from 'next/image';
import { FormWithContainer, FormWithSocialItem } from './style';
import { Text } from '../../../style/typography';

export interface FormSocialProps {}

export const FormWithSocial: React.FunctionComponent<FormSocialProps> = () => {
        return (
                <FormWithContainer>
                        <FormWithSocialItem as="a" href={`${process.env.SERVER_URL}/auth/google`}>
                                <Image src="/asset/icon/google.svg" height="24" width="24" alt="google" />
                                <Text as="p" $type="h4">
                                        Continue with Google
                                </Text>
                        </FormWithSocialItem>
                        <FormWithSocialItem as="a" href={`${process.env.SERVER_URL}/auth/facebook`}>
                                <Image src="/asset/icon/facebook.svg" height="24" width="24" alt="facebook" />
                                <Text as="p" $type="h4">
                                        Continue with Facebook
                                </Text>
                        </FormWithSocialItem>
                        <FormWithSocialItem as="a" href={`${process.env.SERVER_URL}/auth/github`}>
                                <Image src="/asset/icon/github.svg" height="24" width="24" alt="github" />
                                <Text as="p" $type="h4">
                                        Continue with Github
                                </Text>
                        </FormWithSocialItem>
                </FormWithContainer>
        );
};

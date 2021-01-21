import * as React from 'react';
import Image from 'next/image';

//* Import
import { SocialContainer, SocialLink, SocialImage } from './style';

export interface LoginSocialProps {}

const arrData = [
        {
                content: 'Continue with Facebook',
                imageUrl: 'facebook.svg',
                link: '/facebook',
                color: 'white',
                backgroundColor: '#1a538a',
        },
        {
                content: 'Continue with Google',
                imageUrl: 'google.svg',
                link: '/google',
                color: '#171717',
                backgroundColor: '#fefefe',
        },
        {
                content: 'Continue with Github',
                imageUrl: 'github.svg',
                link: '/github',
                color: '#fefefe',
                backgroundColor: '#171717',
        },
];

export const LoginSocial: React.FunctionComponent<LoginSocialProps> = () => {
        return (
                <SocialContainer>
                        {arrData.map((item) => {
                                return (
                                        <SocialLink
                                                $background={item.backgroundColor}
                                                $color={item.color}
                                                key={item.content}
                                                href={`${process.env.SERVER_URL}/auth${item.link}`}
                                        >
                                                <SocialImage>
                                                        <Image src={`/asset/icons/${item.imageUrl}`} alt={item.content} height="24" width="24" />
                                                </SocialImage>
                                                <span>{item.content}</span>
                                        </SocialLink>
                                );
                        })}
                </SocialContainer>
        );
};

import * as React from 'react';
import Cookies from 'universal-cookie';
import { UserState } from '../../../store/user';

import Icons from '../../dataDisplay/icons';
//* Import
import { SocialContainer, SocialLink, SocialImage } from './style';

export interface ISocialItem {
        content: string;
        icon: keyof typeof Icons;
        link: string;
        color: string;
        backgroundColor: string;
}

const arrData: Array<ISocialItem> = [
        {
                content: 'Continue with Facebook',
                icon: 'facebook',
                link: '/facebook',
                color: 'white',
                backgroundColor: '#1a538a',
        },
        {
                content: 'Continue with Google',
                icon: 'google',
                link: '/google',
                color: '#171717',
                backgroundColor: '#fefefe',
        },
        {
                content: 'Continue with Github',
                icon: 'github',
                link: '/github',
                color: '#fefefe',
                backgroundColor: '#171717',
        },
];

export const LoginSocial: React.FunctionComponent = () => {
        const [extraClient, setExtraClient] = React.useState<Window | null>();

        const popupCenter = (url: string, title: string, w: number, h: number) => {
                const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
                const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

                const width = window.innerWidth
                        ? window.innerWidth
                        : document.documentElement.clientWidth
                        ? document.documentElement.clientWidth
                        : screen.width;
                const height = window.innerHeight
                        ? window.innerHeight
                        : document.documentElement.clientHeight
                        ? document.documentElement.clientHeight
                        : screen.height;

                const systemZoom = width / window.screen.availWidth;
                const left = (width - w) / 2 / systemZoom + dualScreenLeft;
                const top = (height - h) / 2 / systemZoom + dualScreenTop;
                const extraWindow = window.open(url, title, `scrollbars=yes,width=${w},height=${h},top=${top},left=${left}`);

                setExtraClient(extraWindow);
        };
        const handleOnClick = (link: string) => {
                popupCenter(`${process.env.SERVER_URL}/auth${link}`, 'Login User', 450, 812);
        };

        React.useEffect(() => {
                let intervalId: NodeJS.Timeout;
                if (extraClient) {
                        intervalId = setInterval(() => {
                                const reToken = new Cookies().get('re-token');
                                if (reToken) {
                                        extraClient.close();
                                        window.location.assign('/');
                                }
                        }, 200);
                }

                return () => {
                        if (intervalId) clearInterval(intervalId);
                };
        }, [extraClient]);

        return (
                <SocialContainer>
                        {arrData.map((item) => {
                                return (
                                        <SocialLink
                                                $background={item.backgroundColor}
                                                $color={item.color}
                                                key={item.content}
                                                onClick={() => handleOnClick(item.link)}
                                        >
                                                <SocialImage>{Icons[item.icon]}</SocialImage>
                                                <span>{item.content}</span>
                                        </SocialLink>
                                );
                        })}
                </SocialContainer>
        );
};
